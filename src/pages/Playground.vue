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
  <Editor :key="componentId" :initial-component-id="componentId" @close="closePlayground" />
</template>
