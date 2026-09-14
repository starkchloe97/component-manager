import { useEditor } from "@/composables/useEditor";
import { generateVue } from "@/utils/generateVue";

export function useEditorCopy() {
  const { document } = useEditor();

  async function copyEditorComponent() {
    const source = generateVue(document);

    await navigator.clipboard.writeText(source);

    return true;
  }

  return {
    copyEditorComponent,
  };
}


