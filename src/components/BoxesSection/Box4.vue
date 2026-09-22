<script setup>
import { ShieldCheck, FileText, RefreshCw, Ban, Palette, Zap, CalendarClock } from '@lucide/vue'
</script>

<template>
  <section class="ip-section v-four">
    <div class="ip-inner">
      <div class="ip-head">
        <div class="ip-head-left">
          <span class="eyebrow">IP Clarity</span>
          <h2>Trademark <em>vs.</em> Copyright</h2>
        </div>
        <p class="ip-head-right">Two different shields for two different things — know which one your brand needs.</p>
      </div>
      <div class="ip-arena">
        <div class="ip-side ip-side-tm">
          <div class="ip-side-hd">
            <div class="ip-stamp">TM</div>
            <div class="ip-side-hd-text">
              <h3>Trademark</h3>
              <span>Brand identity</span>
            </div>
          </div>
          <div class="ip-rows">
            <div class="ip-row">
              <div class="ip-row-icon"><ShieldCheck :size="14" /></div>
              <div>
                <span class="ip-row-label">Protects</span>
                <p class="ip-row-val">Names, logos, slogans — anything that <b>identifies your brand</b> in the marketplace.</p>
              </div>
            </div>
            <div class="ip-row">
              <div class="ip-row-icon"><FileText :size="14" /></div>
              <div>
                <span class="ip-row-label">How to get it</span>
                <p class="ip-row-val"><b>Register with USPTO.</b> Common-law rights exist through use, but offer limited protection.</p>
              </div>
            </div>
            <div class="ip-row">
              <div class="ip-row-icon"><RefreshCw :size="14" /></div>
              <div>
                <span class="ip-row-label">Duration</span>
                <p class="ip-row-val"><b>Indefinitely</b> — renew every 10 years and keep using it in commerce.</p>
              </div>
            </div>
            <div class="ip-row">
              <div class="ip-row-icon"><Ban :size="14" /></div>
              <div>
                <span class="ip-row-label">Does not cover</span>
                <p class="ip-row-val">Songs, books, films, or inventions — those need copyright or patent.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ip-side ip-side-cp">
          <div class="ip-side-hd">
            <div class="ip-stamp">©</div>
            <div class="ip-side-hd-text">
              <h3>Copyright</h3>
              <span>Creative works</span>
            </div>
          </div>
          <div class="ip-rows">
            <div class="ip-row">
              <div class="ip-row-icon"><Palette :size="14" /></div>
              <div>
                <span class="ip-row-label">Protects</span>
                <p class="ip-row-val">Books, music, art, software, films — any <b>original creative expression</b> you've made.</p>
              </div>
            </div>
            <div class="ip-row">
              <div class="ip-row-icon"><Zap :size="14" /></div>
              <div>
                <span class="ip-row-label">How to get it</span>
                <p class="ip-row-val"><b>Automatic on creation.</b> Registration strengthens your ability to sue for infringement.</p>
              </div>
            </div>
            <div class="ip-row">
              <div class="ip-row-icon"><CalendarClock :size="14" /></div>
              <div>
                <span class="ip-row-label">Duration</span>
                <p class="ip-row-val">Your <b>lifetime + 70 years.</b> For hire or anonymous works: 95 years from publication.</p>
              </div>
            </div>
            <div class="ip-row">
              <div class="ip-row-icon"><Ban :size="14" /></div>
              <div>
                <span class="ip-row-label">Does not cover</span>
                <p class="ip-row-val">Brand names, logos, or inventions — those need trademark or patent protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="ip-footer">
        <div class="ip-tag ip-tag-tm">
          <div class="ip-tag-body">
            <span class="ip-tag-lbl">Governing authority</span>
            <span class="ip-tag-val">USPTO — U.S. Patent &amp; Trademark Office</span>
          </div>
        </div>
        <div class="ip-tag ip-tag-cp">
          <div class="ip-tag-body">
              <span class="ip-tag-lbl">Governing authority</span>
            <span class="ip-tag-val">U.S. Copyright Office — Library of Congress</span>
          </div>
        </div>
    </div> -->
