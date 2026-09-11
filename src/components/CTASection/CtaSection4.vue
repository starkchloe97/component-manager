<script setup>
import ctaImage from "@/assets/VersionFour/cta-img.png"
</script>

<template>
    <section class="section-cta scroll-reveal v-four">
        <div class="cta-wrap">
            <div class="cta-img-wrap">
                <img :src="ctaImage" alt="Executive Portrait" class="cta-img" />
                <div class="cta-overlay"></div>
            </div>
            <div class="cta-content">
                <h2 class="display-lg text-white cta-heading">Ready to secure <br />your legacy?</h2>
                <p class="cta-sub">Join the elite brands that trust Atlas for their intellectual property foundation.
                </p>
                <div class="cta-actions">
                    <button class="btn-primary">Get Started</button>
                    <button class="btn-ghost-white">Consultation</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* V-FOUR CSS */

/* ─── TOKENS ─── */
.v-four {
    --primary: #003dc7bd;
    --secondary: #081fecc1;
    --on-surface: #131b2e;
    --on-surface-variant: #44474f;
    --background: #faf8ff;
    --surface: #faf8ff;
    --surface-container-high: #e2e7ff;
    --surface-container-low: #f2f3ff;
    --outline-variant: #c3c5d9;
    --white: #ffffff;
    --radius-2xl: 1rem;
    --radius-3xl: 1.5rem;
    --radius-4xl: 2rem;
    --radius-pill: 9999px;
    --radius-card: 2rem;
}

.v-four button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
}

/* ─── CONTAINER ─── */

/* ─── TEXT GRADIENT ─── */
.v-four .text-gradient {
    background: linear-gradient(135deg, #003ec7 0%, #003ec7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 200;
}

/* ─── TYPOGRAPHY ─── */
.v-four .display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
}

.v-four .eyebrow {
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color: var(--primary);
    margin-bottom: 14px;
}

/* ─── BUTTONS ─── */
.v-four .btn-primary {
    background: var(--primary);
    color: #fff;
    font-weight: 500;
    border-radius: 7px;
    padding: 12px 26px;
    font-size: 0.875rem;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 6px 20px rgba(0, 62, 199, 0.2);
    display: inline-block;
}

.v-four .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 62, 199, 0.3);
}

.v-four .btn-primary:active {
    transform: scale(0.97);
}

.v-four .btn-lg {
    padding: 14px 36px;
    font-size: 0.95rem;
    width: 77%;
    margin: 10px 0px;
}

.v-four .btn-full {
    width: 100%;
    padding: 14px;
    border-radius: 7px;
    text-align: center;
}

.v-four .btn-outline-white {
    width: 100%;
    padding: 12px;
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    font-weight: 500;
    font-size: 0.875rem;
    transition: background 0.2s, color 0.2s;
}

.v-four .btn-outline-white:hover {
    background: #fff;
    color: var(--on-surface);
}

.v-four .btn-ghost-white {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-weight: 500;
    border-radius: 7px;
    padding: 12px 26px;
    transition: background 0.2s;
}

.v-four .btn-ghost-white:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* V-FOUR CSS */
.text-white {
    color: #fff;

}
.section-cta {
    padding: 72px 16px;
    max-width: 1440px;
    margin: 0 auto;
}

.v-four .cta-wrap {
    background: var(--on-surface);
    border-radius: 3rem;
    overflow: hidden;
    min-height: 360px;
    display: flex;
    align-items: center;
    padding: 64px;
    position: relative;
}

.v-four .cta-img-wrap {
    position: absolute;
    inset: 0;
}

.v-four .cta-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    filter: grayscale(1);
    transition: transform 20s ease;
}

.v-four .cta-wrap:hover .cta-img {
    transform: scale(1.05);
}

.v-four .cta-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, var(--on-surface), rgba(19, 27, 46, 0.8), transparent);
}

.v-four .cta-content {
    position: relative;
    z-index: 1;
    max-width: 580px;
}

.v-four .cta-heading {
    margin-bottom: 12px;
}

.v-four .cta-sub {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
    margin-bottom: 28px;
}

.v-four .cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
}

@media (max-width: 768px) {
    .v-four .section-cta {
        padding: 48px 16px;
    }

    .v-four .cta-wrap {
        padding: 44px;
        border-radius: 1.5rem;
    }
}

@media (max-width: 640px) {
    .v-four .cta-wrap {
        padding: 28px 20px;
    }

    .v-four .cta-actions {
        flex-direction: column;
    }

    .v-four .cta-actions .btn-primary,
    .v-four .cta-actions .btn-ghost-white {
        width: 100%;
        text-align: center;
    }
}
</style>
