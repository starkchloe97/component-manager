<template>
  <section id="faq" class="faq v-three">
    <div class="faq-bg-1"></div>
    <div class="faq-bg-2"></div>
    <div class="faq-dot-1"></div>
    <div class="faq-dot-2"></div>

    <div class="section-inner">
      <div class="faq-grid">
        <div class="faq-left">
          <div class="animate-on-scroll">
            <span class="section-tag">Got Questions?</span>
          </div>
          <h2 class="animate-on-scroll stagger-1 faq-title">
            Everything You<br>Need to
            <span class="relative-inline">
              <span class="relative-text">Know</span>
              <svg class="underline-svg" viewBox="0 0 120 12" fill="none"><path d="M2 8C20 3 50 2 60 5C70 8 100 4 118 6" stroke="#1ee0c5" stroke-width="3" stroke-linecap="round" stroke-dasharray="200" style="animation: dash-offset 1.5s ease-out 0.8s both;"/></svg>
            </span>
          </h2>
          <p class="animate-on-scroll stagger-2 faq-subtitle">Can't find your answer? Our team of trademark experts is just a click away.</p>

          <div class="animate-on-scroll stagger-3">
            <div class="chat-card">
              <div class="chat-bg-1"></div>
              <div class="chat-bg-2"></div>
              <div class="chat-content">
                <div class="chat-header">
                  <div class="chat-avatar">
                    <span class="iconify text-xl" data-icon="lucide:message-circle"></span>
                  </div>
                  <div>
                    <p class="chat-header-title">Live Chat Support</p>
                    <p class="chat-header-sub">Typically replies in 2 min</p>
                  </div>
                </div>
                <div class="chat-messages">
                  <div class="chat-msg-user">
                    <div class="chat-avatar-sm">Y</div>
                    <div class="chat-bubble-user">Hi! I have a question about filing for a clothing brand...</div>
                  </div>
                  <div class="chat-msg-bot">
                    <div class="chat-avatar-bot">
                      <span class="iconify text-white text-xs" data-icon="lucide:shield-check"></span>
                    </div>
                    <div class="chat-bubble-bot">Great question! For clothing, you'd file under Class 25. I can walk you through it! 👍</div>
                  </div>
                </div>
                <button class="chat-btn" @click="openChat">
                  <span class="iconify text-sm" data-icon="lucide:send"></span>
                  Start a Conversation
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="faq-right">
          <div v-for="(item, i) in faqItems" :key="i" class="animate-on-scroll" :class="`stagger-${Math.min(i+1, 5)}`">
            <div class="faq-item" :class="{ open: openIndex === i }">
              <div class="faq-left-bar"></div>
              <button class="faq-toggle" @click="toggleFaq(i)">
                <div class="faq-icon-wrap" :style="{ background: item.iconBg }">
                  <span class="iconify text-lg" :class="item.iconClass" :data-icon="item.icon"></span>
                </div>
                <span class="faq-question">{{ item.question }}</span>
                <div class="faq-plus-wrap">
                  <span class="iconify faq-plus" :class="{ rotated: openIndex === i }" data-icon="lucide:plus"></span>
                </div>
              </button>
              <div class="faq-answer" :class="{ open: openIndex === i }">
                <div class="faq-answer-inner">
                  <p v-if="typeof item.answer === 'string'" class="faq-answer-text">{{ item.answer }}</p>
                  <div v-else>
                    <p class="faq-answer-text">{{ item.answer.text }}</p>
                    <div class="faq-timeline">
                      <div v-for="(t, ti) in item.answer.timeline" :key="ti" class="faq-timeline-item" :class="t.class">
                        <p class="faq-timeline-value">{{ t.value }}</p>
                        <p class="faq-timeline-label">{{ t.label }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import "@iconify/iconify";

const openIndex = ref(null)

const faqItems = [
  {
    icon: 'lucide:help-circle', iconBg: '#effefa', iconClass: 'text-brand-500',
    question: 'What is a trademark and why do I need one?',
    answer: 'A trademark is a legal protection for your brand name, logo, slogan, or other identifying marks. It prevents others from using similar marks that could confuse customers. Without a trademark, anyone can use your brand name, and you have limited legal recourse.'
  },
  {
    icon: 'lucide:clock', iconBg: '#effefa', iconClass: 'text-amber-500',
    question: 'How long does the registration process take?',
    answer: {
      text: 'The typical timeline is 3-6 months from filing to registration. Here\'s the breakdown:',
      timeline: [
        { value: '1-2', label: 'Weeks to File', class: 'green' },
        { value: '3-4', label: 'Months Review', class: 'green' },
        { value: '✓', label: 'Registered!', class: 'amber' },
      ]
    }
  },
  {
    icon: 'lucide:scale', iconBg: '#effefa', iconClass: 'text-purple-500',
    question: 'Do I need an attorney to file a trademark?',
    answer: 'No, you don\'t legally need an attorney. However, having an attorney review your application significantly increases the chances of approval. Our Deluxe and Premium plans include attorney review to maximize your chances of success.'
  },
  {
    icon: 'lucide:receipt', iconBg: '#effefa', iconClass: 'text-emerald-500',
    question: 'What\'s included in the USPTO filing fee?',
    answer: 'The USPTO filing fee is the government fee required to submit your trademark application. Our prices include this fee — it\'s typically $250-$350 per class of goods/services. We don\'t add any markup to government fees.'
  },
  {
    icon: 'lucide:alert-triangle', iconBg: '#effefa', iconClass: 'text-rose-500',
    question: 'What happens if my trademark is rejected?',
    answer: 'If your application is rejected, we offer a 100% money-back guarantee on the filing fee. Our Premium plan also includes a free amendment to respond to office actions. We\'ll work with you to address any issues raised by the USPTO examiner.'
  },
  {
    icon: 'lucide:calendar-check', iconBg: '#effefa', iconClass: 'text-sky-500',
    question: 'How long does a trademark last once registered?',
    answer: 'A federal trademark registration lasts 10 years and can be renewed indefinitely as long as you continue to use the mark in commerce and file the necessary maintenance documents between the 5th and 6th year, and then every 10 years.'
  },
]

function toggleFaq(index) {
  openIndex.value = openIndex.value === index ? null : index
}

function openChat() {
  if (window.showToast) window.showToast('Opening live chat...')
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
@keyframes dash-offset {
  to { stroke-dashoffset: 0; }
}

.v-three { font-family: 'Inter', sans-serif; background: #fcfcfd; color: #1e293b; overflow-x: hidden; margin: 0; line-height: inherit; }


.faq {
  position: relative; padding: 2.5rem 0; overflow: hidden;
}

.faq-bg-1 {
  position: absolute; top: 0; right: 0; width: 500px; height: 500px;
  background: linear-gradient(135deg, rgba(239,254,250,0.4), rgba(239,254,250,0.2));
  border-radius: 50%; filter: blur(120px); pointer-events: none;
}
.v-three .faq-bg-2 {
  position: absolute; bottom: 0; left: 0; width: 400px; height: 400px;
  background: linear-gradient(225deg, rgba(255,248,237,0.3), rgba(255,248,237,0.1));
  border-radius: 50%; filter: blur(100px); pointer-events: none;
}
.v-three .faq-dot-1 {
  position: absolute; top: 5rem; left: 2.5rem; width: 0.5rem; height: 0.5rem;
  background: #52f5da; border-radius: 50%; opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}
.v-three .faq-dot-2 {
  position: absolute; bottom: 5rem; right: 5rem; width: 0.75rem; height: 0.75rem;
  background: #ffbe71; border-radius: 50%; opacity: 0.4;
  animation: float-delayed 6s ease-in-out 2s infinite;
}

.v-three .section-inner { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
@media (min-width: 640px) { .v-three .section-inner { padding: 0 1.5rem; } }

.v-three .faq-grid {
  display: grid; gap: 3rem; align-items: start;
}
@media (min-width: 1024px) { .v-three .faq-grid { grid-template-columns: 2fr 3fr; gap: 4rem; } }

.v-three .faq-left { position: sticky; top: 7rem; }

.v-three .section-tag {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  color: #019e8e; text-transform: uppercase; letter-spacing: 0.1em;
  background: #effefa; padding: 0.375rem 1rem; border-radius: 9999px; margin-bottom: 1.25rem;
}

.v-three .faq-title {
  font-size: 1.875rem; font-weight: 800; color: #0f172a;
  letter-spacing: -0.025em; margin-bottom: 1.25rem; line-height: 1.25;
}
@media (min-width: 640px) { .v-three .faq-title { font-size: 2.25rem; } }

.v-three .relative-inline { position: relative; display: inline-block; }
.v-three .relative-text { position: relative; z-index: 10; }
.v-three .underline-svg { position: absolute; bottom: -0.375rem; left: 0; width: 100%; }

.v-three .faq-subtitle { color: #64748b; margin-bottom: 2rem; line-height: 1.625; }

.v-three .chat-card {
  position: relative;
  background: linear-gradient(135deg, #067e73, #019e8e);
  border-radius: 1rem; padding: 1.5rem; color: white; overflow: hidden;
}
.v-three .chat-bg-1 {
  position: absolute; top: 0; right: 0; width: 8rem; height: 8rem;
  background: rgba(255,255,255,0.05); border-radius: 50%;
  transform: translate(50%, -50%);
}
.v-three .chat-bg-2 {
  position: absolute; bottom: 0; left: 0; width: 5rem; height: 5rem;
  background: rgba(255,255,255,0.05); border-radius: 50%;
  transform: translate(-50%, 50%);
}
.v-three .chat-content { position: relative; z-index: 10; }

.v-three .chat-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
.v-three .chat-avatar {
  width: 2.5rem; height: 2.5rem; background: rgba(255,255,255,0.15);
  border-radius: 0.75rem; display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px);
}
.v-three .chat-header-title { font-size: 0.875rem; font-weight: 600; }
.v-three .chat-header-sub { font-size: 0.75rem; color: rgba(255,255,255,0.7); }

.v-three .chat-messages { margin-bottom: 1.25rem; }
.v-three .chat-msg-user { display: flex; align-items: flex-start; gap: 0.625rem; margin-bottom: 0.625rem; }
.v-three .chat-avatar-sm {
  width: 1.5rem; height: 1.5rem; background: rgba(255,255,255,0.15);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 0.125rem; font-size: 0.625rem; font-weight: 700;
}
.v-three .chat-bubble-user {
  background: rgba(255,255,255,0.1); border-radius: 0.75rem;
  border-top-left-radius: 0.125rem;
  padding: 0.5rem 0.875rem; font-size: 0.75rem; line-height: 1.5;
}
.v-three .chat-msg-bot { display: flex; align-items: flex-start; gap: 0.625rem; flex-direction: row-reverse; }
.v-three .chat-avatar-bot {
  width: 1.5rem; height: 1.5rem; background: #ff7e11; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 0.125rem;
}
.v-three .chat-bubble-bot {
  background: rgba(255,255,255,0.15); border-radius: 0.75rem;
  border-top-right-radius: 0.125rem;
  padding: 0.5rem 0.875rem; font-size: 0.75rem; line-height: 1.5;
}

.v-three .chat-btn {
  width: 100%; padding: 0.625rem;
  background: rgba(255,255,255,0.15); backdrop-filter: blur(4px);
  border-radius: 0.75rem; font-size: 0.75rem; font-weight: 600;
  color: white; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  transition: background 0.2s ease;
}
.v-three .chat-btn:hover { background: rgba(255,255,255,0.25); }

.v-three .faq-right { display: flex; flex-direction: column; gap: 0.75rem; }

.v-three .faq-item {
  position: relative; background: white; border-radius: 1rem;
  border: 1px solid #f1f5f9; overflow: hidden;
  transition: all 0.3s ease;
}
.v-three .faq-item:hover { border-color: #c8fff4; box-shadow: 0 10px 40px rgba(6,126,115,0.1); }

.v-three .faq-left-bar {
  position: absolute; left: 0; top: 0; bottom: 0; width: 0.25rem;
  background: linear-gradient(to bottom, #1ee0c5, #067e73);
  border-radius: 1rem 0 0 1rem; opacity: 0; transition: opacity 0.3s ease;
}
.v-three .faq-item:hover .faq-left-bar { opacity: 1; }

.v-three .faq-toggle {
  width: 100%; display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem 1.5rem; text-align: left;
  background: none; border: none; cursor: pointer;
}

.v-three .faq-icon-wrap {
  width: 2.5rem; height: 2.5rem; border-radius: 0.75rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: background 0.3s ease;
}
.v-three .faq-item:hover .faq-icon-wrap { filter: brightness(0.95); }

.v-three .faq-question {
  font-weight: 600; color: #0f172a; font-size: 0.875rem;
  flex: 1; padding-right: 1rem;
}

.v-three .faq-plus-wrap {
  width: 2rem; height: 2rem; border-radius: 0.5rem;
  background: #f8fafc; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: background 0.3s ease;
}
.v-three .faq-item:hover .faq-plus-wrap { background: #effefa; }

.v-three .faq-plus {
  color: #94a3b8; transition: all 0.3s ease;
}
.v-three .faq-item:hover .faq-plus { color: #019e8e; }
.v-three .faq-plus.rotated { transform: rotate(45deg); }

.v-three .faq-answer {
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
}
.v-three .faq-answer.open { max-height: 300px; }

.v-three .faq-answer-inner { padding: 0 1.5rem 1.25rem 1.5rem; padding-left: 4.5rem; }

.v-three .faq-answer-text { font-size: 0.875rem; color: #64748b; line-height: 1.625; }

.v-three .faq-timeline { display: flex; gap: 0.75rem; margin-top: 0.75rem; }
.v-three .faq-timeline-item { flex: 1; border-radius: 0.75rem; padding: 0.75rem; text-align: center; }
.v-three .faq-timeline-item.green { background: rgba(239,254,250,0.6); }
.v-three .faq-timeline-item.amber { background: rgba(255,251,235,0.6); }
.v-three .faq-timeline-value { font-size: 1.125rem; font-weight: 700; color: #067e73; }
.v-three .faq-timeline-item.amber .faq-timeline-value { color: #f06306; }
.v-three .faq-timeline-label { font-size: 0.625rem; color: #64748b; font-weight: 500; }

.v-three .text-brand-500 { color: #06c4ac;}
.v-three .text-amber-500 { color: #06c4ac;}
.v-three .text-purple-500 { color: #06c4ac;}
.v-three .text-emerald-500 { color: #06c4ac;}
.v-three .text-rose-500 { color: #06c4ac;}
.v-three .text-sky-500 { color: #06c4ac;}
</style>