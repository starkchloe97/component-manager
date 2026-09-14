<script setup>
import { ref, computed } from 'vue'

const openIndex = ref(0)
const searchQuery = ref('')

import faqVector from "../../assets/main.webp";

const faqs = [
  {
    question: 'How long does trademark registration take?',
    answer: 'The timeline varies by country. In the US, it typically takes 6–12 months from filing to registration. In the EU through EUIPO, it can be as fast as 4–6 months. Complex applications or those facing opposition may take longer. We provide real-time tracking so you always know where your application stands.'
  },
  {
    question: 'What can be trademarked?',
    answer: 'You can trademark brand names, logos, slogans, product shapes, colors, sounds, scents, and even packaging designs — as long as they are distinctive and not merely descriptive of your goods or services. Our free search tool helps you determine if your mark is eligible for registration.'
  },
  {
    question: 'Do I need a trademark attorney?',
    answer: 'While not legally required, working with an attorney significantly increases your chances of approval. Studies show that applications filed with attorney assistance have a much higher success rate. We include expert attorney review in all our packages at no additional cost.'
  },
  {
    question: 'How long does a trademark last?',
    answer: 'In most jurisdictions, a trademark registration is valid for 10 years and can be renewed indefinitely as long as the mark remains in use. Unlike patents or copyrights, trademark protection can potentially last forever. We send automated renewal reminders so you never miss a deadline.'
  },
  {
    question: 'What is the difference between ™ and ®?',
    answer: 'The ™ symbol can be used anytime to claim common law rights in a mark, even without registration. The ® symbol can only be used after your trademark is officially registered with the relevant government authority. Using ® before registration is illegal in many countries and can result in penalties.'
  },
  {
    question: 'Can I register a trademark internationally?',
    answer: 'Yes! Through the Madrid Protocol, you can file a single international application that extends protection to 130+ member countries. Alternatively, we can file directly in individual countries for non-Madrid members. Our Multi-Country and Enterprise plans are designed specifically for international protection.'
  },
  {
    question: 'What happens if someone opposes my trademark?',
    answer: 'After publication, there is a set period (usually 30 days) where third parties can file opposition. If opposed, we work with you to build a defense strategy, respond to the opposition, and resolve the matter — whether through negotiation, settlement, or legal proceedings. Our Enterprise plan includes full opposition handling.'
  }
]

const filteredFaqs = computed(() => {
  if (!searchQuery.value.trim()) return faqs
  const q = searchQuery.value.toLowerCase()
  return faqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
})

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="section faq-section v-two">
    <div class="faq-grid">

      <div class="faq-left animate-on-scroll">
        <div class="section-label"><i class="fas fa-question-circle"></i> FAQ</div>
        <h2 class="faq-title">Frequently Asked Questions</h2>
        <p class="section-desc">Got questions? We've got answers about trademark registration.</p>

        <div class="faq-list">
          <div
            v-if="filteredFaqs.length === 0"
            class="faq-empty"
          >
            No questions match your search.
          </div>

          <div
            v-for="(faq, index) in filteredFaqs"
            :key="faq.question"
            class="faq-item"
            :class="{ open: openIndex === index }"
          >
            <button
              class="faq-question"
              @click="toggleFaq(index)"
              :aria-expanded="openIndex === index"
            >
              <span class="faq-question-text">{{ faq.question }}</span>
              <span class="faq-icon"><i class="fas fa-plus"></i></span>
            </button>
            <div class="faq-answer" :style="{ maxHeight: openIndex === index ? '500px' : '0' }">
              <div class="faq-answer-inner">{{ faq.answer }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-visual animate-on-scroll">
        <div class="faq-visual-panel">
          <img
            :src="faqVector"
            alt="Frequently asked questions illustration"
            class="faq-illustration"
          />

          <div class="faq-badge faq-badge-1">
            <i class="fas fa-shield-alt"></i>
            <span>Protected</span>
          </div>
          <div class="faq-badge faq-badge-2">
            <i class="fas fa-check-circle"></i>
            <span>Registered</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>

.v-two {
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

.v-two {
  background: var(--bg-gradient);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
}

.section {
  padding: 80px 24px;
  max-width: 1280px;
  margin: 0 auto;
  
}

.section-label {
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

.v-two .section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 28px;
}

/* two column grid, matches reference structure */
.v-two .faq-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

.v-two .faq-left { min-width: 0; }

.v-two .faq-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3.2vw, 38px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.2px;
  line-height: 1.15;
  margin: 0 0 16px 0;
}

.v-two .faq-search {
  position: relative;
  margin-bottom: 28px;
}

.v-two .faq-search i {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--text-muted);
}

.v-two .faq-search input {
  width: 100%;
  padding: 14px 44px 14px 18px;
  background: var(--bg-alt);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 14px;
  color: var(--text);
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.v-two .faq-search input::placeholder { color: var(--text-muted); }

.v-two .faq-search input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(26,35,126,0.08);
}

/* minimal list, no card boxes, divider lines like reference */
.v-two .faq-list {
  display: flex;
  flex-direction: column;
}

.v-two .faq-empty {
  font-size: 14px;
  color: var(--text-muted);
  padding: 16px 0;
}

.v-two .faq-item {
  border-bottom: 1px solid var(--border-light);
  transition: border-color 0.3s ease;
}

.v-two .faq-item.open { border-color: rgba(26,35,126,0.2); }

.v-two .faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 15.5px;
  font-weight: 600;
  color: var(--text);
  gap: 16px;
}

.v-two .faq-question-text { transition: color 0.3s ease; }
.v-two .faq-question:hover .faq-question-text { color: var(--primary); }

.v-two .faq-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.v-two .faq-question:hover .faq-icon {
  background: rgba(26,35,126,0.1);
  color: var(--primary);
}

.v-two .faq-item.open .faq-icon {
  background: var(--primary);
  color: #fff;
  transform: rotate(135deg);
}

.v-two .faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.v-two .faq-answer-inner {
  padding: 0 0 20px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 90%;
}

/* right visual panel, original graphic instead of stock illustration */
.v-two .faq-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-two .faq-visual-panel {
  position: relative;
  width: 100%;
  /* aspect-ratio: 1 / 1; */
  /* max-width: 460px; */
  margin: 0 auto;
  border-radius: 32px;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.v-two .faq-illustration {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.v-two .faq-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 100px;
  box-shadow: var(--shadow-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.v-two .faq-badge i { color: var(--primary); font-size: 13px; }

.v-two .faq-badge-1 { top: 10%; left: 4%; animation: faq-float 4s ease-in-out infinite; }
.v-two .faq-badge-2 { bottom: 10%; right: 4%; animation: faq-float 4s ease-in-out infinite 2s; }

@keyframes faq-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes faq-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (max-width: 900px) {
  .v-two .faq-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .v-two .faq-visual { order: -1; }

  .v-two .faq-visual-panel {
    max-width: 320px;
    aspect-ratio: 16 / 10;
  }
}

@media (max-width: 768px) {
  .v-two .section { padding: 60px 16px; }
}
</style>