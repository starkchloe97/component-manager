<template>
  <swiper
    :modules="[Pagination, Autoplay]"
    :slides-per-view="3"
    :space-between="0"
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 4000, disableOnInteraction: false }"
    :breakpoints="breakpoints"
    :loop="true"
    :a11y="{ prevSlideMessage: 'Previous benefit', nextSlideMessage: 'Next benefit' }"
    class="benefits-slider"
  >
    <swiper-slide v-for="(item, i) in benefits" :key="item.title">
      <article class="card">
        <!-- Background watermark number -->
        <span class="card__watermark" aria-hidden="true">{{ i + 1 }}</span>

        <!-- Left accent bar -->
        <span class="card__bar" aria-hidden="true"></span>

        <div class="card__body">
          <!-- Icon -->
          <div class="card__icon-wrap">
            <img
              :src="item.icon"
              width="26"
              height="26"
              :alt="item.title"
              class="card__icon"
            />
          </div>

          <!-- Category label -->
          <span class="card__label">{{ item.tag }}</span>

          <!-- Heading -->
          <h4 class="card__title">{{ item.title }}</h4>

          <!-- Divider -->
          <span class="card__rule" aria-hidden="true"></span>

          <!-- Description -->
          <p class="card__text">{{ item.description }}</p>

          <!-- Read-more cue -->
          <span class="card__cue" aria-hidden="true">
            <span class="card__cue-line"></span>
          </span>
        </div>
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
    tag: "COMMERCE",
    title: "Amazon Brand Registry",
    description:
      "Leverage your USPTO trademark filing to enroll in Amazon Brand Registry and unlock exclusive listing controls and protection tools.",
  },
  {
    icon: s2Image,
    tag: "REPUTATION",
    title: "Build Trust",
    description:
      "Recognized trademarks signal credibility and reliability, fostering consumer confidence and long-term brand goodwill.",
  },
  {
    icon: registeredb,
    tag: "PRESTIGE",
    title: "Use ® Symbol",
    description:
      "Display the registered symbol to publicly signal federal protection, reinforcing your brand's authority and legal standing.",
  },
  {
    icon: s4Image,
    tag: "PROTECTION",
    title: "Exclusive Rights",
    description:
      "Secure nationwide sole ownership with the legal power to prevent unauthorized use of your mark in any commercial context.",
  },
  {
    icon: s5Image,
    tag: "IDENTITY",
    title: "Brand Recognition",
    description:
      "A trademark sets your offerings apart from competitors, functioning as an enduring and efficient commercial identifier.",
  },
  {
    icon: s6Image,
    tag: "ASSET",
    title: "Creates Intangible Asset",
    description:
      "Your registered trademark becomes a transferable asset — sellable, licensable, franchisable, and usable as collateral.",
  },
];

const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 14 },
  640: { slidesPerView: 2, spaceBetween: 18 },
  1024: { slidesPerView: 3, spaceBetween: 24 },
};
</script>

<style scoped>
/* ==========================================================================
   SLIDER CONTAINER
   ========================================================================== */
.benefits-slider {
  width: 100%;
  overflow: hidden;
  padding: 56px 20px 0;
}

.benefits-slider :deep(.swiper-wrapper) {
  align-items: stretch;
}

.benefits-slider :deep(.swiper-slide) {
  height: auto;
  padding-bottom: 24px;
}

/* ==========================================================================
   CARD — SHELL
   ========================================================================== */
.card {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--neutral-200, #e5e5e5);
  border-left: none;
  border-radius: 0 14px 14px 0;
  height: 100%;
  overflow: hidden;
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease;
}

/* Left accent bar — static state */
.card__bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--brand-300, #fdba74);
  border-radius: 4px 0 0 4px;
  transition:
    width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s ease;
}

/* Hover state */
.card:hover {
  transform: translateY(-4px);
  border-color: var(--brand-100, #ffedd5);
  box-shadow:
    0 24px 48px -16px rgba(0, 0, 0, 0.08),
    0 8px 20px -8px rgba(0, 0, 0, 0.04);
}

.card:hover .card__bar {
  width: 5px;
  background: linear-gradient(
    180deg,
    var(--brand-400, #fb923c) 0%,
    var(--brand-600, #ea580c) 100%
  );
}

/* ==========================================================================
   WATERMARK NUMBER
   ========================================================================== */
.card__watermark {
  position: absolute;
  bottom: -8px;
  right: 8px;
  font-size: 96px;
  font-weight: 900;
  line-height: 1;
  color: var(--neutral-100, #f5f5f5);
  pointer-events: none;
  user-select: none;
  transition: color 0.4s ease;
  z-index: 0;
}

.card:hover .card__watermark {
  color: var(--brand-50, #fff7ed);
}

/* ==========================================================================
   CARD BODY
   ========================================================================== */
.card__body {
  position: relative;
  z-index: 1;
  padding: 28px 24px 24px 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* ==========================================================================
   ICON
   ========================================================================== */
.card__icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--brand-50, #fff7ed) 0%,
    #ffffff 100%
  );
  border: 1px solid var(--brand-100, #ffedd5);
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  flex-shrink: 0;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover .card__icon-wrap {
  border-color: var(--brand-200, #fed7aa);
  transform: scale(1.04);
}

.card__icon {
  width: 26px;
  height: 26px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(43%) sepia(95%) saturate(2500%)
    hue-rotate(359deg) brightness(95%) contrast(95%);
}

/* ==========================================================================
   CATEGORY LABEL
   ========================================================================== */
.card__label {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-500, #f97316);
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.card:hover .card__label {
  color: var(--brand-600, #ea580c);
}

/* ==========================================================================
   TITLE
   ========================================================================== */
.card__title {
  font-size: 17px;
  font-weight: 700;
  color: var(--navy-900, #1e293b);
  margin: 0 0 14px;
  line-height: 1.3;
  letter-spacing: -0.2px;
}

/* ==========================================================================
   DIVIDER RULE
   ========================================================================== */
.card__rule {
  display: block;
  width: 32px;
  height: 2px;
  border-radius: 2px;
  background: var(--neutral-200, #e5e5e5);
  margin-bottom: 14px;
  flex-shrink: 0;
  transition:
    width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.3s ease;
}

.card:hover .card__rule {
  width: 48px;
  background: var(--brand-300, #fdba74);
}

/* ==========================================================================
   DESCRIPTION
   ========================================================================== */
.card__text {
  font-size: 13.5px;
  color: var(--neutral-500, #737373);
  line-height: 1.7;
  margin: 0;
  flex-grow: 1;
}

/* ==========================================================================
   READ-MORE CUE (animated underline hint)
   ========================================================================== */
.card__cue {
  display: inline-flex;
  align-items: center;
  margin-top: 16px;
  height: 2px;
  flex-shrink: 0;
}

.card__cue-line {
  display: block;
  width: 0;
  height: 100%;
  border-radius: 2px;
  background: var(--brand-500, #f97316);
  transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover .card__cue-line {
  width: 40px;
}

/* ==========================================================================
   PAGINATION — Minimal dots
   ========================================================================== */
.benefits-slider :deep(.swiper-pagination) {
  position: relative !important;
  bottom: auto !important;
  margin-top: 64px;
  height: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.benefits-slider :deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--neutral-300, #d4d4d4);
  opacity: 1;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
}

.benefits-slider :deep(.swiper-pagination-bullet-active) {
  width: 28px;
  border-radius: 100px;
  background: var(--brand-500, #f97316);
  box-shadow: 0 2px 10px rgba(249, 115, 22, 0.35);
}
</style>