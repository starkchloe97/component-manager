<script setup>
import { ref } from 'vue'

// Redesign 1: A light, dashboard-led evolution of the supplied hero.
const statusMessage = ref('')
const showProcess = ref(false)

const startSearch = () => {
  statusMessage.value = 'Starting your trademark search...'
}

const toggleProcess = () => {
  showProcess.value = !showProcess.value
}
</script>

<template>
  <section class="trademark-hero" aria-labelledby="test1-title">
    <div class="grid-glow"></div>
    <div class="hero-shell">
      <div class="hero-copy">
        <p class="eyebrow"><span>✦</span> Trusted by 50,000+ businesses worldwide</p>
        <h1 id="test1-title">Protect Your Brand <span>With Trademark Registration</span></h1>
        <p class="intro">Secure your intellectual property across 190+ countries. Fast, affordable, and fully managed trademark registration from start to finish.</p>
        <div class="actions">
          <button class="primary-action" type="button" @click="startSearch">⌕ Search Your Trademark</button>
          <button class="secondary-action" type="button" @click="toggleProcess">◉ See How It Works</button>
        </div>
        <p v-if="statusMessage" class="live-message" role="status">{{ statusMessage }}</p>
        <dl class="stats">
          <div><dt>50,000+</dt><dd>Trademarks Filed</dd></div>
          <div><dt>190+</dt><dd>Countries Covered</dd></div>
          <div><dt>98%</dt><dd>Success Rate</dd></div>
        </dl>
      </div>

      <div class="hero-visual">
        <div class="protection-tag"><b>⌾</b><span>Fully Protected<small>Legal coverage active</small></span></div>
        <article class="application-card">
          <header><span class="progress-chip"><i></i> In Progress</span><span class="application-id">#TM-2024-78432</span></header>
          <h2>TechNova Solutions</h2>
          <p>Class 9 — Software &amp; Technology</p>
          <div class="progress-label"><span>Registration Progress</span><b>72%</b></div>
          <div class="progress-track"><span></span></div>
          <ol class="timeline">
            <li class="complete"><i>✓</i> Trademark Search &amp; Clearance</li>
            <li class="complete"><i>✓</i> Application Filed</li>
            <li class="current"><i>•</i> Examination Phase</li>
            <li><i>○</i> Publication &amp; Registration</li>
          </ol>
        </article>
        <div class="country-tag"><b>◉</b><span>190+ Countries<small>Global protection</small></span></div>
      </div>
    </div>
    <div v-if="showProcess" class="process-note" id="process">Your application moves from search and clearance to filing, examination, then publication and registration.</div>
  </section>
</template>

