<template>
    <section id="overview" class="hero v-three">
        <div class="hero-bg-1"></div>
        <div class="hero-bg-2"></div>
        <div class="hero-dot-1"></div>
        <div class="hero-dot-2"></div>

        <div class="hero-inner">
            <div class="hero-grid">
                <div class="hero-left">
                    <div style="animation: fadeInUp 0.7s ease-out both;">
                        <div class="trust-badge">
                            <span class="pulse-dot"></span>
                            <span class="trust-text">Trusted by 50,000+ Businesses</span>
                        </div>
                    </div>

                    <h1 class="hero-title" style="animation: fadeInUp 0.7s ease-out 0.15s both;">
                        Protect Your Brand<br>
                        <span class="shimmer-text">With a Trademark</span>
                    </h1>

                    <p class="hero-desc" style="animation: fadeInUp 0.7s ease-out 0.3s both;">
                        Register your trademark in minutes, not months. We handle the paperwork so you can focus on
                        building your business — starting at just <strong class="text-slate-700">$35</strong>.
                    </p>

                    <div class="hero-buttons" style="animation: fadeInUp 0.7s ease-out 0.45s both;">
                        <a href="#pricing" class="btn-primary">
                            Start Registration
                            <span class="iconify text-lg" data-icon="lucide:arrow-right"></span>
                        </a>
                        <a href="#steps" class="btn-secondary">
                            <span class="iconify text-lg" data-icon="lucide:play-circle"></span>
                            See How It Works
                        </a>
                    </div>

                    <div class="hero-trust" style="animation: fadeInUp 0.7s ease-out 0.6s both;">
                        <div class="trust-item">
                            <span class="iconify text-brand-500 text-lg" data-icon="lucide:shield-check"></span>
                            <span class="trust-label">USPTO Filed</span>
                        </div>
                        <div class="trust-item">
                            <span class="iconify text-brand-500 text-lg" data-icon="lucide:clock"></span>
                            <span class="trust-label">5-Min Signup</span>
                        </div>
                        <div class="trust-item">
                            <span class="iconify text-brand-500 text-lg" data-icon="lucide:headphones"></span>
                            <span class="trust-label">Expert Support</span>
                        </div>
                    </div>
                </div>

                <div class="hero-right" style="animation: scaleIn 0.8s ease-out 0.3s both;">
                    <div class="blob-1"></div>
                    <div class="blob-2"></div>

                    <div class="phone-mockup">
                        <div class="phone-screen">
                            <div class="phone-header">
                                <div class="phone-icon">
                                    <span class="iconify text-white text-2xl" data-icon="lucide:shield-check"></span>
                                </div>
                                <p class="phone-subtitle">Trademark Status</p>
                                <p class="phone-title">Application Filed ✓</p>
                            </div>
                            <div class="phone-body">
                                <div class="status-item status-green">
                                    <span class="iconify text-green-500 text-xl"
                                        data-icon="lucide:check-circle-2"></span>
                                    <div>
                                        <p class="status-name">Form Completed</p>
                                        <p class="status-date">Jun 29, 2026</p>
                                    </div>
                                </div>
                                <div class="status-item status-green">
                                    <span class="iconify text-green-500 text-xl"
                                        data-icon="lucide:check-circle-2"></span>
                                    <div>
                                        <p class="status-name">Submitted to USPTO</p>
                                        <p class="status-date">Jun 29, 2026</p>
                                    </div>
                                </div>
                                <div class="status-item status-amber">
                                    <span class="iconify text-amber-500 text-xl animate-pulse"
                                        data-icon="lucide:loader"></span>
                                    <div>
                                        <p class="status-name">Under Review</p>
                                        <p class="status-date">Est. 3-6 months</p>
                                    </div>
                                </div>
                                <div class="status-item status-gray">
                                    <span class="iconify text-slate-300 text-xl" data-icon="lucide:circle"></span>
                                    <div>
                                        <p class="status-name dim">Registration Approved</p>
                                        <p class="status-date dim">Pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="floating-card">
                        <div class="floating-card-inner">
                            <div class="floating-icon">
                                <span class="iconify text-green-600 text-xl" data-icon="lucide:trending-up"></span>
                            </div>
                            <div>
                                <p class="floating-label">Applications This Week</p>
                                <p class="floating-value">+247</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.85);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-12px);
    }
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
        border-radius: 60% 40% 60% 30% / 60% 30% 40% 70%;
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

@keyframes pulse-dot {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.v-three .hero {
    position: relative;
    padding-top: 6rem;
    padding-bottom: 4rem;
    overflow: hidden;
}

@media (min-width: 768px) {
    .v-three .hero {
        padding-top: 8rem;
        padding-bottom: 6rem;
    }
}

.v-three .hero-bg-1 {
    position: absolute;
    top: 5rem;
    right: 0;
    width: 500px;
    height: 500px;
    background: rgba(239, 254, 250, 0.4);
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
}

.v-three .hero-bg-2 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 400px;
    height: 400px;
    background: rgba(255, 248, 237, 0.3);
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
}

.v-three .hero-dot-1 {
    position: absolute;
    top: 10rem;
    left: 25%;
    width: 0.75rem;
    height: 0.75rem;
    background: #52f5da;
    border-radius: 50%;
    opacity: 0.4;
    animation: float 6s ease-in-out infinite;
}

.v-three .hero-dot-2 {
    position: absolute;
    top: 15rem;
    right: 33%;
    width: 0.5rem;
    height: 0.5rem;
    background: #ffbe71;
    border-radius: 50%;
    opacity: 0.4;
    animation: float 6s ease-in-out 2s infinite;
}

.v-three .hero-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (min-width: 640px) {
    .v-three .hero-inner {
        padding: 0 1.5rem;
    }
}

