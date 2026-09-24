<script setup>
import { ref, onMounted } from 'vue'
import { Star } from '@lucide/vue'
import mainImage from "@/assets/main1.webp";
import {
  SITE_NAME,
} from "@/config/siteInfo.js";

const barsAnimated = ref(false)

const chartData = [
  { label: 'Approval Rate', value: 92, barClass: 'bar1' },
  { label: 'Client Satisfaction', value: 85, barClass: 'bar2' },
  { label: 'Search Accuracy', value: 78, barClass: 'bar3' },
  { label: 'Speed Score', value: 71, barClass: 'bar4' }
]

onMounted(() => {
  const section = document.querySelector('.benefits-section')
  if (section) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { barsAnimated.value = true }, 300)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(section)
  }
})
</script>

<template>
  <section class="section background">
    <div class="benefits-section">
      <div class="benefits-grid">
        <div class="benefits-copy animate-on-scroll"> 
          <div class="section-label">
            <i class="fas fa-shield-alt"></i> Why work with us?
          </div>

          <h2 class="section-title">
            Protect your business with {{ SITE_NAME }}
          </h2>

          <div class="section-desc">
            <p>We've already helped thousands of brands and businesses with their trademark registration requirements.
            </p>
            <p>Every day, our team of highly skilled trademark professionals do all the heavy lifting to file hundreds
              of applications correctly and efficiently for individuals and business owners across the nation.</p>
          </div>

          <div class="review-card">
            <div class="review-stars" aria-label="5 star review">
              <Star v-for="star in 5" :key="star" :size="16" fill="currentColor" />
            </div>
            <div class="review-person">
              <div class="avatar">AT</div>
              <div class="review-details">
                <p class="review-quote">"Efficient and easy, truly a great experience."</p>
                <h6>Andrew Taylor</h6>
                <p class="review-role">Trademark Premium Customer</p>
              </div>
            </div>
          </div>
        </div>
        <div class="benefits-visual animate-on-scroll delay-3">
          <img :src="mainImage" alt="Trademark Benefits" class="hero-image">
          <div class="stats-grid">
            <div v-for="item in chartData" :key="item.label" class="stat-card">
              <div class="stat-val">{{ item.value }}%</div>
              <div class="stat-label">{{ item.label }}</div>
              <div class="stat-track">
                <div class="stat-fill" :style="{ width: barsAnimated ? item.value + '%' : '0%' }"></div>
              </div>
            </div>
          </div>
        </div>
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

.section {
  --brand-100: #ffedd5;
  --brand-600: #ea580c;
  --primary: #1a237e;
  --bg-card: #ffffff;
  --bg-gradient: linear-gradient(135deg, #fafbff 0%, #f0f2ff 50%, #fff8f0 100%);
  --text: #1a1a2e;
  --text-secondary: #5c6283;
  --border-light: #eef0f8;
  --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
  --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
  --radius: 12px;
  --radius-xl: 28px;
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


 .section {
   color: var(--text);
   overflow-x: hidden;
   line-height: 1.6;
   background: var(--bg-gradient);
 }

.section {
  padding: 80px 24px;
}

.background {
  background-color: white;
  width: 100%;

}

.benefits-section {
  margin: 0 auto;
  padding: 0 24px;
}

.benefits-copy {
  max-width: 580px;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-600);
  margin-bottom: 18px;
  padding: 5px 12px;
  background: #fff1ec;
  border: 1px solid var(--brand-100);
  border-radius: 100px;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(34px, 4vw, 48px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.2px;
  line-height: 1.05;
  margin-bottom: 24px;
}

.section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 560px;
  line-height: 1.8;
  margin-bottom: 32px;
}

.section-desc p {
  margin: 0 0 16px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
  margin-top: 48px;
}

.review-card {
  display: grid;
  gap: 24px;
  padding: 28px 26px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
}

.review-stars {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffb400;
  font-size: 14px;
}

.review-stars svg {
  font-size: 16px;
}

.review-person {
  display: flex;
  gap: 16px;
  align-items: center;
}

.avatar {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(26, 35, 126, 0.08);
  color: var(--text);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.review-details h6 {
  margin: 0 0 4px;
  font-size: 16px;
  color: var(--text);
}

.review-role {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.review-quote {
  margin: 0 0 12px;
  font-size: 15px;
  color: var(--text);
  line-height: 1.7;
}

.benefits-visual {
  position: relative;
}

.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: bottom;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
  .benefits-section {
    margin: 0 auto;
    padding: 0 24px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 60px 16px;
  }

  .benefits-section {
    margin: 0 auto;
    padding: 0 16px;
  }

  .benefits-copy {
    max-width: 100%;
  }

  .hero-image {
    height: auto;
    min-height: 260px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 32px;
  }

  .review-card {
    padding: 22px 18px;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 48px 12px;
  }

  .benefits-section {
    margin: 0 auto;
    padding: 0 12px;
  }

  .benefits-grid {
    gap: 24px;
  }

  .section-title {
    font-size: clamp(24px, 6vw, 34px);
  }

  .section-desc {
    font-size: 14px;
  }

  .review-card {
    padding: 16px 14px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 40px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: 14px 16px;
}

.stat-val {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-top: 2px;
}

.stat-track {
  height: 4px;
  background: var(--border-light);
  border-radius: 99px;
  margin-top: 8px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 99px;
  transition: width 1s ease;
}
</style>
