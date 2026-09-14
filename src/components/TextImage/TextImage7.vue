<script setup>
import { CheckCircle } from '@lucide/vue'
import tmblock2 from "@/assets/tm-block-2.webp"
import tmblock3 from "@/assets/tm-block-3.jpg"
</script>

<template>
  <section class="ta-section">
    <!-- Row 1: Rejection Reasons -->
    <div class="ta-row">
      <div class="ta-img-col">
        <img :src="tmblock2" alt="Professional woman working" />
      </div>
      <div class="ta-content-card">
  <span class="ta-eyebrow">Registration Guidelines</span>

  <h2 class="ta-heading">
    What are the common reasons a trademark is rejected?
  </h2>

  <p class="ta-lead">
    To avoid delays or refusal during the trademark registration process with the USPTO, be aware of these common issues:
  </p>

  <div class="ta-check-list">
    <div class="ta-check-item">
      <CheckCircle :size="15" class="ta-check-icon" />
      <p class="ta-check-text">
        Trademarks must be filed for commercial or business use—you cannot register a trademark for personal or non-business purposes.
      </p>
    </div>

    <div class="ta-check-item">
      <CheckCircle :size="15" class="ta-check-icon" />
      <p class="ta-check-text">
        Generic or descriptive trademarks are usually rejected; your brand name must be distinctive or unique to qualify for trademark protection.
      </p>
    </div>

    <div class="ta-check-item">
      <CheckCircle :size="15" class="ta-check-icon" />
      <p class="ta-check-text">
        You can only trademark a brand name that is either already used in commerce or filed with a legitimate intent to use in the near future.
      </p>
    </div>

    <div class="ta-check-item">
      <CheckCircle :size="15" class="ta-check-icon" />
      <p class="ta-check-text">
        A trademark application may be denied if the name is confusingly similar to an existing or pending registered trademark, as this could cause consumer confusion. That's why every application must clearly list the goods or services the trademark will cover.
      </p>
    </div>
  </div>
</div>
    </div>

    <!-- Row 2: Pricing -->
    <div class="ta-row ta-row-reverse">
      <div class="ta-content-card">
  <span class="ta-eyebrow">Investment &amp; Fees</span>

  <h2 class="ta-heading">
    How much does a trademark cost?
  </h2>

  <p class="ta-lead">
    The cost to register a trademark depends on how you choose to file. If you work with a traditional trademark attorney, you'll typically pay hourly legal fees in addition to the required USPTO filing fees.
  </p>

  <div class="ta-pricing-highlight">
    <div class="ta-pricing-highlight-label">
      Our competitive pricing structure
    </div>
    <div class="ta-pricing-highlight-text">
      If you choose to work with us, our trademark registration package starts at
      <strong>$35</strong>, plus applicable fees.
    </div>
  </div>

  <div class="ta-price-grid">
    <div class="ta-price-box">
      <div class="ta-price-box-label">Federal Filing Fee</div>
      <div class="ta-price-box-amount">$350</div>
      <div class="ta-price-box-unit">per class</div>
    </div>

    <div class="ta-price-box">
      <div class="ta-price-box-label">Service &amp; Platform Fee</div>
      <div class="ta-price-box-amount">$100</div>
      <div class="ta-price-box-unit">per class</div>
    </div>
  </div>

  <p class="ta-pricing-note">
    The total cost is <strong>$450 per class</strong>. In certain cases, the USPTO
    may charge <strong>$550 per class</strong> if the description does not meet ID
    Manual requirements. We work with you to properly structure your application
    and help minimize federal filing costs whenever possible.
  </p>
</div>
      <div class="ta-img-col" style="order: 1;">
        <img :src="tmblock3" alt="Professional businessman on phone" />
      </div>
    </div>
  </section>
</template>

<style scoped>

*,
 *::before,
 *::after {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   max-width: 100%;
 }

