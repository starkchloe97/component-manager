<template>
  <section class="section v-two">
    <div class="container">
      <div class="header">
        <span class="badge">
          Intellectual Property
        </span>
        <h2 class="title">
          What's the difference between a trademark and a copyright?
        </h2>
        <p class="subtitle">
          Both protect intellectual property, but they serve fundamentally different purposes
        </p>
      </div>

      <div class="comparison">
        <div class="card card-tm">
          <div class="card-accent-line accent-tm"></div>
          <div class="card-header">
            <div class="icon-box icon-box-tm">
              <svg viewBox="0 0 48 48" fill="none" class="icon-main">
                <rect x="4" y="4" width="40" height="40" rx="10" stroke="url(#gTm)" stroke-width="2.5"/>
                <text x="24" y="31.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="17" font-weight="800" fill="url(#gTm)">TM</text>
                <defs><linearGradient id="gTm" x1="4" y1="4" x2="44" y2="44"><stop offset="0%" stop-color="var(--primary)"/><stop offset="100%" stop-color="#7c5cbf"/></linearGradient></defs>
              </svg>
            </div>
            <div>
              <h3 class="card-title">Trademark</h3>
              <span class="card-label label-tm">Brand Protection</span>
            </div>
          </div>
          <p class="card-desc">A trademark identifies and distinguishes the source of goods or services in the marketplace.</p>
          <ul class="card-list">
            <li class="list-item">
              <span class="check check-tm"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Protects brands, logos & names</span>
            </li>
            <li class="list-item">
              <span class="check check-tm"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Needs to be registered</span>
            </li>
            <li class="list-item">
              <span class="check check-tm"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Can be renewed indefinitely</span>
            </li>
          </ul>
          <div class="card-footer">
            <div class="footer-icon fi-tm"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <span class="footer-text">USPTO Registration</span>
          </div>
        </div>

        <!-- Mobile VS -->
        <div class="vs-m">
          <div class="vs-m-line"></div>
          <div class="vs-circle"><span class="vs-t">VS</span></div>
          <div class="vs-m-line"></div>
        </div>

        <!-- Desktop VS -->
        <div class="vs-d">
          <div class="vs-d-line"></div>
          <div class="vs-circle"><span class="vs-t">VS</span></div>
          <div class="vs-d-line"></div>
        </div>

        <div class="card card-cr">
          <div class="card-accent-line accent-cr"></div>
          <div class="card-header">
            <div class="icon-box icon-box-cr">
              <svg viewBox="0 0 48 48" fill="none" class="icon-main">
                <circle cx="24" cy="24" r="20" stroke="url(#gCr)" stroke-width="2.5"/>
                <text x="24" y="31.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="22" font-weight="800" fill="url(#gCr)">C</text>
                <defs><linearGradient id="gCr" x1="4" y1="4" x2="44" y2="44"><stop offset="0%" stop-color="#ff7c00"/><stop offset="100%" stop-color="#ffb84d"/></linearGradient></defs>
              </svg>
            </div>
            <div>
              <h3 class="card-title">Copyright</h3>
              <span class="card-label label-cr">Creative Protection</span>
            </div>
          </div>
          <p class="card-desc">Copyright protects original works of authorship fixed in a tangible medium of expression.</p>
          <ul class="card-list">
            <li class="list-item">
              <span class="check check-cr"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Protects creative works</span>
            </li>
            <li class="list-item">
              <span class="check check-cr"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Applies automatically</span>
            </li>
            <li class="list-item">
              <span class="check check-cr"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span>Has an expiration date</span>
            </li>
          </ul>
          <div class="card-footer">
            <div class="footer-icon fi-cr"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <span class="footer-text">Automatic Protection</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TrademarkVsCopyright'
}
</script>

<style>

.section {
    padding: 80px 24px;
    max-width: 1280px;
    margin: 0 auto;
}

.section {
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
  --shadow-sm: 0 1px 3px rgba(26,35,126,0.06);
  --shadow-md: 0 4px 16px rgba(26,35,126,0.08);
  --shadow-lg: 0 8px 40px rgba(26,35,126,0.1);
  --shadow-xl: 0 16px 60px rgba(26,35,126,0.12);
  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
}
/* ═══════════════════════════════════
   MOBILE-FIRST BASE (< 480px)
   ═══════════════════════════════════ */
/* .v-two .section {
  max-width: 1200px;
} */

.v-two .section::selection {
  background: rgba(62, 47, 106, 0.12);
  color: var(--primary);
}

/* ── Background ── */
.bg-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(62, 47, 106, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(62, 47, 106, 0.02) 1px, transparent 1px);
  background-size: 24px 24px;
}

.v-two .bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(80px);
}

.v-two .bg-orb-1 {
  width: 200px;
  height: 200px;
  background: rgba(62, 47, 106, 0.05);
  top: -60px;
  right: -50px;
  animation: d1 20s ease-in-out infinite;
}

.v-two .bg-orb-2 {
  width: 160px;
  height: 160px;
  background: rgba(255, 124, 0, 0.04);
  bottom: -40px;
  left: -40px;
  animation: d2 24s ease-in-out infinite;
}

.v-two .bg-orb-3 {
  width: 120px;
  height: 120px;
  background: rgba(62, 47, 106, 0.03);
  top: 45%;
  left: 35%;
  animation: d1 15s ease-in-out infinite reverse;
}

@keyframes d1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -15px) scale(1.05); }
  66% { transform: translate(-10px, 12px) scale(0.96); }
}

@keyframes d2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, -15px) scale(1.06); }
}

@keyframes fu {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Container ── */
.v-two .container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Header ── */
.v-two .header {
  text-align: center;
  margin-bottom: 28px;
}

.v-two .badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(26,35,126,0.05);
  border: 1px solid rgba(26,35,126,0.08);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 18px;
}

