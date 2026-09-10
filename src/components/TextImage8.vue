<template>
  <section id="why-us" class="why-us-section">
    <div class="container">
      <div class="grid-layout">
        <div class="image-col">
          <div class="image-wrapper">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
              alt="Founder outside her studio" class="main-image">
            <div class="rating-badge">
              <div class="stars">
                <svg v-for="n in 5" :key="n" class="star" viewBox="0 0 24 24" aria-hidden="true" role="img"
                  focusable="false" xmlns="http://www.w3.org/2000/svg">
                  <title>Star</title>
                  <path fill="#F97316"
                    d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.162L12 18.896l-7.335 3.86 1.401-8.162L.132 9.21l8.2-1.192L12 .587z" />
                </svg>
              </div>
              <p class="rating-text">4,500+ Reviews on Trustpilot</p>
            </div>
          </div>
        </div>
        <div class="content-col">
          <div class="red-bar"></div>
          <!-- <span class="eyebrow">Why Work With Us</span> -->
          <h2 class="section-title">We're here to help your brand</h2>
          <p class="section-desc">We believe that building a brand and making sure it stays protected is one of the most
            important yet complicated tasks many small businesses face today. So we'll be with you every step of the
            way, helping you protect your business and celebrating with you when you accomplish every exciting milestone
            as you thrive.</p>
          <blockquote class="quote-box">
            <p class="quote-text">"Fast, efficient and a real person who responds to questions. Thank you!"</p>
            <p class="quote-author">Ana Velez</p>
            <p class="quote-role">Trademark Deluxe Customer

            </p>
          </blockquote>
          <!-- <button class="btn-primary" @click="$emit('show-toast', 'Starting your free trademark search...')">
            Get Started <span class="iconify" data-icon="lucide:arrow-right"></span>
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WhyWorkWithUsSection"
};
</script>

<style scoped>
.why-us-section {
  padding-top: 96px;
  padding-bottom: 96px;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
  align-items: center;
}

.image-col {
  order: 2;
}

.image-wrapper {
  position: relative;
}

.main-image {
  width: 100%;
  height: 440px;
  object-fit: cover;
  filter: grayscale(15%) contrast(1.02);
  box-shadow: 0 24px 64px -16px rgba(15, 43, 70, .2);
  display: block;
}

.rating-badge {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 24px 64px -16px rgba(15, 43, 70, .2);
}

.stars {
  display: flex;
  color: #F97316;
  font-size: 16px;
  gap: 6px;
}

.stars .star {
  width: 1.1em;
  height: 1.1em;
  display: block;
  flex-shrink: 0;
}

.rating-text {
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.content-col {
  order: 1;
}

.red-bar {
  height: 3px;
  width: 48px;
  background-color: #F97316;
  margin-bottom: 16px;
}

.eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #F97316;
  display: block;
}

.section-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #0f172a;
  margin: 16px 0 24px 0;
}

.section-desc {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.625;
  margin: 0 0 32px 0;
}

.quote-box {
  border-left: 2px solid #F97316;
  padding-left: 24px;
  margin: 0 0 32px 0;
}

.quote-text {
  font-family: 'Inter Tight', sans-serif;
  font-size: 18px;
  color: #0f172a;
  font-style: italic;
  line-height: 1.625;
  margin: 0 0 12px 0;
}

.quote-author {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.quote-role {
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #0f172a;
  color: #fff;
  border: none;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 16px 36px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-primary:hover {
  background-color: #F97316;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px -6px rgba(196, 30, 58, .25);
}

.btn-primary .iconify {
  font-size: 14px;
}

.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

.hero-grid {
  direction: rtl;
}

.hero-grid>* {
  direction: ltr;
}

@media (min-width: 768px) {
  .why-us-section {
    padding-top: 128px;
    padding-bottom: 128px;
  }

  .section-title {
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 40px;
  }

  .grid-layout {
    grid-template-columns: repeat(12, 1fr);
    gap: 64px;
  }

  .image-col {
    grid-column: 7 / 13;
  }

  .content-col {
    grid-column: 1/ 7;
  }
}
</style>