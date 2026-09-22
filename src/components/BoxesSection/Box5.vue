<template>
  <section class="ip-split v-five" :class="{ 'is-visible': visible }">
    <div class="ip-head">
      <span class="ip-eyebrow">
        Know the difference
      </span>
      <h2 class="ip-heading">Two shields. One purpose.<br />Very different rules.</h2>
      <p class="ip-sub">
        Trademark and copyright both guard what you make — but they protect
        different things, in different ways, for different lengths of time.
      </p>
    </div>

    <div class="ip-stage">
      <div class="ip-panel ip-panel--tm">
        <div class="ip-panel__inner">
          <!-- <div class="ip-panel__top">
            <span class="ip-file-tag">File 01</span>
            <span class="ip-mark">TM</span>
          </div> -->

          <div class="ip-header-wrap">
              <div class="ip-badge">
                <div class="ip-badge__ring"></div>
                <span>TM</span>
              </div>
              <div>
                  <h3 class="ip-title">Trademark</h3>
                  <p class="ip-desc">
                    Protects the identifiers that distinguish your brand from
                    competitors in the marketplace.
                  </p>
              </div>
          </div>

          <ol class="ip-docket">
            <li class="ip-docket__item">
              <span class="ip-docket__index">01</span>
              <span class="ip-docket__icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span class="ip-docket__body">
                <strong>Protects brands</strong>
                Names, logos, slogans, and any mark that identifies the
                source of goods or services.
              </span>
            </li>
            <li class="ip-docket__item">
              <span class="ip-docket__index">02</span>
              <span class="ip-docket__icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" />
                </svg>
              </span>
              <span class="ip-docket__body">
                <strong>Must be registered</strong>
                Requires filing with the USPTO for federal protection.
                Unregistered marks carry only limited rights.
              </span>
            </li>
            <li class="ip-docket__item">
              <span class="ip-docket__index">03</span>
              <span class="ip-docket__icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
                </svg>
              </span>
              <span class="ip-docket__body">
                <strong>Renews indefinitely</strong>
                Stays alive forever as long as you keep using the mark and
                file maintenance documents.
              </span>
            </li>
          </ol>
        </div>
      </div>

      <div class="ip-seam">
        <div class="ip-seam__line"></div>
        <div class="ip-seam__badge">VS</div>
        <div class="ip-seam__line"></div>
      </div>

      <div class="ip-panel ip-panel--cr">
        <div class="ip-panel__inner">
          <!-- <div class="ip-panel__top">
            <span class="ip-file-tag">File 02</span>
            <span class="ip-mark">©</span>
          </div> -->

          <div class="ip-header-wrap">
            <div class="ip-badge">
                <div class="ip-badge__ring"></div>
                <span>©</span>
            </div>
            <div>
                <h3 class="ip-title">Copyright</h3>
                <p class="ip-desc">
                    Protects original works of authorship from being copied or
                    distributed without permission.
                </p>
            </div>
          </div>


          <ol class="ip-docket">
            <li class="ip-docket__item">
              <span class="ip-docket__index">01</span>
              <span class="ip-docket__icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </span>
              <span class="ip-docket__body">
                <strong>Protects creative works</strong>
                Literary works, music, art, software, films, and other
                original creative expressions.
              </span>
            </li>
            <li class="ip-docket__item">
              <span class="ip-docket__index">02</span>
              <span class="ip-docket__icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </span>
              <span class="ip-docket__body">
                <strong>Applies automatically</strong>
                Exists the moment a work is fixed in a tangible medium.
                Registration is optional but strengthens it.
              </span>
            </li>
            <li class="ip-docket__item">
              <span class="ip-docket__index">03</span>
              <span class="ip-docket__icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span class="ip-docket__body">
                <strong>Eventually expires</strong>
                Generally lasts the author's lifetime plus 70 years, then
                enters the public domain.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div class="ip-ticket">
      <span class="ip-ticket__hole ip-ticket__hole--left"></span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>
        Some works qualify for both — a distinctive logo can be a
        <strong>trademark</strong> and a <strong>copyrighted</strong> artistic work at once.
      </span>
      <span class="ip-ticket__hole ip-ticket__hole--right"></span>
    </div>
  </section>
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
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );
  const root = document.querySelector(".ip-split");
  if (root) observer.observe(root);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.ip-split {
  font-family: "Inter", sans-serif;
  position: relative;
  padding: 96px 24px 80px;
  max-width: 1280px;
  margin: 0 auto;
}

/* .v-five .ip-head,
.v-five .ip-panel,
.v-five .ip-seam,
.v-five .ip-ticket {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.5, 0, 0, 1), transform 0.7s cubic-bezier(0.5, 0, 0, 1);
/* } */
.v-five .ip-split.is-visible .ip-panel--tm { opacity: 1; transform: translateY(0); transition-delay: 80ms; }
.v-five .ip-split.is-visible .ip-seam { opacity: 1; transform: translateY(0); transition-delay: 150ms; }
.v-five .ip-split.is-visible .ip-panel--cr { opacity: 1; transform: translateY(0); transition-delay: 220ms; }
.v-five .ip-split.is-visible .ip-ticket { opacity: 1; transform: translateY(0); transition-delay: 320ms; } 

.v-five .ip-split.is-visible .ip-head { opacity: 1; transform: translateY(0); text-align: center; }

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

