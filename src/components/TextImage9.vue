<template>
  <section class="types">
    <div class="container">
      <div class="types-grid">
        <div class="types-content fade-up">
          <span class="section-label">Types</span>
          <h2 class="section-title">What Can You Trademark?</h2>
          <p class="section-desc">
            Trademarks protect the distinctive elements that identify your brand
            and distinguish it from others in the market.
          </p>

          <div class="types-list">
            <div class="type-item is-1">
              <div class="type-icon-box">
                <Type class="type-icon" />
              </div>
              <div class="type-info">
                <div class="type-info__top">
                  <h4 class="type-name">Brand Names & Words</h4>
                  <span class="type-index">01</span>
                </div>
                <p class="type-desc">
                  Product names, company names, taglines, and any distinctive
                  word or phrase.
                </p>
              </div>
            </div>

            <div class="type-item">
              <div class="type-icon-box">
                <ImageIcon class="type-icon" />
              </div>
              <div class="type-info">
                <div class="type-info__top">
                  <h4 class="type-name">Logos & Designs</h4>
                  <span class="type-index">02</span>
                </div>
                <p class="type-desc">
                  Visual symbols, graphic designs, and stylized brand marks.
                </p>
              </div>
            </div>

            <div class="type-item is-2">
              <div class="type-icon-box">
                <Music class="type-icon" />
              </div>
              <div class="type-info">
                <div class="type-info__top">
                  <h4 class="type-name">Sounds & Scents</h4>
                  <span class="type-index">03</span>
                </div>
                <p class="type-desc">
                  Unique audio signatures, jingles, and in some cases
                  distinctive scents.
                </p>
              </div>
            </div>

            <div class="type-item">
              <div class="type-icon-box">
                <Palette class="type-icon" />
              </div>
              <div class="type-info">
                <div class="type-info__top">
                  <h4 class="type-name">Colors & Packaging</h4>
                  <span class="type-index">04</span>
                </div>
                <p class="type-desc">
                  Distinctive color schemes and trade dress that identify your
                  brand.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="types-visual fade-up">
          <div class="visual-grid">
            <div class="visual-col">
              <div class="visual-box orange">
                <img :src="wordmarkSample" alt="Brand wordmark example" class="visual-img" />
              </div>
              <div class="visual-box blue">
                <img :src="packagingSample" alt="Brand logo example" class="visual-img visual-img--contain img-none" />
              </div>
            </div>
            <div class="visual-col shifted">
              <div class="visual-box emerald">
                <img :src="soundSample" alt="Sound waveform example" class="visual-img visual-img--contain img-none"  />
              </div>
              <div class="visual-box violet">
                <img :src="logoSample" alt="Packaging color example" class="visual-img" />
              </div>
            </div>
          </div>
          <div class="visual-badge">
            <div class="badge-icon">
              <Check class="badge-svg" />
            </div>
            <div>
              <div class="badge-title">45+ Trademark Classes</div>
              <div class="badge-sub">Full coverage available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Type, Image as ImageIcon, Music, Palette, Check } from "@lucide/vue";

import wordmarkSample from "@/assets/VersionFive/wordmark-sample.png";
import logoSample from "@/assets/VersionFive/logo-sample.png";
import soundSample from "@/assets/VersionFive/corp-girl.jpg";
import packagingSample from "@/assets/VersionFive/corp-boy.jpg";

</script>

<style scoped>

.img-none{
  filter: none !important;
}
 .types {
  padding: 96px 0;
  /* background: var(--neutral-50); */
}

@media (min-width: 768px) {
   .types {
    padding: 128px 0;
  }
}

 .container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 24px;
}

 .types-grid {
  display: grid;
  gap: 64px;
  align-items: center;
}

@media (min-width: 768px) {
   .types-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 64px;
  }
}

 .section-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 9999px;
  border: 1px solid var(--brand-200);
  background: var(--brand-50);
  color: var(--brand-600);
}

 .section-title {
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--navy-950);
  margin-top: 16px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
   .section-title {
    font-size: 2.25rem;
  }
}

 .section-desc {
  color: var(--neutral-500);
  line-height: 1.625;
  margin-bottom: 36px;
}

 .types-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

 .type-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid transparent;
  cursor: default;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

 .type-item:hover {
  background: white;
  border-color: var(--neutral-200);
  transform: translateX(4px);
  box-shadow: 0 8px 20px -12px rgba(15, 23, 42, 0.15);
}

 .type-icon-box {
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 12px;
  border: 1px solid var(--neutral-200);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;
}

 .type-item:hover .type-icon-box {
  border-color: var(--brand-500);
  background: var(--brand-50);
}

 .type-icon {
  width: 20px;
  height: 20px;
  color: var(--neutral-400);
  transition: color 0.3s;
}

 .type-item:hover .type-icon {
  color: var(--brand-500);
}

 .type-info {
  flex: 1;
  min-width: 0;
}

 .type-info__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

 .type-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--navy-950);
  margin: 0;
}

 .type-index {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--neutral-300);
  flex-shrink: 0;
  transition: color 0.3s;
}

 .type-item:hover .type-index {
  color: var(--brand-400);
}

 .type-desc {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--neutral-500);
  margin: 0;
}

 .types-visual {
  position: relative;
}

 .visual-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

 .visual-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

 .visual-col.shifted {
  padding-top: 32px;
}

 .visual-box {
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

 .visual-box:hover {
  transform: translateY(-4px);
}

 .visual-box.orange {
  height: 12rem;
  background: linear-gradient(to bottom right, var(--brand-100), var(--brand-50));
  border: 1px solid var(--brand-200);
}

 .visual-box.blue {
  height: 16rem;
  background: linear-gradient(to bottom right, var(--blue-400), var(--navy-800));
  border: 1px solid var(--navy-800);
}

 .visual-box.emerald {
  height: 16rem;
  background: linear-gradient(to bottom right, var(--emerald-500), var(--emerald-400));
  border: 1px solid var(--emerald-500);
}

 .visual-box.violet {
  height: 12rem;
  background: linear-gradient(to bottom right, var(--violet-500), var(--violet-400));
  border: 1px solid var(--violet-500);
}

 .visual-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale();
}

/*  .visual-img--contain {
  width: 60%;
  height: 60%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.92;
} */

 .visual-badge {
  position: absolute;
  bottom: -24px;
  left: -24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid var(--neutral-100);
  display: flex;
  align-items: center;
  gap: 12px;
}

 .badge-icon {
  width: 40px;
  height: 40px;
  background: var(--brand-50);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

 .badge-svg {
  width: 20px;
  height: 20px;
  color: var(--brand-600);
}

 .badge-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--navy-950);
}

 .badge-sub {
  font-size: 0.75rem;
  color: var(--neutral-400);
}

 .type-item:hover,
 .type-item.is-1,
 .type-item.is-2 {
  background: white;
  border-color: var(--neutral-200);
  transform: translateX(4px);
  box-shadow: 0 8px 20px -12px rgba(15, 23, 42, 0.15);
}

 .type-item:hover .type-icon-box,
 .type-item.is-1 .type-icon-box,
 .type-item.is-2 .type-icon-box {
  border-color: var(--brand-500);
  background: var(--brand-50);
}

 .type-item:hover .type-icon,
 .type-item.is-1 .type-icon,
 .type-item.is-2 .type-icon {
  color: var(--brand-500);
}
</style>