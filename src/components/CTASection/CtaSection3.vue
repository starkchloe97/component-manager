<template>
  <section class="final-cta">
    <div class="cta-wrap">
      <div class="cta-box">
        <div class="cta-decor">
          <div class="cta-ring r1"></div>
          <div class="cta-ring r2"></div>
          <div class="cta-ring r3"></div>
          <div class="cta-ring r4"></div>
          <div class="cta-ring r5"></div>
        </div>
        <div class="cta-content">
          <h2 class="cta-title">Ready to Protect Your Brand?</h2>
          <p class="cta-desc">Start your trademark registration in under 5 minutes. Our experts handle every step, from search to approval.</p>

          <div class="cta-stats">
            <div class="stat">
              <span class="stat-num">98%</span>
              <span class="stat-label">Approval rate</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">5 min</span>
              <span class="stat-label">To get started</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">24/7</span>
              <span class="stat-label">Expert support</span>
            </div>
          </div>

          <div class="cta-buttons">
            <a href="#pricing" class="btn-accent">
              <i class="ti ti-shield-check" style="font-size:17px" aria-hidden="true"></i>
              Register Your Trademark Now
              <i class="ti ti-arrow-right" style="font-size:16px" aria-hidden="true"></i>
            </a>
            <a href="#" class="btn-outline" onclick="if(window.showToast) window.showToast('Our team will call you shortly!'); return false;">
              <i class="ti ti-phone" style="font-size:16px" aria-hidden="true"></i>
              Talk to an Expert
            </a>
          </div>

          <p class="cta-note">
            <i class="ti ti-lock" style="font-size:13px" aria-hidden="true"></i>
            No hidden fees &nbsp;·&nbsp; 
            <i class="ti ti-refresh" style="font-size:13px" aria-hidden="true"></i>
            Money-back guarantee &nbsp;·&nbsp;
            <i class="ti ti-star" style="font-size:13px" aria-hidden="true"></i>
            4.9/5 rating
          </p>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useComponentStyles } from "@/composables/useComponentStyles";
function callExpert() {
  if (window.showToast) window.showToast('Our team will call you shortly!')
}

const styles = useComponentStyles("CTASection3", {
  primary: "#fff",
  background: "linear-gradient(135deg, #067e73 0%, #019e8e 55%, #06c4ac 100%)",
  surface: "#ffffff",
  pdtop: "3rem",
  pdbottom: "3rem",
  pdleft: "2.5rem",
  pdright: "2.5rem",
  fontSize: "2rem",
  fontSizeBody: "1.05rem",
  muted: "rgba(255,255,255,0.82)"
});

</script>

<style>

.final-cta { margin: 0; padding: 0; box-sizing: border-box; font-family: Inter, sans-serif;}
.final-cta{
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  --surface: v-bind("styles.surface");
  --font-size: v-bind("styles.fontSize");
  --font-size-body: v-bind("styles.fontSizeBody");
  --pd-top: v-bind("styles.pdtop");
  --pd-bottom: v-bind("styles.pdbottom");
  --pd-left: v-bind("styles.pdleft");
  --pd-right: v-bind("styles.pdright");
  --muted: v-bind("styles.muted")
}
.cta-box {
  position: relative;
  background:var(--bg);
  padding-top: var(--pd-top);
  padding-bottom: var(--pd-bottom);
  padding-left: var(--pd-left);
  padding-right: var(--pd-right);
  /* padding: 3rem 2.5rem; */
  text-align: center;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
}
@media (min-width: 640px) { .cta-box { padding: 4rem 3.5rem; } }
.cta-decor { position: absolute; inset: 0; pointer-events: none; }
.cta-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.18);
}
.r1 { width: 8rem; height: 8rem; top: -2rem; left: -2rem; }
.r2 { width: 14rem; height: 14rem; bottom: -4rem; right: -3rem; }
.r3 { width: 10rem; height: 10rem; top: 50%; left: 50%; transform: translate(-50%,-50%); }
.r4 { width: 5rem; height: 5rem; top: 1.5rem; right: 2.5rem; border-color: rgba(255,255,255,0.12); }
.r5 { width: 3rem; height: 3rem; bottom: 2rem; left: 3.5rem; border-color: rgba(255,255,255,0.1); }
.cta-content { position: relative; z-index: 2; }
.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 99px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.01em;
}
.badge-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #a0ffd6;
  flex-shrink: 0;
}
.cta-title {
  font-size: 2rem;
  font-weight: 800;
  color:var(--primary);
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin: 0 0 1rem;
}
@media (min-width: 640px) { .cta-title { font-size: 2.5rem; } }
@media (min-width: 1024px) { .cta-title { font-size: 3rem; } }

.cta-desc {
  color:var(--muted);
  font-size: 1.05rem;
  line-height: 1.65;
  max-width: 34rem;
  margin: 0 auto 2rem;
}
.cta-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.25rem;
  flex-wrap: wrap;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stat-num {
  font-size: 1.4rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}
.stat-label {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.65);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.stat-divider {
  width: 1px;
  background: rgba(255,255,255,0.2);
  align-self: stretch;
}
.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  justify-content: center;
  align-items: center;
}
@media (min-width: 540px) {
  .cta-buttons { flex-direction: row; }
}
.btn-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #ff7e11, #f06306);
  color: #fff;
  font-weight: 700;
  font-size: 0.92rem;
  padding: 0.85rem 1.75rem;
  border-radius: 0.75rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 24px rgba(199,74,7,0.38);
  white-space: nowrap;
}
.btn-accent:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(255,126,17,0.42); }
.btn-accent:active { transform: translateY(0); }
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.85rem 1.75rem;
  border-radius: 0.75rem;
  text-decoration: none;
  border: 2px solid rgba(255,255,255,0.35);
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}
.btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.5); }
.cta-note {
  margin-top: 1.25rem;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
</style>