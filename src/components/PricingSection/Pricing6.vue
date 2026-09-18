<template>
  <section class="pricing-section v-six">
    <div class="container">
      <!-- Badge -->
      <div class="pricing-badge">Pricing</div>

      <!-- Heading -->
      <h2 class="pricing-title">Plans for your need</h2>
      <p class="pricing-subtitle">
        We have actually analyse the business need, and created a pricing that
        suits you.
      </p>


      <!-- Pricing Cards -->
      <div class="pricing-grid">
        <!-- Starter -->
        <div class="pricing-card">
          <div class="logo-icon">
            <span></span>
            <span></span>
          </div>

          <h3>Basic</h3>
          <p class="card-desc">
            For Starter most advance reliability.
          </p>

          <div class="price">
            <span class="amount">$0</span>
            <span class="period">/month</span>
          </div>

          <button class="plan-btn">
            Started Now
          </button>

          <div class="divider"></div>

          <h4>Features</h4>

          <ul>
            <li>Unlimited updates and products</li>
            <li>Custom permission</li>
            <li>Custom infrastructure</li>
          </ul>
        </div>

        <!-- Pro -->
        <div class="pricing-card featured">
          <div class="popular-badge">Popular</div>

          <div class="logo-icon">
            <span></span>
            <span></span>
          </div>

          <h3 class="white-plan">Delux</h3>
          <p class="card-desc">
            For Pro most advance reliability.
          </p>

          <div class="price">
            <span class="amount">$24</span>
            <span class="period">/month</span>
          </div>

          <button class="plan-btn white-btn">
            Subscribe Now
          </button>

          <div class="divider"></div>

          <h4 class="white-h4">Features</h4>

          <ul>
            <li>Unlimited updates and products</li>
            <li>Custom permission</li>
            <li>Custom infrastructure</li>
            <li>Custom updates</li>
          </ul>
        </div>

        <!-- Enterprise -->
        <div class="pricing-card">
          <div class="logo-icon">
            <span></span>
            <span></span>
          </div>

          <h3>Premium</h3>
          <p class="card-desc">
            For Enterprise most advance reliability.
          </p>

          <div class="price">
            <span class="amount">$49</span>
            <span class="period">/month</span>
          </div>

          <button class="plan-btn">
            Subscribe Now
          </button>

          <div class="divider"></div>

          <h4>Features</h4>

          <ul>
            <li>Unlimited updates and products</li>
            <li>Custom permission</li>
            <li>Custom infrastructure</li>
            <li>Custom update</li>
            <li>Custom Animations</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const billingCycle = ref("monthly");
</script>

<style scoped>
.pricing-section {
  padding: 100px 20px;
  background: #E7E7E7;
}

.white-plan {
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.v-six .pricing-badge {
  width: fit-content;
  margin: 0 auto 20px;
  padding: 8px 18px;
  background: #fff;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.v-six .pricing-title {
  text-align: center;
  font-size: 56px;
  font-weight: 700;
  margin: 0;
  color: #000;
}

.v-six .pricing-subtitle {
  text-align: center;
  max-width: 650px;
  margin: 20px auto 65px;
  color: #666;
  line-height: 1.6;
}


.v-six .pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: center;
}

.v-six .pricing-card {
  background: #F0F1F3;
  border-radius: 32px;
  padding: 30px;
  min-height: 580px;
  position: relative;
  box-shadow: 1px -3px 1px 0px rgb(255 255 255 / 76%), 3px 9px 20px 0px rgb(0 0 0 / 6%);
}

.v-six .featured {
  background: linear-gradient(
    180deg,
    #000 0%,
    #111 60%,
    #1e1e1e 100%
  );
  color: white;
  transform: translateY(-18px);
}

.v-six .logo-icon {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
}

.v-six .logo-icon span {
  width: 14px;
  height: 24px;
  background: currentColor;
  border-radius: 20px;
}

.v-six .logo-icon span:first-child {
  transform: rotate(35deg);
}

.v-six .logo-icon span:last-child {
  transform: rotate(-35deg);
}

.v-six .pricing-card h3 {
  font-size: 34px;
  margin: 0 0 8px;
}

.v-six .card-desc {
  color: #666;
  margin-bottom: 35px;
}

.v-six .featured .card-desc {
  color: rgba(255, 255, 255, 0.7);
}

.v-six .price {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}

.v-six .amount {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
}

.v-six .period {
  margin-left: 6px;
  margin-bottom: 10px;
  color: #666;
}

.v-six .featured .period {
  color: rgba(255, 255, 255, 0.7);
}

.v-six .plan-btn {
  width: 100%;
  border: none;
  background: #f3f3f3;
  padding: 16px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
      box-shadow: 0px -3px 1px 0px rgb(255 255 255 / 76%), 0px 2px 13px -3px rgb(0 0 0 / 8%);
}

.v-six .white-btn {
  background: white;
  color: black;
  box-shadow: none;
}
.v-six .white-h4{
    color: white;
}

.v-six .divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 30px 0;
}

.v-six .featured .divider {
  background: rgba(255, 255, 255, 0.15);
}

.v-six h4 {
  margin-bottom: 20px;
}

.v-six ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.v-six li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 14px;
}

.v-six li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
}

.v-six .popular-badge {
  position: absolute;
  top: 26px;
  right: 26px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

/* Responsive */

@media (max-width: 992px) {
  .v-six .pricing-grid {
    grid-template-columns: 1fr;
  }

  .v-six .featured {
    transform: none;
  }

  .v-six .pricing-title {
    font-size: 42px;
  }
}

@media (max-width: 576px) {
  .v-six .pricing-title {
    font-size: 32px;
  }

  .v-six .amount {
    font-size: 48px;
  }
}
</style>