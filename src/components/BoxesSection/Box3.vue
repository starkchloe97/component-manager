<!-- missing vs button v3-file -->
<template>
  <div class="diff-section">
    <div class="diff-container">
      <!-- Label -->
      <div class="diff-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="m21 16-5 5"/><path d="M15 21h5v-5"/><path d="m4 4 5 5"/></svg>
        Comparison
      </div>

      <!-- Heading -->
      <h2 class="diff-heading">
        What's the difference between a
        <span class="hl hl--a">trademark</span> and a
        <span class="hl hl--b">copyright</span>?
      </h2>

      <p class="diff-subtitle">
        Both protect your intellectual property, but they serve fundamentally
        different purposes. Understanding the distinction ensures you apply
        the right type of protection.
      </p>

      <!-- Cards -->
      <div class="diff-cards">
        <!-- Trademark -->
        <div class="diff-card diff-card--a">
          <div class="diff-card__head">
            <div class="diff-card__head-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <text x="12" y="16" text-anchor="middle" font-size="10" font-weight="800" font-family="Inter, sans-serif" fill="#ffffff">TM</text>
              </svg>
            </div>
            <span class="diff-card__head-tag">Intellectual Property</span>
          </div>

          <div class="diff-card__body">
            <h3 class="diff-card__title">Trademark</h3>
            <p class="diff-card__desc">
              Protects the identifiers that distinguish your brand from
              competitors in the marketplace.
            </p>

            <div class="diff-card__feats">
              <div class="diff-card__feat">
                <div class="diff-card__feat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div class="diff-card__feat-body">
                  <span class="diff-card__feat-title">Protects brands</span>
                  <span class="diff-card__feat-text">Covers names, logos, slogans, and any mark that identifies the source of goods or services.</span>
                </div>
              </div>

              <div class="diff-card__feat">
                <div class="diff-card__feat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>
                </div>
                <div class="diff-card__feat-body">
                  <span class="diff-card__feat-title">Needs to be registered</span>
                  <span class="diff-card__feat-text">Requires filing with the USPTO to gain federal protection. Unregistered marks have limited common-law rights.</span>
                </div>
              </div>

              <div class="diff-card__feat">
                <div class="diff-card__feat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                </div>
                <div class="diff-card__feat-body">
                  <span class="diff-card__feat-title">Can be renewed indefinitely</span>
                  <span class="diff-card__feat-text">As long as you continue using the mark in commerce and file maintenance documents, it never expires.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VS Badge -->
        <div class="diff-vs">
          <span>VS</span>
        </div>

        <!-- Copyright -->
        <div class="diff-card diff-card--b">
          <div class="diff-card__head">
            <div class="diff-card__head-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/></svg>
            </div>
            <span class="diff-card__head-tag">Intellectual Property</span>
          </div>

          <div class="diff-card__body">
            <h3 class="diff-card__title">Copyright</h3>
            <p class="diff-card__desc">
              Protects original works of authorship from being copied or
              distributed without permission.
            </p>

            <div class="diff-card__feats">
              <div class="diff-card__feat">
                <div class="diff-card__feat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
                </div>
                <div class="diff-card__feat-body">
                  <span class="diff-card__feat-title">Protects creative works</span>
                  <span class="diff-card__feat-text">Covers literary works, music, art, software, films, and other original creative expressions.</span>
                </div>
              </div>

              <div class="diff-card__feat">
                <div class="diff-card__feat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                </div>
                <div class="diff-card__feat-body">
                  <span class="diff-card__feat-title">Applies automatically</span>
                  <span class="diff-card__feat-text">Exists the moment an original work is fixed in a tangible medium. Registration is optional but strengthens protection.</span>
                </div>
              </div>

              <div class="diff-card__feat">
                <div class="diff-card__feat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="diff-card__feat-body">
                  <span class="diff-card__feat-title">Has an expiration date</span>
                  <span class="diff-card__feat-text">Generally lasts for the author's lifetime plus 70 years. After that, the work enters the public domain.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Note -->
      <div class="diff-note">
        <div class="diff-note__icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <p>Some works may qualify for both trademark <strong>and</strong> copyright protection — for example, a distinctive logo that is also an artistic work.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) visible.value = true;
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );
  const root = document.querySelector(".diff-section");
  if (root) observer.observe(root);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ─── Section ─── */
.diff-section {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: #f7faf9;
  color: #1a1a2e;
  position: relative;
  padding: 100px 0 96px;
  overflow: hidden;
}

/* Subtle diagonal lines */
.diff-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 40px,
    rgba(1, 158, 142, 0.03) 40px,
    rgba(1, 158, 142, 0.03) 41px
  );
}

/* ─── Container ─── */
.diff-container {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Label ─── */
.diff-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid rgba(1, 158, 142, 0.18);
  background: #ffffff;
  color: #019e8e;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(1, 158, 142, 0.06);
}

