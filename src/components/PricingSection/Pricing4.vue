<template>
  <section id="pricing" class="pricing v-three">
    <div class="section-bg"></div>
    <div class="section-inner">
      <div class="section-header">
        <div class="animate-on-scroll">
          <span class="section-tag">Pricing Plans</span>
        </div>
        <h2 class="animate-on-scroll stagger-1 section-title">Choose the Right Plan for You</h2>
        <p class="animate-on-scroll stagger-2 section-desc">All plans include USPTO filing fees. No hidden charges, no surprises.</p>
      </div>

      <div class="pricing-grid">
        <div class="animate-on-scroll stagger-1 pricing-card">
          <div class="pricing-header">
            <h3 class="pricing-name">Basic</h3>
            <p class="pricing-sub">For simple registrations</p>
          </div>
          <div class="pricing-price">
            <span class="price-value">$35</span>
            <span class="price-unit">/application</span>
          </div>
          <ul class="pricing-features">
            <li class="feature-included"><span class="iconify text-brand-500 text-lg" data-icon="lucide:check"></span> USPTO Filing Fee Included</li>
            <li class="feature-included"><span class="iconify text-brand-500 text-lg" data-icon="lucide:check"></span> Basic Trademark Search</li>
            <li class="feature-included"><span class="iconify text-brand-500 text-lg" data-icon="lucide:check"></span> Application Preparation</li>
            <li class="feature-included"><span class="iconify text-brand-500 text-lg" data-icon="lucide:check"></span> Email Support</li>
            <li class="feature-excluded"><span class="iconify text-slate-300 text-lg" data-icon="lucide:x"></span> Comprehensive Search Report</li>
            <li class="feature-excluded"><span class="iconify text-slate-300 text-lg" data-icon="lucide:x"></span> Attorney Review</li>
          </ul>
          <button class="pricing-btn-basic" @click="selectPlan('Basic')">Select Basic</button>
        </div>

        <div class="animate-on-scroll stagger-2 pricing-card popular">
          <div class="popular-badge">Most Popular</div>
          <div class="popular-bg"></div>
          <div class="pricing-header">
            <h3 class="pricing-name">Deluxe</h3>
            <p class="pricing-sub">Best value for most businesses</p>
          </div>
          <div class="pricing-price">
            <span class="price-value">$199</span>
            <span class="price-unit">/application</span>
          </div>
          <ul class="pricing-features">
            <li class="feature-included light"><span class="iconify text-brand-300 text-lg" data-icon="lucide:check"></span> Everything in Basic</li>
            <li class="feature-included light"><span class="iconify text-brand-300 text-lg" data-icon="lucide:check"></span> Comprehensive Search Report</li>
            <li class="feature-included light"><span class="iconify text-brand-300 text-lg" data-icon="lucide:check"></span> Attorney-Reviewed Application</li>
            <li class="feature-included light"><span class="iconify text-brand-300 text-lg" data-icon="lucide:check"></span> Priority Filing</li>
            <li class="feature-included light"><span class="iconify text-brand-300 text-lg" data-icon="lucide:check"></span> Phone & Email Support</li>
            <li class="feature-excluded light"><span class="iconify text-brand-200/30 text-lg" data-icon="lucide:x"></span> Monitoring & Alerts</li>
          </ul>
          <button class="pricing-btn-deluxe" @click="selectPlan('Deluxe')">Select Deluxe</button>
        </div>

        <div class="animate-on-scroll stagger-3 pricing-card">
          <div class="pricing-header">
            <h3 class="pricing-name">Premium</h3>
            <p class="pricing-sub">Complete protection package</p>
          </div>
          <div class="pricing-price">
            <span class="price-value">$299</span>
            <span class="price-unit">/application</span>
          </div>
          <ul class="pricing-features">
            <li class="feature-included"><span class="iconify text-accent-500 text-lg" data-icon="lucide:check"></span> Everything in Deluxe</li>
            <li class="feature-included"><span class="iconify text-accent-500 text-lg" data-icon="lucide:check"></span> 12-Month Monitoring & Alerts</li>
            <li class="feature-included"><span class="iconify text-accent-500 text-lg" data-icon="lucide:check"></span> Cease & Desist Letter Template</li>
            <li class="feature-included"><span class="iconify text-accent-500 text-lg" data-icon="lucide:check"></span> Dedicated Attorney Contact</li>
            <li class="feature-included"><span class="iconify text-accent-500 text-lg" data-icon="lucide:check"></span> Expedited Processing</li>
            <li class="feature-included"><span class="iconify text-accent-500 text-lg" data-icon="lucide:check"></span> Free Amendment if Needed</li>
          </ul>
          <button class="pricing-btn-premium" @click="selectPlan('Premium')">Select Premium</button>
        </div>
      </div>

      <div class="animate-on-scroll guarantee">
        <div class="guarantee-inner">
          <span class="iconify text-brand-500 text-lg" data-icon="lucide:shield-check"></span>
          <span class="guarantee-text">100% Money-Back Guarantee if your application isn't accepted by USPTO</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