</div>
</section>
</template>

<style scoped>

.v-four *, .v-four *::before, .v-four *::after { box-sizing: border-box; margin: 0; padding: 0;font-family: "Instrument Sans", sans-serif !important;}

.ip-section {
  padding: 70px 24px;
  background: #faf8ff;
}

.ip-inner {
  max-width: 1160px;
  margin: 0 auto;
}

.v-four .ip-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 44px;
}
.v-four .ip-head-left .eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: #003ec7;
  display: block;
  margin-bottom: 10px;
}

.v-four .ip-head-left h2 {
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #131b2e;
}

.v-four .ip-head-left h2 em {
  font-style: italic;
  background: #003ec7;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.v-four .ip-head-right {
  font-size: 0.8rem;
  color: rgba(68, 71, 79, 0.65);
  text-align: right;
  line-height: 1.6;
  flex-shrink: 0;
}

.v-four .ip-arena {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  border-radius: 2rem;
  overflow: hidden;
}

.v-four .ip-side {
  display: flex;
  flex-direction: column;
}

.v-four .ip-side-tm { background: #fff; }
.v-four .ip-side-cp { background: #fff; }

.v-four .ip-side-hd {
  padding: 10px 20px 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(195, 197, 217, 0.25);
}

.v-four .ip-side-tm .ip-side-hd { background: #131b2e; }
.v-four .ip-side-cp .ip-side-hd { background: #131b2e; }

.v-four .ip-stamp {
  font-weight: 900;
  font-size: 4rem;
  letter-spacing: 0.06em;
  border-radius: 8px;
  flex-shrink: 0;
  line-height: 1;
  opacity: 0.1;
}

.v-four .ip-side-tm .ip-stamp { color: #fff; }
.v-four .ip-side-cp .ip-stamp { color: #fff; }

.v-four .ip-side-hd-text h3 {
  font-size: 0.95rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.01em;
  margin-bottom: 1px;
}

.v-four .ip-side-hd-text span {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.v-four .ip-rows {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.v-four .ip-row {
  padding: 32px 28px 22px 28px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid rgba(195, 197, 217, 0.18);
}

.v-four .ip-row:last-child { border-bottom: none; }

.v-four .ip-row-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  font-size: 14px;
}

.v-four .ip-side-tm .ip-row-icon {
  background: rgba(0, 62, 199, 0.08);
  color: #003ec7;
}

.v-four .ip-side-cp .ip-row-icon {
  background: rgba(0, 62, 199, 0.1);
  color: #003ec7;
}

.v-four .ip-row-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(68, 71, 79, 0.55);
  margin-bottom: 3px;
  display: block;
}

.v-four .ip-row-val {
  font-size: 16px;
  color: #131b2e;
  line-height: 22px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-four .ip-row-val b {
  font-weight: 400;
  /* color: #003ec7; */
}

.v-four .ip-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 16px;
  gap: 30px;
}

.v-four .ip-tag {
  border-radius: 1rem;
  padding: 13px 18px;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid rgba(195, 197, 217, 0.3);
  background: #fff;
}

.v-four .ip-tag-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.v-four .ip-tag-lbl {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: rgba(68, 71, 79, 0.55);
}

.v-four .ip-tag-val {
  font-size: 0.8rem;
  font-weight: 600;
  color: #131b2e;
}

@media (max-width: 800px) {
  .v-four .ip-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .v-four .ip-head-right {
    text-align: left;
    max-width: 100%;
  }
  .v-four .ip-arena {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  .v-four .ip-footer { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .v-four .ip-section { padding: 10px 16px 40px 16px; }
  .v-four .ip-side-hd { padding: 16px 20px; }
  .v-four .ip-row { padding: 12px 20px; }
  .v-four .ip-arena { border-radius: 1.5rem; }
}
</style>
