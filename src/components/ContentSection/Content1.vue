<template>
  <div class="know-section" :class="{ 'is-visible': visible }">
    <div class="know-container">
      <!-- Section Label -->
      <div class="know-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        Knowledge Base
      </div>

      <!-- Heading -->
      <h2 class="know-heading">
        What you need to know<br />
        about <span class="grad-main">trademarks</span>
      </h2>

      <!-- Layout: first card full width, second + third side by side -->
      <div class="know-grid">
        <div class="know-card" style="transition-delay: 80ms;">
          <h3 class="know-card__title">How to trademark a name</h3>
          <p class="know-card__text">
            Your application must be filed with the USPTO, and it must include:
          </p>
          <ol class="know-card__steps">
            <li>
              <span class="know-card__stepnum">1</span>
              <span class="know-card__steptext">The owner's contact information</span>
            </li>
            <li>
              <span class="know-card__stepnum">2</span>
              <span class="know-card__steptext">The name or mark you want to protect</span>
            </li>
            <li>
              <span class="know-card__stepnum">3</span>
              <span class="know-card__steptext">The goods or services the mark will cover</span>
            </li>
            <li>
              <span class="know-card__stepnum">4</span>
              <span class="know-card__steptext">Whether the mark is already in use in commerce or will be filed as intent to use</span>
            </li>
            <li>
              <span class="know-card__stepnum">5</span>
              <span class="know-card__steptext">
                A specimen (such as a label, packaging, website URL) showing the mark in use, if filing as in commerce
                <span class="know-card__note">(If you file under intent to use, the specimen is submitted later and additional federal fees apply.)</span>
              </span>
            </li>
          </ol>
        </div>

        <div class="know-card" style="transition-delay: 180ms;">
          <h3 class="know-card__title">How to trademark a logo</h3>
          <p class="know-card__text">
            You can trademark a logo that includes your business name, but if you want to protect both the logo and the name itself, you'll need to file two separate trademark applications.
          </p>
          <p class="know-card__text know-card__text--accent">
            Using a logo does give you limited common-law trademark rights, but filing a trademark application provides stronger, nationwide legal protection. Because the process can be detailed and nuanced, guidance from a trademark attorney can help ensure everything is done correctly.
          </p>
        </div>

        <div class="know-card" style="transition-delay: 280ms;">
          <h3 class="know-card__title">How to trademark a phrase</h3>
          <p class="know-card__text">
            A distinctive phrase—such as a slogan, motto, or tagline—can play a key role in building brand recognition. To prevent others from using it, start with a comprehensive trademark search and then register the phrase with the USPTO.
          </p>
          <p class="know-card__text know-card__text--accent">
            Not every phrase qualifies for trademark protection, and registration doesn't always guarantee total exclusivity. Working with a trademark attorney can help you evaluate eligibility, navigate the process, and choose the best strategy to protect your phrase.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) visible.value = true;
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );
  const root = document.querySelector(".know-section");
  if (root) observer.observe(root);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ── Base ── */
.know-section {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: #f7f8fa;
  color: #171717;
  padding: 80px 0;
}

/* ── Container ── */
.know-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Visibility ── */
.know-label,
.know-heading,
.know-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1),
              transform 0.6s cubic-bezier(0.5, 0, 0, 1);
}
.know-section.is-visible .know-label   { opacity: 1; transform: translateY(0); }
.know-section.is-visible .know-heading { opacity: 1; transform: translateY(0); }
.know-section.is-visible .know-card    { opacity: 1; transform: translateY(0); }

/* ── Label ── */
.know-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(11,85,182,0.18);
  background: rgba(11,85,182,0.06);
  color: #0B55B6;
  margin-bottom: 20px;
}
.know-label svg { flex-shrink: 0; }

/* ── Heading ── */
.know-heading {
  font-size: clamp(1.875rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 40px;
  color: #171717;
  transition-delay: 80ms;
}

.grad-main {
  background: linear-gradient(135deg, #0B55B6, #1E78D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Grid: first card full width, second + third side by side ── */
.know-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: stretch;
}
@media (min-width: 700px) {
  .know-grid { grid-template-columns: repeat(2, 1fr); }
  .know-grid .know-card:first-child { grid-column: 1 / -1; }
}

/* ══════════════════════════════════════
   CARD STYLES — flat, high-contrast, readable
   ══════════════════════════════════════ */
.know-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 12px;
  padding: 36px;
}

/* ── Card title ── */
.know-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
  color: #111111;
}

/* ── Card text ── */
.know-card__text {
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.75;
  color: #171717;
  margin: 0 0 16px;
}
.know-card__text:last-child { margin-bottom: 0; }

/* second paragraph reads as guidance / emphasis, same blue as the theme */
/* .know-card__text--accent {
  color: #0B55B6;
} */

/* ── Numbered steps (card 1) ── */
.know-card__steps {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
@media (min-width: 700px) {
  .know-card__steps {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 40px;
    row-gap: 22px;
  }
  .know-card__steps li:last-child {
    grid-column: 1 / -1;
  }
}
.know-card__steps li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.know-card__stepnum {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  background: #eef0f3;
  margin-top: 1px;
}
.know-card__steptext {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #000;
}
.know-card__note {
  display: block;
  margin-top: 4px;
  color: #737373;
  font-size: 0.85rem;
  font-style: italic;
}
@media (max-width: 768px) {
.know-heading {
  font-size: 28px;
  
}
.know-container{
  padding: 0 20px;
}
}
</style>