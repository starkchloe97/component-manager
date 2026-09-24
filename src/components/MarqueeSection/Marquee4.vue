<script setup>
import xango from "@/assets/xango.svg";
import t2Image from "@/assets/t2.svg";
import t4Image from "@/assets/t4.svg";
import t5Image from "@/assets/t5.svg";
import t7Image from "@/assets/t7.svg";
import swiggi from "@/assets/swiggi.svg";

const logos = [
  { src: xango, alt: "Xango" },
  { src: t2Image, alt: "Trusted company 2" },
  { src: t4Image, alt: "Trusted company 3" },
  { src: t5Image, alt: "Trusted company 4" },
  { src: swiggi, alt: "Swiggy" },
  { src: t7Image, alt: "Trusted company 6" },
];
</script>

<template>
  <section class="logo-slider">
    <div class="container">
      <div class="marquee">
        <div class="marquee-track">
          <div class="marquee-group" aria-hidden="false">
            <div v-for="(logo, i) in logos" :key="'a-' + i" class="logo-item">
              <img :src="logo.src" :alt="logo.alt" class="logo-img" />
            </div>
          </div>
          <div class="marquee-group" aria-hidden="true">
            <div v-for="(logo, i) in logos" :key="'b-' + i" class="logo-item">
              <img :src="logo.src" :alt="logo.alt" class="logo-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.logo-slider {
  --background: #faf8ff;
  padding: 40px 0 56px 0;
  background: var(--background);
}

.marquee {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 8%,
    #000 92%,
    transparent 100%
  );
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}

.logo-img {
  height: 120px;
  width: auto;
  max-width: 130px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.45);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.logo-item:hover .logo-img {
  filter: grayscale(0%) opacity(1);
  transform: translateY(-1px);
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  .marquee {
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .logo-slider {
    padding: 0;
  }
  .logo-item {
    padding: 0 28px;
  }
  .logo-img {
    height: 80px;
  }
  .marquee-track {
    animation-duration: 20s;
  }
}
</style>