.v-five .ip-heading {
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.12;
  color: var(--navy-950);
  margin: 0 0 18px;
  text-align: center;
}

.v-five .ip-sub {
  font-size: 1.125rem;
  color: var(--neutral-500);
  line-height: 1.625;
  margin: 0 0 56px;
}

.v-five .ip-stage {
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
}
@media (min-width: 920px) {
  .v-five .ip-stage {
    grid-template-columns: 1fr 88px 1fr;
    align-items: stretch;
  }
}

.v-five .ip-panel {
  position: relative;
  border-radius: 20px;
}

.v-five .ip-panel--tm {
  background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
}

.v-five .ip-panel--cr {
  background: var(--neutral-50);
  border: 1px solid var(--neutral-200);
}

@media (min-width: 920px) {
  .v-five .ip-panel--tm {
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    margin-right: -44px;
    padding-right: 44px;
  }
  .v-five .ip-panel--cr {
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
    margin-left: -44px;
    padding-left: 44px;
  }
}

.v-five .ip-panel__inner {
  padding: 40px 40px 44px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
@media (min-width: 920px) {
  .v-five .ip-panel--tm .ip-panel__inner { padding-right: 56px; }
  .v-five .ip-panel--cr .ip-panel__inner { padding-left: 56px; }
}

.v-five .ip-panel__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.v-five .ip-file-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
}
.v-five .ip-panel--tm .ip-file-tag {
  color: var(--brand-300);
  border: 1px solid rgba(251, 146, 60, 0.3);
  background: rgba(251, 146, 60, 0.08);
}
.v-five .ip-panel--cr .ip-file-tag {
  color: var(--navy-800);
  border: 1px solid var(--neutral-200);
  background: var(--neutral-100);
}

.v-five .ip-mark {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.v-five .ip-panel--tm .ip-mark { color: rgba(255, 255, 255, 0.18); }
.v-five .ip-panel--cr .ip-mark { color: var(--neutral-300); }

.v-five .ip-header-wrap {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 16px;
}

.v-five .ip-badge {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 26px;
}
.v-five .ip-panel--tm .ip-badge {
  background: rgba(251, 146, 60, 0.12);
  color: var(--brand-400);
  border: 1px solid rgba(251, 146, 60, 0.3);
}
.v-five .ip-panel--cr .ip-badge {
  background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
  color: var(--brand-400);
}

.v-five .ip-badge__ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(251, 146, 60, 0.25);
}

.v-five .ip-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}
.v-five .ip-panel--tm .ip-title { color: #fff; }
.v-five .ip-panel--cr .ip-title { color: var(--navy-950); }

.v-five .ip-desc {
  font-size: 0.8438rem;
  line-height: 1.65;
  margin: 0 0 32px;
  max-width: 320px;
}
.v-five .ip-panel--tm .ip-desc { color: rgba(255, 255, 255, 0.55); }
.v-five .ip-panel--cr .ip-desc { color: var(--neutral-500); }

.v-five .ip-docket {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.v-five .ip-docket__item {
  display: grid;
  grid-template-columns: 22px 30px 1fr;
  align-items: start;
  gap: 12px;
}

.v-five .ip-docket__index {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 11px;
  font-weight: 700;
  padding-top: 5px;
}
.v-five .ip-panel--tm .ip-docket__index { color: rgba(251, 146, 60, 0.55); }
.v-five .ip-panel--cr .ip-docket__index { color: var(--brand-500); }

.v-five .ip-docket__icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.v-five .ip-panel--tm .ip-docket__icon {
  background: rgba(255, 255, 255, 0.06);
  color: var(--brand-400);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.v-five .ip-panel--cr .ip-docket__icon {
  background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
  color: var(--brand-400);
}

.v-five .ip-docket__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12.5px;
  line-height: 1.6;
  padding-top: 3px;
}
.v-five .ip-docket__body strong {
  font-size: 13.5px;
  font-weight: 600;
}
.v-five .ip-panel--tm .ip-docket__body strong { color: #fff; }
.v-five .ip-panel--tm .ip-docket__body { color: rgba(255, 255, 255, 0.45); }
.v-five .ip-panel--cr .ip-docket__body strong { color: var(--navy-950); }
.v-five .ip-panel--cr .ip-docket__body { color: var(--neutral-500); }

.v-five .ip-seam {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  position: relative;
  z-index: 2;
}
@media (min-width: 920px) {
  .v-five .ip-seam { display: flex; }
}

.v-five .ip-seam__line {
  flex: 1;
  width: 1px;
  min-height: 60px;
  background: linear-gradient(to bottom, transparent, var(--neutral-300) 25%, var(--neutral-300) 75%, transparent);
}

.v-five .ip-seam__badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand-500);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.35);
}

.v-five .ip-ticket {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 48px auto 0;
  max-width: 700px;
  padding: 18px 32px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 12.5px;
  line-height: 1.6;
}

.v-five .ip-ticket svg {
  flex-shrink: 0;
  color: var(--brand-400);
}

.v-five .ip-ticket strong {
  color: var(--brand-400);
  font-weight: 600;
}

.v-five .ip-ticket__hole {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--neutral-50);
}
.v-five .ip-ticket__hole--left { left: -9px; }
.v-five .ip-ticket__hole--right { right: -9px; }
</style>