<template>
  <section id="types" ref="sectionRef" class="types v-one">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Eligibility</span>
        <h2 class="section-title">What can you trademark?</h2>
        <p class="section-desc">
          A wide range of identifiers can be registered as trademarks, as long
          as they distinguish your brand from others.
        </p>
      </div>
      <div class="grid">
        <div
          v-for="(t, i) in types"
          :key="i"
          class="scroll-reveal type-card"
          :style="{ transitionDelay: `${i * 0.05}s` }"
        >
          <div class="type-icon">
            <span class="iconify" :data-icon="t.icon" data-width="22"></span>
          </div>
          <h3>{{ t.title }}</h3>
          <p>{{ t.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
const sectionRef = ref(null);
useScrollReveal(sectionRef);
const types = [
  {
    icon: "lucide:type",
    title: "Brand Names",
    desc: 'Words, phrases, and business names like "Nike" or "Just Do It"',
  },
  {
    icon: "lucide:hexagon",
    title: "Logos & Symbols",
    desc: "Visual designs, icons, and stylized symbols that represent your brand",
  },
  {
    icon: "lucide:music",
    title: "Sounds",
    desc: "Audio signatures like the NBC chimes or MGM lion roar",
  },
  {
    icon: "lucide:palette",
    title: "Colors",
    desc: "Specific colors associated with your brand, like Tiffany blue",
  },
  {
    icon: "lucide:package",
    title: "Product Packaging",
    desc: "Distinctive packaging design and trade dress like Coca-Cola's bottle",
  },
  {
    icon: "lucide:quote",
    title: "Slogans & Taglines",
    desc: "Marketing phrases that identify the source of goods or services",
  },
  {
    icon: "lucide:smartphone",
    title: "App Icons & UI",
    desc: "Distinctive app icons and user interface elements that identify your product",
  },
  {
    icon: "lucide:file-pen",
    title: "Scents & Tastes",
    desc: "Unique scents or flavors associated with your products (rare but possible)",
  },
];
</script>

<style scoped>
.types {
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
  .v-one .types {
    padding: 128px 0;
  }
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;  
}
.v-one .header {
  text-align: center;
  margin-bottom: 64px;
}
.v-one .section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  margin-bottom: 16px;
}
.v-one .section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
}
@media (min-width: 768px) {
  .v-one .section-title {
    font-size: 48px;
  }
}
@media (min-width: 1024px) {
  .v-one .section-title {
    font-size: 60px;
  }
}
.v-one .section-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  margin-top: 16px;
  max-width: 672px;
  margin-left: auto;
  margin-right: auto;
}
.v-one .grid {
  display: grid;
  gap: 16px;
}
@media (min-width: 640px) {
  .v-one .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .v-one .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.v-one .type-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  cursor: default;
  transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.v-one .type-card:hover {
  border-color: var(--brand);
  background: var(--brand-light);
}
.v-one .type-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 400ms ease;
}
.v-one .type-icon .iconify {
  color: var(--brand);
}
.v-one .type-card:hover .type-icon {
  background: var(--brand);
}
.v-one .type-card:hover .type-icon .iconify {
  color: #fff;
}
.v-one .type-card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}
.v-one .type-card p {
  font-size: 14px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.5;
}
.v-one .warning {
  margin-top: 48px;
}
.v-one .warning-box {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 16px;
  padding: 32px;
  max-width: 768px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .v-one .warning-box {
    padding: 40px;
  }
}
.v-one .warning-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.v-one .warning-icon .iconify {
  color: #ef4444;
}
.v-one .warning-box h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  color: #7f1d1d;
  margin-bottom: 8px;
}
.v-one .warning-box p {
  font-size: 14px;
  font-weight: 300;
  color: rgba(127, 29, 29, 0.7);
  line-height: 1.6;
}
</style>
