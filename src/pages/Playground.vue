<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Editor from "@/components/editor/Editor.vue";

const route = useRoute();
const router = useRouter();
const componentId = computed(() => String(route.params.componentId || "playground-default"));

function closePlayground() {
  router.push("/");
}
</script>

<template>
  <div class="playground-editor">
    <Editor :key="componentId" :initial-component-id="componentId" enable-builder @close="closePlayground" />
  </div>
</template>

<style scoped>
.playground-editor {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .playground-editor :deep(.navigator-toggle) {
    display: grid;
  }
}
</style>
