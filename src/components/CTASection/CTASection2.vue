<script setup>
import { Rocket } from '@lucide/vue'
import { useToast } from '../../composables/useToast.js'
import { useComponentStyles } from "@/composables/useComponentStyles";
const { showToast } = useToast()

const handleStart = () => {
    showToast('Launching trademark search tool...')
}

const styles = useComponentStyles("CTA", {
  primary: "#ff6d00",
  background: "#ff9e40",
  surface: "#ffffff",
  pdtop: "64px",
  pdbottom: "64px",
  pdleft: "0px",
  pdright: "0px",
  fontSize: "clamp(26px, 3vw, 38px)",
  fontSizeBody: "16px",
  muted: "rgba(255, 255, 255, 0.7)",
  shadow: "rgba(255, 109, 0, 0.4)",
  shadowHover: "rgba(255, 109, 0, 0.5)"
});

</script>

<template>
    <section class="cta-section">
        <div class="cta-box animate-on-scroll">
            <div class="cta-title">Ready to Protect Your Brand?</div>
            <div class="cta-desc">Start your trademark registration today. Free search included with every plan. No
                obligation, no hidden costs.</div>
            <button class="btn-cta" @click="handleStart">
                <Rocket :size="18" aria-hidden="true" />
                Start Free Trademark Search
            </button>
        </div>
    </section>
</template>

<style scoped>
.cta-section *,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.cta-section {
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  --surface: v-bind("styles.surface");
  --muted: v-bind("styles.muted");
  --shadow: v-bind("styles.shadow");
  --shadow-hover: v-bind("styles.shadowHover");
  --font-size: v-bind("styles.fontSize");
  --font-size-body: v-bind("styles.fontSizeBody");
  --pd-top: v-bind("styles.pdtop");
  --pd-bottom: v-bind("styles.pdbottom");
  --pd-left: v-bind("styles.pdleft");
  --pd-right: v-bind("styles.pdright");
}

.cta-section div,
.cta-section button {
    font-family: 'Inter', sans-serif;
}
.cta-box {  
    background: linear-gradient(135deg, var(--bg) 0%,  var(--primary)  50%, var(--bg) 100%);
    /* border-radius: var(--radius-xl); */
    padding-top: var(--pd-top);
    padding-bottom: var(--pd-bottom);
    padding-left: var(--pd-left);
    padding-right: var(--pd-right);
    text-align: center;
    position: relative;
    overflow: hidden;
}

.cta-box * {
    position: relative;
    z-index: 1;
}

.cta-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: var(--font-size);
    font-weight: 800;
    color:var(--surface);
    letter-spacing: -1px;
    margin-bottom: 12px;
}

.cta-desc {
    font-size: var(--font-size-body);
    color:var(--muted);
    max-width: 500px;
    margin: 0 auto 32px;
    line-height: 1.7;
}

.btn-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, var(--primary), var(--bg));
    color:var(--surface);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    box-shadow: 0 4px 24px var(--shadow);
    border: 1px solid;
}

.btn-cta:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 32px var(--shadow-hover);
}

@keyframes blob {

    0%,
    100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }

    25% {
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }

    50% {
        border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
    }

    75% {
        border-radius: 60% 40% 60% 30% / 60% 40% 30% 70%;
    }
}

@media (max-width: 768px) {
    .cta-box {
        padding: 40px 24px;
    }
}
</style>
