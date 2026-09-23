<template>
  <section class="copyright-section">
    <div class="container">
      <div class="copyright-header">
        <span class="eyebrow">Protect your work</span>
        <h2 class="display-lg">
          What you can
          <span class="text-gradient">copyright</span>
        </h2>
      </div>

      <div class="copyright-grid">
        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="gallery1Image" width="32" height="32" alt="" />
          </div>
          <h4>Photos</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="openBookImage" width="32" height="32" alt="" />
          </div>
          <h4>Books</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="musicNoteImage" width="32" height="32" alt="" />
          </div>
          <h4>Songs</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="filmRollImage" width="32" height="32" alt="" />
          </div>
          <h4>Films</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="artPaletteImage" width="32" height="32" alt="" />
          </div>
          <h4>Art</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="creativityImage" width="32" height="32" alt="" />
          </div>
          <h4>Other creative work</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gallery1Image from "@/assets/gallery-1.svg";
import openBookImage from "@/assets/open-book.svg";
import musicNoteImage from "@/assets/music-note-yellow.svg";
import filmRollImage from "@/assets/film-roll-1.svg";
import artPaletteImage from "@/assets/art-palette.svg";
import creativityImage from "@/assets/creativity-yellow.svg";
</script>

<style scoped>
.copyright-section {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --accent: #ff6d00;

  --font-size: 16px;
  --font-weight: 400;
  --line-height: 1.5;

  --brand-50: #fff7ed;
  --brand-100: #ffedd5;
  --brand-200: #fed7aa;
  --brand-300: #fdba74;
  --brand-400: #fb923c;
  --brand-500: #f97316;
  --brand-600: #ea580c;
  --brand-700: #c2410c;

  --navy-800: #1e293b;
  --navy-900: #0f172a;
  --navy-950: #020617;

  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  --neutral-950: #0a0a0a;

  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;

  --blue-400: #60a5fa;
  --blue-500: #3b82f6;

  --emerald-400: #34d399;
  --emerald-500: #10b981;

  --violet-400: #a78bfa;
  --violet-500: #8b5cf6;

  --amber-400: #fbbf24;
  --rose-400: #fb7185;

  --brand: #0b55b6;
  --brand-light: #e8f0fb;
  --brand-dark: #083d82;
  --brand-mid: #1a6fd4;

  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;

  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;

  --primary-light: #3949ab;
  --primary-lighter: #7986cb;

  --accent-light: #ff9e40;
  --accent-glow: rgba(255, 109, 0, 0.15);

  --teal: #00897b;
  --teal-light: #4db6ac;

  --bg: #fafbff;
  --bg-card: #ffffff;
  --bg-alt: #f0f2ff;

  --bg-gradient: linear-gradient(
    135deg,
    #fafbff 0%,
    #f0f2ff 50%,
    #fff8f0 100%
  );

  --text: #1a1a2e;
  --text-secondary: #5c6283;
  --text-muted: #8b90a8;

  --border-light: #eef0f8;

  --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
  --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
  --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
  --shadow-xl: 0 16px 60px rgba(26, 35, 126, 0.12);

  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;

  --on-surface: #131b2e;
  --on-surface-variant: #44474f;
  --background: #faf8ff;

  --surface-container-high: #e2e7ff;
  --surface-container-low: #f2f3ff;
  --outline-variant: #c3c5d9;
  --white: #ffffff;

  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
  --radius-pill: 9999px;
  --radius-card: 2rem;
  
}

.copyright-section {
  padding: 80px 0;
}

.container{
  max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

}

.eyebrow {
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color: var(--primary);
    margin-bottom: 14px;
}
.display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
    margin-top: 15px;
}

.text-gradient {
    background: linear-gradient(135deg, #003ec7 0%, #003ec7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 200;
}

.copyright-header {
  text-align: center;
  max-width: 560px;
  margin: 0 auto 48px auto;
}

.copyright-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.copyright-item {
  background: #fff;
  border-radius: var(--radius-card);
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.copyright-item:hover {
  box-shadow: 0 24px 56px rgba(19, 27, 46, 0.1);
  transform: translateY(-5px);
}

.copyright-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-2xl);
  background: var(--surface-container-low);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.copyright-item h4 {
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--on-surface);
}

@media (max-width: 900px) {
  .copyright-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

@media (max-width: 640px) {
  .copyright-section {
    padding: 56px 0;
  }
  .copyright-item {
    padding: 22px 12px;
  }
  .copyright-icon {
    width: 56px;
    height: 56px;
    margin-bottom: 14px;
  }
}
</style>