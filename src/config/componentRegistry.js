import TextImage1 from "@/components/TextImage/TextImage1.vue";
import TextImage2 from "@/components/TextImage/TextImage2.vue";
import TextImage3 from "@/components/TextImage/TextImage3.vue";
import TextImage4 from "@/components/TextImage/TextImage4.vue";
import TextImage5 from "@/components/TextImage/TextImage5.vue";
import TextImage6 from "@/components/TextImage/TextImage6.vue";
import TextImage7 from "@/components/TextImage/TextImage7.vue";
import TextImage8 from "@/components/TextImage/TextImage8.vue";
import TextImage9 from "@/components/TextImage/TextImage9.vue";

const source = (name) => () => import(`@/components/TextImage/${name}.vue?raw`);

export const componentRegistry = {
  TextImage1: { id: "TextImage1", name: "Text Image 1", component: TextImage1, source: source("TextImage1") },
  TextImage2: { id: "TextImage2", name: "Text Image 2", component: TextImage2, source: source("TextImage2") },
  TextImage3: { id: "TextImage3", name: "Text Image 3", component: TextImage3, source: source("TextImage3") },
  TextImage4: { id: "TextImage4", name: "Text Image 4", component: TextImage4, source: source("TextImage4") },
  TextImage5: { id: "TextImage5", name: "Text Image 5", component: TextImage5, source: source("TextImage5") },
  TextImage6: { id: "TextImage6", name: "Text Image 6", component: TextImage6, source: source("TextImage6") },
  TextImage7: { id: "TextImage7", name: "Text Image 7", component: TextImage7, source: source("TextImage7") },
  TextImage8: { id: "TextImage8", name: "Text Image 8", component: TextImage8, source: source("TextImage8") },
  TextImage9: { id: "TextImage9", name: "Text Image 9", component: TextImage9, source: source("TextImage9") },
};
