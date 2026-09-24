<script setup>
import { SITE_NAME } from "@/config/siteInfo.js";

const features = [
  {
    icon: 'fa-solid fa-headset',
    iconClass: 't1',
    title: 'Personal Customer Care',
    description: `At ${SITE_NAME}, our Trademark Specialists familiarize themselves with your trademark application, allowing them to provide support tailored to your needs.`,
  },
  {
    icon: 'fa-solid fa-shield-halved',
    iconClass: 't2',
    title: 'Trusted & Experienced',
    description: 'Our expert Trademark Specialists will research and prepare your trademark application the correct way, saving you time and money by avoiding costly errors.',
  },
  {
    icon: 'fa-solid fa-bolt',
    iconClass: 't3',
    title: 'Quick yet Comprehensive',
    description: 'Our Trademark Specialists alongside our online step-by-step guide helps you understand and complete the trademark filing process in a couple of minutes.',
  },
];
</script>

<template>
  <div class="fluid-container dark_blue">
    <div data-v-0f8fa859="" class="bg-image"></div>
    <div data-v-0f8fa859="" class="bg-overlay"></div>
    <div class="container">
      <div class="mb-4 text-center white">
        <h2>Why file a trademark online with {{ SITE_NAME }}</h2>
        <p>Protect your business with confidence. Affordable. Fast. Simple.</p>
      </div>
      <div class="row gx-5 gy-4">
        <div class="col-md-4" v-for="type in features" :key="type.title">
          <div class="inner-conduct">
            <i :class="['icon-fa', type.icon, type.iconClass]"></i>
            <h3>{{ type.title }}</h3>
            <p>{{ type.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fluid-container {
  --primary-light: #3949ab;
  --accent-glow: rgba(255, 109, 0, 0.15);
  --bg-card: #ffffff;
  --bg-gradient: linear-gradient(
    135deg,
    #fafbff 0%,
    #f0f2ff 50%,
    #fff8f0 100%
  );
  --text: #1a1a2e;
  --text-secondary: #5c6283;
  --border-light: #eef0f8;
  --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
  --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
  --radius: 12px;
  --border: #d4e0f0;
  --accent: #ff6d00;
  --primary: #003dc7bd;
}

.bg-image {
    position: absolute;
    inset: 0;
    background-image: url(https://img.magnific.com/free-photo/business-people-discussing-cafe_53876-15158.jpg?t=st=1783634825~exp=1783638425~hmac=b990aa2…&w=1060);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
}

.bg-overlay{
    position: absolute;
    inset: 0;
background: linear-gradient(180deg, 
  rgba(249, 115, 22, 0.95) 100%,
  rgba(249, 115, 22, 0.95) 100%,
  rgba(251, 146, 60, 0.90) 90%,
  rgba(249, 115, 22, 0.95) 100%
);
z-index: 1;
}

/* ─── Outer Section ─── */
.fluid-container.dark_blue {
  position: relative;
  background: var(--bg-gradient);
  padding: 64px 0 72px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.fluid-container.dark_blue::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--primary-light) 50%, transparent 100%);
  opacity: 0.25;
}

/* ─── Container ─── */
.container {
  position: relative;
  z-index: 1;
  max-width: 1290px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Header ─── */
.row.mb-4 {
  text-align: center;
  margin-bottom: 48px !important;
}

.row.mb-4 h2 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 8px;
}

.row.mb-4 p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* ─── Cards Grid ─── */
.row.gx-5 {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  row-gap: 32px;
  margin: 0;
}

.row.gx-5.gy-4 {
  row-gap: 32px;
}

.row.gx-5 > .col-md-4 {
  margin-bottom: 32px;
}

.row.gx-5 > .col-md-4:last-child {
  margin-bottom: 0;
}

/* ─── Card Column ─── */
.col-md-4 {
  flex: 1 1 calc(33.333% - 24px);
  max-width: calc(33.333% - 24px);
  padding: 0;
  display: flex;
}

/* ─── Card ─── */
.inner-conduct {
  position: relative;
  align-items: flex-start;
  gap: 18px;
  padding: 20px 24px;
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  width: 100%;
  border-bottom: none;
  height: 210px;
}

.inner-conduct:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  border-color: var(--border);
}

/* Left accent bar – now a subtle gradient line on hover */
.inner-conduct::before {
  content: '';
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 0;
  width: 3px;
  height: 88%;
  background: transparent;
  border-radius: 4px 0 0 4px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.col-md-4:nth-child(2) .inner-conduct::before {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  background: var(--accent);
  content: '';
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 0;
  width: 1px;
  height: 88%;
}

.mb-4.text-center.white {
    margin: 0 0 40px 0;
    color: #fff;
}

.inner-conduct:hover::before {
  background: var(--accent);
  box-shadow: 0 0 16px var(--accent-glow);
}

/* ─── Card Icon ─── */
.icon-fa {
  display: block;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: var(--primary);
  background: #ff6f0024;
  transition: all 0.3s ease;
  margin-top: 2px;
  margin-bottom: 10px;
}

.inner-conduct:hover .icon-fa {
  color: #fff;
  background: var(--accent);
}

/* Optional per-icon accent variety, matches your iconClass pattern */
.icon-fa.t1 { color: #ff6d00; }
.icon-fa.t2 { color: #ff6d00; }
.icon-fa.t3 { color: #ff6d00; }

/* ─── Card Content ─── */
.inner-conduct h3 {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
  margin: 0 0 6px;
  transition: color 0.3s ease;
}

.inner-conduct:hover h3 {
  color: var(--primary);
}

.inner-conduct p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s ease;
}

.inner-conduct:hover p {
  color: var(--text);
}

/* ─── Responsive ─── */
@media (max-width: 992px) {
  .col-md-4 {
    flex: 1 1 calc(50% - 24px);
    max-width: calc(50% - 24px);
  }
}

@media (max-width: 640px) {
  .fluid-container.dark_blue {
    padding: 48px 0 56px;
  }

  .row.mb-4 {
    margin-bottom: 32px !important;
  }

  .row.mb-4 h2 {
    font-size: 22px;
  }

  .row.mb-4 p {
    font-size: 14px;
  }

  .row.gx-5 {
    gap: 16px;
  }

  .col-md-4 {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .inner-conduct {
    padding: 20px 16px;
    gap: 14px;
  }

  .icon-fa {
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
  }

  .inner-conduct h3 {
    font-size: 15px;
  }

  .inner-conduct p {
    font-size: 13px;
  }
}
</style>