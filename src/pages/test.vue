<script setup>
import { resolveIcon } from "@/config/iconLibrary";
</script>

<template>


  <div style="width: 100%; max-width: 100%; min-width: 0; min-height: 80px; box-sizing: border-box; display: flex; flex-direction: column; flex-wrap: nowrap; align-items: stretch; justify-content: flex-start; align-content: stretch; gap: 0px; column-gap: 0px; row-gap: 0px; flex-grow: 0; flex-shrink: 1; flex-basis: auto;">
    <div style="display: flex; flex-direction: column; gap: 10px; color: #374151; font-size: 32px; line-height: 1.5;">
      <div style="display: flex; align-items: flex-start; gap: 9px;">
        <component :is='resolveIcon("AirVent")' :size="16" style="flex: 0 0 auto; margin-top: .25em;" aria-hidden="true" />
        <span>First item</span>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 9px;">
        <component :is='resolveIcon("AirVent")' :size="16" style="flex: 0 0 auto; margin-top: .25em;" aria-hidden="true" />
        <span>Second item</span>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 9px;">
        <component :is='resolveIcon("AirVent")' :size="16" style="flex: 0 0 auto; margin-top: .25em;" aria-hidden="true" />
        <span>Third item</span>
      </div>
    </div>
    <h2 style="font-size: 48px; font-weight: 700; line-height: 1.2; color: #111827; margin-top: 0; margin-bottom: 20px;">Your Heading</h2>
    <img src="https://placehold.co/800x500" alt="Image" style="width: 100%; height: auto; display: block;" />
  </div>
</template>
