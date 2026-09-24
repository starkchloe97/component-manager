<template>
  <section class="section-bg">
    <div class="dot-grid"></div>

    <div class="layout">

      <!-- LEFT SLIDER -->
      <div class="slider-col fi left-col">
        <div class="scroll-left vp">
          <div class="scroll-track">
            <div
              v-for="item in [...leftCards, ...leftCards]"
              :key="item.uid"
              :class="['rc', item.dk ? 'dk' : '']"
            >
              <div :class="['card', item.dk ? 'dark' : 'light']">
                <div v-if="item.tg?.length" class="tags">
                  <span
                    v-for="tag in item.tg"
                    :key="tag"
                    :class="['pill', item.dk ? 'pill-dark' : 'pill-light']"
                  >{{ tag }}</span>
                </div>
                <div class="stars">
                  <i
                    v-for="s in 5"
                    :key="s"
                    data-lucide="star"
                    :class="['star-icon st', item.dk ? 'star-soft' : 'star-blue']"
                  ></i>
                </div>
                <p :class="['quote', item.dk ? 'quote-dark' : 'quote-light']">{{ item.q }}</p>
                <div :class="['author', item.dk ? 'author-dark' : 'author-light']">
                  <img
                    :src="item.img"
                    :class="['avatar av', item.dk ? 'avatar-dark' : 'avatar-light']"
                    :alt="item.n"
                    loading="lazy"
                  />
                  <div class="author-info">
                    <div :class="['author-name', item.dk ? 'name-dark' : 'name-light']">{{ item.n }}</div>
                    <div :class="['author-role', item.dk ? 'role-dark' : 'role-light']">{{ item.t }}, {{ item.c }} · {{ item.l }}</div>
                  </div>
                </div>
                <div class="bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CENTER -->
      <div class="center fi fi-1">
        <div class="mobile-badges">
          <span class="badge">Verified</span>
          <span class="badge">USPTO</span>
          <span class="badge badge-blue">4.9 ★</span>
        </div>

        <div class="orbit-box">
          <div class="pulse-bg"></div>
          <div class="ring ring1 ring-outer"></div>
          <div class="ring ring2 ring-mid"></div>
          <div class="ring ring1 ring-inner"></div>

          <div class="orbit-center">
            <div class="orbit-label">Average Rating</div>
            <div class="big-num shimmer">4.9</div>
            <div class="orbit-stars">
              <i v-for="s in 5" :key="s" data-lucide="star" class="orbit-star"></i>
            </div>
            <div class="orbit-sub">from <strong>2,500+</strong> reviews</div>
          </div>

          <div class="ring ring1 orbit-dots-outer">
            <div class="dot dot-blue-lg"></div>
            <div class="dot dot-blue-sm"></div>
          </div>
          <div class="ring ring2 orbit-dots-mid">
            <div class="dot dot-gray-right"></div>
            <div class="dot dot-gray-left"></div>
          </div>
        </div>

        <h2 class="heading">
          Satisfied Customers
        </h2>
        <p class="subtext">Trusted by over 10,000 businesses. Protect your intellectual property with confidence.</p>

        <div class="stats">
          <div class="stat">
            <div class="stat-num">2,500<span class="accent">+</span></div>
            <div class="stat-label">Filed</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-num">98<span class="accent">%</span></div>
            <div class="stat-label">Success</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-num">50</div>
            <div class="stat-label">States</div>
          </div>
        </div>

        <!-- <a href="#" class="cta">
          <span>Get Started Free</span>
          <i data-lucide="arrow-right" class="cta-arrow"></i>
        </a> -->

        <div class="desktop-badges">
          <span class="badge">Verified Reviews</span>
          <span class="badge">USPTO Registered</span>
          <span class="badge badge-blue">★ 4.9</span>
        </div>
      </div>

      <!-- RIGHT SLIDER -->
      <div class="slider-col fi fi-2 right-col">
        <div class="scroll-right vp">
          <div class="scroll-track">
            <div
              v-for="item in [...rightCards, ...rightCards]"
              :key="item.uid"
              :class="['rc', item.dk ? 'dk' : '']"
            >
              <div :class="['card', item.dk ? 'dark' : 'light']">
                <div v-if="item.tg?.length" class="tags">
                  <span
                    v-for="tag in item.tg"
                    :key="tag"
                    :class="['pill', item.dk ? 'pill-dark' : 'pill-light']"
                  >{{ tag }}</span>
                </div>
                <div class="stars">
                  <i
                    v-for="s in 5"
                    :key="s"
                    data-lucide="star"
                    :class="['star-icon st', item.dk ? 'star-soft' : 'star-blue']"
                  ></i>
                </div>
                <p :class="['quote', item.dk ? 'quote-dark' : 'quote-light']">{{ item.q }}</p>
                <div :class="['author', item.dk ? 'author-dark' : 'author-light']">
                  <img
                    :src="item.img"
                    :class="['avatar av', item.dk ? 'avatar-dark' : 'avatar-light']"
                    :alt="item.n"
                    loading="lazy"
                  />
                  <div class="author-info">
                    <div :class="['author-name', item.dk ? 'name-dark' : 'name-light']">{{ item.n }}</div>
                    <div :class="['author-role', item.dk ? 'role-dark' : 'role-light']">{{ item.t }}, {{ item.c }} · {{ item.l }}</div>
                  </div>
                </div>
                <div class="bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'
