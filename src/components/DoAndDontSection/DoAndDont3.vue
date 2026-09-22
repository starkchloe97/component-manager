<template>
  <section class="dos-section">
    <div class="container">
      <div class="section-header">
        <div class="red-bar"></div>
        <span class="eyebrow">Know Before You File</span>
        <h2 class="section-title">Trademark examples: dos and don'ts.</h2>
      </div>
      <div class="grid-layout">
        <div class="card">
          <div class="card-header header-do">
            <span class="iconify" data-icon="lucide:check-circle-2"></span>
            <h3 class="card-title">What you can trademark</h3>
          </div>
          <div class="card-body">
            <div v-for="(item, index) in dos" :key="index" class="list-row do-row">
              <span class="iconify" data-icon="lucide:check"></span>
              <p class="list-text">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header header-dont">
            <span class="iconify" data-icon="lucide:x-circle"></span>
            <h3 class="card-title">What you can't trademark</h3>
          </div>
          <div class="card-body">
            <div v-for="(item, index) in donts" :key="index" class="list-row dont-row">
              <span class="iconify" data-icon="lucide:x"></span>
              <p class="list-text">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DosAndDontsSection",
  data() {
    return {
      dos: [
        "A brand or business name, such as McDonald's",
        "A logo, like the golden arches",
        'A slogan or tagline, such as “I’m Lovin’ It”'
      ],
      donts: [
        "A song, book, film, or other original creative work — these are protected by copyright instead.",
        "An invention, such as a technical process, machine, manufactured product, or chemical formula — these are protected through patents.",
      ]
    };
  }
};
</script>

<style scoped>
.dos-section { padding-top: 96px; padding-bottom: 96px; }
.container { max-width: 1320px; margin: 0 auto; padding: 0 24px; }
.section-header { text-align: center; margin-bottom: 64px; }
.red-bar { height: 3px; width: 48px; background-color: #F97316; margin: 0 auto 16px auto; }
.eyebrow { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #F97316; display: block; }
.section-title { font-family: 'Inter Tight', sans-serif; font-weight: 600; font-size: 36px; line-height: 0.95; letter-spacing: -0.04em; color: #0F2B46; margin: 16px 0 0 0; }
.grid-layout { display: grid; grid-template-columns: 1fr; gap: 24px; }
.card { border: 1px solid #E2E6EC; }
.card-header { display: flex; align-items: center; gap: 12px; padding: 24px; border-bottom: 1px solid #E2E6EC; }
.header-do { background-color: #F8F9FB; }
.header-dont { background-color: #fff7ed; }
.card-header .iconify { font-size: 20px; }
.header-do .iconify { color: #0F2B46; }
.header-dont .iconify { color: #F97316; }
.card-title { font-family: 'Inter Tight', sans-serif; font-weight: 600; font-size: 18px; color: #0F2B46; margin: 0; }
.card-body { display: flex; flex-direction: column; }
.list-row { display: flex; align-items: flex-start; gap: 12px; padding: 20px; border-bottom: 1px solid #E2E6EC; transition: background-color 0.2s ease; }
.list-row:last-child { border-bottom: none; }
.do-row:hover { background-color: #fff7ed; }
.dont-row:hover { background-color: #F8F9FB; }
.list-row .iconify { font-size: 16px; margin-top: 2px; flex-shrink: 0; }
.do-row .iconify { color: #0F2B46; }
.dont-row .iconify { color: #F97316; }
.list-text { font-size: 14px; color: #4B5563; margin: 0; line-height: 1.625; }
.iconify { display: inline-block; width: 1em; height: 1em; vertical-align: middle; }
@media (min-width: 768px) {
  .dos-section { padding-top: 128px; padding-bottom: 128px; }
  .section-title { font-size: 48px; }
  .grid-layout { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}
@media (min-width: 1024px) { .container { padding: 0 40px; } }
</style>