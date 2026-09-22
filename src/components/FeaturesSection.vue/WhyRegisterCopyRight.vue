<template>
  <swiper
    :modules="[Pagination, Autoplay]"
    :slides-per-view="3"
    :space-between="0"
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 3500, disableOnInteraction: false }"
    :breakpoints="breakpoints"
    :loop="true"
    :a11y="{ prevSlideMessage: 'Previous benefit', nextSlideMessage: 'Next benefit' }"
    class="benefits-swiper"
  >
    <swiper-slide v-for="(benefit, index) in benefits" :key="benefit.title">
      <article class="benefit-card">
        <!-- Decorative number -->
        <span class="benefit-card__number" aria-hidden="true">
          {{ String(index + 1).padStart(2, '0') }}
        </span>

        <!-- Icon -->
        <div class="benefit-card__icon">
          <img :src="benefit.icon" width="24" height="24" :alt="benefit.title + ' icon'" />
        </div>

        <!-- Content -->
        <h4 class="benefit-card__title">{{ benefit.title }}</h4>
        <p class="benefit-card__description">{{ benefit.description }}</p>
      </article>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import s1Image from "@/assets/s1.svg";
import s2Image from "@/assets/s2.svg";
import registeredb from "@/assets/registeredb.svg";
import s4Image from "@/assets/s4.svg";
import s5Image from "@/assets/s5.svg";
import s6Image from "@/assets/s6.svg";

const benefits = [
  {
    icon: s1Image,
    title: "Amazon Brand Registry",
    description:
      "Take advantage of your trademark filing with the USPTO by enrolling your brand on the Amazon Brand Registry to enjoy exclusive benefits.",
  },
  {
    icon: s2Image,
    title: "Build Trust",
    description:
      "People feel confident when they see recognized trademarks — they add measurable value by fostering consumer trust and long-term goodwill.",
  },
  {
    icon: registeredb,
    title: "Use ® Symbol",
    description:
      "Display the ® symbol beside your trademark to signal federal registration, reinforcing brand prestige and legal standing.",
  },
  {
    icon: s4Image,
    title: "Exclusive Rights",
    description:
      "Gain sole ownership of your trademark nationwide, with the legal authority to prevent unauthorized use across all U.S. commerce.",
  },
  {
    icon: s5Image,
    title: "Brand Recognition",
    description:
      "A trademark distinguishes your products and services from competitors — serving as a powerful, enduring commercial tool.",
  },
  {
    icon: s6Image,
    title: "Creates Intangible Asset",
    description:
      "A registered trademark becomes a transferable intangible asset that can be sold, licensed, franchised, or used as collateral.",
  },
];

const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 12 },
  640: { slidesPerView: 2, spaceBetween: 16 },
  1024: { slidesPerView: 3, spaceBetween: 24 },
};
</script>

<style scoped>
/* ==========================================================================
   SWIPER WRAPPER
   ========================================================================== */
.benefits-swiper {
  width: 100%;
  overflow: hidden;
  padding: 60px 24px 0;
}

.benefits-swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}

.benefits-swiper :deep(.swiper-slide) {
  height: auto;
  padding-bottom: 20px;
}

/* ==========================================================================
   CARD
   ========================================================================== */
.benefit-card {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--neutral-200, #e5e5e5);
  border-radius: 16px;
  padding: 32px 24px 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
    border-color 0.35s ease,
    box-shadow 0.35s ease;
  overflow: hidden;
}

/* Top accent line */
.benefit-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg, var(--brand-400, #fb923c), var(--brand-600, #ea580c));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.text-center {
    text-align: center;
}

/* Subtle corner glow on hover */
.benefit-card::after {
  content: "";
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--brand-100, #ffedd5) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.benefit-card:hover {
  transform: translateY(-5px);
  border-color: var(--brand-200, #fed7aa);
  box-shadow:
    0 20px 40px -12px rgba(0, 0, 0, 0.08),
    0 8px 16px -8px rgba(0, 0, 0, 0.04);
}

.benefit-card:hover::before {
  transform: scaleX(1);
}

.benefit-card:hover::after {
  opacity: 1;
}

/* ==========================================================================
   NUMBER BADGE
   ========================================================================== */
.benefit-card__number {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--neutral-300, #d4d4d4);
  line-height: 1;
  transition: color 0.3s ease;
  user-select: none;
}

.benefit-card:hover .benefit-card__number {
  color: var(--brand-300, #fdba74);
}

/* ==========================================================================
   ICON
   ========================================================================== */
.benefit-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-50, #fff7ed);
  border: 1px solid var(--brand-100, #ffedd5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex-shrink: 0;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.benefit-card:hover .benefit-card__icon {
  background: var(--brand-100, #ffedd5);
  border-color: var(--brand-200, #fed7aa);
  transform: scale(1.06);
}

.benefit-card__icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(43%) sepia(95%) saturate(2500%)
    hue-rotate(359deg) brightness(95%) contrast(95%);
  transition: filter 0.3s ease;
}

/* ==========================================================================
   TYPOGRAPHY
   ========================================================================== */
.benefit-card__title {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy-900, #1e293b);
  margin: 0 0 10px;
  line-height: 1.35;
  letter-spacing: -0.15px;
}

.benefit-card__description {
  font-size: 13.5px;
  color: var(--neutral-600, #525252);
  line-height: 1.7;
  margin: 0;
  flex-grow: 1;
}

/* ==========================================================================
   PAGINATION
   ========================================================================== */
.benefits-swiper :deep(.swiper-pagination) {
  position: relative !important;
  bottom: auto !important;
  margin-top: 72px;
  height: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.benefits-swiper :deep(.swiper-pagination-bullet) {
  width: 28px;
  height: 4px;
  border-radius: 100px;
  background: var(--neutral-200, #e5e5e5);
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.benefits-swiper :deep(.swiper-pagination-bullet-active) {
  width: 44px;
  background: var(--brand-500, #f97316);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}
</style>