import avatar1 from '../../assets/avatar-1.png'
import avatar2 from '../../assets/avatar-2.png'
import avatar3 from '../../assets/avatar-3.png'
import avatar4 from '../../assets/avatar-4.png'
import avatar5 from '../../assets/avatar-5.png'

// LEFT SLIDER — uses your 5 uploaded avatars (cycled across the 6 cards).
const leftCards = ref([
  { n: 'Amanda Reynolds', t: 'Trademark Customer', dk: false, img: avatar1, q: " It’s really great to speak with a real person by phone who is based in the US. There was zero waiting time. Skilled and supportive. Made the TM process very simple. Recommended. " },
  { n: 'Andrew Taylor', t: 'Trademark Customer', dk: true, img: avatar2, q: "Excellent experience. The staff were extremely informed and offered strong professional expert clear detailed valuable practical insight into the trademark approval process." },
  { n: 'Rachel Bennett', t: 'Trademark Customer',dk: false, img: avatar3, q: " Skilled, dependable, simple to collaborate with and fairly priced services. Additionally, their consistent follow-up ensures every detail is completed correctly and efficiently." },
  { n: 'Ana Velez', t: 'Trademark Customer', dk: true, img: avatar4, q: " The group of professionals at this company are highly efficient and clearly describe the process with clear guidance for every step, which greatly simplifies the work. Thank you team! " },
  { n: 'Danielle Morrison', t: 'Trademark Customer', dk: false, img: avatar5, q: "This group is extremely detailed. They responded all my inquiries, handled my concerns, and kept me updated every stage of the process. Absolutely using their services again." },
  { n: 'Melissa Harding', t: 'Trademark Customer', dk: true, img: avatar1, q: "They have partnered with me to achieve compliance and keep my mind at ease. They are top tier; I have gained knowledge about the trademark registration process. " },
  { n: 'Christopher Hale', t: 'Trademark Customer', dk: true, img: avatar1, q: "This team is extremely detailed. They responded all my questions, resolved my concerns, and kept me updated through each step of the process. Using their services again. " }
].map((item, idx) => ({ ...item, uid: `left-${idx}` })))

// RIGHT SLIDER — uses your 5 uploaded avatars (cycled across the 6 cards).
const rightCards = ref([
   { n: 'Amanda Reynolds', t: 'Trademark Customer', dk: false, img: avatar1, q: " It’s really great to speak with a real person by phone who is based in the US. There was zero waiting time. Skilled and supportive. Made the TM process very simple. Recommended. " },
  { n: 'Andrew Taylor', t: 'Trademark Customer', dk: true, img: avatar2, q: "Excellent experience. The staff were extremely informed and offered strong professional expert clear detailed valuable practical insight into the trademark approval process." },
  { n: 'Rachel Bennett', t: 'Trademark Customer',dk: false, img: avatar3, q: " Skilled, dependable, simple to collaborate with and fairly priced services. Additionally, their consistent follow-up ensures every detail is completed correctly and efficiently." },
  { n: 'Ana Velez', t: 'Trademark Customer', dk: true, img: avatar4, q: " The group of professionals at this company are highly efficient and clearly describe the process with clear guidance for every step, which greatly simplifies the work. Thank you team! " },
  { n: 'Danielle Morrison', t: 'Trademark Customer', dk: false, img: avatar5, q: "This group is extremely detailed. They responded all my inquiries, handled my concerns, and kept me updated every stage of the process. Absolutely using their services again." },
  { n: 'Melissa Harding', t: 'Trademark Customer', dk: true, img: avatar1, q: "They have partnered with me to achieve compliance and keep my mind at ease. They are top tier; I have gained knowledge about the trademark registration process. " },
  { n: 'Christopher Hale', t: 'Trademark Customer', dk: true, img: avatar1, q: "This team is extremely detailed. They responded all my questions, resolved my concerns, and kept me updated through each step of the process. Using their services again. " }
].map((item, idx) => ({ ...item, uid: `right-${idx}` })))

