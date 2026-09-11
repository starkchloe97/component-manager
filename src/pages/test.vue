  <template>
  <section ref="sectionRef" class="cta">
    <div class="container">
      <!-- Original reveal wrapper: <div class="scroll-reveal cta-card" :style="{ backgroundImage: `url(${img})` }"> -->
      <div class="cta-card" :style="{ backgroundImage: `url(${img})` }">
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        <div class="dots"></div>
        <div class="cta-overlay"></div>
        <div class="cta-inner">
          <span class="section-label">Free Trademark Search Included</span>
          <h2>Ready to get your <br />trademark registered?</h2>
          <p>
            Every day you wait is a day someone else could register your mark.
            Start your trademark application in minutes.
          </p>
          <div class="cta-buttons">
            <!-- Original PopUp component (not available or registered in this project):
            <PopUp
              buttonClass="btn-primary"
              trigger-text="Get Started"
            /> -->
            <button class="btn-primary" type="button" @click="handleStart">
              Get Started
            </button>
            <!-- Original RouterLink target: :to="{ name: 'trademarkregistration' }"
                 That named route is not defined in src/router/index.js. -->
            <a href="#" class="btn-outline cta-outline" @click.prevent="handleStart">
              <!-- Original Iconify icon (Iconify is not configured in this project):
              <span
                class="iconify"
                data-icon="lucide:phone"
                data-width="14"
              ></span> -->
              <Phone :size="14" aria-hidden="true" />
              Find out more
            </a>
            <!-- Original closing tag: </RouterLink> -->
          </div>
          <div class="cta-note">
            No commitment required · Free trademark search · Attorney-reviewed
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Phone } from "@lucide/vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
import { useToast } from "@/composables/VersionTwo/useToast.js";
import img from "@/assets/images/businessgirl.webp";

const sectionRef = ref(null);
useScrollReveal(sectionRef);
const { showToast } = useToast();

const handleStart = () => {
  showToast("Launching trademark search tool...");
};
</script>

<style scoped>
.cta {
  --surface: #ffffff;
  --brand: #0b55b6;
  --brand-mid: #1a6fd4;
  --font-display: "Inter Tight", sans-serif;
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
  .cta {
    padding: 128px 0;
  }
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
.cta-card {
  position: relative;
  min-height: 420px;
  background-color: #ffffff;
  background-position: left center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 24px;
  padding: 48px;
  overflow: hidden;
  text-align: right;
}
@media (min-width: 768px) {
  .cta-card {
    padding: 80px;
  }
}

/* Gradient overlay: transparent on the left (image visible),
   bright white on the right (behind the text) */
.cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent 0%, rgb(255 255 255) 49%, rgb(255 255 255) 29%, #fff 95%);
  z-index: 1;
}

.glow-1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, #0b55b6 0%, transparent 60%);
  filter: blur(60px);
  opacity: 0.1;
  transform: translate(30%, -30%);
  z-index: 1;
}
.glow-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a6fd4 0%, transparent 60%);
  filter: blur(60px);
  opacity: 0.1;
  transform: translate(-30%, 30%);
  z-index: 1;
}
.dots {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: radial-gradient(
    circle at 1px 1px,
    #000 1px,
    transparent 0
  );
  background-size: 24px 24px;
  z-index: 1;
}
.cta-inner {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin-left: auto;
}
.section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  margin-bottom: 16px;
}
.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand-mid);
  background: rgba(0, 0, 0, 0.05);
  padding: 8px 16px;
  border-radius: 9999px;
  margin-bottom: 32px;
}
.pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-mid);
}
.pulse-dot::before {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--brand-mid);
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.cta-inner h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #0a0a0a;
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .cta-inner h2 {
    font-size: 48px;
  }
}
.cta-inner p {
  font-size: 16px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  max-width: 500px;
  margin: 0 0 40px auto;
}
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 16px;
}
.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border: 1px solid transparent;
  border-radius: 9999px;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn-primary {
  background: #0b55b6;
  color: #ffffff;
}
.btn-primary:hover {
  transform: translateY(-2px);
  background: #083d82;
}
.cta-outline {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  color: #0a0a0a;
}
.cta-outline:hover {
  background: #0a0a0a;
  color: #fff;
  border-color: #0a0a0a;
}
.cta-note {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 32px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .cta {
    padding: 64px 0; 
  }
  .cta-card {
    padding: 48px 32px; 
    background-color: #0F1D33; /* Dark background requested */
    background-position: center;
    background-size: cover; 
    text-align: center; /* Centered text */
  }
  .cta-overlay {
    background: #0F1D33; /* Solid dark overlay so image blends into the dark bg */
  }
  .cta-inner {
    max-width: 100%;
    margin: 0 auto; /* Centers the content block */
  }
  .cta-inner h2 {
    font-size: 26px;
    line-height: 32px;
    color: #ffffff; /* Changed to white for dark background readability */
  }
  .cta-inner p {
    margin: 0 auto 40px; /* Centers the paragraph block */
    color: rgba(255, 255, 255, 0.7); /* Light text for dark background */
  }
  .cta-buttons {
    margin-left: 0;
    justify-content: center; /* Centers buttons */
  }
  .cta-note {
    color: rgba(255, 255, 255, 0.4); /* Light text for dark background */
  }
  /* Adjusting the outline button styles for the dark mobile background */
  .cta-outline {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
  }
  .cta-outline:hover {
    background: #ffffff;
    color: #0F1D33;
    border-color: #ffffff;
  }
}

/* Stack buttons neatly on very small screens */
@media (max-width: 480px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center; /* Keeps buttons centered */
  }
}
</style>
