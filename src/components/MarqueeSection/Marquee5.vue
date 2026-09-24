<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import xango from "@/assets/xango.svg";
import t2Image from "@/assets/t2.svg";
import t4Image from "@/assets/t4.svg";
import t5Image from "@/assets/t5.svg";
import t7Image from "@/assets/t7.svg";
import swiggi from "@/assets/swiggi.svg";

const logos = [
  { src: xango, alt: "Trusted Company 1" },
  { src: t2Image, alt: "Trusted Company 2" },
  { src: t4Image, alt: "Trusted Company 3" },
  { src: t5Image, alt: "Trusted Company 4" },
  { src: swiggi, alt: "Trusted Company 5" },
  { src: t7Image, alt: "Trusted Company 6" },
];

const trackRef = ref(null);
const firstListRef = ref(null);
const marqueeWidth = ref(0);
const ready = ref(false);
const restartKey = ref(0); // 👈 bumping this forces a clean remount instead of a live retime
const speed = 60;

let ro = null;
let settleTimer = null;

function measure() {
  if (!firstListRef.value) return 0;
  return Math.round(firstListRef.value.getBoundingClientRect().width);
}

function waitForImages(container) {
  const imgs = container.querySelectorAll("img");
  const promises = Array.from(imgs).map((img) => {
    if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  });
  return Promise.all(promises);
}

function applyWidth(newWidth) {
  if (!newWidth || newWidth === marqueeWidth.value) return;
  marqueeWidth.value = newWidth;
  restartKey.value++; // remount the animated node fresh, no mid-flight retime
}

onMounted(async () => {
  await nextTick();
  await waitForImages(trackRef.value);
  marqueeWidth.value = measure();
  await nextTick();
  ready.value = true;

  // Ignore layout noise from the rest of the page (fonts, hero image,
  // scrollbar toggling, etc.) for a couple seconds after start, then
  // resync once things have actually settled.
  settleTimer = setTimeout(() => applyWidth(measure()), 2200);

  if (window.ResizeObserver && firstListRef.value) {
    ro = new ResizeObserver(() => applyWidth(measure()));
    ro.observe(firstListRef.value);
  }
});

onBeforeUnmount(() => {
  ro?.disconnect();
  clearTimeout(settleTimer);
});
</script>

<template>
  <section class="icons-1">
    <div class="col-md-12 text-center">
      <div class="logo-marquee">
        <div
          class="logo-track"
          :key="restartKey"
          ref="trackRef"
          :class="{ 'is-ready': ready }"
          :style="{
            '--marquee-distance': marqueeWidth ? `${marqueeWidth}px` : '0px',
            animationDuration: marqueeWidth ? `${marqueeWidth / speed}s` : '0s'
          }"
        >
          <ul class="trusted-logos" ref="firstListRef">
            <li v-for="(logo, i) in logos" :key="'a-' + i" class="first">
              <img class="trusted-img" :src="logo.src" :alt="logo.alt" width="140" height="100" />
            </li>
          </ul>
          <ul class="trusted-logos" ref="firstListRef">
            <li v-for="(logo, i) in logos" :key="'a-' + i" class="first">
              <img class="trusted-img" :src="logo.src" :alt="logo.alt" width="140" height="100" />
            </li>
          </ul>
          <ul class="trusted-logos" aria-hidden="true">
            <li v-for="(logo, i) in logos" :key="'b-' + i" class="first">
              <img class="trusted-img" :src="logo.src" :alt="logo.alt" width="140" height="100" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  
</template>

<style scoped>


.icons-1 {
  padding: 40px 0 0px;
}

.logo-marquee {
  position: relative;
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.logo-track {
  display: flex;
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);

  /* 👇 stay paused and invisible until measurement is done */
  opacity: 0;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  transition: opacity 300ms ease;
}

.logo-track.is-ready {
  opacity: 1;
  animation-play-state: running;
}

.logo-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(calc(-1 * var(--marquee-distance, 0px)), 0, 0);
  }
}

.trusted-logos {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 64px;
  padding: 0 32px;
  margin: 0;
}

.trusted-logos li {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trusted-img {
  height: 100px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.45);
  transition:
    filter 400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.trusted-img:hover {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.06);
}

@media (max-width: 768px) {
  .trusted-img {
    height: 60px;
  }
  .trusted-logos {
    gap: 40px;
  }
}
</style>  