onMounted(async () => {
  await nextTick()
  if (window.lucide) {
    window.lucide.createIcons()
  }
})
</script>
  
<style scoped>

.section-bg {
}

/* ══════════════════════════════════════
   BASE
   ══════════════════════════════════════ */
 .section-bg {
  position: relative;
  overflow: hidden;
  background: #F6F4EF;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

 .section-bg ::selection {
  background: #dbeafe;  
  color: #06080d;
}

 .dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #d1d5db 0.35px, transparent 0.35px);
  background-size: 18px 18px;
  opacity: 0.2;
  pointer-events: none;
}

 .divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
}

/* ══════════════════════════════════════
   LAYOUT — mobile-first: column stack
   ══════════════════════════════════════ */
 .layout {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 0 20px;
}

/* Desktop: 3-column row, viewport height */
@media (min-width: 1024px) {
   .layout {
    flex-direction: row;
    align-items: stretch;
    height: 100vh;
    padding: 0;
  }
}

/* ══════════════════════════════════════
   SLIDER COLUMNS
   ══════════════════════════════════════ */
 .slider-col {
  flex-shrink: 0;
  width: 100%;
  padding: 0;
}

 .left-col {
  order: 1;
  margin-bottom: 8px;
}

 .right-col {
  order: 2;
  margin-bottom: 0;
}

/* Tablet tweaks */
@media (min-width: 480px) {
   .left-col,
   .right-col {
    margin-bottom: 10px;
  }
}

/* Desktop: side columns */
@media (min-width: 1024px) {
   .slider-col {
    width: 27%;
  }
   .left-col {
    order: 0;
    margin-bottom: 0;
    padding: 40px 0 40px 24px;
  }
   .right-col {
    order: 0;
    margin-bottom: 0;
    padding: 40px 24px 40px 0;
  }
}

@media (min-width: 1280px) {
   .slider-col {
    width: 25%;
  }
   .left-col {
    padding-left: 32px;
  }
   .right-col {
    padding-right: 32px;
  }
}

