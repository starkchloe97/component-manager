<template>
    <div class="main-container">
        <div class="section">
            <div class="left">
                <span class="section-label">Testimonials</span>
                <h2 class="section-title">Satisfied Customers</h2>
                <p>
                    Trusted by over 10,000 businesses. Protect your intellectual property with confidence.
                </p>
            </div>

            <div class="right">
                <div class="track">
                    <div v-for="(review, index) in loopedReviews" :key="index" class="card"
                        :class="{ active: review.active }" :aria-hidden="index >= reviews.length">
                        <div class="card-top">
                            <img class="avatar" :src="review.avatar" :alt="review.name" />
                            <div class="name-block">
                                <strong>{{ review.name }}</strong>
                                <span class="designation">{{ review.designation }}</span>
                            </div>
                        </div>

                        <p class="card-text">{{ review.text }}</p>

                        <div class="card-footer">
                            <div class="stars ">
                                <Star v-for="i in 5" fill="#f5b942" strokeWidth="0" width="15" height="15"/>
                            </div>
                            <span class="rating-value">{{ review.rating.toFixed(1) }}</span>
                        </div>

                        <span class="quote-icon" :class="{ active: review.active }">"</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Star } from '@lucide/vue'
// import companylogo2 from "../../assets/VersionSix/company-logo2.svg";
import amandaavatar from "../../assets/amanda.png";
import davidavatar from "../../assets/david.png";
import anaAvatar from "../../assets/ana.png";
import andrewAvatar from "../../assets/andrew.png";
import rachelAvatar from "../../assets/rachel.png";
import morissonAvatar from "../../assets/morisson.png";

const reviews = [
    {
        name: 'Amanda Reynolds',
        designation: ' Trademark Customer ',
        avatar: amandaavatar,
        text: ' It’s really great to speak with a real person by phone who is based in the US. There was zero waiting time. Skilled and supportive. Made the TM process very simple. Recommended. ',
        rating: 5,
        active: true,
    },
    {
        name: 'David Miller',
        designation: 'Trademark Customer',
        avatar: davidavatar,
        text: ' The people I have worked with are professional, knowledgeable, and consistently go beyond expectations to help you handle your trademark registration with ease. ',
        rating: 4,
        active: false,
    },
    {
        name: 'Rachel Bennett',
        designation: 'Trademark Customer',
        avatar: rachelAvatar,
        text: ' Skilled, dependable, simple to collaborate with and fairly priced services. Additionally, their consistent follow-up ensures every detail is completed correctly and efficiently.',
        rating: 5,
        active: true,
    },
    {
        name: 'Melissa Harding',
        designation: 'Trademark Customer',
        avatar: amandaavatar,
        text: ' They have partnered with me to achieve compliance and keep my mind at ease. They are top tier; I have gained knowledge about the trademark registration process. ;',
        rating: 5,
        active: false,
    },
    {
        name: 'Ana Velez',
        designation: 'Trademark Customer',
        avatar: anaAvatar,
        text: ' The group of professionals at this company are highly efficient and clearly describe the process with clear guidance for every step, which greatly simplifies the work. Thank you team!  ;',
        rating: 5,
        active: false,
    },
    {
        name: 'Andrew Taylor',
        designation: 'Trademark Customer',
        avatar: andrewAvatar,
        text: 'Excellent experience. The staff were extremely informed and offered strong professional expert clear detailed valuable practical insight into the trademark approval process.',
        rating: 5,
        active: false,
    },
    {
        name: 'Danielle Morrison',
        designation: 'Trademark Customer',
        avatar: morissonAvatar,
        text: ' This group is extremely detailed. They responded all my inquiries, handled my concerns, and kept me updated every stage of the process. Absolutely using their services again.',
        rating: 5,
        active: false,
    },
    {
        name: 'Christopher Hale',
        designation: 'Trademark Customer',
        avatar: rachelAvatar,
        text: ' This team is extremely detailed. They responded all my questions, resolved my concerns, and kept me updated through each step of the process. Using their services again. ',
        rating: 5,
        active: false,
    },
]

// Duplicate the list once so the CSS animation can translate by -50%
// and loop seamlessly back to the start.
const loopedReviews = computed(() => [...reviews, ...reviews])
</script>

<style scoped>

