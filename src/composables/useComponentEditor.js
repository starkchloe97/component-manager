import { ref } from "vue";

const selectedElement = ref(null);

export function useComponentEditor() {
  const selectElement = (payload) => {
    selectedElement.value = payload;
  };

  const clearElement = () => {
    selectedElement.value = null;
  };

  return {
    selectedElement,
    selectElement,
    clearElement,
  };
}