<style scoped>
.trademark-hero{--navy:#18215f;--ink:#171a31;--muted:#66708d;--orange:#ff700b;min-height:100vh;position:relative;isolation:isolate;overflow:hidden;background:#fbfcff;color:var(--ink);font-family:Inter,Arial,sans-serif;padding:clamp(76px,11vw,130px) 24px 64px}.grid-glow{position:absolute;inset:0;z-index:-1;background:radial-gradient(circle at 74% 37%,#e8edff 0,transparent 28%),radial-gradient(circle at 10% 92%,#fff0e1 0,transparent 24%),linear-gradient(#eff2fd 1px,transparent 1px),linear-gradient(90deg,#eff2fd 1px,transparent 1px);background-size:auto,auto,36px 36px,36px 36px;mask-image:linear-gradient(90deg,#000 10%,transparent 92%)}.hero-shell{max-width:1200px;margin:auto;display:grid;grid-template-columns:1.05fr .95fr;gap:68px;align-items:center}.eyebrow{display:inline-flex;gap:8px;align-items:center;margin:0 0 22px;padding:7px 12px 7px 8px;border:1px solid #dfe4ff;border-radius:999px;background:#f0f3ff;color:#35418b;font-size:12px;font-weight:700}.eyebrow span{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--orange);color:#fff}.hero-copy h1{max-width:610px;margin:0;font-size:clamp(43px,5vw,68px);line-height:1.01;letter-spacing:-.065em}.hero-copy h1 span{display:block;background:linear-gradient(100deg,#262d7d,#b14a26);background-clip:text;color:transparent}.intro{max-width:540px;margin:25px 0 30px;color:var(--muted);font-size:17px;line-height:1.75}.actions{display:flex;gap:12px;flex-wrap:wrap}.actions button{border:0;border-radius:12px;padding:15px 21px;font:700 14px Inter,Arial,sans-serif;cursor:pointer;transition:transform .2s,box-shadow .2s}.actions button:hover{transform:translateY(-2px)}.primary-action{background:var(--orange);color:#fff;box-shadow:0 12px 24px #ff700b42}.secondary-action{background:#fff;color:var(--ink);outline:1px solid #e0e4f1}.live-message{margin:14px 0 0;color:#00877c;font-size:13px;font-weight:700}.stats{display:flex;gap:34px;margin:42px 0 0}.stats div{min-width:86px}.stats dt{font-size:27px;font-weight:800;letter-spacing:-.06em;color:var(--navy)}.stats dd{margin:4px 0 0;text-transform:uppercase;letter-spacing:.07em;font-size:9px;color:#8a92ab;font-weight:800}.hero-visual{position:relative;padding:26px 0 22px}.application-card{position:relative;max-width:455px;margin:auto;padding:29px 30px 27px;background:#fff;border:1px solid #e5e9f6;border-radius:26px;box-shadow:0 28px 60px #19245d1c}.application-card header{display:flex;justify-content:space-between;align-items:center;margin-bottom:29px}.progress-chip{display:flex;align-items:center;gap:7px;padding:6px 10px;border-radius:99px;background:#e9f8f5;color:#00877c;font-size:11px;font-weight:800}.progress-chip i{width:7px;height:7px;border-radius:50%;background:#00a590;box-shadow:0 0 0 4px #ccefe9}.application-id{font-size:11px;font-weight:700;color:#9aa2b9}.application-card h2{font-size:23px;margin:0 0 4px;letter-spacing:-.04em}.application-card>p{margin:0 0 23px;color:#8a92a9;font-size:12px}.progress-label{display:flex;justify-content:space-between;font-size:12px;color:#6a728b;font-weight:700}.progress-label b{color:var(--orange)}.progress-track{height:7px;margin:9px 0 23px;border-radius:99px;background:#eef0f9;overflow:hidden}.progress-track span{display:block;height:100%;width:72%;border-radius:inherit;background:linear-gradient(90deg,#ff6d00,#ffae57)}.timeline{display:grid;gap:12px;margin:0;padding:0;list-style:none;color:#69718a;font-size:12px}.timeline li{display:flex;align-items:center;gap:10px}.timeline i{display:grid;place-items:center;width:21px;height:21px;border-radius:50%;font-style:normal;background:#eef0f6;color:#97a0b7}.timeline .complete i{background:#e5f8f4;color:#00877c}.timeline .current{font-weight:800;color:var(--ink)}.timeline .current i{background:#fff0e2;color:var(--orange);box-shadow:0 0 0 2px var(--orange)}.protection-tag,.country-tag{position:absolute;z-index:1;display:flex;align-items:center;gap:10px;padding:11px 14px;background:#fff;border:1px solid #e7ebf5;border-radius:12px;box-shadow:0 16px 30px #242d6618;font-size:11px}.protection-tag{right:-8px;top:0}.country-tag{left:-12px;bottom:0}.protection-tag b,.country-tag b{display:grid;place-items:center;width:29px;height:29px;border-radius:9px;background:#e6f8f5;color:#00877c}.country-tag b{background:#edf0ff;color:#303a91}.protection-tag span,.country-tag span{font-weight:800}.protection-tag small,.country-tag small{display:block;margin-top:2px;color:#939bb0;font-size:9px;font-weight:500}.process-note{max-width:720px;margin:48px auto 0;padding:16px 20px;border-radius:14px;background:#fff4e8;color:#81410f;text-align:center;font-size:14px;line-height:1.5}@media(max-width:850px){.hero-shell{grid-template-columns:1fr;gap:48px}.hero-visual{max-width:530px;width:100%;margin:auto}.hero-copy{max-width:620px}.grid-glow{mask-image:none}}@media(max-width:480px){.trademark-hero{padding-inline:18px}.stats{gap:18px}.stats dt{font-size:22px}.application-card{padding:24px 20px}.protection-tag,.country-tag{position:relative;display:inline-flex;margin:8px}.hero-visual{padding:0}.application-card header{gap:10px}.application-id{font-size:9px}}
</style>