.main-container {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --accent: #ff6d00;

  --font-size: 16px;
  --font-weight: 400;
  --line-height: 1.5;

  --brand-50: #fff7ed;
  --brand-100: #ffedd5;
  --brand-200: #fed7aa;
  --brand-300: #fdba74;
  --brand-400: #fb923c;
  --brand-500: #f97316;
  --brand-600: #ea580c;
  --brand-700: #c2410c;

  --navy-800: #1e293b;
  --navy-900: #0f172a;
  --navy-950: #020617;

  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  --neutral-950: #0a0a0a;

  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;

  --blue-400: #60a5fa;
  --blue-500: #3b82f6;

  --emerald-400: #34d399;
  --emerald-500: #10b981;

  --violet-400: #a78bfa;
  --violet-500: #8b5cf6;

  --amber-400: #fbbf24;
  --rose-400: #fb7185;

  --brand: #0b55b6;
  --brand-light: #e8f0fb;
  --brand-dark: #083d82;
  --brand-mid: #1a6fd4;

  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;

  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;

  --primary-light: #3949ab;
  --primary-lighter: #7986cb;

  --accent-light: #ff9e40;
  --accent-glow: rgba(255, 109, 0, 0.15);

  --teal: #00897b;
  --teal-light: #4db6ac;

  --bg: #fafbff;
  --bg-card: #ffffff;
  --bg-alt: #f0f2ff;

  --bg-gradient: linear-gradient(
    135deg,
    #fafbff 0%,
    #f0f2ff 50%,
    #fff8f0 100%
  );

  --text: #1a1a2e;
  --text-secondary: #5c6283;
  --text-muted: #8b90a8;

  --border-light: #eef0f8;

  --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
  --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
  --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
  --shadow-xl: 0 16px 60px rgba(26, 35, 126, 0.12);

  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;

  --on-surface: #131b2e;
  --on-surface-variant: #44474f;
  --background: #faf8ff;

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

/* ---- Base Desktop Styles ---- */
.main-container {
    width: 100%;
    background-color: #fff;
}

.section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 60px;
    min-height: 420px;
    background: #fff;
    border-radius: 16px;
    position: relative;
    gap: 40px;
    margin: auto;
    font-family: 'Inter', sans-serif;
    max-width: 1315px;
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
    border: 1px solid #fed7aa;
    background: #fff1ec;
    color:#ea580c;
    margin-bottom: 22px;
    font-family: Instrument Sans, sans-serif !important;
}

.section-title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-top: 16px;
    margin-bottom: 24px;
    color: #111;
    line-height: 1.2;
    width: 100%;
}

.left {
    width: 50%;
}

.deco {
    margin-bottom: 28px;
}

.deco a img {
    width: 35%;
    display: block;
}

.left p {
    font-size: 14.5px;
    color: #888;
    line-height: 1.7;
    margin-bottom: 28px;
    max-width: 350px;
}

.btn-testimonial {
    width: 30%;
    min-width: 140px;
    padding: 12px;
    border-radius: 8px;
    background: var(--brand-500);
    color: white;
    font-weight: 500;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-testimonial:hover {
    background: var(--brand-600);
    transform: translateY(-2px);
}

/* ---- Slider wrapper ---- */
.right {
    width: 400px;
    height: 360px;
    overflow: hidden;
    position: relative;
    -webkit-mask-image: linear-gradient(to bottom,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%);
    mask-image: linear-gradient(to bottom,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%);
}

.right .track {
    display: flex;
    flex-direction: column;
    /* Removed 'gap' from here to prevent the -50% loop jump */
    animation: slide-up 14s linear infinite;
}

.right:hover .track {
    animation-play-state: paused;
}

@keyframes slide-up {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
    }
}

/* ---- Card Styles ---- */
.card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    padding: 18px 20px;
    position: relative;
    flex-shrink: 0;
    /* Added margin-bottom here. This guarantees the math is symmetrical 
     when the animation translates by -50% */
    margin-bottom: 16px;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
    box-shadow: 0 6px 18px rgba(17, 17, 17, 0.06);
    border-color: #ddd;
}

.card.active {
    border-left: 2px solid #f97316;
    border-radius: 0 12px 12px 0;
}

.card-top {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    background: #ddd;
}

.name-block {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.name-block strong {
    font-size: 14px;
    font-weight: 600;
    color: #111;
    line-height: 1.3;
}

.designation {
    font-size: 11.5px;
    color: #a3a3a3;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-text {
    font-size: 14px;
    color: #999;
    line-height: 1.6;
    margin: 0px;
}

.card-footer {
    display: flex;
    align-items: center;
    gap: 8px;
}

.stars {
    display: flex;
    align-items: center;
    gap: 2px;
}

.rating-value {
    font-size: 11.5px;
    font-weight: 600;
    color: #b3b3b3;
}

.quote-icon {
    position: absolute;
    top: 16px;
    right: 18px;
    color: #dadada;
    font-size: 38px;
    font-weight: 500;
    line-height: 1;
    font-family: Georgia, serif;
}

.quote-icon.active {
    color:#f97316;
}

/* ---- Responsive Mobile Styles ---- */
@media (max-width: 768px) {
    .section {
        flex-direction: column;
        align-items: center;
        padding: 40px 20px;
        gap: 32px;
        border-radius: 12px;
    }

    .left {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .section-label {
        margin-bottom: 16px;
    }

    .section-title {
        font-size: 1.75rem;
        margin-top: 8px;
        margin-bottom: 16px;
    }

    .left p {
        max-width: 100%;
        margin-bottom: 24px;
    }

    .btn-testimonial {
        width: 100%;
        max-width: 300px;
        padding: 14px;
    }

    .right {
        width: 100%;
        height: 400px;
        max-width: 400px;
    }
}
</style>