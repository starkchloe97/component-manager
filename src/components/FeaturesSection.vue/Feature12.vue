<script setup>
import customerImage from "@/assets/customer.svg";
import trustedImage from "@/assets/trusted.svg";
import tatImage from "@/assets/tat.svg";
import { SITE_NAME } from "@/config/siteInfo.js";
</script>

<template>
  <div class="fluid-container dark_blue">
    <div class="container">
      <div class="mb-4 text-center white">
        <h2>Why conduct a comprehensive trademark search</h2>
        <p>Make sure your anticipated mark is available before you apply for trademark registration.</p>
      </div>
      <div class="row gx-5 gy-4">
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="customerImage" alt="" />
            <h3>Avoid getting sued</h3>
            <p>
             Protect yourself from lawsuits and heavy fines by making sure you don't end up infringing someone else's trademark unintentionally.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="trustedImage" alt="" />
            <h3>Remove doubts before filing</h3>
            <p>
              Our search report unveils potentially conflicting trademarks at a state, federal, or international level so you can feel confident about your mark before filing.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="tatImage" alt="" />
            <h3>Save time and money</h3>
            <p>
             Before you invest your time and money into your business, see if anyone else has registered or filed a trademark that's similar to yours.
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

/* ─── Outer Section ─── */
.fluid-container.dark_blue {
  position: relative;
  background: var(--bg-gradient);
  padding: 64px 0 72px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.fluid-container.dark_blue::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--primary-light) 50%, transparent 100%);
  opacity: 0.25;
}

/* ─── Container ─── */
.container {
  position: relative;
  z-index: 1;
  max-width: 1290px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Header ─── */
.row.mb-4 {
  text-align: center;
  margin-bottom: 48px !important;
}

.row.mb-4 h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 8px;
}

.row.mb-4 p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* ─── Cards Grid ─── */
.row.gx-5 {
  display: flex;
  flex-wrap: wrap;
  gap: 24px; /* spacing between cards */
  margin: 0;
}

.row.gx-5.gy-4 {
  row-gap: 24px;
}

/* ─── Card Column ─── */
.col-md-4 {
  flex: 1 1 calc(33.333% - 24px);
  max-width: calc(33.333% - 24px);
  padding: 0;
  display: flex;
}

/* ─── Card ─── */
.inner-conduct {
  position: relative;

  align-items: flex-start;
  gap: 18px;
  padding: 28px 24px;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  width: 100%;
  /* remove bottom border from old style */
  border-bottom: none;

}



.inner-conduct:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  border-color: var(--border);
}

/* Left accent bar – now a subtle gradient line on hover */
.inner-conduct::before {
  content: '';
  position: absolute;
     left: 0;
    top: 16px;
    bottom: 0;
    width: 3px;


    height: 88%;
  background: transparent;
  border-radius: 4px 0 0 4px;
  transition: background 0.3s ease, box-shadow 0.3s ease;

     box-shadow: var(--shadow-md);
  transform: translateY(-4px);

}


.col-md-4:nth-child(2) .inner-conduct::before {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
    background:var(--accent);


    content: '';
    position: absolute;
    left: 0;
    top: 16px;
    bottom: 0;
    width: 1px;


    height: 88%;
}

.mb-4.text-center.white {
    margin: 0 0 40px 0;
}

.inner-conduct:hover::before {
  background: var(--accent);
  box-shadow: 0 0 16px var(--accent-glow);
}

/* ─── Card Image ─── */
.inner-conduct img {
  display: block;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  filter: brightness(0) saturate(100%) invert(14%) sepia(42%) saturate(2345%) hue-rotate(225deg) brightness(92%) contrast(92%); /* primary color */
  transition: all 0.3s ease;
  margin-top: 2px;
}

.inner-conduct:hover img {
  filter: brightness(0) saturate(100%) sepia(100%) saturate(1000%) hue-rotate(345deg) brightness(105%) contrast(101%); /* accent color */
}

/* ─── Card Content ─── */
.inner-conduct h3 {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
  margin: 0 0 6px;
  transition: color 0.3s ease;
}

.inner-conduct:hover h3 {
  color: var(--primary);
}

.inner-conduct p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s ease;
}

.inner-conduct:hover p {
  color: var(--text);
}

/* ─── Responsive ─── */
@media (max-width: 992px) {
  .col-md-4 {
    flex: 1 1 calc(50% - 24px);
    max-width: calc(50% - 24px);
  }
}

@media (max-width: 640px) {
  .fluid-container.dark_blue {
    padding: 48px 0 56px;
  }

  .row.mb-4 {
    margin-bottom: 32px !important;
  }

  .row.mb-4 h2 {
    font-size: 22px;
  }

  .row.mb-4 p {
    font-size: 14px;
  }

  .row.gx-5 {
    gap: 16px;
  }

  .col-md-4 {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .inner-conduct {
    padding: 20px 16px;
    gap: 14px;
  }

  .inner-conduct img {
    width: 36px;
    height: 36px;
  }

  .inner-conduct h3 {
    font-size: 15px;
  }

  .inner-conduct p {
    font-size: 13px;
  }
}
</style>