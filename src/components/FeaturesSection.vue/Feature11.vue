<template>
    <section id="steps" class="how-it-works v-three">
        <div class="section-bg"></div>
        <div class="section-inner">
            <div class="section-header">
                <div class="animate-on-scroll">
                    <span class="section-tag">Simple Process</span>
                </div>
                <h2 class="animate-on-scroll stagger-1 section-title">How Trademark Registration Works</h2>
                <p class="animate-on-scroll stagger-2 section-desc">Four straightforward steps to secure your brand's
                    legal protection. We handle the complexity.</p>
            </div>
            <div class="steps-grid">
                <div v-for="(step, i) in steps" :key="i" class="animate-on-scroll" :class="`stagger-${i + 1}`">
                    <div class="step-card">
                        <div v-if="i < 3" class="step-connector"></div>
                        <div class="step-number">
                            <span>{{ step.num }}</span>
                        </div>
                        <h3 class="step-title">{{ step.title }}</h3>
                        <p class="step-desc">{{ step.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'

const steps = [
    { num: '1', title: 'Search Your Mark', desc: 'We conduct a comprehensive federal database search to ensure your trademark is available and unique.' },
    { num: '2', title: 'Prepare Application', desc: 'Our experts prepare and review your USPTO application with precise classifications and descriptions.' },
    { num: '3', title: 'File with USPTO', desc: 'We submit your application directly to the United States Patent and Trademark Office on your behalf.' },
    { num: '4', title: 'Get Your Trademark', desc: 'Receive your trademark registration certificate and enjoy full legal protection for your brand.' },
]

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible')
        })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.how-it-works {
    position: relative;
    padding: 2.5rem 0;
    overflow: hidden;
    background: rgba(248, 250, 252, 0.5);
}

.section-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 18rem;
    height: 18rem;
    background: rgba(239, 254, 250, 0.3);
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
}

.v-three .section-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (min-width: 640px) {
    .v-three .section-inner {
        padding: 0 1.5rem;
    }
}

.v-three .section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.v-three .section-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #019e8e;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: #effefa;
    padding: 0.375rem 1rem;
    border-radius: 9999px;
    margin-bottom: 1rem;
}

.v-three .section-title {
    font-size: 1.875rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin-bottom: 1rem;
}

@media (min-width: 640px) {
    .v-three .section-title {
        font-size: 2.25rem;
    }
}

.v-three .section-desc {
    color: #64748b;
    max-width: 36rem;
    margin: 0 auto;
}

.v-three .steps-grid {
    display: grid;
    gap: 1.5rem;
}

@media (min-width: 640px) {
    .v-three .steps-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .v-three .steps-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.v-three .step-card {
    position: relative;
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid #f1f5f9;
    transition: all 0.4s ease;
    height: 100%;
}

.v-three .step-card:hover {
    border-color: #c8fff4;
    box-shadow: 0 10px 40px rgba(6, 126, 115, 0.1);
}

.v-three .step-connector {
    position: absolute;
    top: 28px;
    left: calc(11% + 40px);
    width: calc(100% - 20px);
    height: 2px;
    background: linear-gradient(90deg, #1ee0c5, #067e73);
    opacity: 0.3;
    display: none;
}

@media (min-width: 1024px) {
    .v-three .step-connector {
        display: block;
    }
}

.v-three .step-number {
    width: 2.5rem;
    height: 2.5rem;
    /* background: linear-gradient(135deg, #06c4ac, #019e8e); */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    /* box-shadow: 0 10px 25px rgba(6,196,172,0.2); */
    transition: transform 0.3s ease;
    border: 1px solid #06c4ac;
}

.v-three .step-card:hover .step-number {
    transform: scale(1.1);
}

.v-three .step-number.accent {
    background: linear-gradient(135deg, #ff7e11, #f06306);
    box-shadow: 0 10px 25px rgba(255, 126, 17, 0.2);
}

.v-three .step-number span {
    color: #06c4ac;
    font-weight: 500;
    font-size: 1 rem;
}

.v-three .step-title {
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
}

.v-three .step-desc {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.625;
}
</style>