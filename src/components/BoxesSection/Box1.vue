<template>
  <div class="diff-section v-one" :class="{ 'is-visible': visible }">
    <div class="diff-blobs">
      <div class="diff-blob diff-blob--a"></div>
      <div class="diff-blob diff-blob--b"></div>
    </div>

    <div class="diff-container">
      <!-- Label -->
      <div class="diff-label">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 3h5v5" />
          <path d="M4 20 21 3" />
          <path d="m21 16-5 5" />
          <path d="M15 21h5v-5" />
          <path d="m4 4 5 5" />
        </svg>
        Comparison
      </div>

      <!-- Heading -->
      <h2 class="diff-heading">
        What's the difference between a<br />
        <span class="grad-main">trademark</span> and a
        <span class="grad-deep">copyright</span>?
      </h2>

      <p class="diff-subtitle">
        Both protect your intellectual property, but they serve fundamentally
        different purposes. Understanding the distinction ensures you apply the
        right type of protection.
      </p>

      <!-- Comparison Grid -->
      <div class="diff-grid">
        <!-- Trademark Card -->
        <div
          class="diff-card"
          style="
            --border-h: rgba(11, 85, 182, 0.22);
            --glow: rgba(11, 85, 182, 0.05);
            --ring-c: rgba(11, 85, 182, 0.28);
            --ring-g: rgba(11, 85, 182, 0.09);
            --dot: #0b55b6;
            --line: rgba(11, 85, 182, 0.16);
            --tag-b: rgba(11, 85, 182, 0.22);
            --tag-bg: rgba(11, 85, 182, 0.06);
            --tag-c: #0b55b6;
            --pulse-c: rgba(11, 85, 182, 0.18);
            --icon-c: #a3a3a3;
            --icon-c-h: #0b55b6;
            transition-delay: 100ms;
          "
          @mousemove="onGlow($event, $el)"
          @mouseleave="offGlow($el)"
        >
          <div class="diff-card__top">
            <span class="diff-card__tag">Intellectual Property</span>
            <span class="diff-card__num">TM</span>
          </div>

          <!-- Large Icon -->
          <div class="diff-card__icon-wrap">
            <div class="diff-card__pulse" style="--pulse: var(--pulse-c)"></div>
            <div
              class="diff-card__big-icon"
              style="
                background: rgba(11, 85, 182, 0.08);
                border-color: rgba(11, 85, 182, 0.15);
              "
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <text
                  x="12"
                  y="15"
                  text-anchor="middle"
                  font-size="8"
                  font-weight="bold"
                  font-family="Arial, sans-serif"
                  fill="#0B55B6"
                >
                  TM
                </text>
              </svg>
            </div>
          </div>

          <h3 class="diff-card__title">Trademark</h3>
          <p class="diff-card__desc">
            Protects the identifiers that distinguish your brand from
            competitors in the marketplace.
          </p>

          <!-- Points -->
          <div class="diff-card__points">
            <!-- Point 1: Protects brands — Shield icon -->
            <div class="diff-card__point">
              <div class="diff-card__point-track">
                <div class="diff-card__point-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div class="diff-card__point-line"></div>
              </div>
              <div class="diff-card__point-content">
                <span class="diff-card__point-title">Protects brands</span>
                <span class="diff-card__point-text">
                  Covers names, logos, slogans, and any mark that identifies the
                  source of goods or services.
                </span>
              </div>
            </div>
            <!-- Point 2: Needs to be registered — FileCheck icon -->
            <div class="diff-card__point">
              <div class="diff-card__point-track">
                <div class="diff-card__point-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
                    />
                    <path d="M14 2v6h6" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                </div>
                <div class="diff-card__point-line"></div>
              </div>
              <div class="diff-card__point-content">
                <span class="diff-card__point-title"
                  >Needs to be registered</span
                >
                <span class="diff-card__point-text">
                  Requires filing with the USPTO to gain federal protection.
                  Unregistered marks have limited common-law rights.
                </span>
              </div>
            </div>
            <!-- Point 3: Can be renewed indefinitely — RefreshCw icon -->
            <div class="diff-card__point">
              <div class="diff-card__point-track">
                <div class="diff-card__point-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                    />
                    <path d="M21 3v5h-5" />
                    <path
                      d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                    />
                    <path d="M8 16H3v5" />
                  </svg>
                </div>
              </div>
              <div class="diff-card__point-content">
                <span class="diff-card__point-title"
                  >Can be renewed indefinitely</span
                >
                <span class="diff-card__point-text">
                  As long as you continue using the mark in commerce and file
                  maintenance documents, it never expires.
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- VS Divider -->
        <div class="diff-vs">
          <div class="diff-vs__line"></div>
          <div class="diff-vs__badge">
            <span>VS</span>
          </div>
          <div class="diff-vs__line"></div>
        </div>

        <!-- Copyright Card -->
        <div
          class="diff-card"
          style="
            --border-h: rgba(8, 63, 138, 0.22);
            --glow: rgba(8, 63, 138, 0.05);
            --ring-c: rgba(8, 63, 138, 0.28);
            --ring-g: rgba(8, 63, 138, 0.09);
            --dot: #083f8a;
            --line: rgba(8, 63, 138, 0.16);
            --tag-b: rgba(8, 63, 138, 0.22);
            --tag-bg: rgba(8, 63, 138, 0.06);
            --tag-c: #083f8a;
            --pulse-c: rgba(8, 63, 138, 0.18);
            --icon-c: #a3a3a3;
            --icon-c-h: #083f8a;
            transition-delay: 200ms;
          "
          @mousemove="onGlow($event, $el)"
          @mouseleave="offGlow($el)"
        >
          <div class="diff-card__top">
            <span class="diff-card__tag">Intellectual Property</span>
            <span class="diff-card__num">©</span>
          </div>

          <!-- Large Icon -->
          <div class="diff-card__icon-wrap">
            <div class="diff-card__pulse" style="--pulse: var(--pulse-c)"></div>
            <div
              class="diff-card__big-icon"
              style="
                background: rgba(11, 85, 182, 0.08);
                border-color: rgba(11, 85, 182, 0.15);
              "
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0B55B6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14.83 14.83a4 4 0 1 1 0-5.66" fill="none" />
              </svg>
            </div>
          </div>

          <h3 class="diff-card__title">Copyright</h3>
          <p class="diff-card__desc">
            Protects original works of authorship from being copied or
            distributed without permission.
          </p>

          <!-- Points -->
          <div class="diff-card__points">
            <!-- Point 1: Protects creative works — Palette icon -->
            <div class="diff-card__point">
              <div class="diff-card__point-track">
                <div class="diff-card__point-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                    <path
                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
                    />
                  </svg>
                </div>
                <div class="diff-card__point-line"></div>
              </div>
              <div class="diff-card__point-content">
                <span class="diff-card__point-title"
                  >Protects creative works</span
                >
                <span class="diff-card__point-text">
                  Covers literary works, music, art, software, films, and other
                  original creative expressions.
                </span>
              </div>
            </div>
            <!-- Point 2: Applies automatically — Zap icon -->
            <div class="diff-card__point">
              <div class="diff-card__point-track">
                <div class="diff-card__point-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                    />
                  </svg>
                </div>
                <div class="diff-card__point-line"></div>
              </div>
              <div class="diff-card__point-content">
                <span class="diff-card__point-title"
                  >Applies automatically</span
                >
                <span class="diff-card__point-text">
                  Exists the moment an original work is fixed in a tangible
                  medium. Registration is optional but strengthens protection.
                </span>
              </div>
            </div>
            <!-- Point 3: Has an expiration date — Timer icon -->
            <div class="diff-card__point">
              <div class="diff-card__point-track">
                <div class="diff-card__point-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
              <div class="diff-card__point-content">
                <span class="diff-card__point-title"
                  >Has an expiration date</span
                >
                <span class="diff-card__point-text">
                  Generally lasts for the author's lifetime plus 70 years. After
                  that, the work enters the public domain.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Note -->
      <div class="diff-note" style="transition-delay: 350ms">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span
          >Some works may qualify for both trademark
          <strong>and</strong> copyright protection — for example, a distinctive
          logo that is also an artistic work.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
