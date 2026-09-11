import { computed, reactive, ref } from "vue";

const components = reactive({});
const selectedComponentId = ref(null);
const drawerOpen = ref(false);

export function useStyleManager() {
  const registerComponent = (id, config = {}) => {
    if (!components[id]) {
      components[id] = { id, ...config };
    } else {
      Object.assign(components[id], config);
    }

    if (!selectedComponentId.value) {
      selectedComponentId.value = id;
    }
  };

  const selectComponent = (id) => {
    if (components[id]) selectedComponentId.value = id;
  };

  const openDrawer = (id = selectedComponentId.value) => {
    if (id) selectComponent(id);
    drawerOpen.value = true;
  };

  const closeDrawer = () => {
    drawerOpen.value = false;
  };

  const selectedComponent = computed(() => {
    if (!selectedComponentId.value) return null;
    return components[selectedComponentId.value] || null;
  });

  return {
    components,
    selectedComponentId,
    selectedComponent,
    drawerOpen,
    registerComponent,
    selectComponent,
    openDrawer,
    closeDrawer,
  };
}
