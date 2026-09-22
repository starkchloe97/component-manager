<script setup>
import magniImage from "@/assets/magni.svg";
import lawImage from "@/assets/law.svg";
import dollarsImage from "@/assets/dollars.svg";
</script>

<template>
  <div class="fluid-container dark_blue">
    <div class="container">
        <h2>Why conduct a comprehensive trademark search</h2>
        <p>
          Make sure your anticipated mark is available before you apply for
          trademark registration.
        </p>
      <div class="row ">
      
      </div>
      <div class="row ">
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="lawImage" alt="Avoid getting sued" />
            <h3>Avoid getting sued</h3>
            <p>
              Protect yourself from lawsuits and heavy fines by making sure you
              don't end up infringing someone else's trademark unintentionally.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="magniImage" alt="Remove doubts before filing" />

            <h3>Remove doubts before filing</h3>
            <p>
              Our search report unveils potentially conflicting trademarks at a
              state, federal, or international level so you can feel confident
              about your mark before filing.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="dollarsImage" alt="Save time and money" />
            <h3>Save time and money</h3>
            <p>
              Before you invest your time and money into your business, see if
              anyone else has registered or filed a trademark that's similar to
              yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fluid-container.dark_blue {
  background: var(--navy-950);
  padding: 60px 24px;
  position: relative;
  overflow: hidden;
}

.row {
    display: flex;
    margin: 0 -1rem;
}

.row div{
    padding: 0px 10px;
}

.dark_blue h2{ color: #fff; text-align: center; font-size: 28px; margin-bottom: 12px; }
.dark_blue p{ color: var(--neutral-500); text-align: center; font-size: 14px; margin-bottom: 40px; }

/* Minimal dot grid */
.fluid-container.dark_blue::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ========== Header ========== */
.row.mb-4 {
  text-align: center;
  max-width: 520px;
  margin: 0 auto 36px;
}

.row.mb-4 h2 {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.row.mb-4 p {
  font-size: 14px;
  color: var(--neutral-500);
  line-height: 1.6;
  margin: 0;
}

/* ========== Cards Grid ========== */
.row.gy-4 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* ========== Card ========== */
.inner-conduct {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px 20px !important;
  text-align: center;
  transition: all 0.25s ease;
  position: relative;
      min-height: 182px;
}

.inner-conduct:hover {
  border-color: rgba(249, 115, 22, 0.2);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

/* ========== Icon ========== */
.inner-conduct img {
  width: 25px;
  height: 25px;
  margin-bottom: 14px;
  filter: brightness(0) invert(1) opacity(0.5);
  transition: all 0.25s ease;
}

.inner-conduct:hover img {
  filter: brightness(0) invert(0.6) sepia(1) saturate(5) hue-rotate(0deg);
  opacity: 1;
}

/* ========== Text ========== */
.inner-conduct h3 {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.1px;
}

.inner-conduct p {
  font-size: 13px;
  color: var(--neutral-500);
  line-height: 1.6;
  margin: 0;
}

/* ========== Responsive ========== */
@media (max-width: 991px) {
  .row.gy-4 {
    gap: 12px;
  }

  .inner-conduct {
    padding: 20px 16px;
  }

  .row.mb-4 {
    margin-bottom: 32px;
  }

  .row.mb-4 h2 {
    font-size: 24px;
  }
}

@media (max-width: 767px) {
  .fluid-container.dark_blue {
    padding: 44px 16px;
  }

  .row.gy-4 {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .inner-conduct {
    padding: 16px;
    display: grid;
    grid-template-columns: 36px 1fr;
    grid-template-rows: auto auto;
    gap: 0 12px;
    text-align: left;
    border-radius: 10px;
  }

  .inner-conduct img {
    grid-row: 1 / 3;
    width: 36px;
    height: 36px;
    margin-bottom: 0;
  }

  .inner-conduct h3 {
    align-self: end;
    margin-bottom: 3px;
    font-size: 14px;
  }

  .inner-conduct p {
    grid-column: 2;
    font-size: 12px;
    line-height: 1.55;
  }

  .row.mb-4 {
    margin-bottom: 24px;
  }

  .row.mb-4 h2 {
    font-size: 20px;
  }

  .row.mb-4 p {
    font-size: 13px;
  }
}
</style>
