<template>
  <section class="copyright-section">
    <div class="container">
      <div class="copyright-header">
        <span class="eyebrow">Protect your work</span>
        <h2 class="display-lg">
          What you can
          <span class="text-gradient">copyright</span>
        </h2>
      </div>

      <div class="copyright-grid">
        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="gallery1Image" width="32" height="32" alt="" />
          </div>
          <h4>Photos</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="openBookImage" width="32" height="32" alt="" />
          </div>
          <h4>Books</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="musicNoteImage" width="32" height="32" alt="" />
          </div>
          <h4>Songs</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="filmRollImage" width="32" height="32" alt="" />
          </div>
          <h4>Films</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="artPaletteImage" width="32" height="32" alt="" />
          </div>
          <h4>Art</h4>
        </div>

        <div class="copyright-item">
          <div class="copyright-icon">
            <img :src="creativityImage" width="32" height="32" alt="" />
          </div>
          <h4>Other creative work</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gallery1Image from "@/assets/gallery-1.svg";
import openBookImage from "@/assets/open-book.svg";
import musicNoteImage from "@/assets/music-note-yellow.svg";
import filmRollImage from "@/assets/film-roll-1.svg";
import artPaletteImage from "@/assets/art-palette.svg";
import creativityImage from "@/assets/creativity-yellow.svg";
</script>

<style scoped>
.copyright-section {
  --surface-container-low: #f2f3ff;
  --radius-2xl: 1rem;
  --radius-card: 2rem;
  --primary: #003dc7bd;
  --on-surface: #131b2e;
}

.copyright-section {
  padding: 80px 0;
}

.container{
  max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

}

.eyebrow {
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color: var(--primary);
    margin-bottom: 14px;
}
.display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
    margin-top: 15px;
}

.text-gradient {
    background: linear-gradient(135deg, #003ec7 0%, #003ec7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 200;
}

.copyright-header {
  text-align: center;
  max-width: 560px;
  margin: 0 auto 48px auto;
}

.copyright-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.copyright-item {
  background: #fff;
  border-radius: var(--radius-card);
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.copyright-item:hover {
  box-shadow: 0 24px 56px rgba(19, 27, 46, 0.1);
  transform: translateY(-5px);
}

.copyright-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-2xl);
  background: var(--surface-container-low);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.copyright-item h4 {
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--on-surface);
}

@media (max-width: 900px) {
  .copyright-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

@media (max-width: 640px) {
  .copyright-section {
    padding: 56px 0;
  }
  .copyright-item {
    padding: 22px 12px;
  }
  .copyright-icon {
    width: 56px;
    height: 56px;
    margin-bottom: 14px;
  }
}
</style>