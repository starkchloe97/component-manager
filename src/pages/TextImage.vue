<!-- <script setup>
import TextImage1 from '@/components/TextImage/TextImage1.vue'
import TextImage2 from '@/components/TextImage/TextImage2.vue'
import TextImage3 from '@/components/TextImage/TextImage3.vue'
import TextImage4 from '@/components/TextImage/TextImage4.vue'
import TextImage5 from '@/components/TextImage/TextImage5.vue'
import TextImage6 from '@/components/TextImage/TextImage6.vue'
import TextImage7 from '@/components/TextImage/TextImage7.vue'
import TextImage8 from '@/components/TextImage/TextImage8.vue'
import TextImage9 from '@/components/TextImage/TextImage9.vue'
import StyleDrawer from '@/components/StyleDrawer.vue'
import { useStyleManager } from '@/composables/useStyleManager'

const { registerComponent, selectComponent } = useStyleManager()

const components = [
  { id: 'TextImage1', name: 'Text Image 1', component: TextImage1 },
  { id: 'TextImage2', name: 'Text Image 2', component: TextImage2 },
  { id: 'TextImage3', name: 'Text Image 3', component: TextImage3 },
  { id: 'TextImage4', name: 'Text Image 4', component: TextImage4 },
  { id: 'TextImage5', name: 'Text Image 5', component: TextImage5 },
  { id: 'TextImage6', name: 'Text Image 6', component: TextImage6 },
  { id: 'TextImage7', name: 'Text Image 7', component: TextImage7 },
  { id: 'TextImage8', name: 'Text Image 8', component: TextImage8 },
  { id: 'TextImage9', name: 'Text Image 9', component: TextImage9 },
]

components.forEach(({ id, name }) => registerComponent(id, { name }))

const select = (id) => selectComponent(id)
</script>

<template>
  <main class="component-page">
    <div
      v-for="item in components"
      :key="item.id"
      class="component-frame"
      @click="select(item.id)"
    >
      <component :is="item.component" />
    </div>
  </main>

  <StyleDrawer />
</template>

<style scoped>
.component-page { position: relative; }
.component-frame { position: relative; cursor: pointer; }
</style> -->


<script setup>
import Editor from "@/components/editor/Editor.vue";
</script>

<template>
  <Editor />
</template>
