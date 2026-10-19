<script setup>
import { ref } from 'vue'

// Recreation 2: A warm, certificate-inspired global protection composition.
const showCertificate = ref(false)
const selectedCountry = ref('Global')

const selectCountry = (country) => {
  selectedCountry.value = country
}
</script>

<template>
  <section class="certificate-hero" aria-labelledby="test5-title">
    <div class="paper-texture"></div>
    <div class="hero-frame">
      <div class="upper-copy">
        <p class="seal-line"><span>◉</span> Trusted by 50,000+ businesses worldwide</p>
        <h1 id="test5-title">Protect Your Brand<br><em>With Trademark Registration</em></h1>
        <p>Secure your intellectual property across 190+ countries. Fast, affordable, and fully managed trademark registration from start to finish.</p>
        <div class="buttons"><button type="button" @click="showCertificate = true">Search Your Trademark <span>→</span></button><button type="button" @click="showCertificate = !showCertificate">▷ See How It Works</button></div>
        <p v-if="showCertificate" class="certificate-message" role="status">Starting your trademark search...</p>
      </div>

      <div class="certificate-stage">
        <div class="country-picker" aria-label="Protection region"><button v-for="country in ['Global', 'Americas', 'Europe', 'Asia']" :key="country" type="button" :class="{ selected: selectedCountry === country }" @click="selectCountry(country)">{{ country }}</button></div>
        <article class="certificate">
          <header><span>TRADEMARK PROTECTION FILE</span><b>⌑ Fully Protected<small>Legal coverage active</small></b></header>
          <div class="certificate-content"><div class="medallion"><span>TM</span><i>72%</i></div><div><p class="file-number">#TM-2024-78432</p><h2>TechNova Solutions</h2><p class="file-class">Class 9 — Software &amp; Technology</p><div class="registration"><span>Registration Progress</span><b>72%</b><div><i></i></div></div></div></div>
          <footer><span>Coverage: {{ selectedCountry }} · 190+ Countries</span><span>Established protection</span></footer>
        </article>
        <div class="filing-steps"><button v-for="(step, index) in ['Trademark Search & Clearance', 'Application Filed', 'Examination Phase', 'Publication & Registration']" :key="step" type="button" :class="{ live: index === 2, complete: index < 2 }" @click="showCertificate = true"><span>{{ index < 2 ? '✓' : index + 1 }}</span>{{ step }}</button></div>
      </div>

      <dl class="proofs"><div><dt>50,000+</dt><dd>Trademarks Filed</dd></div><div><dt>190+</dt><dd>Countries Covered</dd></div><div><dt>98%</dt><dd>Success Rate</dd></div></dl>
    </div>
  </section>
</template>

