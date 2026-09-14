export const componentRegistry = {
  TextImage1: {
    id: "TextImage1",
    name: "Text Image 1",
    source: () => import("@/components/TextImage/TextImage1.vue?raw"),
  },

  TextImage1:{
  name: "TextImage1",
  component: TextImage1,

  editor: TextImage1Editor
},

  TextImage2: {
    component: TextImage2,

    editor: TextImage2Editor,
  },
  TextImage2: {
    id: "TextImage2",
    name: "Text Image 2",
    source: () => import("@/components/TextImage/TextImage2.vue?raw"),
  },
  TextImage3: {
    id: "TextImage3",
    name: "Text Image 3",
    source: () => import("@/components/TextImage/TextImage3.vue?raw"),
  },
  TextImage4: {
    id: "TextImage4",
    name: "Text Image 4",
    source: () => import("@/components/TextImage/TextImage4.vue?raw"),
  },
  TextImage5: {
    id: "TextImage5",
    name: "Text Image 5",
    source: () => import("@/components/TextImage/TextImage5.vue?raw"),
  },
  TextImage6: {
    id: "TextImage6",
    name: "Text Image 6",
    source: () => import("@/components/TextImage/TextImage6.vue?raw"),
  },
  TextImage7: {
    id: "TextImage7",
    name: "Text Image 7",
    source: () => import("@/components/TextImage/TextImage7.vue?raw"),
  },
  TextImage8: {
    id: "TextImage8",
    name: "Text Image 8",
    source: () => import("@/components/TextImage/TextImage8.vue?raw"),
  },
  TextImage9: {
    id: "TextImage9",
    name: "Text Image 9",
    source: () => import("@/components/TextImage/TextImage9.vue?raw"),
  },
};