.ta-section {

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



   --primary: #1a237e;
   --primary-light: #3949ab;
   --primary-lighter: #7986cb;
   --accent: #ff6d00;


   --accent-light: #ff9e40;
   --accent-glow: rgba(255, 109, 0, 0.15);
   --teal: #00897b;
   --teal-light: #4db6ac;
   --bg: #fafbff;
   --bg-card: #ffffff;
   --bg-alt: #f0f2ff;
   --bg-gradient: linear-gradient(135deg, #fafbff 0%, #f0f2ff 50%, #fff8f0 100%);
   --text: #1a1a2e;
   --text-secondary: #5c6283;
   --text-muted: #8b90a8;
   --border: #e2e5f1;
   --border-light: #eef0f8;
   --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
   --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
   --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
   --shadow-xl: 0 16px 60px rgba(26, 35, 126, 0.12);
   --radius: 12px;
   --radius-lg: 20px;
   --radius-xl: 28px;
   --brand-50: #fff7ed
 }
h1,
 h2,
 h3,
 h4,
 h5,
 h6,
 p,
 span,
 div,
 button,
 input,
 label,
 a,
 li,
 ul,
 ol {
   font-family: 'Inter', sans-serif;
 }


 .ta-section {
   background: var(--bg-gradient);
   color: var(--text);
   line-height: 1.6;
   overflow-x: hidden;
 }

 .ta-section {
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  max-width: 1200px;
  margin: 0 auto;
}

 .ta-row {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 24px;
  align-items: stretch;
  min-height: 480px;
}

 .ta-row-reverse {
  grid-template-columns: 7fr 5fr;
}

 .ta-img-col {
  border-radius: var(--radius-card);
  overflow: hidden;
  position: relative;
}

 .ta-img-col img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(20%);
  transition: filter 0.5s ease, transform 0.7s ease;
}

 .ta-img-col:hover img {
  filter: grayscale(0%);
  transform: scale(1.03);
}

 .ta-content-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-card);
  padding: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: border-color 0.2s ease, box-shadow 0.3s ease;
}

 .ta-content-card:hover {
  /* border-color: var(--on-surface); */
  box-shadow: 0 14px 36px rgba(0,0,0,0.06);
}

 .ta-eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: #FF6F03;
  margin-bottom: 14px;
  display: block;
}

 .ta-heading {
  font-size: clamp(1.3rem, 2.2vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--on-surface);
  margin-bottom: 16px;
}

 .ta-lead {
  font-size: 16px;
  color: rgba(68,71,79,0.75);
  line-height: 1.7;
  margin-bottom: 26px;
  font-weight: 400;
}

 .ta-check-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

 .ta-check-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

 .ta-check-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  /* background: #fff; */
  color: #FF6F03;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 4px;
  font-size: 12px;
  font-weight: 700;
}

 .ta-check-text {
  font-size: 16px;
  color: var(--on-surface);
  line-height: 1.65;
}

 .ta-pricing-highlight {
  background: #fff7f2;
  border-left: 3px solid #FF6F03;
  border-radius: 0 10px 10px 0;
  padding: 16px 20px;
  margin-bottom: 24px;
}

 .ta-pricing-highlight-label {
  font-size: 15px;
  font-weight: 700;
  color: var(--on-surface);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

 .ta-pricing-highlight-text {
  font-size: 15px;
  color: rgba(68,71,79,0.8);
  line-height: 1.6;
}

 .ta-pricing-highlight-text strong {
  color: #FF6F03;
  font-weight: 900;
}

 .ta-price-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 20px;
}

 .ta-price-box {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

 .ta-price-box:hover {
  border-color: rgba(0,62,199,0.2);
  box-shadow: 0 4px 12px rgba(0,62,199,0.06);
}

 .ta-price-box-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(68,71,79,0.55);
  margin-bottom: 6px;
}

 .ta-price-box-amount {
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--on-surface);
  letter-spacing: -0.04em;
  line-height: 1;
}

 .ta-price-box-unit {
  font-size: 12px;
  color: rgba(68,71,79,0.55);
  font-weight: 500;
  margin-top: 4px;
}

 .ta-pricing-note {
  font-size: 16px;
  color: rgba(68,71,79,0.6);
  line-height: 1.65;
  font-style: italic;
}

@media (max-width: 820px) {
   .ta-row,
   .ta-row-reverse {
    grid-template-columns: 1fr;
    min-height: auto;
  }
   .ta-img-col {
    height: 280px;
    order: -1 !important;
  }
   .ta-content-card {
    padding: 30px;
  }
   .ta-price-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 500px) {
   .ta-section {
    padding: 48px 16px;
    gap: 18px;
  }
   .ta-content-card {
    padding: 22px;
  }
   .ta-price-grid {
    grid-template-columns: 1fr;
  }
}
</style>
