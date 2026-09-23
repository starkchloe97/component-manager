<template>
    <section id="steps" class="how-it-works v-three">
        <div class="section-bg"></div>
        <div class="section-inner">
            <div class="section-header">
                <div class="animate-on-scroll">
                    <span class="section-tag">Simple Process</span>
                </div>
                <h2 class="animate-on-scroll stagger-1 section-title">How Trademark Registration Works</h2>
                <p class="animate-on-scroll stagger-2 section-desc">Four straightforward steps to secure your brand's
                    legal protection. We handle the complexity.</p>
            </div>
            <div class="steps-grid">
                <div v-for="(step, i) in steps" :key="i" class="animate-on-scroll" :class="`stagger-${i + 1}`">
                    <div class="step-card">
                        <div v-if="i < 3" class="step-connector"></div>
                        <div class="step-number">
                            <span>{{ step.num }}</span>
                        </div>
                        <h3 class="step-title">{{ step.title }}</h3>
                        <p class="step-desc">{{ step.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'

const steps = [
    { num: '1', title: 'Search Your Mark', desc: 'We conduct a comprehensive federal database search to ensure your trademark is available and unique.' },
    { num: '2', title: 'Prepare Application', desc: 'Our experts prepare and review your USPTO application with precise classifications and descriptions.' },
    { num: '3', title: 'File with USPTO', desc: 'We submit your application directly to the United States Patent and Trademark Office on your behalf.' },
    { num: '4', title: 'Get Your Trademark', desc: 'Receive your trademark registration certificate and enjoy full legal protection for your brand.' },
]

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible')
        })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})
</script>

<style scoped>

.how-it-works {
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

.how-it-works {
    position: relative;
    padding: 2.5rem 0;
    overflow: hidden;
    background: rgba(248, 250, 252, 0.5);
}

.section-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 18rem;
    height: 18rem;
    background: rgba(239, 254, 250, 0.3);
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
}

.v-three .section-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (min-width: 640px) {
    .v-three .section-inner {
        padding: 0 1.5rem;
    }
}

.v-three .section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.v-three .section-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #019e8e;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: #effefa;
    padding: 0.375rem 1rem;
    border-radius: 9999px;
    margin-bottom: 1rem;
}

.v-three .section-title {
    font-size: 1.875rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
}

@media (min-width: 640px) {
    .v-three .section-title {
        font-size: 2.25rem;
    }
}

.v-three .section-desc {
    color: #64748b;
    max-width: 36rem;
    margin: 0 auto;
}

.v-three .steps-grid {
    display: grid;
    gap: 1.5rem;
}

@media (min-width: 640px) {
    .v-three .steps-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .v-three .steps-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.v-three .step-card {
    position: relative;
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    transition: all 0.4s ease;
    height: 100%;
}

.v-three .step-card:hover {
    border-color: #c8fff4;
    box-shadow: 0 10px 40px rgba(6, 126, 115, 0.1);
}

.v-three .step-connector {
    position: absolute;
    top: 28px;
    left: calc(11% + 40px);
    width: calc(100% - 20px);
    height: 2px;
    background: linear-gradient(90deg, #1ee0c5, #067e73);
    opacity: 0.3;
    display: none;
}

@media (min-width: 1024px) {
    .v-three .step-connector {
        display: block;
    }
}

.v-three .step-number {
    width: 2.5rem;
    height: 2.5rem;
    /* background: linear-gradient(135deg, #06c4ac, #019e8e); */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    /* box-shadow: 0 10px 25px rgba(6,196,172,0.2); */
    transition: transform 0.3s ease;
    border: 1px solid #06c4ac;
}

.v-three .step-card:hover .step-number {
    transform: scale(1.1);
}

.v-three .step-number.accent {
    background: linear-gradient(135deg, #ff7e11, #f06306);
    box-shadow: 0 10px 25px rgba(255, 126, 17, 0.2);
}

.v-three .step-number span {
    color: #06c4ac;
    font-weight: 500;
    font-size: 1 rem;
}

.v-three .step-title {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
}

.v-three .step-desc {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.625;
}
</style>