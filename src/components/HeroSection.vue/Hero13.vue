<script setup>
import { computed, ref } from 'vue'

// Recreation 1: A search-first trademark workspace with filing details beneath it.
const searchTerm = ref('')
const searchStarted = ref(false)
const activeItem = ref('Examination Phase')
const hasSearchTerm = computed(() => searchTerm.value.trim().length > 0)

const beginSearch = () => {
  searchStarted.value = true
}
</script>

<template>
  <section class="search-workspace" aria-labelledby="test4-title">
    <header class="workspace-header"><span class="mark">TM</span><span>GLOBAL BRAND DESK</span><span class="countries">◎ 190+ Countries</span></header>
    <main>
      <p class="micro-label">Trusted by 50,000+ businesses worldwide</p>
      <h1 id="test4-title">Protect Your Brand<br>With Trademark Registration</h1>
      <p class="lede">Secure your intellectual property across 190+ countries. Fast, affordable, and fully managed trademark registration from start to finish.</p>
      <form class="search-panel" @submit.prevent="beginSearch">
        <label for="trademark-search">Start with your trademark</label>
        <div><span>⌕</span><input id="trademark-search" v-model="searchTerm" type="search" placeholder="Enter your brand name" /><button type="submit">Search Your Trademark →</button></div>
        <p v-if="searchStarted" role="status">Starting your trademark search<span v-if="hasSearchTerm"> for “{{ searchTerm }}”</span>...</p>
      </form>
      <button class="how-it-works" type="button" @click="activeItem = activeItem === 'Examination Phase' ? 'Publication & Registration' : 'Examination Phase'">▷ See How It Works</button>

      <div class="workspace-grid">
        <article class="filing-card">
          <div class="filing-head"><span>IN PROGRESS</span><span>#TM-2024-78432</span></div>
          <div class="filing-title"><div class="initials">TN</div><div><h2>TechNova Solutions</h2><p>Class 9 — Software &amp; Technology</p></div></div>
          <div class="progress-copy"><span>Registration Progress</span><b>72%</b></div><div class="meter"><span></span></div>
          <div class="current-readout"><span>Current stage</span><strong>{{ activeItem }}</strong></div>
        </article>
        <article class="milestones" aria-label="Registration milestones">
          <h2>Registration timeline</h2>
          <button v-for="(item, index) in ['Trademark Search & Clearance', 'Application Filed', 'Examination Phase', 'Publication & Registration']" :key="item" type="button" :class="{ current: activeItem === item, complete: index < 2 }" @click="activeItem = item"><span>{{ index < 2 ? '✓' : index + 1 }}</span>{{ item }}</button>
        </article>
      </div>
      <dl class="results"><div><dt>50,000+</dt><dd>Trademarks Filed</dd></div><div><dt>190+</dt><dd>Countries Covered</dd></div><div><dt>98%</dt><dd>Success Rate</dd></div><div><dt>⌑</dt><dd>Fully Protected<br>Legal coverage active</dd></div></dl>
    </main>
  </section>
</template>

