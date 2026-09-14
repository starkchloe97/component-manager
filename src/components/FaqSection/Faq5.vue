<template>
  <div class="wrapper v-five">

    <!-- ── MAIN SECTION ── -->
    <section class="cta-section">

      <!-- LEFT -->
      <div class="left">
        <div class="left-badge">
          <span class="dot"></span>
          We're here to help
        </div>

        <h1>Ready to<br />get <em>started?</em></h1>
        <p>If there are questions you want to ask, we will answer all your questions and guide you every step of the way.</p>

        <div class="stats-row">
          <div v-for="(s, i) in stats" :key="i" class="stat-group">
            <div class="stat">
              <strong>{{ s.value }}</strong>
              <span>{{ s.label }}</span>
            </div>
            <div v-if="i < stats.length - 1" class="stat-divider"></div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <div class="right-header">
          <h2>Maybe your question has already been answered.</h2>
          <div class="faq-count">{{ items.length }} FAQs</div>
        </div>
        <p class="right-sub">Check out the most common questions below.</p>

        <div class="accordion">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="accordion-item"
            :class="{ open: openIndex === i }"
          >
            <button class="accordion-trigger" @click="toggle(i)">
              <span>{{ item.question }}</span>
              <div class="accordion-icon">+</div>
            </button>
            <div class="accordion-body">
              <div class="accordion-body-inner">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import { Search, RefreshCcw, Clock, ShieldCheck, Calendar } from "@lucide/vue";

export default {
  name: 'ReadySection',

  props: {
    stats: {
      type: Array,
      default: () => [
        { value: '12K+', label: 'Subscribers' },
        { value: '98%',  label: 'Satisfaction' },
        { value: '24/7', label: 'Support' },
      ],
    },
    items: {
      type: Array,
      default: () => [
        {
          question: 'What is Coca Soft',
          answer: 'Coca Soft is a modern software agency specializing in digital products, brand systems, and scalable web applications. We work with startups and enterprises alike.',
        },
        {
          question: 'How can I get service from Coca Soft',
          answer: 'Simply reach out via our contact form or email. Our team will schedule a discovery call within 24 hours to understand your needs and present a tailored plan.',
        },
        {
          question: 'What kind of service will I get',
          answer: 'We offer end-to-end product design, frontend and backend development, brand identity, and ongoing support — fully tailored to your goals.',
        },
        {
          question: 'Is there a free consultation available',
          answer: 'Yes — we offer a free 30-minute consultation with no commitment required so we can align on scope, timeline, and budget before any contract is signed.',
        },
      ],
    },
    socials: {
      type: Array,
      default: () => [
        { label: 'Facebook', href: '#', svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>` },
        { label: 'Instagram', href: '#', svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>` },
        { label: 'YouTube', href: '#', svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29.1 29.1 0 001 12a29.1 29.1 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29.1 29.1 0 0023 12a29.1 29.1 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#EA580C"/></svg>` },
        { label: 'LinkedIn', href: '#', svg: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>` },
      ],
    },
    footerLinks: {
      type: Array,
      default: () => [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    copyright: { type: String, default: '© All Rights Reserved' },
  },

  emits: ['subscribe'],

  data() {
    return {
      email: '',
      openIndex: null,
    }
  },

  methods: {
    toggle(i) {
      this.openIndex = this.openIndex === i ? null : i
    },
    handleSubscribe() {
      this.$emit('subscribe', this.email)
      this.email = ''
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

.v-five .wrapper {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f8fafc;
  color: #0f172a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ── SECTION ── */
.v-five .cta-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 32px 72px;
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  /* gap: 72px; */
  align-items: start;
}

/* ── LEFT ── */
.v-five .left-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #fff1ec;
  border: 1px solid #fcd5c0;
  color: #EA580C;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 24px;
}

.v-five .dot {
  width: 7px;
  height: 7px;
  background: #EA580C;
  border-radius: 50%;
  display: inline-block;
}

.v-five .left h1 {
  font-size: clamp(36px, 4.5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  color: #0f172a;
  margin-bottom: 18px;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.v-five .left h1 em {
  font-weight: 900;
  color: #EA580C;
  font-style: normal;
}

.v-five .left p {
  font-size: 15.5px;
  color: #64748b;
  line-height: 1.65;
  max-width: 400px;
  margin-bottom: 36px;
}

.v-five .email-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.05);
  max-width: 380px;
}

.v-five .email-card label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.v-five .email-row {
  display: flex;
  gap: 10px;
}

.v-five .email-row input {
  flex: 1;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  padding: 11px 14px;
  background: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: border-color 0.2s;
}
.v-five .email-row input:focus { border-color: #EA580C; }
.v-five .email-row input::placeholder { color: #94a3b8; }

.v-five .btn-subscribe {
  background: #EA580C;
  color: #fff;
  border: none;
  padding: 11px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  white-space: nowrap;
  transition: background 0.2s, transform 0.2s;
}
.v-five .btn-subscribe:hover { background: #c73d09; transform: translateY(-1px); }

.v-five .email-note {
  margin-top: 12px;
  font-size: 12px;
  color: #94a3b8;
}

.v-five .stats-row {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 36px;
}

.v-five .stat-group {
  display: flex;
  align-items: center;
}

.v-five .stat strong {
  display: block;
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.v-five .stat span {
  font-size: 12.5px;
  color: #94a3b8;
  margin-top: 2px;
  display: block;
}

.v-five .stat-divider {
  width: 1px;
  height: 36px;
  background: #e2e8f0;
  margin: 0 24px;
}

/* ── RIGHT ── */
.v-five .right {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 36px 36px 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
}

.v-five .right-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
  
}

.v-five .right h2 {
  font-size: 19px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  max-width: 280px;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.v-five .faq-count {
  background: #fff1ec;
  color: #EA580C;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  white-space: nowrap;
}

.v-five .right-sub {
  font-size: 13.5px;
  color: #94a3b8;
  margin-bottom: 28px;
}

/* ── ACCORDION ── */
.v-five .accordion-item {
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid transparent;
  margin-bottom: 10px;
  transition: border-color 0.25s, background 0.25s;
  overflow: hidden;
}

.v-five .accordion-item.open {
  background: #fff8f5;
  border-color: #fcd5c0;
}

.v-five .accordion-trigger {
  width: 100%;
  background: none;
  border: none;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  text-align: left;
}

.v-five .accordion-trigger span {
  font-size: 14.5px;
  font-weight: 600;
  color: #0f172a;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: color 0.2s;
}

.v-five .accordion-item.open .accordion-trigger span { color: #EA580C; }

.v-five .accordion-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 18px;
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.3s;
}

.v-five .accordion-item.open .accordion-icon {
  background: #EA580C;
  border-color: #EA580C;
  color: #fff;
  transform: rotate(45deg);
}

.v-five .accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.32s ease;
}

.v-five .accordion-item.open .accordion-body {
  grid-template-rows: 1fr;
}

.v-five .accordion-body-inner { overflow: hidden; }

.v-five .accordion-body-inner p {
  font-size: 14px;
  color: #64748b;
  line-height: 1.7;
  padding: 0 18px 18px;
}
</style>