let observer = null;

function onGlow(e, el) {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
  el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
}

function offGlow(el) {
  el.style.setProperty("--mx", "50%");
  el.style.setProperty("--my", "50%");
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) visible.value = true;
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );
  const root = document.querySelector(".diff-section");
  if (root) observer.observe(root);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* ── Base ── */
.diff-section {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  background-color: #fafafa;
  color: #171717;
  position: relative;
  padding: 80px 0 96px;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
}

.diff-section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.02;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Blobs ── */
.v-one .diff-blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.v-one .diff-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.v-one .diff-blob--a {
  top: 20%;
  left: 15%;
  width: 400px;
  height: 400px;
  background: rgba(11, 85, 182, 0.06);
}
.v-one .diff-blob--b {
  bottom: 10%;
  right: 15%;
  width: 400px;
  height: 400px;
  background: rgba(8, 63, 138, 0.05);
}

/* ── Container ── */
.v-one .diff-container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}


/* ── Label ── */
.v-one .diff-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(11, 85, 182, 0.18);
  background: rgba(11, 85, 182, 0.06);
  color: #0b55b6;
  margin-bottom: 20px;
}
.v-one .diff-label svg {
  flex-shrink: 0;
}

/* ── Heading ── */
.v-one .diff-heading {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.15;
  margin: 0 0 16px;
  color: #171717;
  transition-delay: 80ms;
}

