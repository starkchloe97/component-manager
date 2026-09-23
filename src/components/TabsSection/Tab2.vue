<template>
  <section class="pkg-section" id="process">
    <div class="container">
      <div class="pkg-grid">
        <!-- ─── Sidebar / pricing card ─── -->
        <aside class="pkg-sidebar">
          <div class="pkg-sidebar-card">
            <div class="pkg-price">
              <strong>$1,999</strong>
              <sub>one time fee</sub>
            </div>
            <p class="pkg-lead">
              Get continued protection through our active, comprehensive,
              and customized trademark monitoring services.
            </p>

            <ul class="pkg-list">
              <li>
                <span class="pkg-list-title">Attorney Assignment</span>
                Have an attorney assigned to your application.
              </li>
              <li>
                <span class="pkg-list-title">Draft Response</span>
                Have the assigned attorney draft a response.
              </li>
              <li>
                <span class="pkg-list-title">Review and Sign</span>
                You will sign the response, and then we file it.
              </li>
            </ul>

            <p class="pkg-simple">It's that simple!</p>

            <a :href="`tel:${SITE_PHONE_RAW}`" class="btn-primary btn-full">
              Call to discuss
            </a>
          </div>
        </aside>

        <!-- ─── Tabs ─── -->
        <div class="pkg-content">
          <div class="tab-links">
            <button
              class="tab-link"
              :class="{ active: isTabActive('box-Overview') }"
              @click="switchTab('box-Overview')"
            >
              Overview
            </button>
            <button
              class="tab-link"
              :class="{ active: isTabActive('box-ourprocess') }"
              @click="switchTab('box-ourprocess')"
            >
              Our process
            </button>
          </div>

          <div class="tab-panel" v-show="isTabActive('box-Overview')">
            <h3>
              Received an Office Action? Have an attorney draft a response.
            </h3>
            <p>
              Most trademark applications receive an Office Action.
              Applications prepared by an attorney receive fewer Office
              actions. Since they have been dealing with trademark
              applications for years, they know how to avoid common
              trademark mistakes and can help you avoid getting Office
              Actions.
            </p>
            <p>
              You have a limited number of responses to contest an Office
              Action, so you need to be absolutely sure that the response is
              accurate and complete.
            </p>
            <p>
              9 out of 10 people get it wrong the first time. Why waste
              time, money and chances when you can sit back and relax, while
              we draft a winning office action response for you.
            </p>
          </div>

          <div class="tab-panel" v-show="isTabActive('box-ourprocess')">
            <h3>How it works?</h3>
            <p>
              Once a United States federal trademark application is filed,
              it reaches an examining attorney about three to four months
              after the initial filing date. From there, the USPTO examining
              attorney will determine whether or not the application meets
              all of the requirements necessary for a registration. If it
              does not, the examining attorney will issue an Office action.
            </p>

            <p>
              <strong>Attorney Assignment</strong><br />
              To resolve the issue, we highly recommend you let us assign
              a US licensed attorney to your trademark application.
            </p>

            <p>
              <strong>Draft Response</strong><br />
              Attorney examines and drafts a response to the Office action.
            </p>

            <p>
              <strong>Review & Submission</strong><br />
              You review the response and approve the filing of the Office
              action.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { SITE_PHONE, SITE_PHONE_RAW } from "@/config/siteInfo.js";

const activeTab = ref("box-Overview");

function isTabActive(tab) {
  return activeTab.value === tab;
}

function switchTab(tab) {
  activeTab.value = tab;
}
</script>

<style scoped>

.pkg-section{
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

.pkg-section {
  padding: 80px 0 96px;
  background: var(--background);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.btn-full {
    width: 100%;
    padding: 14px;
    border-radius: 7px;
    text-align: center;
}

.btn-primary {
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

button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
}

.pkg-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  align-items: start;
}

/* ─── Sidebar ─── */
.pkg-sidebar-card {
  background: var(--on-surface);
  border-radius: var(--radius-card);
  padding: 34px 28px;
  color: #fff;
  position: sticky;
  top: 96px;
}

.pkg-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;
}

.pkg-price strong {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-family: "Instrument Sans", sans-serif !important;
}

.pkg-price sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  bottom: 0;
}

.pkg-lead {
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 24px;
}

.pkg-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  padding-left: 0px;
}

.pkg-list li {
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  padding-left: 18px;
  position: relative;
  list-style: none;
}

.pkg-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-pill);
  background: var(--primary);
}

.pkg-list-title {
  display: block;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
}

.pkg-simple {
  font-size: 13.5px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
}

/* ─── Content / tabs ─── */
.pkg-content {
  background: var(--surface-container-low);
  border-radius: var(--radius-card);
  padding: 12px 40px 40px;
}

.tab-links {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--outline-variant);
  margin-bottom: 28px;
}

.tab-link {
  padding: 18px 6px;
  margin-right: 24px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--on-surface-variant);
  position: relative;
  transition: color 0.2s ease;
}

.tab-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  border-radius: var(--radius-pill);
  background: var(--primary);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.tab-link:hover {
  color: var(--on-surface);
}

.tab-link.active {
  color: var(--primary);
}

.tab-link.active::after {
  transform: scaleX(1);
}

.tab-panel h3 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--on-surface);
  margin-bottom: 16px;
}

.tab-panel p {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--on-surface-variant);
  margin-bottom: 16px;
}

.tab-panel p:last-child {
  margin-bottom: 0;
}

.tab-panel strong {
  color: var(--on-surface);
}

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .pkg-grid {
    grid-template-columns: 1fr;
  }
  .pkg-sidebar-card {
    position: static;
  }
  .pkg-content {
    padding: 12px 24px 28px;
  }
}

@media (max-width: 640px) {
  .pkg-section {
    padding: 56px 0 64px;
  }
  .pkg-sidebar-card {
    padding: 28px 22px;
  }
  .tab-link {
    font-size: 13.5px;
    margin-right: 16px;
  }
}

@media (max-width: 640px) {
  .container { padding: 0; }
}
</style>