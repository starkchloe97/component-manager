import { reactive, ref, computed } from "vue";

const components = reactive({});
const selectedComponentId = ref(null);

export function useStyleManager() {
  const registerComponent = (id, config) => {
    components[id] = {
      id,
      ...config
    };

    if (!selectedComponentId.value) {
      selectedComponentId.value = id;
    }
  };

  const selectComponent = (id) => {
    if (components[id]) {
      selectedComponentId.value = id;
    }
  };

  const selectedComponent = computed(() => {
    if (!selectedComponentId.value) {
      return null;
    }

    return components[selectedComponentId.value];
  });

  return {
    components,
    selectedComponentId,
    selectedComponent,
    registerComponent,
    selectComponent
  };
}