.v-one .grad-main {
  background: linear-gradient(135deg, #0b55b6, #1e78d2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.v-one .grad-deep {
  background: linear-gradient(135deg, #083f8a, #0b55b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Subtitle ── */
.v-one .diff-subtitle {
  font-size: 0.9375rem;
  font-weight: 300;
  line-height: 1.625;
  color: #737373;
  max-width: 640px;
  margin: 0 auto 56px;
  text-align: center;
  transition-delay: 150ms;
}

/* ── Comparison Grid ── */
.v-one .diff-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: stretch;
}
@media (min-width: 900px) {
  .v-one .diff-grid {
    grid-template-columns: 1fr auto 1fr;
    gap: 0;
  }
}

/* ── Card ── */
.v-one .diff-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 8px 32px rgba(0, 0, 0, 0.03);
  transition:
    opacity 0.8s cubic-bezier(0.5, 0, 0, 1),
    transform 0.8s cubic-bezier(0.5, 0, 0, 1),
    border-color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.v-one .diff-card:first-child {
  border-radius: 16px 16px 0 0;
}
.v-one .diff-card:last-child {
  border-radius: 0 0 16px 16px;
}
@media (min-width: 900px) {
  .v-one .diff-card:first-child {
    border-radius: 16px 0 0 16px;
    border-right: none;
  }
  .v-one .diff-card:last-child {
    border-radius: 0 16px 16px 0;
    border-left: none;
  }
}

/* mouse glow */
.v-one .diff-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    var(--glow, rgba(11, 85, 182, 0.05)) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
}
.v-one .diff-card:hover::before {
  opacity: 1;
}

.v-one .diff-section.is-visible .diff-card:hover {
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 16px 40px rgba(0, 0, 0, 0.05);
}
.v-one .diff-card:first-child:hover {
  border-color: var(--border-h, rgba(11, 85, 182, 0.22));
}
.v-one .diff-card:last-child:hover {
  border-color: var(--border-h, rgba(8, 63, 138, 0.22));
}

.v-one .diff-card > * {
  position: relative;
  z-index: 1;
}

/* ── Card Top ── */
.v-one .diff-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.v-one .diff-card__tag {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.02);
  color: #a3a3a3;
  transition: all 0.3s ease;
}
.v-one .diff-card:hover .diff-card__tag {
  border-color: var(--tag-b, rgba(11, 85, 182, 0.22));
  background: var(--tag-bg, rgba(11, 85, 182, 0.06));
  color: var(--tag-c, #0b55b6);
}

.v-one .diff-card__num {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 14px;
  font-weight: 600;
  color: #d4d4d4;
  letter-spacing: 0.05em;
}

/* ── Big Icon ── */
.v-one .diff-card__icon-wrap {
  position: relative;
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
}

.v-one .diff-card__big-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition:
    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 0.5s ease,
    box-shadow 0.5s ease;
}
.v-one .diff-card:hover .diff-card__big-icon {
  transform: scale(1.06);
  border-color: var(--ring-c, rgba(11, 85, 182, 0.28));
  box-shadow: 0 0 28px var(--ring-g, rgba(11, 85, 182, 0.09));
}

