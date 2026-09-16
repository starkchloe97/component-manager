<template>
  <section class="testimonial-section" ref="section">
    <!-- Animated background layers -->
    <div class="bg-glow bg-glow--left"></div>
    <div class="bg-glow bg-glow--right"></div>
    <div class="bg-glow bg-glow--center"></div>
    <div class="bg-grid"></div>

    <!-- Floating ambient particles -->
    <div class="particles">
      <span v-for="i in 12" :key="i" class="particle" :style="particleStyle(i)"></span>
    </div>

    <div class="testimonial-container">
      <!-- Left Column: Heading + Stats -->
      <div class="testimonial-left reveal" data-reveal="left">
        <span class="section-badge">
          <span class="badge-dot"></span>
          <span class="badge-ripple"></span>
          Testimonials
        </span>
        <h2 class="section-title">
          <span class="word">Trusted</span>
          <span class="word">by</span>
          <span class="word">Over</span>
          <br />
          <span class="text-accent word">15k+</span>
          <span class="word">Satisfied</span>
          <br />
          <span class="word">Clients</span>
        </h2>
        <p class="section-desc">
          Convertify helps businesses boost sales, streamline workflows, and
          deliver exceptional results that drive real growth.
        </p>

        <!-- Stats row -->
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-number" data-count="4.9" data-decimals="1">0.0</span>
            <div class="stat-stars">
              <svg v-for="i in 5" :key="i" class="star" :style="{ animationDelay: i * 0.1 + 's' }" width="14" height="14" viewBox="0 0 24 24" fill="#06c4ac">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="stat-label">Avg. Rating</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number" data-count="15" data-suffix="k+">0</span>
            <span class="stat-label">Happy Clients</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number" data-count="98" data-suffix="%">0</span>
            <span class="stat-label">Retention Rate</span>
          </div>
        </div>
      </div>

      <!-- Center Column: Featured Testimonial Auto-Slider -->
      <div class="testimonial-center reveal" data-reveal="up" ref="centerCol">
        <div class="featured-card" ref="featuredCard">
          <div class="card-shine"></div>
          <div class="featured-quote-mark">"</div>
          
          <transition name="slide-fade" mode="out-in">
            <div class="review-content" :key="currentReview">
              <div class="featured-stars">
                <svg v-for="i in 5" :key="'f'+i" class="star" :style="{ animationDelay: i * 0.08 + 's' }" width="16" height="16" viewBox="0 0 24 24" fill="#06c4ac">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p class="featured-text">
                {{ reviews[currentReview].text }}
              </p>
              <div class="featured-author">
                <div class="author-avatar-wrap">
                  <img
                    :src="reviews[currentReview].avatar"
                    :alt="reviews[currentReview].name"
                    class="author-avatar"
                  />
                  <span class="avatar-ring"></span>
                  <span class="avatar-ring avatar-ring--2"></span>
                </div>
                <div class="author-info">
                  <span class="author-name">{{ reviews[currentReview].name }}</span>
                  <span class="author-role">{{ reviews[currentReview].role }}</span>
                </div>
                <div class="featured-logo">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
                    <path d="M8 10h16v2H12v3h10v2H12v5H8V10z" fill="white"/>
                    <defs>
                      <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0" stop-color="#067e73"/>
                        <stop offset="1" stop-color="#06c4ac"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </transition>

          <!-- Auto-rotate progress bar -->
          <div class="progress-track">
            <div class="progress-fill" :key="currentReview"></div>
          </div>

          <!-- Navigation Dots -->
          <div class="slider-dots">
            <button 
              v-for="(review, i) in reviews" 
              :key="i" 
              :class="['dot', { active: i === currentReview }]"
              @click="goToReview(i)"
            ></button>
          </div>
        </div>

        <!-- Floating accent cards -->
        <div class="floating-card floating-card--top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06c4ac" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>Verified Review</span>
        </div>

        <div class="floating-card floating-card--bottom">
          <span class="float-emoji">🚀</span>
          <span>3x Productivity</span>
        </div>
      </div>

      <!-- Right Column: Infinite Marquee Scroller -->
      <div class="testimonial-right reveal" data-reveal="right">
        <div class="marquee-mask">
          <div class="marquee-track">
            <!-- Duplicate the array to create a seamless loop -->
            <div v-for="(review, i) in [...reviews, ...reviews]" :key="i" class="mini-card">
              <div class="mini-card-glow"></div>
              <div class="mini-card-header">
                <div class="mini-stars">
                  <svg v-for="j in 5" :key="'a'+j" class="star" :style="{ animationDelay: j * 0.1 + 's' }" width="12" height="12" viewBox="0 0 24 24" fill="#06c4ac">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="22 4 12 14.01 9 11.01" stroke="#06c4ac" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p class="mini-text">"{{ review.text.substring(0, 85) }}..."</p>
              <div class="mini-author">
                <img :src="review.avatar" :alt="review.name" class="mini-avatar" />
                <div>
                  <span class="mini-name">{{ review.name }}</span>
                  <span class="mini-role">{{ review.role.split(' at ')[1] || review.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Branding -->
    <div class="section-brand reveal" data-reveal="up">

    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialSection",
  data() {
    return {
      currentReview: 0,
      rotateTimer: null,
      reviews: [
        {
          text: "Framify has completely transformed my design workflow! The speed, precision, and ease of use are unlike anything I've experienced before.",
          name: "John Davis",
          role: "Sales Director at TechCo",
          avatar: "https://picsum.photos/seed/johndavis/200/200.jpg",
        },
        {
          text: "An absolute game-changer for our team. We've cut production time in half while doubling our output quality. Highly recommended!",
          name: "Sarah Miller",
          role: "Lead Designer at PixelForge",
          avatar: "https://picsum.photos/seed/sarahmiller/200/200.jpg",
        },
        {
          text: "The seamless integration and intuitive interface meant our entire team was up and running in minutes. It's incredibly powerful yet simple.",
          name: "David Chen",
          role: "CTO at Innovatech",
          avatar: "https://picsum.photos/seed/davidchen/200/200.jpg",
        },
        {
          text: "Customer support is phenomenal. Whenever we had a question, the Framify team was there to help instantly. It feels like a true partnership.",
          name: "Emily Rodriguez",
          role: "Marketing Head at Brandify",
          avatar: "https://picsum.photos/seed/emilyr/200/200.jpg",
        },
        {
          text: "ROI was immediate. Framify paid for itself in the very first week of use. Our conversion rates have skyrocketed since implementation.",
          name: "Michael Chang",
          role: "CEO at StartupHub",
          avatar: "https://picsum.photos/seed/michaelchang/200/200.jpg",
        }
      ]
    };
  },
  mounted() {
    this.initScrollReveal();
    this.$nextTick(() => {
      this.initCountUp();
      this.initTilt();
      this.startAutoRotate();
    });
  },
  beforeUnmount() {
    if (this._observer) this._observer.disconnect();
    if (this._tiltHandler) {
      const card = this.$refs.featuredCard;
      if (card) {
        card.removeEventListener("mousemove", this._tiltHandler);
        card.removeEventListener("mouseleave", this._tiltReset);
      }
    }
    if (this.rotateTimer) clearInterval(this.rotateTimer);
  },
  methods: {
    startAutoRotate() {
      this.rotateTimer = setInterval(() => {
        this.nextReview();
      }, 5000);
    },
    nextReview() {
      this.currentReview = (this.currentReview + 1) % this.reviews.length;
    },
    goToReview(index) {
      this.currentReview = index;
      // Reset timer on manual navigation
      if (this.rotateTimer) clearInterval(this.rotateTimer);
      this.startAutoRotate();
    },
    particleStyle(i) {
      const size = 3 + (i % 4) * 2;
      const left = (i * 8.5) % 100;
      const top = (i * 13.7) % 100;
      const delay = (i * 0.7) % 6;
      const duration = 6 + (i % 5);
      return {
        width: size + "px",
        height: size + "px",
        left: left + "%",
        top: top + "%",
        animationDelay: delay + "s",
        animationDuration: duration + "s",
      };
    },
    initScrollReveal() {
      const items = this.$el.querySelectorAll(".reveal");
      items.forEach((el) => {
        el.classList.add("reveal-hidden");
      });

      this._observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = parseInt(el.dataset.delay || "0", 10);
              setTimeout(() => {
                el.classList.add("reveal-visible");
              }, delay);
              this._observer.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );

      items.forEach((el) => this._observer.observe(el));
    },
    initCountUp() {
      const numbers = this.$el.querySelectorAll(".stat-number");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateCount(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      numbers.forEach((n) => observer.observe(n));
    },
    animateCount(el) {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = (target * eased).toFixed(decimals);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(animate);
    },
    initTilt() {
      const card = this.$refs.featuredCard;
      if (!card) return;
      const wrap = this.$refs.centerCol;

      this._tiltHandler = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 8;
        const rotateY = (x - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        const shine = card.querySelector(".card-shine");
        if (shine) {
          shine.style.opacity = "1";
          shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(6, 196, 172, 0.15), transparent 60%)`;
        }
      };
      this._tiltReset = () => {
        card.style.transform = "";
        const shine = card.querySelector(".card-shine");
        if (shine) shine.style.opacity = "0";
      };

      wrap.addEventListener("mousemove", this._tiltHandler);
      wrap.addEventListener("mouseleave", this._tiltReset);
    },
  },
};
</script>

<style scoped>
/* ─── Base Reset ─── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ─── Section Wrapper ─── */
.testimonial-section {
  position: relative;
  background: #f8fafc;
  padding: 80px 24px 40px;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  isolation: isolate;
}

/* ─── Background Decorations ─── */
.bg-glow {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}
.bg-glow--left {
  background: #06c4ac;
  top: -180px;
  left: -160px;
  opacity: 0.15;
  animation: glow-drift-a 18s ease-in-out infinite;
}
.bg-glow--right {
  background: #067e73;
  bottom: -200px;
  right: -160px;
  opacity: 0.15;
  animation: glow-drift-b 22s ease-in-out infinite;
}
.bg-glow--center {
  width: 380px;
  height: 380px;
  background: #5eead4;
  top: 30%;
  left: 45%;
  opacity: 0.1;
  animation: glow-drift-c 16s ease-in-out infinite;
}

@keyframes glow-drift-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(60px, 80px) scale(1.1); }
}
@keyframes glow-drift-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-80px, -60px) scale(1.15); }
}
@keyframes glow-drift-c {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
  50% { transform: translate(-40%, -60%) scale(1.2); opacity: 0.2; }
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}

/* ─── Floating particles ─── */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(6, 126, 115, 0.4);
  box-shadow: 0 0 8px rgba(6, 196, 172, 0.4);
  opacity: 0;
  animation: particle-float linear infinite;
}
@keyframes particle-float {
  0% { opacity: 0; transform: translateY(20px) scale(0.5); }
  10% { opacity: 0.5; }
  90% { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-120px) scale(1.2); }
}

/* ─── Container ─── */
.testimonial-container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.9fr;
  gap: 32px;
  align-items: start;
}

/* ─── Reveal animations ─── */
.reveal-hidden {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-hidden[data-reveal="left"] { transform: translateX(-50px); }
.reveal-hidden[data-reveal="right"] { transform: translateX(50px); }
.reveal-hidden[data-reveal="up"] { transform: translateY(50px); }
.reveal-visible {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

/* ─── Left Column ─── */
.testimonial-left {
  padding-top: 20px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(6, 126, 115, 0.08);
  border: 1px solid rgba(6, 126, 115, 0.2);
  color: #067e73;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}
.section-badge::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(6, 196, 172, 0.2) 50%, transparent 70%);
  transform: translateX(-100%);
  animation: shimmer 4s ease-in-out infinite;
}
@keyframes shimmer {
  0%, 60% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #067e73;
  animation: pulse-dot 2s ease-in-out infinite;
}
.badge-ripple {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1.5px solid #067e73;
  animation: ripple 2s ease-out infinite;
}
@keyframes ripple {
  0% { transform: translateY(-50%) scale(1); opacity: 1; }
  100% { transform: translateY(-50%) scale(3); opacity: 0; }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(6, 126, 115, 0.5); }
  50% { opacity: 0.8; transform: scale(1.2); box-shadow: 0 0 0 6px rgba(6, 126, 115, 0); }
}

.section-title {
  font-family: "Oswald", sans-serif;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 500;
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #0f172a;
  margin-bottom: 20px;
}
.section-title .word {
  display: inline-block;
  margin-right: 0.25em;
  opacity: 0;
  transform: translateY(20px) rotate(2deg);
  animation: word-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.section-title .word:nth-child(1) { animation-delay: 0.1s; }
.section-title .word:nth-child(2) { animation-delay: 0.18s; }
.section-title .word:nth-child(3) { animation-delay: 0.26s; }
.section-title .word:nth-child(5) { animation-delay: 0.4s; }
.section-title .word:nth-child(6) { animation-delay: 0.48s; }
.section-title .word:nth-child(8) { animation-delay: 0.62s; }

@keyframes word-in {
  to { opacity: 1; transform: translateY(0) rotate(0); }
}

.text-accent {
  background: linear-gradient(135deg, #067e73 0%, #019e8e 55%, #06c4ac 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}
.text-accent::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #06c4ac, transparent);
  border-radius: 2px;
  opacity: 0.5;
  animation: underline-glow 3s ease-in-out infinite;
}
@keyframes underline-glow {
  0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
  50% { opacity: 0.8; transform: scaleX(1); }
}

.section-desc {
  font-size: 15px;
  line-height: 1.7;
  color: #64748b;
  max-width: 360px;
  margin-bottom: 36px;
}

/* ─── Stats ─── */
.stats-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.stats-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 12px 32px rgba(6, 196, 172, 0.08);
}
.stats-row::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(6, 196, 172, 0.08), transparent);
  animation: shine-pass 6s ease-in-out infinite;
}
@keyframes shine-pass {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.stat-number {
  font-family: "Oswald", sans-serif;
  font-size: 26px;
  color: #0f172a;
  line-height: 1;
}

.stat-stars { display: flex; gap: 2px; margin-bottom: 2px; }
.star {
  animation: twinkle 2.5s ease-in-out infinite;
  transform-origin: center;
  filter: drop-shadow(0 0 4px rgba(6, 196, 172, 0.4));
}
@keyframes twinkle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.85; }
}

.stat-label {
  font-size: 11px;
  color: #64748b;
  letter-spacing: 0.02em;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #e2e8f0;
}

/* ─── Center Column (Slider) ─── */
.testimonial-center {
  position: relative;
  perspective: 1000px;
}

.featured-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 40px 32px 60px; /* Extra padding for dots */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 20px 50px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

.featured-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 24px 60px rgba(6, 196, 172, 0.1);
}

.featured-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #067e73, #019e8e, #06c4ac, #019e8e, #067e73);
  background-size: 200% 100%;
  animation: gradient-flow 4s linear infinite;
}
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.card-shine {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  border-radius: 24px;
  z-index: 1;
}

.featured-quote-mark {
  font-family: Georgia, serif;
  font-size: 100px;
  line-height: 1;
  color: rgba(6, 126, 115, 0.1);
  position: absolute;
  top: 8px;
  left: 28px;
  user-select: none;
  animation: quote-bob 5s ease-in-out infinite;
}
@keyframes quote-bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(-3deg); }
}

.review-content {
  position: relative;
  z-index: 2;
  min-height: 220px; /* Prevent height jumping during transitions */
}

.featured-stars {
  display: flex;
  gap: 3px;
  margin-bottom: 16px;
}

.featured-text {
  font-size: 20px;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 28px;
}

.featured-author {
  display: flex;
  align-items: center;
  gap: 14px;
}

.author-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid rgba(6, 196, 172, 0.3);
  position: relative;
  z-index: 2;
}

.avatar-ring {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 1.5px solid rgba(6, 196, 172, 0.4);
  animation: ring-pulse 3s ease-in-out infinite;
}
.avatar-ring--2 {
  animation-delay: 1.5s;
  border-color: rgba(6, 196, 172, 0.2);
}
@keyframes ring-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.12); }
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.author-name {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}

.author-role {
  font-size: 13px;
  color: #64748b;
}

.featured-logo {
  margin-left: auto;
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.3s;
}
.featured-card:hover .featured-logo {
  opacity: 1;
  transform: scale(1.1) rotate(-5deg);
}

/* Slider Transitions */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Progress Bar */
.progress-track {
  position: absolute;
  bottom: 24px;
  left: 32px;
  right: 32px;
  height: 3px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #067e73, #06c4ac);
  transform-origin: left;
  animation: progress-shrink 5s linear forwards;
}
@keyframes progress-shrink {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* Navigation Dots */
.slider-dots {
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #cbd5e1;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.dot.active {
  background: linear-gradient(135deg, #067e73, #06c4ac);
  width: 24px;
  border-radius: 4px;
}

/* Floating Cards */
.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
  z-index: 3;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.floating-card--top {
  top: -16px;
  right: -20px;
  animation: float-y 4s ease-in-out infinite;
}
.floating-card--bottom {
  bottom: -16px;
  left: -16px;
  animation: float-y 4s ease-in-out infinite 1s;
}
@keyframes float-y {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(-1.5deg); }
}

.float-emoji {
  font-size: 16px;
  animation: rocket-shake 1.5s ease-in-out infinite;
}
@keyframes rocket-shake {
  0%, 100% { transform: rotate(-5deg) translateX(0); }
  50% { transform: rotate(5deg) translateX(2px); }
}

/* ─── Right Column (Infinite Scroller) ─── */
.testimonial-right {
  height: 500px; /* Fixed height for mask */
  display: flex;
  flex-direction: column;
}

.marquee-mask {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  position: relative;
}

.marquee-track {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: marquee-scroll 35s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); } /* Moves exactly half the container height (due to list duplication) */
}

.mini-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
  cursor: default;
  overflow: hidden;
  flex-shrink: 0; /* Prevent flexbox compression */
}

.mini-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(6, 196, 172, 0.12), transparent 50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.mini-card:hover {
  border-color: rgba(6, 196, 172, 0.4);
  transform: scale(1.02);
  box-shadow: 0 16px 40px rgba(6, 196, 172, 0.08);
}
.mini-card:hover .mini-card-glow {
  opacity: 1;
}

.mini-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
}

.mini-stars {
  display: flex;
  gap: 2px;
}

.mini-text {
  font-size: 14px;
  line-height: 1.65;
  color: #475569;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.mini-author {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(6, 196, 172, 0.3);
}

.mini-name {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
}

.mini-role {
  display: block;
  font-size: 11px;
  color: #64748b;
}

/* ─── Bottom Branding ─── */
.section-brand {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 64px;
  padding-top: 32px;
}

.brand-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
}

.brand-text {
  font-size: 12px;
  color: #64748b;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.brand-text strong {
  font-weight: 600;
  background: linear-gradient(135deg, #067e73, #06c4ac);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .testimonial-container {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .testimonial-left {
    grid-column: 1 / -1;
    padding-top: 0;
  }
  .stats-row {
    max-width: 480px;
  }
  .featured-card {
    transform: none !important;
  }
  .testimonial-right {
    grid-column: 1 / -1;
    height: 400px;
  }
}

@media (max-width: 768px) {
  .testimonial-section {
    padding: 60px 16px 32px;
  }
  .testimonial-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .section-title {
    font-size: 32px;
  }
  .stats-row {
    flex-wrap: wrap;
    gap: 16px;
  }
  .stat-divider {
    display: none;
  }
  .featured-text {
    font-size: 17px;
  }
  .floating-card {
    display: none;
  }
  .featured-card {
    transform: none !important;
  }
  .testimonial-right {
    height: 350px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal-hidden { opacity: 1; transform: none; }
  .marquee-track { animation: none; }
}
</style>