.v-three .hero-grid {
    display: grid;
    gap: 2.5rem;
    align-items: center;
}

@media (min-width: 1024px) {
    .v-three .hero-grid {
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
    }
}

.v-three .hero-left {
    text-align: center;
}

@media (min-width: 1024px) {
    .v-three .hero-left {
        text-align: left;
    }
}

.v-three .trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #effefa;
    border: 1px solid #c8fff4;
    border-radius: 9999px;
    padding: 0.375rem 1rem;
    margin-bottom: 1.5rem;
}

.v-three .pulse-dot {
    width: 0.5rem;
    height: 0.5rem;
    background: #06c4ac;
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
}

.v-three .trust-text {
    font-size: 0.75rem;
    font-weight: 600;
    color: #067e73;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.v-three .hero-title {
    font-size: 2.25rem;
    font-family: Inter, sans-serif;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: #0f172a;
    margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
    .v-three .hero-title {
        font-size: 3rem;
    }
}

@media (min-width: 1024px) {
    .v-three .hero-title {
        font-size: 3.75rem;
    }
}

.v-three .shimmer-text {
    background: linear-gradient(90deg, #067e73 0%, #1ee0c5 25%, #ff7e11 50%, #1ee0c5 75%, #067e73 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
}

.v-three .hero-desc {
    font-size: 1.125rem;
    color: #64748b;
    line-height: 1.625;
    max-width: 32rem;
    margin: 0 auto 2rem auto;
}

@media (min-width: 1024px) {
    .v-three .hero-desc {
        margin-left: 0;
        margin-right: 0;
    }
}

.v-three .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
}

@media (min-width: 640px) {
    .v-three .hero-buttons {
        flex-direction: row;
    }
}

@media (min-width: 1024px) {
    .v-three .hero-buttons {
        justify-content: flex-start;
    }
}

.v-three .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #067e73, #019e8e);
    color: white;
    font-weight: 600;
    padding: 0.875rem 1.75rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.v-three .btn-primary::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
}

.v-three .btn-primary:hover::after {
    width: 300px;
    height: 300px;
}

.v-three .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(6, 126, 115, 0.3);
}

.v-three .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #334155;
    background: white;
    border: 1px solid #e2e8f0;
    text-decoration: none;
    transition: all 0.2s ease;
}

.v-three .btn-secondary:hover {
    border-color: #91fee9;
    color: #067e73;
    background: rgba(239, 254, 250, 0.5);
}

.v-three .hero-trust {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2.5rem;
    justify-content: center;
}

@media (min-width: 1024px) {
    .v-three .hero-trust {
        justify-content: flex-start;
    }
}

.v-three .trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
}

.v-three .hero-right {
    position: relative;
    display: flex;
    justify-content: center;
}

.v-three .blob-1 {
    position: absolute;
    top: -2.5rem;
    right: -2.5rem;
    width: 20rem;
    height: 20rem;
    background: linear-gradient(135deg, rgba(145, 254, 233, 0.5), rgba(82, 245, 218, 0.2));
    animation: blob 8s ease-in-out infinite;
}

.v-three .blob-2 {
    position: absolute;
    bottom: -2rem;
    left: -2rem;
    width: 18rem;
    height: 18rem;
    background: linear-gradient(135deg, rgba(255, 217, 168, 0.4), rgba(255, 190, 113, 0.2));
    animation: blob 8s ease-in-out infinite;
}

.v-three .phone-mockup {
    background: linear-gradient(145deg, #1e293b24, #0f172a30);
    border-radius: 2rem;
    padding: 4px;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    width: 260px;
    animation: float 6s ease-in-out infinite;
    position: relative;
    z-index: 10;
}

@media (min-width: 640px) {
    .v-three .phone-mockup {
        width: 280px;
    }
}

.v-three .phone-screen {
    border-radius: 1.6rem;
    overflow: hidden;
    background: white;
}

.v-three .phone-header {
    background: linear-gradient(to bottom, #019e8e, #067e73);
    padding: 2rem 1.25rem 1.5rem;
    text-align: center;
}

.v-three .phone-icon {
    width: 3rem;
    height: 3rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
    backdrop-filter: blur(4px);
}

.v-three .phone-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.75rem;
    font-weight: 500;
}

.v-three .phone-title {
    color: white;
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 0.25rem;
}

.v-three .phone-body {
    padding: 1.25rem;
}

.v-three .status-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
}

.v-three .status-item:last-child {
    margin-bottom: 0;
}

.v-three .status-green {
    background: #f0fdf4;
}

.v-three .status-amber {
    background: #fffbeb;
}

.v-three .status-gray {
    background: #f8fafc;
}

.v-three .status-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: #1e293b;
}

.v-three .status-date {
    font-size: 0.625rem;
    color: #64748b;
}

.v-three .status-name.dim {
    color: #94a3b8;
}

.v-three .status-date.dim {
    color: #cbd5e1;
}

.v-three .floating-card {
    position: absolute;
    left: -1rem;
    bottom: 4rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(148, 163, 184, 0.15);
    padding: 1rem;
    z-index: 20;
    border: 1px solid #f1f5f9;
    animation: float 5s ease-in-out 2s infinite;
}

@media (min-width: 640px) {
    .v-three .floating-card {
        left: -4rem;
    }
}

.v-three .floating-card-inner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.v-three .floating-icon {
    width: 2.5rem;
    height: 2.5rem;
    background: #dcfce7;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-three .floating-label {
    font-size: 0.6875rem;
    color: #64748b;
}

.v-three .floating-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
}

.v-three .text-slate-700 {
    color: #334155;
}

.v-three .text-brand-500 {
    color: #06c4ac;
}
</style>