function selectPlan(name) {
  if (window.showToast) window.showToast(name + ' plan selected! Redirecting...')
}

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
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.v-three .pricing {
  position: relative;
  padding: 2.5rem 0;
  overflow: hidden;
  background: rgba(248, 250, 252, 0.5);
}

.v-three .section-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: rgba(239, 254, 250, 0.2);
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.v-three .section-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .v-three .section-inner {
    padding: 0 1.5rem;
  }
}

.v-three .section-header {
  text-align: center;
  margin-bottom: 3.5rem;
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
  max-width: 32rem;
  margin: 0 auto;
}

.v-three .pricing-grid {
  display: grid;
  gap: 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .v-three .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.v-three .pricing-card {
  background: white;
  border-radius: 1rem;
  padding: 1.75rem;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
}

.v-three .pricing-card:not(.popular):hover {
  border-color: #c8fff4;
  box-shadow: 0 20px 40px rgba(6, 126, 115, 0.1);
}

.v-three .pricing-card.popular {
  background: linear-gradient(135deg, #067e73 0%, #019e8e 100%);
  position: relative;
  overflow: hidden;
  color: white;
  z-index: 10;
}

@media (min-width: 768px) {
  .v-three .pricing-card.popular {
    margin-top: -1rem;
    margin-bottom: -1rem;
  }
}

.v-three .popular-bg {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%);
  animation: rotate-slow 15s linear infinite;
  pointer-events: none;
}

.v-three .popular-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff7e11;
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  z-index: 2;
}

.v-three .pricing-header {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.v-three .pricing-name {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.v-three .pricing-card.popular .pricing-name {
  color: white;
}

.v-three .pricing-sub {
  font-size: 0.75rem;
}

.v-three .pricing-card:not(.popular) .pricing-sub {
  color: #64748b;
}

.v-three .pricing-card.popular .pricing-sub {
  color: rgba(255,255,255,0.7);
}

.v-three .pricing-price {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.v-three .price-value {
  font-size: 2.25rem;
  font-weight: 800;
}

.v-three .pricing-card.popular .price-value {
  color: white;
}

.v-three .pricing-card:not(.popular) .price-value {
  color: #0f172a;
}

.v-three .price-unit {
  font-size: 0.875rem;
}

.v-three .pricing-card:not(.popular) .price-unit {
  color: #64748b;
}

.v-three .pricing-card.popular .price-unit {
  color: rgba(255,255,255,0.7);
}

.v-three .pricing-features {
  list-style: none;
  margin-bottom: 2rem;
  flex: 1;
  position: relative;
  z-index: 2;
}

.v-three .pricing-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.v-three .feature-included {
  color: #475569;
}

.v-three .feature-included.light {
  color: rgba(255,255,255,0.85);
}

.v-three .feature-excluded {
  color: #94a3b8;
}

.v-three .feature-excluded.light {
  color: rgba(255,255,255,0.3);
}

.v-three .pricing-btn-basic {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid #e2e8f0;
  color: #334155;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.v-three .pricing-btn-basic:hover {
  border-color: #91fee9;
  color: #067e73;
  background: #effefa;
}

.v-three .pricing-btn-deluxe {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  background: white;
  color: #067e73;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
}

.v-three .pricing-btn-deluxe:hover {
  background: #effefa;
}

.v-three .pricing-btn-premium {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid #ffd9a8;
  color: #c74a07;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.v-three .pricing-btn-premium:hover {
  background: #fff8ed;
  border-color: #ffbe71;
}

.v-three .guarantee {
  text-align: center;
  margin-top: 2.5rem;
}

.v-three .guarantee-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.v-three .text-brand-500 { color: #06c4ac; }
.v-three .text-brand-300 { color: #91fee9; }
.v-three .text-accent-500 { color: #ff7e11; }
.v-three .text-slate-300 { color: #cbd5e1; }
</style>