<template>
    <section id="pricing" class="pricing">
        <div class="container">
            <div class="section-header ">
                <span class="ip-eyebrow">
                    Pricing
                </span>
                <!-- <span class="section-label">Pricing</span> -->
                <h2 class="section-title">Simple, Transparent Pricing</h2>
                <p class="section-desc">
                    No hidden fees. No surprises. Choose the package that fits your needs.
                </p>
            </div>

            <div class="pricing-grid">
                <div class="pricing-card card-hover ">
                    <div class="plan-label">Basic</div>
                    <div class="plan-price">
                        <span class="price">$199</span>
                        <span class="price-suffix">+ gov fees</span>
                    </div>
                    <p class="plan-desc"> 
                        For single trademarks with straightforward filings.
                    </p>
                    <ul class="feature-list">
                        <li class="feature-item">
                            <Check class="feature-icon check" />Comprehensive trademark search
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />1 trademark class
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />Attorney review & filing
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />Application tracking
                        </li>
                        <li class="feature-item muted">
                            <X class="feature-icon cross" />Office action response
                        </li>
                        <li class="feature-item muted">
                            <X class="feature-icon cross" />Priority expedited filing
                        </li>
                    </ul>


                    <button data-v-8e7847e8="" data-v-a0ae2d0b="" class="btn_pkg_overview btn-outline"
                        hoverclass="hover-scale" confirm-button-text="Get Started">Choose Basic</button>


                </div>

                <div class="pricing-card popular card-hover ">
                    <div class="popular-badge">Most Popular</div>
                    <div class="plan-label popular-label">Professional</div>
                    <div class="plan-price">
                        <span class="price popular-price">$349</span>
                        <span class="price-suffix popular-suffix">+ gov fees</span>
                    </div>
                    <p class="plan-desc popular-desc">
                        Complete protection with attorney support throughout.
                    </p>
                    <ul class="feature-list">
                        <li class="feature-item popular-feature">
                            <Check class="feature-icon check-popular" />Comprehensive trademark search
                        </li>
                        <li class="feature-item popular-feature">
                            <Check class="feature-icon check-popular" />Up to 2 trademark classes
                        </li>
                        <li class="feature-item popular-feature">
                            <Check class="feature-icon check-popular" />Attorney review & filing
                        </li>
                        <li class="feature-item popular-feature">
                            <Check class="feature-icon check-popular" />Application tracking dashboard
                        </li>
                        <li class="feature-item popular-feature">
                            <Check class="feature-icon check-popular" />1 office action response included
                        </li>
                        <li class="feature-item popular-feature">
                            <Check class="feature-icon check-popular" />Priority expedited filing
                        </li>
                    </ul>
                    <button @click="handleSelect('Professional')" class="btn-brand">
                        Get Started
                    </button>
                </div>

                <div class="pricing-card card-hover ">
                    <div class="plan-label">Enterprise</div>
                    <div class="plan-price">
                        <span class="price">Custom</span>
                    </div>
                    <p class="plan-desc">
                        For businesses with multiple trademarks and global needs.
                    </p>
                    <ul class="feature-list">
                        <li class="feature-item">
                            <Check class="feature-icon check" />Everything in Professional
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />Unlimited trademark classes
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />Dedicated attorney assigned
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />International filing (Madrid)
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />Monitoring & enforcement alerts
                        </li>
                        <li class="feature-item">
                            <Check class="feature-icon check" />Annual brand audit report
                        </li>
                    </ul>
                    <button @click="handleContact" class="btn-outline">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { inject } from "vue";
import { Check, X } from "@lucide/vue";

const showToast = inject("showToast");

function handleSelect(plan) {
    showToast(`${plan} package selected! Redirecting to checkout...`, "success");
}

function handleContact() {
    showToast("Our team will contact you within 24 hours!", "info");
}
</script>

<style scoped>
.pricing {
    padding: 96px 0;
    background: var(--neutral-50);
    font-family: "Inter", sans-serif;
}

@media (min-width: 768px) {
    .pricing {
        padding: 128px 0;
    }
}

.container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 24px;
}

.section-header {
    max-width: 48rem;
    margin: 0 auto 80px;
    text-align: center;
}

.section-title {
    font-size: 1.875rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    margin-top: 16px;
    margin-bottom: 24px;
}

@media (min-width: 768px) {
    .section-title {
        font-size: 2.25rem;
    }
}

@media (min-width: 1024px) {
    .section-title {
        font-size: 3rem;
    }
}

.section-desc {
    font-size: 1.125rem;
    color: var(--neutral-500);
    line-height: 1.625;
}

.pricing-grid {
    display: grid;
    gap: 32px;
    max-width: 64rem;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .pricing-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: start;
    }
}

.pricing-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    border: 1px solid var(--neutral-200);
    position: relative;
}

@media (min-width: 768px) {
    .pricing-card.popular {
        margin-top: -16px;
        margin-bottom: -16px;
        padding-top: 48px;
        padding-bottom: 48px;
    }
}

.popular {
    background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.popular-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--brand-500);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 16px;
    border-radius: 9999px;
}

.plan-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--neutral-400);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
}

.popular-label {
    color: var(--brand-400);
}

.plan-price {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    margin-bottom: 8px;
}

.price {
    font-size: 2.25rem;
    font-weight: 600;
}

.popular-price {
    color: white;
}

.price-suffix {
    color: var(--neutral-400);
    font-size: 0.875rem;
    margin-bottom: 4px;
}

.plan-desc {
    font-size: 0.875rem;
    color: var(--neutral-500);
    margin-bottom: 32px;
}

.popular-desc {
    color: var(--neutral-400);
}

.feature-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
    list-style: none;
    padding: 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.875rem;
}

.feature-item.muted {
    color: var(--neutral-400);
}

.feature-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.feature-icon.check {
    color: var(--green-500);
}

.feature-icon.cross {
    color: var(--neutral-400);
}

.popular-feature {
    color: var(--neutral-200);
}

.check-popular {
    color: var(--brand-400);
}

.btn-outline {
    width: 100%;
    padding: 14px;
    border-radius: 9999px;
    border: 2px solid var(--neutral-900);
    color: var(--neutral-900);
    font-weight: 500;
    font-size: 0.875rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    justify-content: center;
}

.btn-outline:hover {
    background: var(--neutral-900);
    color: white;
}

.btn-brand {
    width: 100%;
    padding: 14px;
    border-radius: 9999px;
    background: var(--brand-500);
    color: white;
    font-weight: 500;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-brand:hover {
    background: var(--brand-600);
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.25);
}

.ip-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 9999px;
    border: 1px solid var(--brand-200);
    background: var(--brand-50);
    color: var(--brand-600);
    margin-bottom: 22px;
}
</style>
