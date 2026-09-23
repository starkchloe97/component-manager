<script setup>
import { useToast } from '../../composables/useToast.js'

const { showToast } = useToast()

const plans = [
  {
    price: '$199',
    period: '/ filing',
    name: 'Single Country',
    desc: 'Register in one country. Ideal for businesses focused on a single market.',
    featured: false,
    features: [
      'Comprehensive trademark search',
      'Application preparation',
      'Filing with trademark office',
      'Real-time status tracking',
      '6–12 month timeline'
    ],
    buttonText: 'Get Started',
    toastMsg: 'Single country plan selected!'
  },
  { 
    price: '$599',
    period: '/ filing',
    name: 'Multi-Country',
    desc: 'Register across multiple countries. Best for growing brands expanding internationally.',
    featured: true,
    features: [
      'Everything in Single Country',
      'Up to 5 countries included',
      'Madrid Protocol filing',
      'Dedicated attorney support',
      'Priority processing available',
      '8–18 month timeline'
    ],
    buttonText: 'Get Started',
    toastMsg: 'Multi-country plan selected!'
  },
  {
    price: '$1,299',
    period: '/ filing',
    name: 'Enterprise',
    desc: 'Full portfolio management for large businesses with extensive trademark needs.',
    featured: false,
    features: [
      'Everything in Multi-Country',
      'Unlimited countries',
      'Portfolio management dashboard',
      'Infringement monitoring',
      'Enforcement assistance',
      'Dedicated account manager'
    ],
    buttonText: 'Contact Sales',
    toastMsg: 'Enterprise plan selected!'
  }
]

const handlePlan = (msg) => {
  showToast(msg)
}
</script>

<template>
  <div class="costs-section v-two">
    <div class="section">
      <div class="animate-on-scroll" style="text-align: center;">
        <div class="section-label" style="margin: 0 auto 16px;"><i class="fas fa-tag"></i> Pricing</div>
        <div class="section-title" style="margin-left: auto; margin-right: auto;">Cost & Timeline</div>
        <div class="section-desc" style="margin-left: auto; margin-right: auto;">Transparent pricing with no hidden fees. Choose the plan that fits your needs.</div>
      </div>
      <div class="costs-grid">
        <div v-for="plan in plans" :key="plan.name" class="cost-card animate-on-scroll" :class="{ featured: plan.featured }">
          <div class="cost-price">{{ plan.price }} <span>{{ plan.period }}</span></div>
          <div class="cost-name">{{ plan.name }}</div>
          <div class="cost-desc">{{ plan.desc }}</div>
          <ul class="cost-features">
            <li v-for="feature in plan.features" :key="feature"><i class="fas fa-check"></i> {{ feature }}</li>
          </ul>
          <button class="btn-cost" @click="handlePlan(plan.toastMsg)">{{ plan.buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>  

.v-two .section {
  padding: 80px 24px;
  max-width: 1280px;
  margin: 0 auto;
}

.v-two .section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(26,35,126,0.05);
  border: 1px solid rgba(26,35,126,0.08);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.v-two .section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.15;
  margin-bottom: 16px;
}

.v-two .section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
}

.v-two .costs-section {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  margin: 0 24px;
}

.v-two .costs-section .section {
  padding: 80px 40px;
}

.v-two .costs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
}

.v-two .cost-card {
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border-light);
  background: var(--bg);
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
}

.v-two .cost-card.featured {
  border-color: var(--accent);
  background: linear-gradient(135deg, rgba(255,109,0,0.03), rgba(255,109,0,0.01));
}

.v-two .cost-card.featured::before {
  content: 'Most Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.v-two .cost-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.v-two .cost-price {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -2px;
}

.v-two .cost-price span {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0;
}

.v-two .cost-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin-top: 4px;
  margin-bottom: 12px;
}

.v-two .cost-desc {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 20px;
  line-height: 1.6;
}

.v-two .cost-features {
  list-style: none;
  text-align: left;
  margin-bottom: 24px;
}

.v-two .cost-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-secondary);
  padding: 6px 0;
}

.v-two .cost-features li i {
  color: var(--teal);
  font-size: 12px;
  flex-shrink: 0;
}

.v-two .btn-cost {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
}

.v-two .btn-cost:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.v-two .cost-card.featured .btn-cost {
  background: linear-gradient(135deg, var(--accent), #ff8f00);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 16px rgba(255,109,0,0.25);
}

.v-two .cost-card.featured .btn-cost:hover {
  box-shadow: 0 6px 24px rgba(255,109,0,0.35);
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .v-two .costs-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .v-two .costs-section .section {
    padding: 60px 24px;
  }

  .v-two .costs-section {
    margin: 0 16px;
  }
}
</style>