<script setup>
import { ref } from 'vue'

// Redesign 2: Editorial typography and a vertical filing journey.
const activeStep = ref(2)
const searchStarted = ref(false)

const startSearch = () => {
  searchStarted.value = true
}
</script>

<template>
  <section class="editorial-hero" aria-labelledby="test2-title">
    <div class="accent-rail"></div>
    <div class="editorial-layout">
      <div class="headline-block">
        <p class="kicker">Trusted by 50,000+ businesses worldwide</p>
        <p class="edition">TRADEMARK / 2024</p>
        <h1 id="test2-title">Protect<br>Your Brand<br><em>With Trademark Registration</em></h1>
        <p class="description">Secure your intellectual property across 190+ countries. Fast, affordable, and fully managed trademark registration from start to finish.</p>
        <div class="cta-row">
          <button type="button" @click="startSearch">Search Your Trademark <span>→</span></button>
          <button class="text-action" type="button" @click="activeStep = (activeStep + 1) % 4">◉ See How It Works</button>
        </div>
        <p v-if="searchStarted" class="search-status" role="status">Starting your trademark search...</p>
        <dl class="stat-row"><div><dt>50,000+</dt><dd>Trademarks Filed</dd></div><div><dt>190+</dt><dd>Countries Covered</dd></div><div><dt>98%</dt><dd>Success Rate</dd></div></dl>
      </div>

      <aside class="journey" aria-label="Trademark registration progress">
        <div class="journey-top"><span>IN PROGRESS</span><span>#TM-2024-78432</span></div>
        <p class="file-label">Trademark file</p>
        <h2>TechNova<br>Solutions</h2>
        <p class="class-label">Class 9 — Software &amp; Technology</p>
        <div class="completion"><span>Registration Progress</span><b>72%</b></div>
        <div class="vertical-progress"><span></span></div>
        <ol>
          <li :class="{ complete: activeStep > 0, current: activeStep === 0 }"><button type="button" @click="activeStep = 0">01</button><span><b>Trademark Search &amp; Clearance</b><small>Verified</small></span></li>
          <li :class="{ complete: activeStep > 1, current: activeStep === 1 }"><button type="button" @click="activeStep = 1">02</button><span><b>Application Filed</b><small>Submitted</small></span></li>
          <li :class="{ complete: activeStep > 2, current: activeStep === 2 }"><button type="button" @click="activeStep = 2">03</button><span><b>Examination Phase</b><small>Current stage</small></span></li>
          <li :class="{ current: activeStep === 3 }"><button type="button" @click="activeStep = 3">04</button><span><b>Publication &amp; Registration</b><small>Next stage</small></span></li>
        </ol>
        <div class="global-stamp">◎ <span>190+ Countries<small>Global protection</small></span></div>
        <div class="protected-stamp">⌑ Fully Protected<small>Legal coverage active</small></div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.editorial-hero{--black:#16171d;--cream:#f6f2e9;--orange:#f05b24;min-height:100vh;position:relative;overflow:hidden;background:var(--cream);color:var(--black);font-family:Inter,Arial,sans-serif;padding:clamp(70px,9vw,112px) 30px 55px}.accent-rail{position:absolute;inset:0 auto 0 0;width:clamp(8px,1vw,18px);background:var(--orange)}.editorial-layout{max-width:1210px;margin:auto;display:grid;grid-template-columns:1.08fr .92fr;gap:80px;align-items:center}.kicker{display:inline-block;margin:0 0 14px;padding:7px 11px;border:1px solid #d8d0c2;border-radius:999px;font-size:11px;font-weight:800;color:#5f5b55}.edition{margin:0 0 22px;color:var(--orange);font-size:11px;letter-spacing:.18em;font-weight:900}.headline-block h1{margin:0;font-size:clamp(48px,6.6vw,86px);line-height:.9;letter-spacing:-.085em}.headline-block h1 em{display:block;margin-top:11px;color:var(--orange);font-family:Georgia,serif;font-size:.68em;font-weight:400;letter-spacing:-.06em;line-height:1.02}.description{max-width:505px;margin:30px 0 28px;color:#626269;font-size:16px;line-height:1.7}.cta-row{display:flex;align-items:center;gap:22px;flex-wrap:wrap}.cta-row button{font:800 13px Inter,Arial,sans-serif;cursor:pointer}.cta-row>button:first-child{border:0;background:var(--black);color:#fff;padding:16px 18px}.cta-row>button:first-child span{margin-left:23px;color:#ff9c6e;font-size:19px}.text-action{padding:5px;border:0;border-bottom:1px solid var(--black);background:transparent;color:var(--black)}.search-status{margin:14px 0 0;color:#aa3b15;font-size:13px;font-weight:800}.stat-row{display:flex;gap:38px;margin:53px 0 0;padding-top:18px;border-top:1px solid #d9d2c7}.stat-row dt{font-size:24px;font-weight:900;letter-spacing:-.06em}.stat-row dd{margin:3px 0 0;color:#78746e;font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.journey{position:relative;padding:32px 36px;background:#1b1e2a;color:#fff;box-shadow:20px 20px 0 #f4a67f}.journey-top,.completion{display:flex;justify-content:space-between;gap:10px;color:#aeb2c3;font-size:10px;font-weight:800;letter-spacing:.08em}.journey-top span:first-child{color:#9de0cf}.file-label{margin:39px 0 8px;color:#f9a27c;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.journey h2{margin:0;font-size:38px;line-height:.95;letter-spacing:-.07em}.class-label{margin:10px 0 31px;color:#aeb2c3;font-size:12px}.completion{margin-bottom:9px;letter-spacing:normal}.completion b{color:#ff9363;font-size:13px}.vertical-progress{height:6px;margin:0 0 27px;background:#353a4b}.vertical-progress span{display:block;width:72%;height:100%;background:var(--orange)}.journey ol{position:relative;display:grid;gap:20px;margin:0;padding:0;list-style:none}.journey ol::before{content:'';position:absolute;top:20px;bottom:20px;left:15px;width:1px;background:#44495b}.journey li{position:relative;display:flex;gap:14px;align-items:center;color:#9ea4b8}.journey li button{z-index:1;width:31px;height:31px;padding:0;border:1px solid #555b6d;border-radius:50%;background:#1b1e2a;color:#aeb2c3;font:800 10px Inter,Arial,sans-serif;cursor:pointer}.journey li span{display:grid;gap:3px;font-size:12px}.journey li small{font-size:10px}.journey li.complete button{border-color:#89ddca;background:#89ddca;color:#13241f}.journey li.complete b{color:#fff}.journey li.current button{border-color:#ff8e5c;background:var(--orange);color:#fff;box-shadow:0 0 0 5px #f05b2433}.journey li.current b{color:#ffb091}.global-stamp{display:flex;gap:8px;align-items:center;margin-top:30px;padding-top:17px;border-top:1px solid #363b4b;color:#90d7ff;font-size:17px}.global-stamp span{color:#fff;font-size:11px;font-weight:800}.global-stamp small,.protected-stamp small{display:block;margin-top:2px;color:#99a1b6;font-weight:500;font-size:9px}.protected-stamp{position:absolute;right:-22px;top:28px;padding:9px 12px;background:#fff;color:#16273d;box-shadow:0 9px 25px #0002;font-size:11px;font-weight:900}.protected-stamp small{color:#7c8797}@media(max-width:900px){.editorial-layout{grid-template-columns:1fr;gap:60px}.journey{max-width:500px}.headline-block h1{font-size:clamp(52px,11vw,78px)}}@media(max-width:500px){.editorial-hero{padding-inline:26px}.stat-row{gap:18px}.stat-row dt{font-size:20px}.journey{padding:28px 23px;box-shadow:10px 10px 0 #f4a67f}.protected-stamp{position:relative;right:auto;top:auto;display:inline-block;margin-top:24px}.cta-row{gap:15px}}
</style>
