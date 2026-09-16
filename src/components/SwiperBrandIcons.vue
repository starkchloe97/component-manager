<template>
  <swiper
    ref="brandsSwiper"
    :modules="modules"
    effect="creative"
    :creativeEffect="{
      prev: {
        opacity: 0,
        translate: [0, 0, 0],
      },
      next: {
        opacity: 0,
        translate: [0, 0, 0],
      },
    }"
    :virtualTranslate="true" 
    :loop="true" 
    :slides-per-view="2"
    :space-between="20"
    :speed="1200"
    :centered-slides="false"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :breakpoints="breakpoints"
    class="brands-icons-swiper"
  >
    <swiper-slide v-for="(badge, index) in badges" :key="index" class="slide">
      <div class="info-ser">
        <div class="img-ser">
          <img
            class="trusted-img"
            :src="badge"
            :alt="`Trusted Company ${index + 1}`"
          />
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative"; 

import badge1 from "@/assets/badges-01.png";
import badge2 from "@/assets/badges-02.png";
import badge3 from "@/assets/badges-03.png";
import badge4 from "@/assets/badges-04.png";
import badge5 from "@/assets/badges-05.png";
import badge6 from "@/assets/badges-06.png";

const modules = [Autoplay, Pagination, EffectCreative]; 

const badges = [badge1, badge2, badge3, badge4, badge5, badge6];
const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  640: {
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  1024: {
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
};
</script>

<style scoped>
.v-one .trusted-img {
  width: 100%;
  height: 85px;
  object-fit: scale-down;
}

.v-one .brands-icons-swiper {
  width: 38%;
  max-width: 1100px;
  margin: 0px 0 0 0;
  position: absolute;
  top: 20%;
  right: -90px;
}

.v-one .brands-icons-swiper .slide {
  height: auto;
}

.v-one .brands-icons-swiper .info-ser {
  padding: 0px;
  border: none;
  margin: 0px;
  text-align: center;
}

.v-one .brands-icons-swiper .img-ser {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Deep selectors scoped to this swiper */
.v-one .brands-icons-swiper :deep(.swiper-wrapper) {
  height: 120px;
}

.v-one .brands-icons-swiper :deep(.swiper-pagination) {
  bottom: -5px !important;
  padding: 10px 0;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-one .brands-icons-swiper :deep(.swiper-pagination-bullet) {
  width: 60px;
  height: 3px;
  background-color: #8787877a;
  opacity: 0.7;
  margin: 0 6px;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  border-radius: 0px;
}

.v-one .brands-icons-swiper :deep(.swiper-pagination-bullet)::before {
  content: "";
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: 0;
  right: 0;
  background: transparent;
}

.v-one .brands-icons-swiper :deep(.swiper-pagination-bullet-active) {
  background-color: #0b55b6;
  opacity: 1;
}

@media (max-width: 1400px) {
  .v-one .brands-icons-swiper :deep(.swiper-wrapper) {
    height: 90px;
  }
}

@media (max-width: 767px) {
  .v-one .brands-icons-swiper {
    width: 50%;
    max-width: 1100px;
    margin: 40px 0 30px 0;
  }

  .v-one .brands-icons-swiper :deep(.swiper-wrapper) {
    height: 110px;
  }
}
</style>