/* ─── Heading ─── */
.diff-heading {
  font-size: clamp(1.65rem, 3.2vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 16px;
  color: #0f172a;
  text-align: center;
  transition-delay: 60ms;
}

.hl {
  position: relative;
}
.hl--a {
  color: #019e8e;
}
.hl--b {
  color: #067e73;
}

/* ─── Subtitle ─── */
.diff-subtitle {
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.7;
  color: #64748b;
  max-width: 580px;
  margin: 0 auto 56px;
  text-align: center;
  transition-delay: 120ms;
}

/* ─── Cards Wrapper ─── */
.diff-cards {
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  position: relative;
  gap: 0;
}
@media (min-width: 860px) {
  .diff-cards {
    grid-template-columns: 1fr 56px 1fr;
  }
}

/* ─── Card ─── */
.diff-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 4px 16px rgba(0, 0, 0, 0.04),
    0 12px 40px rgba(0, 0, 0, 0.03);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s ease;
}

.diff-card--a { transition-delay: 100ms; }
.diff-card--b { transition-delay: 200ms; }

.diff-card:hover {
  box-shadow:
    0 0 0 1px rgba(1, 158, 142, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 8px 24px rgba(1, 158, 142, 0.08),
    0 20px 48px rgba(1, 158, 142, 0.06);
  transform: translateY(-3px);
}
.diff-card--b:hover {
  box-shadow:
    0 0 0 1px rgba(6, 126, 115, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 8px 24px rgba(6, 126, 115, 0.08),
    0 20px 48px rgba(6, 126, 115, 0.06);
}

/* Mobile: round corners per card */
.diff-card--a {
  border-radius: 16px 16px 4px 4px;
}
.diff-card--b {
  border-radius: 4px 4px 16px 16px;
}
@media (min-width: 860px) {
  .diff-card--a {
    border-radius: 16px 4px 4px 16px;
  }
  .diff-card--b {
    border-radius: 4px 16px 16px 4px;
  }
}

/* ─── Card Head (colored band) ─── */
.diff-card__head {
  padding: 24px 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;
}

.diff-card--a .diff-card__head {
  background: linear-gradient(135deg, #019e8e 0%, #06c4ac 100%);
}
.diff-card--b .diff-card__head {
  background: linear-gradient(135deg, #067e73 0%, #019e8e 100%);
}

/* Subtle pattern inside header */
.diff-card__head::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0);
  background-size: 16px 16px;
  pointer-events: none;
}

.diff-card__head-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.diff-card__head-tag {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  position: relative;
  z-index: 1;
}

/* ─── Card Body ─── */
.diff-card__body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.diff-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  color: #0f172a;
}

.diff-card__desc {
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.65;
  color: #64748b;
  margin: 0 0 24px;
}

/* ─── Features ─── */
.diff-card__feats {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.diff-card__feat {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 0;
  border-top: 1px solid #f1f5f9;
}

.diff-card__feat:first-child {
  border-top: none;
  padding-top: 0;
}

.diff-card__feat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.diff-card--a .diff-card__feat-icon {
  background: rgba(1, 158, 142, 0.07);
  color: #019e8e;
}
.diff-card--b .diff-card__feat-icon {
  background: rgba(6, 126, 115, 0.07);
  color: #067e73;
}

.diff-card:hover .diff-card__feat-icon {
  transform: scale(1.08);
}
.diff-card--a:hover .diff-card__feat-icon {
  box-shadow: 0 2px 8px rgba(1, 158, 142, 0.15);
}
.diff-card--b:hover .diff-card__feat-icon {
  box-shadow: 0 2px 8px rgba(6, 126, 115, 0.15);
}

.diff-card__feat-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 2px;
}

.diff-card__feat-title {
  font-size: 13.5px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.35;
}

.diff-card__feat-text {
  font-size: 12px;
  font-weight: 400;
  color: #94a3b8;
  line-height: 1.6;
}

/* ─── VS Badge ─── */
.diff-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 150ms;
  padding: 16px 0;
}

@media (min-width: 860px) {
  .diff-vs {
    padding: 0;
    flex-direction: column;
  }
}

.diff-vs span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #019e8e;
  box-shadow:
    0 0 0 4px #f7faf9,
    0 0 0 5px rgba(1, 158, 142, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
  position: relative;
}

/* ─── Bottom Note ─── */
.diff-note {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 40px;
  padding: 20px 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e8eeec;
  font-size: 13px;
  font-weight: 400;
  color: #64748b;
  line-height: 1.65;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition-delay: 350ms;
}

.diff-note__icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 158, 142, 0.07);
  color: #019e8e;
  flex-shrink: 0;
}

.diff-note p {
  margin: 0;
  padding-top: 3px;
}

.diff-note strong {
  font-weight: 600;
  color: #019e8e;
}
</style>