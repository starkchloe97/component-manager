<template>
  <section ref="sectionRef" class="testimonials">
    <div class="container">
      <div class="header scroll-reveal">
        <div class="header-content">
          <div>
            <span class="section-label">Testimonials</span>
            <h2 class="section-title">Trusted by thousands of businesses</h2>
          </div>
          <div class="nav-controls">
            <button class="nav-btn" @click="swiperInstance?.slidePrev()">
              <ArrowLeft :size="18" />
            </button>
            <button class="nav-btn" @click="swiperInstance?.slideNext()">
              <ArrowRight :size="18" />
            </button>
          </div>
        </div>
      </div>

      <div class="slider-wrapper scroll-reveal">
        <swiper
          :modules="modules"
          :slides-per-view="1.15"
          :space-between="20"
          :centered-slides="true"
          :loop="true"
          :loop-add-blank-slides="false"
          :loop-prevent-sliding="false"
          :grab-cursor="true"
          :speed="700"
          :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :pagination="{ clickable: true }"
          :breakpoints="{
            640: { slidesPerView: 1.3, spaceBetween: 20 },
            768: { slidesPerView: 1.8, spaceBetween: 24 },
            1024: { slidesPerView: 2.2, spaceBetween: 24 },
          }"
          @swiper="onSwiper"
          class="testimonial-swiper"
        >
          <swiper-slide v-for="(t, i) in testimonials" :key="i">
            <div class="card">
              <div class="stars">
                <span
                  v-for="s in 5"
                  :key="s"
                  class="iconify"
                  data-icon="mdi:star"
                  data-width="20"
                ></span>
              </div>
              <p class="quote">"{{ t.quote }}"</p>
              <div class="author">
                <div class="avatar">{{ t.initials }}</div>
                <div>
                  <div class="name">{{ t.name }}</div>
                  <div class="role">{{ t.role }}</div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useScrollReveal } from "@/composables/useScrollReveal";
import { ArrowLeft, ArrowRight } from '@lucide/vue';

const modules = [Pagination, Autoplay];

const sectionRef = ref(null);
useScrollReveal(sectionRef);

const swiperInstance = ref(null);
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const testimonials = [
  {
    initials: "DM",
    name: "Danielle Morrison",
    role: "Trademark Customer",
    quote:
      " This group is extremely detailed. They responded all my inquiries, handled my concerns, and kept me updated every stage of the process, Absolutely using their services again.",
  },
  {
    initials: "CH",
    name: "Christopher Hale",
    role: "Trademark Customer",
    quote:
      "This team is extremely detailed. They responded all my questions, resolved my concerns, and kept me updated through each step of the process. Using their services again.",
  },
  {
    initials: "AR",
    name: "Amanda Reynolds",
    role: "Trademark Customer",
    quote:
      "It's really great to speak with a real person by phone who is based in the US. There was zero waiting time.Skilled and supportive.Made the TM process very simple. Recommended.",
  },
  // Duplicate for smooth looping with centeredSlides
  {
    initials: "DM",
    name: "David Miller",
    role: "Trademark Customer",
    quote:
      "The people I have worked with are professional, knowledgeable, and consistently go beyond expectations to help you handle your trademark registration with ease.",
  },
  {
    initials: "RB",
    name: "Rachel Bennett",
    role: "Trademark Customer",
    quote:
      "Skilled, dependable, simple to collaborate with, and fairly priced services. Additionally, their consistent follow-up ensures every detail is completed correctly and efficiently.",
  },
  {
    initials: "MH",
    name: "Melissa Harding",
    role: "Trademark Customer",
    quote:
      "They have partnered with me to achieve compliance and keep my mind at ease. They are top tier; I have gained knowledge about the trademark registration process.",
  },
  {
    initials: "AV",
    name: "Ana Velez",
    role: "Trademark Customer",
    quote:
      "The group of professionals at this company are highly efficient and clearly describe the process with clear guidance for every step, which greatly simplifies the work. Thank you team!",
  },
  {
    initials: "AT",
    name: "Andrew Taylor",
    role: "Trademark Customer",
    quote:
      "Excellent experience. The staff were extremely informed and offered strong professional expert clear detailed valuable practical insight into the trademark approval process.",
  },
];
</script>

<style scoped>
.testimonials {
  padding: 96px 0;
  background: rgba(232, 240, 251, 0.4);
  overflow: hidden;
}


.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Header ── */
.header {
  margin-bottom: 56px;
}
.header-content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}


.section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #0b55b6;
  margin-bottom: 16px;
}
.section-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 0.95;
  letter-spacing:-0.04em;
}



/* ── Navigation Buttons ── */
.nav-controls {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(15, 29, 51, 0.7);
  transition: all 0.25s ease;
}
.nav-btn:hover {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
  transform: scale(1.05);
}
.nav-btn:active {
  transform: scale(0.95);
}
.nav-btn svg {
  flex-shrink: 0;
  color: rgba(15, 29, 51, 0.7);
}

.nav-btn:hover svg {
  color: #fff;
}

/* ── Swiper Slide Transitions ── */
.testimonial-swiper {
  padding-bottom: 60px;
  overflow: visible;
}
.testimonial-swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}
.testimonial-swiper .swiper-slide {
  height: auto;
  opacity: 0.35;
  transform: scale(0.88);
  transition:
    opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.testimonial-swiper .swiper-slide-active {
  opacity: 1;
  transform: scale(1);
}
.testimonial-swiper .swiper-slide-prev,
.testimonial-swiper .swiper-slide-next {
  opacity: 0.55;
  transform: scale(0.93);
}

/* ── Card ── */
.card {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    box-shadow 0.4s ease,
    border-color 0.4s ease;
}
.swiper-slide-active .card {
  box-shadow:
    0 12px 40px rgba(37, 99, 235, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
  border-color: rgba(37, 99, 235, 0.15);
}

/* Decorative quote mark */
.card::before {
  content: "\201C";
  position: absolute;
  top: -12px;
  right: 20px;
  font-family: var(--font-display);
  font-size: 140px;
  font-weight: 700;
  color: var(--brand);
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* ── Card Content ── */
.stars {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
}
.stars .iconify {
  color: #0b55b6;
}
.quote {
  font-size: 14px;
  font-weight: 300;
  color: rgba(15, 29, 51, 0.8);
  line-height: 1.65;
  margin-bottom: auto;
  flex-grow: 1;
}
.author {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
  margin-top: 24px;
  border-top: 1px solid #d4e0f0;
}
.stars .iconify {
  color: #F5A623;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e8f0fb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter Tight", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #0b55b6;
  flex-shrink: 0;
}
.name {
  font-weight: 500;
  font-size: 14px;
}
.role {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

/* ── Pagination ── */
.testimonial-swiper :deep(.swiper-pagination) {
  position: relative;
  bottom: auto !important;
  margin-top: 8px;
}
.testimonial-swiper :deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: rgba(15, 29, 51, 0.15);
  opacity: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.testimonial-swiper :deep(.swiper-pagination-bullet-active) {
  background: #0b55b6;
  width: 28px;
  border-radius: 4px;
}
.testimonial-swiper :deep(.swiper-pagination-bullet:hover) {
  background: rgba(37, 99, 235, 0.4);
}



@media (max-width: 768px) {

    .section-title {
        font-size: 28px;
        line-height: 32px;
        max-width: 77%;
        margin: 0 auto;
    }
  .testimonials {
    padding: 75px 0 0px 0;
  }
   .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-content {
 
    gap: 0px;
}

.header {
    margin-bottom: 16px;
}

.nav-controls {display: none;}
}
</style>