<style scoped>
.certificate-hero{--wine:#542b3d;--red:#bd503e;--gold:#d69a43;--paper:#f4eddf;min-height:100vh;position:relative;isolation:isolate;overflow:hidden;background:var(--paper);color:var(--wine);font-family:Inter,Arial,sans-serif;padding:clamp(80px,10vw,125px) 26px 64px}.paper-texture{position:absolute;z-index:-1;inset:0;opacity:.28;background-image:radial-gradient(#b7997759 .7px,transparent .8px),linear-gradient(125deg,transparent 44%,#f9f4ea 45%,transparent 46%);background-size:6px 6px,100% 100%}.hero-frame{max-width:1200px;margin:auto;display:grid;grid-template-columns:.88fr 1.12fr;gap:66px;align-items:center}.seal-line{display:flex;align-items:center;gap:8px;margin:0 0 21px;color:#9c6840;font-size:12px;font-weight:800}.seal-line span{display:grid;place-items:center;width:24px;height:24px;border:1px solid #d6af73;border-radius:50%;color:#b6762f}.upper-copy h1{margin:0;font-size:clamp(44px,5.6vw,73px);line-height:.96;letter-spacing:-.075em}.upper-copy h1 em{color:var(--red);font-family:Georgia,serif;font-weight:400}.upper-copy>p:not(.seal-line):not(.certificate-message){max-width:500px;margin:28px 0;color:#78616a;font-size:16px;line-height:1.72}.buttons{display:flex;gap:12px;flex-wrap:wrap}.buttons button{border:1px solid var(--wine);padding:14px 18px;background:var(--wine);color:#fff;font:800 13px Inter,Arial,sans-serif;cursor:pointer}.buttons button span{margin-left:20px;color:#edc17a}.buttons button+button{background:transparent;color:var(--wine)}.certificate-message{margin:13px 0 0;color:#9d4938;font-size:13px;font-weight:800}.certificate-stage{position:relative}.country-picker{display:flex;justify-content:flex-end;gap:7px;margin:0 0 13px}.country-picker button{border:0;border-bottom:1px solid transparent;background:transparent;color:#866e70;padding:5px;font:800 10px Inter,Arial,sans-serif;cursor:pointer}.country-picker .selected{border-color:var(--red);color:var(--red)}.certificate{position:relative;padding:28px 31px 20px;border:1px solid #d6bea0;background:#fcf8ee;box-shadow:15px 18px 0 #d9c7aa}.certificate::before{content:'';position:absolute;inset:8px;border:1px solid #eadbc7;pointer-events:none}.certificate header,.certificate footer{position:relative;z-index:1;display:flex;justify-content:space-between;gap:14px;color:#a27e60;font-size:9px;font-weight:900;letter-spacing:.1em}.certificate header b{display:grid;gap:2px;color:#368374;letter-spacing:0;font-size:10px}.certificate header small{color:#929283;font-size:8px;font-weight:600}.certificate-content{position:relative;z-index:1;display:flex;align-items:center;gap:24px;margin:40px 14px 32px}.medallion{position:relative;display:grid;place-items:center;width:107px;height:107px;border:8px double #cf9a4c;border-radius:50%;background:#f8efdd;color:#7f463a;font-size:25px;font-family:Georgia,serif;font-weight:700}.medallion::before{content:'';position:absolute;inset:7px;border:1px solid #d7ad70;border-radius:50%}.medallion i{position:absolute;right:-13px;bottom:-2px;padding:6px;border-radius:50%;background:#bd503e;color:#fff;font:800 11px Inter,Arial,sans-serif}.file-number{margin:0;color:#b2815a;font-size:10px;font-weight:900;letter-spacing:.12em}.certificate-content h2{margin:8px 0 5px;font-size:27px;letter-spacing:-.055em}.file-class{margin:0;color:#806d68;font-size:11px}.registration{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:19px;color:#806d68;font-size:10px;font-weight:800}.registration b{color:var(--red)}.registration>div{grid-column:1/-1;height:5px;background:#eadfce}.registration i{display:block;width:72%;height:100%;background:linear-gradient(90deg,#bd503e,#dbad5a)}.certificate footer{padding-top:13px;border-top:1px solid #e5d8c4;letter-spacing:0;font-size:9px}.filing-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-top:19px}.filing-steps button{display:grid;gap:6px;justify-items:center;border:0;background:transparent;color:#886f70;font:700 9px/1.3 Inter,Arial,sans-serif;cursor:pointer}.filing-steps span{display:grid;place-items:center;width:28px;height:28px;border:1px solid #c7ac91;border-radius:50%;font-size:10px}.filing-steps .complete span{border-color:#61aa98;background:#e3f1e9;color:#337b69}.filing-steps .live{color:#9f4434;font-weight:900}.filing-steps .live span{border-color:#bd503e;background:#bd503e;color:#fff;box-shadow:0 0 0 4px #bd503e22}.proofs{grid-column:1/-1;display:flex;justify-content:space-between;gap:25px;margin:22px 0 0;padding-top:21px;border-top:1px solid #d9c6ad}.proofs dt{font-family:Georgia,serif;font-size:27px;font-weight:700}.proofs dd{margin:4px 0 0;color:#987a72;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}@media(max-width:900px){.hero-frame{grid-template-columns:1fr;gap:52px}.certificate-stage{max-width:650px;width:100%;margin:auto}.upper-copy h1{font-size:clamp(48px,10vw,68px)}}@media(max-width:520px){.certificate-hero{padding-inline:18px}.certificate{padding:23px 18px 18px;box-shadow:9px 10px 0 #d9c7aa}.certificate-content{gap:15px;margin-inline:3px}.medallion{flex:0 0 auto;width:79px;height:79px;font-size:19px}.certificate-content h2{font-size:20px}.certificate footer{font-size:8px}.filing-steps{grid-template-columns:repeat(2,1fr);row-gap:14px}.proofs{gap:13px}.proofs dt{font-size:21px}.proofs dd{font-size:8px}.country-picker{justify-content:flex-start}}
</style>
