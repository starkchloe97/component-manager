<script setup>
import { useToast } from '../../composables/useToast.js'
import { useComponentStyles } from "@/composables/useComponentStyles";

const { showToast } = useToast()

const handleStart = () => {
    showToast('Launching trademark search tool...')
}

const styles = useComponentStyles("CtaSection6", {
  primary: "#ffffff",
  background:"#ff6d00",
//   background: "linear-gradient(135deg, var(--accent-light) 0%, #ff6d00 50%, var(--accent-light) 100%);",
  backgroundtwo:"#ff9e40",
  fontSize: "clamp(26px, 3vw, 38px)",
  fontSizeBody: "1.125rem",
});

</script>

<template>
    <section class="cta-section">
        <div class="cta-box animate-on-scroll">
            <div class="cta-title">Ready to get your trademark registered?</div>
            <!-- <div class="cta-desc">Start your trademark registration today. Free search included with every plan. No
                obligation, no hidden costs.</div> -->
            <button class="btn-cta" @click="handleStart">
                Get Started
            </button>
        </div>
    </section>
</template>

<style scoped>

.cta-section {
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  --bgTwo: v-bind("styles.backgroundtwo");
  --font-size: v-bind("styles.fontSize");
    /* --accent: #ff6d00;
    --accent-light: #ff9e40; */
}

.cta-section html {
    scroll-behavior: smooth;
}


.cta-section div,
.cta-section button {
    font-family: 'Inter', sans-serif;
}

.cta-section {
    /* padding: 0 24px 80px; */
    /* max-width: 1280px; */
    margin: 0 auto;
}

.cta-box {
    background:linear-gradient(135deg, var(--bgTwo) 0%, #ff6d00 50%, var(--bgTwo) 100%);
    /* border-radius: var(--radius-xl); */
    padding: 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.cta-box * {
    position: relative;
    z-index: 1;
}

.cta-title {
    /* font-family: 'Space Grotesk', sans-serif !important; */
    font-size: var( --font-size) !important;
    font-weight: 800;
    color:var(--primary);
    letter-spacing: -1px;
    margin-bottom: 40px;
}

.btn-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    box-shadow: 0 4px 24px rgba(255, 109, 0, 0.4);
    border: 1px solid;
}

.btn-cta:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 32px rgba(255, 109, 0, 0.5);
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
