import { computed, ref } from "vue";

const HISTORY_LIMIT = 100;

const past = ref([]);
const future = ref([]);
const current = ref(null);
const busy = ref(false);
const configured = ref(false);

let snapshotFactory = null;
let restoreSnapshot = null;
let activeComponentId = null;
let suppressionDepth = 0;
let dirtyQueued = false;
let commitScheduled = false;

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function snapshotKey(snapshot) {
  return JSON.stringify(snapshot);
}

function commitCurrentState() {
  if (!configured.value || suppressionDepth > 0 || busy.value || !snapshotFactory) return;

  const next = snapshotFactory();
  if (!next) return;

  if (!current.value) {
    current.value = clone(next);
    return;
  }

  if (snapshotKey(next) === snapshotKey(current.value)) return;

  past.value.push(clone(current.value));
  if (past.value.length > HISTORY_LIMIT) past.value.shift();

  current.value = clone(next);
  future.value = [];
}

function scheduleCommit() {
  if (commitScheduled) return;
  commitScheduled = true;

  const run = () => {
    commitScheduled = false;
    if (!dirtyQueued) return;
    dirtyQueued = false;
    commitCurrentState();
  };

  if (typeof queueMicrotask === "function") queueMicrotask(run);
  else Promise.resolve().then(run);
}

function configure(options = {}) {
  snapshotFactory = options.snapshot || null;
  restoreSnapshot = options.restore || null;
  activeComponentId = options.componentId || null;
  configured.value = Boolean(snapshotFactory && restoreSnapshot && activeComponentId);
}

function reset() {
  dirtyQueued = false;
  if (configured.value && snapshotFactory) current.value = clone(snapshotFactory());
  else current.value = null;
  past.value = [];
  future.value = [];
}

function clear() {
  dirtyQueued = false;
  configured.value = false;
  snapshotFactory = null;
  restoreSnapshot = null;
  activeComponentId = null;
  current.value = null;
  past.value = [];
  future.value = [];
}

function setComponentId(componentId) {
  if (componentId === activeComponentId) return;
  activeComponentId = componentId || null;
  reset();
}

function markDirty() {
  if (!configured.value || suppressionDepth > 0 || busy.value) return;
  dirtyQueued = true;
  scheduleCommit();
}

function flush() {
  if (!dirtyQueued) return;
  dirtyQueued = false;
  commitCurrentState();
}

async function runHistoryOperation(operation) {
  suppressionDepth += 1;
  try {
    return await operation();
  } finally {
    suppressionDepth = Math.max(0, suppressionDepth - 1);
  }
}

async function undo() {
  if (busy.value) return false;

  flush();

  const previous = past.value.pop();
  if (!previous || !current.value || !restoreSnapshot) return false;

  busy.value = true;
  const currentSnapshot = clone(current.value);
  future.value.unshift(currentSnapshot);

  try {
    await runHistoryOperation(() => restoreSnapshot(clone(previous)));
    current.value = clone(previous);
    return true;
  } catch (error) {
    future.value.shift();
    past.value.push(previous);
    throw error;
  } finally {
    busy.value = false;
  }
}

async function redo() {
  if (busy.value) return false;

  flush();

  const next = future.value.shift();
  if (!next || !current.value || !restoreSnapshot) return false;

  busy.value = true;
  const currentSnapshot = clone(current.value);
  past.value.push(currentSnapshot);

  try {
    await runHistoryOperation(() => restoreSnapshot(clone(next)));
    current.value = clone(next);
    return true;
  } catch (error) {
    past.value.pop();
    future.value.unshift(next);
    throw error;
  } finally {
    busy.value = false;
  }
}

function recordReset(nextSnapshot) {
  flush();
  if (!current.value || !nextSnapshot) return;

  past.value.push(clone(current.value));
  if (past.value.length > HISTORY_LIMIT) past.value.shift();

  current.value = clone(nextSnapshot);
  future.value = [];
}

export function useEditorHistory() {
  return {
    past,
    future,
    current,
    busy,
    canUndo: computed(() => !busy.value && past.value.length > 0),
    canRedo: computed(() => !busy.value && future.value.length > 0),
    configure,
    reset,
    clear,
    setComponentId,
    markDirty,
    flush,
    runHistoryOperation,
    undo,
    redo,
    recordReset,
  };
}
