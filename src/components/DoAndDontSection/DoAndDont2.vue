<template>
  <section class="verdict-section">
    <div class="container">
      <div class="section-header">
        <span class="badge">
          <span class="iconify" data-icon="lucide:scale"></span>
          Know before you file
        </span>
        <h2 class="section-title">
          Trademark examples: <span class="text-gradient">dos and don'ts</span>
        </h2>
        <p class="section-subtitle">
          A quick gut-check before you submit — see what typically clears
          examination and what gets flagged.
        </p>
      </div>

      <div class="verdict-panel card-hover">
        <div class="verdict-col verdict-yes">
          <div class="col-head">
            <span class="col-icon">
              <span class="iconify" data-icon="lucide:check"></span>
            </span>
            <h3>What you can trademark</h3>
          </div>
          <ul class="col-list">
            <li v-for="(item, index) in dos" :key="'do-' + index">
              <span class="marker"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="verdict-col verdict-no">
          <div class="col-head">
            <span class="col-icon">
              <span class="iconify" data-icon="lucide:x"></span>
            </span>
            <h3>What you can't trademark</h3>
          </div>
          <ul class="col-list">
            <li v-for="(item, index) in donts" :key="'dont-' + index">
              <span class="marker"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
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
        'A distinctive brand name, such as "Airtree Digital"',
        "A logo that is unique and not merely decorative",
        'A slogan used to sell a product or service, like "Just Do It"'
      ],
      donts: [
        "A long, generic phrase already covered by copyright",
        "A mark that is merely descriptive of the goods it identifies",
        "A mark confusingly similar to an existing one in your industry"
      ]
    };
  }
};
</script>

<style scoped>
.verdict-section {
  padding: 96px 0;
  position: relative;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  margin: 0 auto 56px auto;
  text-align: center;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 36px;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin: 20px 0 16px 0;
}

.section-subtitle {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--muted);
}

.verdict-panel {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.verdict-col {
  padding: 40px 32px;
}

.verdict-yes {
  background: var(--brand-light);
}

.verdict-no {
  background: var(--surface);
}

.col-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.col-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.verdict-yes .col-icon {
  color: var(--brand);
  border: 1px solid var(--brand)
}

.verdict-no .col-icon {
  background: var(--border);
  color: var(--ink);
}

.col-head h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--ink);
  margin: 0;
}

.col-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.col-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
}

.marker {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.verdict-yes .marker {
  background: var(--brand);
}

.verdict-no .marker {
  background: var(--muted);
}

.verdict-divider {
  display: none;
}

.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 48px;
  }

  .verdict-panel {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }

  .verdict-col {
    padding: 56px 48px;
  }

  .verdict-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--surface);
  }

  .divider-line {
    flex: 1;
    width: 1px;
    background: var(--border);
  }

  .divider-node {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    margin: 12px 0;
    flex-shrink: 0;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 40px;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
    max-width: 77%;
    margin: 0 auto;
    line-height: 32px;
    padding-bottom: 10px;

  }
  .verdict-section{
    padding-top: 10px;
  }
    .container{
    padding: 0 20px;
  }
  }
</style>