<style scoped>
.search-workspace{--ink:#10283a;--aqua:#24b8ac;--pale:#effaf8;min-height:100vh;background:linear-gradient(180deg,#f8fcfb,#e5f5f2);color:var(--ink);font-family:Inter,Arial,sans-serif;padding:22px 28px 64px}.workspace-header{max-width:1210px;margin:auto;display:flex;align-items:center;gap:12px;color:#678184;font-size:10px;font-weight:900;letter-spacing:.14em}.mark{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--ink);color:#fff;font-size:12px;letter-spacing:0}.countries{margin-left:auto;color:#198e85;letter-spacing:0}.search-workspace main{max-width:980px;margin:clamp(65px,10vw,115px) auto 0;text-align:center}.micro-label{margin:0;color:#1a9188;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.search-workspace h1{margin:15px 0 0;font-size:clamp(43px,6.4vw,76px);line-height:.98;letter-spacing:-.08em}.lede{max-width:615px;margin:24px auto;color:#668085;font-size:16px;line-height:1.7}.search-panel{max-width:760px;margin:34px auto 0;padding:13px 13px 10px;border:1px solid #d4e6e3;border-radius:17px;background:#fff;box-shadow:0 19px 45px #22696316;text-align:left}.search-panel label{display:block;margin:0 0 8px 8px;color:#698286;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.09em}.search-panel>div{display:flex;align-items:center;gap:10px}.search-panel>div>span{margin-left:8px;color:#35a89f;font-size:20px}.search-panel input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--ink);font:600 15px Inter,Arial,sans-serif}.search-panel input::placeholder{color:#9ab0b1}.search-panel button{border:0;border-radius:11px;background:var(--ink);color:#fff;padding:15px 17px;font:800 12px Inter,Arial,sans-serif;cursor:pointer}.search-panel p{margin:8px 8px 0;color:#198e85;font-size:12px;font-weight:800}.how-it-works{margin-top:16px;border:0;border-bottom:1px solid #739092;background:transparent;color:#3a5b5c;padding:4px;font:800 12px Inter,Arial,sans-serif;cursor:pointer}.workspace-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:18px;margin-top:54px;text-align:left}.filing-card,.milestones{padding:26px;border:1px solid #d4e7e4;border-radius:18px;background:#fff}.filing-head,.progress-copy{display:flex;justify-content:space-between;color:#7e9898;font-size:10px;font-weight:900}.filing-head span:first-child{padding:5px 8px;border-radius:99px;background:#e4f8f5;color:#128c81}.filing-title{display:flex;gap:12px;align-items:center;margin:25px 0}.initials{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:#d8f4f0;color:#188b82;font-size:13px;font-weight:900}.filing-title h2,.milestones h2{margin:0;font-size:20px;letter-spacing:-.04em}.filing-title p{margin:4px 0 0;color:#84999b;font-size:11px}.progress-copy b{color:#e86b3d}.meter{height:7px;margin:9px 0 22px;border-radius:99px;background:#e4efed;overflow:hidden}.meter span{display:block;width:72%;height:100%;border-radius:inherit;background:linear-gradient(90deg,#24b8ac,#9de3d7)}.current-readout{display:grid;gap:4px;padding:11px 13px;border-radius:10px;background:var(--pale)}.current-readout span{color:#729092;font-size:10px;font-weight:800}.current-readout strong{color:#187c73;font-size:13px}.milestones{display:grid;align-content:start;gap:8px}.milestones h2{margin-bottom:7px}.milestones button{display:flex;align-items:center;gap:10px;border:0;border-radius:9px;background:transparent;color:#5f7a7d;padding:9px;font:700 12px Inter,Arial,sans-serif;text-align:left;cursor:pointer}.milestones button span{display:grid;place-items:center;width:21px;height:21px;border:1px solid #d1e2df;border-radius:50%;color:#7f9999;font-size:10px}.milestones .complete span{border-color:#63cfc4;background:#dff7f3;color:#168378}.milestones .current{background:#edf9f7;color:#177b72}.milestones .current span{border-color:#24b8ac;background:#24b8ac;color:#fff}.results{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0 0;text-align:left}.results div{padding:12px 15px;border-radius:13px;background:#ffffff9c}.results dt{font-size:18px;font-weight:900;letter-spacing:-.05em}.results dd{margin:4px 0 0;color:#789294;font-size:9px;font-weight:800;line-height:1.4;text-transform:uppercase;letter-spacing:.07em}@media(max-width:720px){.search-workspace{padding-inline:18px}.workspace-grid{grid-template-columns:1fr}.results{grid-template-columns:repeat(2,1fr)}.search-panel>div{flex-wrap:wrap}.search-panel input{min-width:180px}.search-panel button{width:100%}.countries{display:none}}@media(max-width:420px){.results{gap:6px}.results div{padding:11px}.search-workspace h1{font-size:41px}}
</style>
