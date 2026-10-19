<script setup>
import { computed, ref } from 'vue'

// Redesign 3: A dark, interactive registration control room.
const selectedStage = ref(2)
const isSearchOpen = ref(false)
const stages = ['Trademark Search & Clearance', 'Application Filed', 'Examination Phase', 'Publication & Registration']
const stageDetail = computed(() => stages[selectedStage.value])
</script>

<template>
  <section class="control-room" aria-labelledby="test3-title">
    <div class="aurora one"></div><div class="aurora two"></div><div class="star-field"></div>
    <div class="room-layout">
      <div class="copy-area">
        <p class="trust-line"><span>✦</span> Trusted by 50,000+ businesses worldwide</p>
        <h1 id="test3-title">Protect Your Brand<br><strong>With Trademark Registration</strong></h1>
        <p>Secure your intellectual property across 190+ countries. Fast, affordable, and fully managed trademark registration from start to finish.</p>
        <div class="command-actions">
          <button type="button" @click="isSearchOpen = true"><span>⌕</span> Search Your Trademark</button>
          <button class="ghost" type="button" @click="selectedStage = (selectedStage + 1) % stages.length">▷ See How It Works</button>
        </div>
        <p v-if="isSearchOpen" class="command-result" role="status">Starting your trademark search...</p>
        <div class="metrics"><div><b>50,000+</b><span>Trademarks Filed</span></div><div><b>190+</b><span>Countries Covered</span></div><div><b>98%</b><span>Success Rate</span></div></div>
      </div>

      <div class="console">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
        <article class="console-card">
          <header><span class="active-signal"><i></i> In Progress</span><span>#TM-2024-78432</span></header>
          <div class="brand-line"><span>TM</span><div><h2>TechNova Solutions</h2><p>Class 9 — Software &amp; Technology</p></div></div>
          <div class="radial-progress"><svg viewBox="0 0 120 120" aria-label="Registration Progress 72 percent"><circle cx="60" cy="60" r="48"/><circle class="value" cx="60" cy="60" r="48"/></svg><div><b>72%</b><span>Registration<br>Progress</span></div></div>
          <div class="active-stage"><span>NOW</span><b>{{ stageDetail }}</b></div>
          <div class="stage-selector">
            <button v-for="(stage, index) in stages" :key="stage" type="button" :class="{ selected: selectedStage === index, done: selectedStage > index }" :aria-label="stage" @click="selectedStage = index">{{ index + 1 }}</button>
          </div>
          <div class="stage-names"><span>Trademark Search &amp; Clearance</span><span>Application Filed</span><span>Examination Phase</span><span>Publication &amp; Registration</span></div>
        </article>
        <div class="protection-orb"><span>◈</span><b>Fully Protected</b><small>Legal coverage active</small></div>
        <div class="world-chip">◎ <span>190+ Countries<small>Global protection</small></span></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.control-room{--ink:#edf2ff;--muted:#a6b2d5;--blue:#7c7cff;--cyan:#51e0d1;min-height:100vh;position:relative;isolation:isolate;overflow:hidden;background:#090c1d;color:var(--ink);font-family:Inter,Arial,sans-serif;padding:clamp(86px,11vw,140px) 26px 70px}.aurora{position:absolute;z-index:-2;width:46vw;height:46vw;border-radius:50%;filter:blur(60px);opacity:.19}.aurora.one{top:-20vw;left:-14vw;background:#7654ff}.aurora.two{right:-16vw;bottom:-18vw;background:#00b8a4}.star-field{position:absolute;z-index:-1;inset:0;background-image:radial-gradient(#a8b9fc 1px,transparent 1px);background-size:31px 31px;mask-image:radial-gradient(ellipse at 70% 45%,#000,transparent 70%);opacity:.18}.room-layout{max-width:1200px;margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:62px;align-items:center}.trust-line{display:inline-flex;gap:7px;align-items:center;margin:0 0 22px;color:#b9c4ef;font-size:12px;font-weight:800}.trust-line span{color:#ffb454}.copy-area h1{margin:0;font-size:clamp(42px,5.4vw,70px);letter-spacing:-.075em;line-height:.99}.copy-area h1 strong{background:linear-gradient(90deg,#a6adff,#53e1d2);background-clip:text;color:transparent}.copy-area>p:not(.trust-line):not(.command-result){max-width:535px;margin:25px 0 30px;color:var(--muted);font-size:17px;line-height:1.7}.command-actions{display:flex;gap:12px;flex-wrap:wrap}.command-actions button{display:flex;align-items:center;gap:9px;padding:14px 18px;border:1px solid #767eff;border-radius:10px;background:#767eff;color:#fff;font:800 14px Inter,Arial,sans-serif;cursor:pointer;box-shadow:0 10px 28px #7175ff3d;transition:transform .2s}.command-actions button:hover{transform:translateY(-2px)}.command-actions .ghost{border-color:#34416a;background:#121830;color:#dbe4ff;box-shadow:none}.command-result{margin:13px 0 0;color:#6fe3d5;font-size:13px;font-weight:800}.metrics{display:flex;gap:38px;margin-top:44px}.metrics div{display:grid;gap:5px}.metrics b{font-size:28px;letter-spacing:-.06em}.metrics span{color:#8490b3;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.console{position:relative;min-height:490px;display:grid;place-items:center}.orbit{position:absolute;border:1px solid #7f8ba933;border-radius:50%}.orbit-one{width:470px;height:340px;transform:rotate(-25deg)}.orbit-two{width:385px;height:445px;transform:rotate(44deg)}.console-card{position:relative;width:min(100%,450px);padding:25px;background:linear-gradient(145deg,#20284cdd,#11162ddd);border:1px solid #6975a452;border-radius:24px;backdrop-filter:blur(16px);box-shadow:0 26px 70px #0008}.console-card header{display:flex;justify-content:space-between;align-items:center;color:#9eacd3;font-size:11px;font-weight:800}.active-signal{display:flex;align-items:center;gap:7px;color:#71e3d4}.active-signal i{width:7px;height:7px;border-radius:50%;background:#51e0d1;box-shadow:0 0 0 5px #51e0d122}.brand-line{display:flex;gap:12px;align-items:center;margin:27px 0 20px}.brand-line>span{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#8186ff,#52d9d0);font-weight:900;font-size:14px}.brand-line h2{margin:0;font-size:21px;letter-spacing:-.04em}.brand-line p{margin:4px 0 0;color:#a7b1d2;font-size:11px}.radial-progress{position:relative;display:grid;place-items:center;margin:5px auto 16px;width:150px;height:150px}.radial-progress svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}.radial-progress circle{fill:none;stroke:#3d476d;stroke-width:8}.radial-progress .value{stroke:#55dfd1;stroke-linecap:round;stroke-dasharray:302;stroke-dashoffset:85}.radial-progress div{display:grid;place-items:center;text-align:center}.radial-progress b{font-size:29px;letter-spacing:-.06em}.radial-progress span{margin-top:2px;color:#a7b1d2;font-size:9px;line-height:1.2}.active-stage{display:flex;justify-content:center;gap:9px;color:#cbd4ee;font-size:12px}.active-stage span{color:#ffbd5e;font-weight:900;font-size:10px}.stage-selector{position:relative;z-index:1;display:flex;justify-content:space-between;margin:22px 5px 10px}.stage-selector::before{content:'';position:absolute;z-index:-1;left:14px;right:14px;top:14px;height:1px;background:#4a557a}.stage-selector button{width:29px;height:29px;padding:0;border:1px solid #5a668d;border-radius:50%;background:#1c2340;color:#b6c2e5;font:800 10px Inter,Arial,sans-serif;cursor:pointer}.stage-selector .done{border-color:#55dfd1;background:#55dfd1;color:#102137}.stage-selector .selected{border-color:#ffb55a;background:#ffb55a;color:#32200b;box-shadow:0 0 0 4px #ffb55a2a}.stage-names{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;color:#8390b4;font-size:8px;line-height:1.3;text-align:center}.protection-orb{position:absolute;right:-10px;top:5px;display:grid;gap:2px;padding:13px 16px;border:1px solid #b3c5ff44;border-radius:16px;background:#151c38cc;box-shadow:0 16px 35px #0005;backdrop-filter:blur(8px);font-size:11px}.protection-orb span{color:#55dfd1;font-size:16px}.protection-orb small,.world-chip small{color:#a0accd;font-size:9px;font-weight:500}.world-chip{position:absolute;bottom:12px;left:-10px;display:flex;gap:8px;align-items:center;padding:10px 13px;border:1px solid #7380b64d;border-radius:12px;background:#141a33dc;color:#8d9dff;font-size:17px}.world-chip span{color:#e9efff;font-size:11px;font-weight:800}.world-chip small{display:block;margin-top:2px}@media(max-width:900px){.room-layout{grid-template-columns:1fr;gap:42px}.console{max-width:540px;width:100%;margin:auto}.copy-area h1{font-size:clamp(46px,10vw,66px)}}@media(max-width:500px){.control-room{padding-inline:18px}.metrics{gap:18px}.metrics b{font-size:22px}.console{min-height:440px}.console-card{padding:22px 16px}.orbit-one{width:360px;height:290px}.orbit-two{width:300px;height:360px}.protection-orb,.world-chip{position:relative;inset:auto;margin:5px}.stage-names{font-size:7px}}
</style>