.v-two .title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3.2vw, 38px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.2px;
  line-height: 1.15;
  margin: 0 0 16px 0;
}

.v-two .grad-text {
  background: linear-gradient(135deg, var(--primary) 0%, #7c5cbf 45%, #ff7c00 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.v-two .subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
  margin: 0 auto;
}

/* ── Comparison: COLUMN stack by default ── */
.v-two .comparison {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  margin-bottom: 20px;
}

/* ── Cards ── */
.v-two .card {
  position: relative;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #ece8f3;
  overflow: hidden;
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s;
  padding: 30px;
}

.v-two .card:hover {
  transform: translateY(-4px);
}

.v-two .card-tm:hover {
  box-shadow: 0 16px 36px -12px rgba(62, 47, 106, 0.14);
  border-color: rgba(62, 47, 106, 0.18);
}

.v-two .card-cr:hover {
  box-shadow: 0 16px 36px -12px rgba(255, 124, 0, 0.14);
  border-color: rgba(255, 124, 0, 0.18);
}

.v-two .card-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
}

.v-two .accent-tm { background: var(--primary); }
.v-two .accent-cr { background: linear-gradient(90deg, #ff7c00, #ffb84d); }

.v-two .card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.v-two .icon-box {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s;
}

.v-two .card:hover .icon-box {
  transform: scale(1.08) rotate(-3deg);
}

.v-two .icon-box-tm {
  background: linear-gradient(135deg, rgba(62, 47, 106, 0.08), rgba(124, 92, 191, 0.05));
  color: var(--primary);
  box-shadow: 0 3px 10px rgba(62, 47, 106, 0.06);
}

.v-two .card:hover .icon-box-tm {
  box-shadow: 0 6px 16px rgba(62, 47, 106, 0.15);
}

.v-two .icon-box-cr {
  background: linear-gradient(135deg, rgba(255, 124, 0, 0.08), rgba(255, 184, 77, 0.05));
  color: #ff7c00;
  box-shadow: 0 3px 10px rgba(255, 124, 0, 0.06);
}

.v-two .card:hover .icon-box-cr {
  box-shadow: 0 6px 16px rgba(255, 124, 0, 0.15);
}

.v-two .icon-main {
  width: 24px;
  height: 24px;
}

.v-two .card-title {
  color: #111827;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin-bottom: 1px;
}

.v-two .card-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.v-two .label-tm { color: var(--primary); }
.v-two .label-cr { color: #d06800; }

.v-two .card-desc {
  color: #6b7280;
  font-size: 14.5px;
  line-height: 1.6;
  font-weight: 400;
  margin-bottom: 12px;
}

.v-two .card-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
  padding: 0px;
}

.v-two .list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.35;
}

.v-two .check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.v-two .check svg {
  width: 9px;
  height: 9px;
}

.v-two .list-item:hover .check {
  transform: scale(1.15);
}

.v-two .check-tm {
  background: linear-gradient(135deg, rgba(62, 47, 106, 0.08), rgba(124, 92, 191, 0.04));
  color: var(--primary);
}

.v-two .check-cr {
  background: linear-gradient(135deg, rgba(255, 124, 0, 0.08), rgba(255, 184, 77, 0.04));
  color: #ff7c00;
}

.v-two .card-footer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 8px;
  width: fit-content;
  align-self: flex-start;
}

.v-two .footer-icon {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-two .footer-icon svg {
  width: 11px;
  height: 11px;
}

.v-two .fi-tm { background: rgba(62, 47, 106, 0.04); color: var(--primary); }
.v-two .fi-cr { background: rgba(255, 124, 0, 0.04); color: #ff7c00; }

.v-two .footer-text {
  font-size: 11.5px;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.02em;
}

/* ── VS Mobile (visible by default) ── */
.v-two .vs-m {
  display: flex;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
}

.v-two .vs-m-line {
  flex: 1;
  height: 1.5px;
  background: linear-gradient(to right, transparent, rgba(62, 47, 106, 0.1), transparent);
}

/* ── VS Desktop (hidden by default) ── */
.v-two .vs-d {
  display: none;
}

.v-two .vs-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  margin: 0 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 14px rgba(62, 47, 106, 0.2);
  position: relative;
}

.v-two .vs-circle::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #ff7c00);
  opacity: 0.1;
  animation: vp 3s ease-in-out infinite;
}

@keyframes vp {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.3); opacity: 0; }
}

.v-two .vs-t {
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  position: relative;
  z-index: 1;
}

/* ── Note ── */
.v-two .note {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: linear-gradient(135deg, rgba(62, 47, 106, 0.025), rgba(255, 124, 0, 0.015));
  border: 1px solid rgba(62, 47, 106, 0.05);
  border-radius: 12px;
  padding: 10px 12px;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  flex-direction: column;
}

.v-two .note-glow {
  position: absolute;
  top: -60%;
  right: -15%;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(255, 124, 0, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.v-two .note-icon {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: linear-gradient(135deg, rgba(62, 47, 106, 0.06), rgba(255, 124, 0, 0.04));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.v-two .note-icon svg {
  width: 13px;
  height: 13px;
}

.v-two .note-text {
  color: #4b5563;
  font-size: 11px;
  line-height: 1.6;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

.v-two .note-text strong {
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.v-two .header { animation: fu 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.v-two .card-tm { opacity: 0; animation: fu 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; }
.v-two .card-cr { opacity: 0; animation: fu 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.22s forwards; }
.v-two .vs-m,
.v-two .vs-d { opacity: 0; animation: fu 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.16s forwards; }
.v-two .note { opacity: 0; animation: fu 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.34s forwards; }
</style>