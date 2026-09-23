<script setup>
import magniImage from "@/assets/magni.svg";
import lawImage from "@/assets/law.svg";
import dollarsImage from "@/assets/dollars.svg";
</script>

<template>
  <div class="fluid-container dark_blue">
    <div class="container">
        <h2>Why conduct a comprehensive trademark search</h2>
        <p>
          Make sure your anticipated mark is available before you apply for
          trademark registration.
        </p>
      <div class="row ">
      
      </div>
      <div class="row ">
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="lawImage" alt="Avoid getting sued" />
            <h3>Avoid getting sued</h3>
            <p>
              Protect yourself from lawsuits and heavy fines by making sure you
              don't end up infringing someone else's trademark unintentionally.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="magniImage" alt="Remove doubts before filing" />

            <h3>Remove doubts before filing</h3>
            <p>
              Our search report unveils potentially conflicting trademarks at a
              state, federal, or international level so you can feel confident
              about your mark before filing.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="dollarsImage" alt="Save time and money" />
            <h3>Save time and money</h3>
            <p>
              Before you invest your time and money into your business, see if
              anyone else has registered or filed a trademark that's similar to
              yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fluid-container{
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

.fluid-container.dark_blue {
  background: var(--navy-950);
  padding: 60px 24px;
  position: relative;
  overflow: hidden;
}

.row {
    display: flex;
    margin: 0 -1rem;
}

.row div{
    padding: 0px 10px;
}

.dark_blue h2{ color: #fff; text-align: center; font-size: 28px; margin-bottom: 12px; }
.dark_blue p{ color: var(--neutral-500); text-align: center; font-size: 14px; margin-bottom: 40px; }

/* Minimal dot grid */
.fluid-container.dark_blue::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ========== Header ========== */
.row.mb-4 {
  text-align: center;
  max-width: 520px;
  margin: 0 auto 36px;
}

.row.mb-4 h2 {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.row.mb-4 p {
  font-size: 14px;
  color: var(--neutral-500);
  line-height: 1.6;
  margin: 0;
}

/* ========== Cards Grid ========== */
.row.gy-4 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* ========== Card ========== */
.inner-conduct {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px 20px !important;
  text-align: center;
  transition: all 0.25s ease;
  position: relative;
      min-height: 182px;
}

.inner-conduct:hover {
  border-color: rgba(249, 115, 22, 0.2);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

/* ========== Icon ========== */
.inner-conduct img {
  width: 25px;
  height: 25px;
  margin-bottom: 14px;
  filter: brightness(0) invert(1) opacity(0.5);
  transition: all 0.25s ease;
}

.inner-conduct:hover img {
  filter: brightness(0) invert(0.6) sepia(1) saturate(5) hue-rotate(0deg);
  opacity: 1;
}

/* ========== Text ========== */
.inner-conduct h3 {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.1px;
}

.inner-conduct p {
  font-size: 13px;
  color: var(--neutral-500);
  line-height: 1.6;
  margin: 0;
}

/* ========== Responsive ========== */
@media (max-width: 991px) {
  .row.gy-4 {
    gap: 12px;
  }

  .inner-conduct {
    padding: 20px 16px;
  }

  .row.mb-4 {
    margin-bottom: 32px;
  }

  .row.mb-4 h2 {
    font-size: 24px;
  }
}

@media (max-width: 767px) {
  .fluid-container.dark_blue {
    padding: 44px 16px;
  }

  .row.gy-4 {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .inner-conduct {
    padding: 16px;
    display: grid;
    grid-template-columns: 36px 1fr;
    grid-template-rows: auto auto;
    gap: 0 12px;
    text-align: left;
    border-radius: 10px;
  }

  .inner-conduct img {
    grid-row: 1 / 3;
    width: 36px;
    height: 36px;
    margin-bottom: 0;
  }

  .inner-conduct h3 {
    align-self: end;
    margin-bottom: 3px;
    font-size: 14px;
  }

  .inner-conduct p {
    grid-column: 2;
    font-size: 12px;
    line-height: 1.55;
  }

  .row.mb-4 {
    margin-bottom: 24px;
  }

  .row.mb-4 h2 {
    font-size: 20px;
  }

  .row.mb-4 p {
    font-size: 13px;
  }
}
</style>