@keyframes diff-pulse {
  0% {
    transform: scale(1);
    opacity: 0.35;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
.v-one .diff-card__pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--pulse, rgba(11, 85, 182, 0.18));
  animation: diff-pulse 2.5s ease-out infinite;
}

/* ── Card Title ── */
.v-one .diff-card__title {
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 8px;
  color: #171717;
}

/* ── Card Desc ── */
.v-one .diff-card__desc {
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: 1.6;
  color: #737373;
  margin: 0 0 28px;
}

/* ── Points ── */
.v-one .diff-card__points {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-grow: 1;
}

.v-one .diff-card__point {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.v-one .diff-card__point-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
  flex-shrink: 0;
}

/* ── Point Icon (replaces dot) ── */
.v-one .diff-card__point-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: var(--icon-c, #a3a3a3);
  flex-shrink: 0;
  transition:
    color 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.v-one .diff-card:hover .diff-card__point-icon {
  color: var(--icon-c-h, #0b55b6);
  background: rgba(11, 85, 182, 0.06);
  border-color: rgba(11, 85, 182, 0.15);
  box-shadow: 0 0 12px rgba(11, 85, 182, 0.06);
}

.v-one .diff-card__point-line {
  width: 1px;
  height: 22px;
  background: rgba(0, 0, 0, 0.06);
  transition: background 0.3s ease;
}
.v-one .diff-card:hover .diff-card__point-line {
  background: var(--line, rgba(11, 85, 182, 0.16));
}

.v-one .diff-card__point-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-bottom: 20px;
}

.v-one .diff-card__point-title {
  font-size: 13px;
  font-weight: 600;
  color: #404040;
  line-height: 1.4;
}

.v-one .diff-card__point-text {
  font-size: 12px;
  font-weight: 300;
  color: #a3a3a3;
  line-height: 1.55;
}

/* ── VS Divider ── */
.v-one .diff-vs {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 4px;
  transition-delay: 150ms;
}
@media (min-width: 900px) {
  .v-one .diff-vs {
    display: flex;
  }
}

.v-one .diff-vs__line {
  flex: 1;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.08) 20%,
    rgba(0, 0, 0, 0.08) 80%,
    transparent
  );
  min-height: 40px;
}

.v-one .diff-vs__badge {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
}
.v-one .diff-vs__badge span {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #0b55b6;
}

/* ── Bottom Note ── */
.v-one .diff-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 40px;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(11, 85, 182, 0.04);
  border: 1px solid rgba(11, 85, 182, 0.1);
  font-size: 13px;
  font-weight: 300;
  color: #525252;
  line-height: 1.6;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
.v-one .diff-note svg {
  flex-shrink: 0;
  color: #0b55b6;
  margin-top: 2px;
}
.v-one .diff-note strong {
  font-weight: 600;
  color: #0b55b6;
}

/* ── Scrollbar ── */
.v-one ::-webkit-scrollbar {
  width: 6px;
}
.v-one ::-webkit-scrollbar-track {
  background: #fafafa;
}
.v-one ::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
</style>