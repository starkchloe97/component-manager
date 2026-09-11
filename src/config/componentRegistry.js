import TextImage1 from "@/components/TextImage1.vue";

export const componentRegistry = {
  TextImage1: {
    id: "TextImage1",
    name: "Text Image 1",
    component: TextImage1,
    source: () =>
      import("@/components/TextImage1.vue?raw")
  }
};