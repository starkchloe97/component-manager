<script setup>
import { Star, TrendingUp } from '@lucide/vue'
import tmblock from "@/assets/tm-block.webp"
import img4 from "@/assets/r-m-14.png";
</script>

<template>
  <section class="atlas-standard">
    <div class="atlas-grid">
      <div class="atlas-img-col">
        <img :src="tmblock" alt="Legal Team" class="atlas-img" />
        <div class="atlas-img-overlay"></div>
        <!-- <div class="atlas-float-badge">
          <span class="atlas-badge-pct">100%</span>
          <span class="atlas-badge-label">Digital<br/>Streamlined</span>
        </div> -->
      </div>
      <div class="atlas-content-col">
        <h2 class="display-lg atlas-title">Why work with us?</h2>
        <p class="atlas-body">Every day, our team of highly skilled trademark professionals do all the heavy lifting to file hundreds of applications correctly and efficiently for individuals and business owners across the nation.</p>
        <div class="glass testimonial-card">
          <div class="stars-row">
            <Star v-for="n in 5" :key="n" :size="15" :fill="'currentColor'" class="star-filled" />
          </div>
          <blockquote class="testimonial-quote">"Clarity, promptness, follow-up, knowledge of trademarking."</blockquote>
          <div class="testimonial-author">
            <img :src="img4" alt="Andrew Taylor" class="author-avatar" />
            <div>
              <div class="author-name">Andrew Taylor</div>
              <div class="author-role">Trademark Premium Customer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0;font-family: "Instrument Sans", sans-serif !important;}
html { scroll-behavior: smooth; }
.atlas-standard {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --on-surface: #131b2e;
  --on-surface-variant: #44474f;
  --background: #faf8ff;
  --radius-card: 2rem;
}

.atlas-standard {
  font-family: "Instrument Sans", sans-serif !important;
  font-size: 15px;
  line-height: 1.6;
  color: var(--on-surface);
  background: var(--background);
  overflow-x: hidden;
}

.section-dark {
  background: var(--on-surface);
}

.atlas-standard {
  padding: 0;
  overflow: hidden;
  margin: 30px 0px 70px 0px;
}

.atlas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.atlas-img-col {
  position: relative;
  min-height: 460px;
  border-radius: var(--radius-card) 0 0 var(--radius-card);
  overflow: hidden;
}

.atlas-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.5);
}

.atlas-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--on-surface), transparent);
}

.atlas-float-badge {
  position: absolute;
  top: 36px;
  left: 36px;
  width: 100px;
  height: 100px;
  background: var(--secondary);
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  transform: rotate(12deg);
  box-shadow: 0 16px 36px rgba(0,110,42,0.3);
}

.atlas-badge-pct {
  font-size: 1.4rem;
  font-weight: 900;
  line-height: 1;
}

.atlas-badge-label {
  font-size: 7px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-align: center;
}

.atlas-content-col {
  /* background: #fff; */
  padding: 60px;
  border-radius: 0px;
  margin-left: -1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.atlas-title {
  margin-bottom: 16px;
      font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
}

.atlas-body {
  font-size: 1rem;
  color: rgba(68,71,79,0.8);
  margin-bottom: 28px;
  line-height: 1.7;
}

.testimonial-card {
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 14px 36px rgba(0,0,0,0.08);
}

.stars-row {
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
}

.star-filled {
  color: var(--primary);
}

.testimonial-quote {
  font-size: 1.1rem;
  font-weight: 400;
  font-style: italic;
  color: var(--on-surface);
  margin-bottom: 16px;
  line-height: 1.35;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 500;
  color: var(--on-surface);
  font-size: 0.85rem;
}

.author-role {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--primary);
  font-weight: 700;
  font-family: "Instrument Sans", sans-serif !important;
}

.atlas-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
}

.stat-num {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--on-surface);
}

.stat-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 500;
  color: var(--on-surface-variant);
}

.stat-divider {
  height: 28px;
  width: 1px;
  background: rgba(195,197,217,0.3);
}

.stat-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 900;
  color: var(--primary);
  transition: transform 0.2s;
  cursor: pointer;
}

.stat-link:hover {
  transform: translateX(5px);
}

@media (max-width: 1024px) {
  .atlas-standard {
    padding: 0;
    border-radius: var(--radius-card);
  }
  .atlas-grid {
    grid-template-columns: 1fr;
  }
  .atlas-img-col {
    min-height: 240px;
    border-radius: var(--radius-card);
  }
  .atlas-content-col {
    border-radius: var(--radius-card);
    margin-left: 0;
    padding: 36px;
  }
  .testimonial-card {
    transform: none;
  }
}

@media (max-width: 640px) {
  .atlas-content-col {
    padding: 24px 20px;
  }
}
</style>
