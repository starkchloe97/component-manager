<script setup>
import { resolveIcon } from "@/config/iconLibrary";
</script>

<template>


  <div class="builder-node-1">
    <p class="builder-node-2">The Benefits</p>
    <h2 class="builder-node-3">Why register your brand?</h2>
    <div class="builder-node-4">
      <div class="builder-node-5">
        <span class="builder-node-6"><component :is='resolveIcon("LucideShieldBan")' :size="'100%'" :stroke-width="2" aria-hidden="true" focusable="false" /></span>
        <h4 class="builder-node-7">Build trust</h4>
        <p class="builder-node-8">People feel good when they see well-known trademarks because trademarks add value by creating consumer trust and goodwill.</p>
      </div>
      <div class="builder-node-9">
        <span class="builder-node-10"><component :is='resolveIcon("LucideSun")' :size="'100%'" :stroke-width="2" aria-hidden="true" focusable="false" /></span>
        <h4 class="builder-node-11">Use ® symbol</h4>
        <p class="builder-node-12">Use the ® symbol following your trademark to let others know that your mark is federally registered adding prestige to your brand.

</p>
      </div>
      <div class="builder-node-13">
        <span class="builder-node-14"><component :is='resolveIcon("LucideLock")' :size="'100%'" :stroke-width="2" aria-hidden="true" focusable="false" /></span>
        <h4 class="builder-node-15">Exclusive rights</h4>
        <p class="builder-node-16">Enjoy the sole ownership of your trademark and stop others from unauthorized use of your trademark across the United States.

</p>
      </div>
      <div class="builder-node-17">
        <span class="builder-node-18"><component :is='resolveIcon("ChartSpline")' :size="'100%'" :stroke-width="2" aria-hidden="true" focusable="false" /></span>
        <h4 class="builder-node-19">Brand recognition</h4>
        <p class="builder-node-20">A trademark differentiates your products and services from existing and foreseen competitors and acts as efficient commercial tool.

</p>
      </div>
      <div class="builder-node-21">
        <span class="builder-node-22"><component :is='resolveIcon("Gem")' :size="'100%'" :stroke-width="2" aria-hidden="true" focusable="false" /></span>
        <h4 class="builder-node-23">Intangible asset</h4>
        <p class="builder-node-24">A registered trademark creates an intangible asset which can be sold, assigned, franchised, or commercially contracted.</p>
      </div>
      <div class="builder-node-25">
        <span class="builder-node-26"><component :is='resolveIcon("Store")' :size="'100%'" :stroke-width="2" aria-hidden="true" focusable="false" /></span>
        <h4 class="builder-node-27">Amazon Brand Registry</h4>
        <p class="builder-node-28">Take advantage of your trademark filing with the USPTO by enrolling your brand on the Amazon Brand Registry to enjoy exclusive benefits.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.builder-node-1 {
width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  background-color: #F8F9FB;
  padding-right: 100px;
  padding-left: 100px;
  padding-bottom: 60px;
  padding-top: 60px;

}

.builder-node-2 {
font-size: 12px;
  line-height: 1;
  color: #FF6D00;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

}

.builder-node-3 {
font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;

}

.builder-node-4 {
width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: grid;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 50px;
  row-gap: 50px;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  background-color: #F8F9FB;
  padding-top: 61px;
  padding-right: 61px;
  padding-bottom: 61px;
  padding-left: 61px;
  grid-template-columns: 1FR 1FR 1FR;

}

.builder-node-5 {
width: auto;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  align-content: normal;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding-top: 35px;
  padding-right: 20px;
  padding-bottom: 35px;
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  text-align: center;

}

.builder-node-6 {
width: 64px;
  height: 64px;
  display: inline-flex;
  color: #FF6D00;
  background-color: #FFEBDB;
  border-width: 0px;
  border-style: solid;
  border-color: #111827;
  border-radius: 14px;
  padding: 0px;
  opacity: 1;
  box-sizing: border-box;
  text-align: left;
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

}

.builder-node-7 {
font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 12px;
  margin-bottom: 10px;
  margin-right: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-8 {
font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-9 {
width: auto;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding-top: 35px;
  padding-right: 20px;
  padding-bottom: 35px;
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  text-align: center;

}

.builder-node-10 {
width: 64px;
  height: 64px;
  display: inline-flex;
  color: #FF6D00;
  background-color: #FFEBDB;
  border-width: 0px;
  border-style: solid;
  border-color: #111827;
  border-radius: 14px;
  padding: 0px;
  opacity: 1;
  box-sizing: border-box;
  text-align: center;
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

}

.builder-node-11 {
font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 12px;
  margin-bottom: 10px;
  text-align: center;
  margin-right: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-12 {
font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  text-align: center;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-13 {
width: auto;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding-top: 35px;
  padding-right: 20px;
  padding-bottom: 35px;
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  text-align: center;

}

.builder-node-14 {
width: 64px;
  height: 64px;
  display: inline-flex;
  color: #FF6D00;
  background-color: #FFEBDB;
  border-width: 0px;
  border-style: solid;
  border-color: #111827;
  border-radius: 14px;
  padding: 0px;
  opacity: 1;
  box-sizing: border-box;
  text-align: center;
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

}

.builder-node-15 {
font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 12px;
  margin-bottom: 10px;
  text-align: center;
  margin-right: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-16 {
font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  text-align: center;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-17 {
width: auto;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding-top: 35px;
  padding-right: 20px;
  padding-bottom: 35px;
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  text-align: center;

}

.builder-node-18 {
width: 64px;
  height: 64px;
  display: inline-flex;
  color: #FF6D00;
  background-color: #FFEBDB;
  border-width: 0px;
  border-style: solid;
  border-color: #111827;
  border-radius: 14px;
  padding: 0px;
  opacity: 1;
  box-sizing: border-box;
  text-align: center;
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

}

.builder-node-19 {
font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 12px;
  margin-bottom: 10px;
  text-align: center;
  margin-right: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-20 {
font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  text-align: center;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-21 {
width: auto;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding-top: 35px;
  padding-right: 20px;
  padding-bottom: 35px;
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  text-align: center;

}

.builder-node-22 {
width: 64px;
  height: 64px;
  display: inline-flex;
  color: #FF6D00;
  background-color: #FFEBDB;
  border-width: 0px;
  border-style: solid;
  border-color: #111827;
  border-radius: 14px;
  padding: 0px;
  opacity: 1;
  box-sizing: border-box;
  text-align: center;
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

}

.builder-node-23 {
font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 12px;
  margin-bottom: 10px;
  text-align: center;
  margin-right: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-24 {
font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  text-align: center;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-25 {
width: auto;
  max-width: 100%;
  min-width: 0;
  min-height: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  align-content: stretch;
  gap: 0px;
  column-gap: 0px;
  row-gap: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  padding-top: 35px;
  padding-right: 20px;
  padding-bottom: 35px;
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  text-align: center;

}

.builder-node-26 {
width: 64px;
  height: 64px;
  display: inline-flex;
  color: #FF6D00;
  background-color: #FFEBDB;
  border-width: 0px;
  border-style: solid;
  border-color: #111827;
  border-radius: 14px;
  padding: 0px;
  opacity: 1;
  box-sizing: border-box;
  text-align: center;
  flex-basis: 64px;
  flex-grow: 0;
  flex-shrink: 1;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;

}

.builder-node-27 {
font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  color: #111827;
  margin-top: 12px;
  margin-bottom: 10px;
  text-align: center;
  margin-right: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}

.builder-node-28 {
font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  text-align: center;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

}
</style>