/* ══════════════════════════════════════
   SCROLL TRACK — mobile: horizontal
   ══════════════════════════════════════ */
 .scroll-track {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

 .scroll-left .scroll-track {
  animation: goLeftH 40s linear infinite;
}

 .scroll-right .scroll-track {
  animation: goRightH 46s linear infinite;
}

/* Desktop: vertical scroll */
@media (min-width: 1024px) {
   .scroll-track {
    flex-direction: column;
  }
   .scroll-left .scroll-track {
    animation: goLeftV 40s linear infinite;
  }
   .scroll-right .scroll-track {
    animation: goRightV 46s linear infinite;
  }
}

/* Horizontal keyframes */
@keyframes goLeftH {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes goRightH {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

/* Vertical keyframes */
@keyframes goLeftV {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
@keyframes goRightV {
  from { transform: translateY(-50%); }
  to { transform: translateY(0); }
}

/* ══════════════════════════════════════
   VIEWPORT MASK — mobile: horizontal
   ══════════════════════════════════════ */
 .vp {
  overflow: hidden;
  border-radius: 12px;
  height: 230px;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
}

@media (min-width: 480px) {
   .vp {
    height: 240px;
  }
}

/* Desktop: vertical mask, full column height */
@media (min-width: 1024px) {
   .vp {
    height: 100%;
    border-radius: 16px;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%);
  }
}

 .vp:hover .scroll-track {
  animation-play-state: paused;
}

/* ══════════════════════════════════════
   CARD — mobile: fixed width for marquee
   ══════════════════════════════════════ */
 .rc {
  flex-shrink: 0;
  width: 268px;
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 375px) {
   .rc { width: 280px; }
}

@media (min-width: 480px) {
   .rc { width: 300px; }
}

@media (min-width: 640px) {
   .rc { width: 320px; }
}

/* Desktop: full width */
@media (min-width: 1024px) {
   .rc {
    width: auto;
  }
}

 .rc:hover {
  transform: translateY(-3px);
  box-shadow:
    0 14px 32px -10px rgba(6, 8, 13, 0.1),
    0 0 0 1px rgba(37, 99, 235, 0.06);
  z-index: 5;
}

 .card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  padding: 14px;
}

@media (min-width: 1024px) {
   .card {
    padding: 16px;
  }
}

 .card.light {
  background: #fff;
  border: 1px solid #f3f4f6;
}

 .card.dark {
  background: linear-gradient(135deg, #ff6d00, #ff9e40);;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

 .rc .bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #2563eb, #60a5fa);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

 .rc:hover .bar {
  transform: scaleX(1);
}

/* ══════════════════════════════════════
   TAGS
   ══════════════════════════════════════ */
 .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}

@media (min-width: 1024px) {
   .tags { margin-bottom: 8px; }
}

 .pill {
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;
}

 .pill-light {
  border: 1px solid #e5e7eb;
  color: #9ca3af;
}

 .pill-dark {
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.3);
}

 .pill:hover {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

/* ══════════════════════════════════════
   STARS
   ══════════════════════════════════════ */
 .stars {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
}

@media (min-width: 1024px) {
   .stars { margin-bottom: 10px; }
}

 .star-icon {
  width: 8px;
  height: 8px;
  transition: transform 0.2s;
}

 .star-blue {
  color: #2563eb;
  fill: #2563eb;
}

 .star-soft {
  color: #60a5fa;
  fill: #60a5fa;
}

 .rc:hover .st {
  transform: scale(1.12);
}

/* ══════════════════════════════════════
   QUOTE
   ══════════════════════════════════════ */
 .quote {
  font-size: 11.5px;
  line-height: 1.55;
  margin: 0 0 10px 0;
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 1024px) {
   .quote {
    font-size: 12px;
    line-height: 1.6;
    margin-bottom: 12px;
    -webkit-line-clamp: unset;
  }
}

 .quote-light { color: #6b7280; }
 .quote-dark { color: rgba(255, 255, 255, 0.85); }

/* ══════════════════════════════════════
   AUTHOR
   ══════════════════════════════════════ */
 .author {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
}

@media (min-width: 1024px) {
   .author { padding-top: 10px; }
}

 .author-light { border-top: 1px solid #f9fafb; }
 .author-dark { border-top: 1px solid rgba(255, 255, 255, 0.06); }

 .avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s;
}

@media (min-width: 1024px) {
   .avatar { width: 28px; height: 28px; }
}

 .avatar-light {
  border: 1px solid #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

 .avatar-dark {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

 .rc:hover .av {
  transform: scale(1.06);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}

 .rc.dk:hover .av {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.35);
}

 .author-info {
  min-width: 0;
}

 .author-name {
  font-size: 9.5px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1024px) {
   .author-name { font-size: 10px; }
}

 .name-light { color: #06080d; }
 .name-dark { color: #fff; }

 .author-role {
  font-size: 8.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1024px) {
   .author-role { font-size: 9px; }
}

 .role-light { color: #9ca3af; }
 .role-dark { color: rgba(255, 255, 255, 0.25); }

/* ══════════════════════════════════════
   CENTER — mobile: first in stack
   ══════════════════════════════════════ */
 .center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 0;
  order: 0;
  padding: 8px 20px 20px;
}

@media (min-width: 480px) {
   .center { padding: 12px 24px 24px; }
}

@media (min-width: 640px) {
   .center { padding: 16px 32px 28px; }
}

@media (min-width: 1024px) {
   .center {
    order: 0;
    padding: 0 20px;
  }
}

@media (min-width: 1280px) {
   .center { padding: 0 32px; }
}

/* ══════════════════════════════════════
   BADGES
   ══════════════════════════════════════ */
 .mobile-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

@media (min-width: 480px) {
   .mobile-badges { gap: 8px; margin-bottom: 14px; }
}

 .desktop-badges {
  display: none;
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  gap: 12px;
}

@media (min-width: 1024px) {
   .mobile-badges { display: none; }
   .desktop-badges { display: flex; }
}

 .badge {
  padding: 3px 10px;
  border-radius: 9999px;
  background: #fff;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9ca3af;
  white-space: nowrap;
}

@media (min-width: 480px) {
   .badge { padding: 4px 12px; font-size: 8px; }
}

@media (min-width: 1024px) {
   .badge { padding: 4px 12px; font-size: 8px; }
}

 .badge-blue {
  background: linear-gradient(135deg, #ff6d00, #ff9e40);;
  color: #fff;
  border-color:  linear-gradient(135deg, #ff6d00, #ff9e40);;
}

/* ══════════════════════════════════════
   ORBIT — scales across 4 breakpoints
   ══════════════════════════════════════ */
 .orbit-box {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  flex-shrink: 0;
}

 .big-num {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #06080d 35%, #ff9e40 50%, #06080d 65%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shm 5s ease-in-out infinite;
}

 .orbit-label {
  font-size: 6.5px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #d1d5db;
  margin-bottom: 1px;
}

 .orbit-star {
  width: 8px;
  height: 8px;
  color: #2563eb;
  fill: #2563eb;
}

 .orbit-sub {
  font-size: 8.5px;
  font-weight: 400;
  color: #9ca3af;
}

 .orbit-sub strong {
  color: #06080d;
  font-weight: 600;
}

 .orbit-stars {
  display: flex;
  align-items: center;
  gap: 1px;
  margin: 1px 0 4px;
}

/* Small phones */
@media (min-width: 375px) {
   .orbit-box {
    width: 180px;
    height: 180px;
    margin-bottom: 16px;
  }
   .big-num { font-size: 3.1rem; }
   .orbit-label { font-size: 7px; letter-spacing: 0.2em; }
   .orbit-star { width: 9px; height: 9px; }
   .orbit-sub { font-size: 9px; }
   .orbit-stars { margin: 2px 0 5px; }
}

/* Large phones / small tablets */
@media (min-width: 640px) {
   .orbit-box {
    width: 220px;
    height: 220px;
    margin-bottom: 18px;
  }
   .big-num { font-size: 4rem; }
   .orbit-label { font-size: 7.5px; }
   .orbit-star { width: 10px; height: 10px; }
   .orbit-sub { font-size: 9.5px; }
   .orbit-stars { margin: 2px 0 6px; gap: 2px; }
}

/* Desktop */
@media (min-width: 1024px) {
   .orbit-box {
    width: 260px;
    height: 260px;
    margin-bottom: 24px;
  }
   .big-num { font-size: 5rem; }
   .orbit-label { font-size: 8px; letter-spacing: 0.22em; margin-bottom: 2px; }
   .orbit-star { width: 12px; height: 12px; }
   .orbit-sub { font-size: 10px; }
   .orbit-stars { margin: 2px 0 8px; gap: 2px; }
}

/* Large desktop */
@media (min-width: 1280px) {
   .orbit-box {
    width: 300px;
    height: 300px;
  }
}

/* ── Orbit rings ── */
 .pulse-bg {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(219, 234, 254, 0.5);
  animation: pb 4s ease-in-out infinite;
}

@keyframes pb {
  0%, 100% { opacity: 0.12; transform: scale(1); }
  50% { opacity: 0.22; transform: scale(1.04); }
}

 .ring {
  position: absolute;
  border-radius: 50%;
}

 .ring-outer {
  inset: 0;
  border: 1px dashed rgba(37, 99, 235, 0.12);
}

 .ring-mid {
  inset: 14%;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

 .ring-inner {
  inset: 28%;
  border: 1px dotted #f3f4f6;
}

@media (min-width: 1024px) {
   .ring-mid { inset: 20px; }
   .ring-inner { inset: 40px; }
}

 .ring1 { animation: r1 28s linear infinite; }
 .ring2 { animation: r2 40s linear infinite; }

@keyframes r1 { to { transform: rotate(360deg); } }
@keyframes r2 { to { transform: rotate(-360deg); } }

@keyframes shm {
  0%, 100% { background-position: 250% 0; }
  50% { background-position: -250% 0; }
}

/* ── Orbit center circle ── */
 .orbit-center {
  position: relative;
  z-index: 10;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #f3f4f6;
  box-shadow:
    0 20px 25px -5px rgba(37, 99, 235, 0.05),
    0 8px 10px -6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ── Orbit dots ── */
 .orbit-dots-outer,
 .orbit-dots-mid {
  pointer-events: none;
}

 .dot {
  position: absolute;
  border-radius: 50%;
}

 .dot-blue-lg {
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #2563eb;
  box-shadow: 0 3px 5px rgba(37, 99, 235, 0.3);
}

 .dot-blue-sm {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 5px;
  height: 5px;
  background: rgba(96, 165, 250, 0.5);
}

 .dot-gray-right {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  width: 4px;
  height: 4px;
  background: rgba(209, 213, 219, 0.6);
}

 .dot-gray-left {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background: rgba(209, 213, 219, 0.6);
}

@media (min-width: 640px) {
   .dot-blue-lg { width: 7px; height: 7px; }
   .dot-blue-sm { width: 5px; height: 5px; }
   .dot-gray-right,
   .dot-gray-left { width: 5px; height: 5px; }
}

@media (min-width: 1024px) {
   .dot-blue-lg { width: 8px; height: 8px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3); }
   .dot-blue-sm { width: 6px; height: 6px; }
   .dot-gray-right,
   .dot-gray-left { width: 6px; height: 6px; }
}

/* ══════════════════════════════════════
   HEADING
   ══════════════════════════════════════ */
 .heading {
  font-size: 18px;
  font-weight: 600;
  color: #06080d;
  line-height: 1.18;
  letter-spacing: -0.01em;
  text-align: center;
  margin: 0 0 8px;
}

 .heading-sub {
  font-weight: 300;
  color: #9ca3af;
}

@media (min-width: 480px) {
   .heading { font-size: 20px; margin-bottom: 10px; }
}

@media (min-width: 640px) {
   .heading { font-size: 22px; margin-bottom: 10px; }
}

@media (min-width: 1024px) {
   .heading { font-size: 26px; margin-bottom: 12px; }
}

@media (min-width: 1280px) {
   .heading { font-size: 30px; }
}

 .subtext {
  font-size: 11px;
  color: #9ca3af;
  line-height: 1.6;
  text-align: center;
  max-width: 240px;
  margin: 0 0 16px;
  font-weight: 400;
}

@media (min-width: 480px) {
   .subtext { font-size: 11.5px; max-width: 260px; margin-bottom: 18px; }
}

@media (min-width: 1024px) {
   .subtext { font-size: 12px; line-height: 1.625; margin-bottom: 20px; }
}

/* ══════════════════════════════════════
   STATS
   ══════════════════════════════════════ */
 .stats {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 16px;
}

@media (min-width: 480px) {
   .stats { gap: 22px; margin-bottom: 18px; }
}

@media (min-width: 1024px) {
   .stats { gap: 24px; margin-bottom: 20px; }
}

 .stat {
  text-align: center;
}

 .stat-num {
  font-size: 16px;
  font-weight: 700;
  color: #06080d;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 480px) {
   .stat-num { font-size: 17px; }
}

@media (min-width: 1024px) {
   .stat-num { font-size: 18px; }
}

 .accent { color: #2563eb; }

 .stat-label {
  font-size: 6.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d1d5db;
  margin-top: 2px;
}

@media (min-width: 1024px) {
   .stat-label { font-size: 7px; }
}

 .stat-divider {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
}

@media (min-width: 1024px) {
   .stat-divider { height: 24px; }
}

/* ══════════════════════════════════════
   CTA
   ══════════════════════════════════════ */
 .cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background:  linear-gradient(135deg, #ff6d00, #ff9e40);;
  color: #fff;
  padding: 9px 20px;
  border-radius: 9999px;
  font-size: 11.5px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  white-space: nowrap;
}

@media (min-width: 480px) {
   .cta { padding: 10px 24px; font-size: 12px; }
}

@media (min-width: 1024px) {
   .cta { padding: 10px 24px; }
}

 .cta:hover {
  background: #0b1120;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

 .cta-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.3s;
}

 .cta:hover .cta-arrow {
  transform: translateX(4px);
}

/* ══════════════════════════════════════
   FADE IN
   ══════════════════════════════════════ */
 .fi {
  opacity: 0;
  transform: translateY(16px);
  animation: fiU 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

 .fi-1 { animation-delay: 0.1s; }
 .fi-2 { animation-delay: 0.2s; }

@keyframes fiU {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ══════════════════════════════════════
   EXTRA LARGE SCREENS
   ══════════════════════════════════════ */
@media (min-width: 1536px) {
   .layout {
    max-width: 1500px;
  }
}
</style>