<script setup>
import { useToast } from '../../composables/useToast.js'

const { showToast } = useToast()

const handleStart = () => {
    showToast('Launching trademark search tool...')
}
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
.cta-section *,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.cta-section {
    --primary: #1a237e;
    --primary-light: #3949ab;
    --primary-lighter: #7986cb;
    --accent: #ff6d00;
    --accent-light: #ff9e40;
    --accent-glow: rgba(255, 109, 0, 0.15);
    --teal: #00897b;
    --teal-light: #4db6ac;
    --bg: #fafbff;
    --bg-card: #ffffff;
    --bg-alt: #f0f2ff;
    --bg-gradient: linear-gradient(135deg, #fafbff 0%, #f0f2ff 50%, #fff8f0 100%);
    --text: #1a1a2e;
    --text-secondary: #5c6283;
    --text-muted: #8b90a8;
    --border: #e2e5f1;
    --border-light: #eef0f8;
    --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
    --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
    --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
    --shadow-xl: 0 16px 60px rgba(26, 35, 126, 0.12);
    --radius: 12px;
    --radius-lg: 20px;
    --radius-xl: 28px;
}

.cta-section html {
    scroll-behavior: smooth;
}

.cta-section h1,
.cta-section h2,
.cta-section h3,
.cta-section h4,
.cta-section h5,
.cta-section h6,
.cta-section p,
.cta-section span,
.cta-section div,
.cta-section button,
.cta-section input,
.cta-section label,
.cta-section a,
.cta-section li,
.cta-section ul,
.cta-section ol {
    font-family: 'Inter', sans-serif;
}

.cta-section {
    background: var(--bg-gradient);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

.cta-section {
    /* padding: 0 24px 80px; */
    /* max-width: 1280px; */
    margin: 0 auto;
}

.cta-box {
    background: linear-gradient(135deg, var(--accent-light) 0%, #ff6d00 50%, var(--accent-light) 100%);
    /* border-radius: var(--radius-xl); */
    padding: 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.cta-box::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 109, 0, 0.2), transparent 70%);
    top: -200px;
    right: -100px;
    animation: blob 8s ease-in-out infinite;
}

.cta-box::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(77, 182, 172, 0.15), transparent 70%);
    bottom: -150px;
    left: -50px;
    animation: blob 10s ease-in-out infinite reverse;
}

.cta-box * {
    position: relative;
    z-index: 1;
}

.cta-title {
    /* font-family: 'Space Grotesk', sans-serif !important; */
    font-size: clamp(26px, 3vw, 38px)!important;
    font-weight: 800;
    color: #fff;
    letter-spacing: -1px;
    margin-bottom: 20px;
}

.cta-desc {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
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
