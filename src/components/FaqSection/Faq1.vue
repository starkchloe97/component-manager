<template>
  <section class="section-faq v-one">
  <div class="section-wrapper">
    <!-- Header -->
    <header class="section-header">
      <div class="section-badge">
        <i class="fa-solid fa-shield-halved"></i>
        Knowledge Base
      </div>
      <h2 class="section-title">Got Questions About <span>Trademarks</span>?</h2>
      <p class="section-subtitle">Everything you need to know about protecting your brand, answered clearly by our legal experts.</p>
    </header>

    <!-- Main grid -->
    <div class="faq-grid">
      <!-- Left: FAQ Accordion -->
      <div class="faq-list" role="list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ active: activeFaq === index }"
          role="listitem"
          :data-index="index"
        >
          <div
            class="faq-question"
            role="button"
            tabindex="0"
            :aria-expanded="activeFaq === index ? 'true' : 'false'"
            @click="toggleFaq(index)"
            @keydown.enter.prevent="toggleFaq(index)"
            @keydown.space.prevent="toggleFaq(index)"
          >
            <div class="faq-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="faq-question-text">{{ faq.question }}</div>
            <div class="faq-icon">
              <i :class="activeFaq === index ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"></i>
            </div>
          </div>
          <div
            class="faq-answer"
            role="region"
            :ref="el => { if (el) answerRefs[index] = el }"
            :style="{ maxHeight: activeFaq === index ? answerMaxHeights[index] + 'px' : '0' }"
          >
            <div class="faq-answer-inner" v-html="faq.answer"></div>
          </div>
        </div>
      </div>

      <!-- Right: Visual element -->
      <aside class="visual-side">
  <div class="visual-card process-card" ref="visualCardRef">
    <canvas class="particles-canvas" ref="canvasRef"></canvas>

    <div class="process-header">
      <span class="process-badge">How It Works</span>
      <h3 class="process-title">Three Simple Steps</h3>
      <p class="process-subtitle">From details to filing — we handle everything</p>
    </div>

    <div class="steps-flow">
      <!-- Connector line -->
      <div class="steps-connector" ref="connectorRef"></div>

      <!-- Step 1 -->
      <div class="step-item" ref="step1Ref">
        <div class="step-number-wrap">
          <div class="step-number">01</div>
          <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="3" width="16" height="21" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
              <path d="M9 10h6M9 14h6M9 18h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M18 20l3 3 4-5" stroke="#0B5CD5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="step-content">
          <h4 class="step-heading">Provide Trademark Details</h4>
          <p class="step-desc">Select your package, fill in the form, and our legal team takes it from there.</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step-item" ref="step2Ref">
        <div class="step-number-wrap">
          <div class="step-number">02</div>
          <div class="step-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="7.5" stroke="currentColor" stroke-width="1.8"/>
              <path d="M17.5 17.5L24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M9 12h6M12 9v6" stroke="#0B5CD5" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div class="step-content">
          <h4 class="step-heading">We Research & Review</h4>
          <p class="step-desc">We conduct a thorough search and evaluate your approval likelihood before submitting.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step-item" ref="step3Ref">
        <div class="step-number-wrap">
          <div class="step-number">03</div>
          <div class="step-icon step-icon--final">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="10.5" stroke="currentColor" stroke-width="1.8"/>
              <text x="14" y="19" text-anchor="middle" fill="#0B5CD5" font-size="13" font-weight="700" font-family="Inter, sans-serif">®</text>
            </svg>
          </div>
        </div>
        <div class="step-content">
          <h4 class="step-heading">We File Your Trademark</h4>
          <p class="step-desc">After reviewing all documents, we officially file your application with the USPTO.</p>
        </div>
      </div>
    </div>

  </div>
</aside>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" :class="{ show: toastVisible }" role="alert" aria-live="polite">
    <i class="fa-solid fa-circle-check"></i>
    <span>Consultation request received! We'll be in touch soon.</span>
  </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import "@fortawesome/fontawesome-free/css/all.min.css";

// FAQ data
const faqs = ref([
  {
    question: 'What is the difference between ™ and ©?',
    answer: 'The ™ symbol stands for "trademark" and can be used by anyone to claim rights in a mark without formal registration. The © symbol represents copyright and protects original works of authorship like books, music, and art. They serve entirely different areas of intellectual property — trademarks protect brand identifiers (names, logos, slogans), while copyrights protect creative expressions.'
  },
  {
    question: 'How long does a trademark last?',
    answer: 'In most jurisdictions, a trademark registration lasts for 10 years from the date of registration and can be renewed indefinitely for additional 10-year periods, as long as the mark remains in active commercial use and renewal fees are paid. Unlike patents, trademarks can theoretically last forever — some of the world\'s oldest trademarks have been in use for over a century.'
  },
  {
    question: 'Can I register a trademark myself?',
    answer: 'Yes, you can file a trademark application on your own through the USPTO or relevant trademark office in your country. However, the process involves complex legal requirements including proper classification, specificity of goods/services, and responding to office actions. Self-filers have a significantly higher rejection rate. Working with a trademark attorney increases your chances of successful registration and helps avoid costly mistakes.'
  },
  {
    question: 'Do I need to register in every country?',
    answer: 'Trademark rights are territorial, meaning registration in one country doesn\'t automatically protect you in others. However, you can use the <a href="#">Madrid System</a> to file a single international application that can extend protection to 130+ member countries. For businesses operating globally, we recommend prioritizing registration in your primary markets first, then expanding strategically based on your growth plans.'
  },
  {
    question: 'What happens if someone opposes my trademark?',
    answer: 'After your trademark is published, there is a 30-day opposition period during which third parties can file an opposition if they believe your mark conflicts with theirs. If opposed, the case goes before the Trademark Trial and Appeal Board (TTAB) for resolution. Many oppositions are settled through negotiation or coexistence agreements. Having a strong filing strategy from the start significantly reduces opposition risk.'
  },
  {
    question: 'Can a trademark be revoked after registration?',
    answer: 'Yes, a trademark can be cancelled or revoked for several reasons: non-use (if not used commercially for 3-5 consecutive years), genericide (when the mark becomes the generic term for the product, like "aspirin"), fraud in the application, or abandonment. This is why maintaining proper use documentation and monitoring your mark\'s position in the market is essential for long-term protection.'
  }
])

// State
const activeFaq = ref(null)
const answerRefs = ref([])
const answerMaxHeights = ref([])
const toastVisible = ref(false)

// Template refs
const canvasRef = ref(null)
const visualCardRef = ref(null)
const shieldContainerRef = ref(null)
const statsRowRef = ref(null)
const counter12K = ref(null)
const counter98 = ref(null)
const counter45 = ref(null)

// Particle system variables
let particles = []
let animFrameId = null

// FAQ toggle
function toggleFaq(index) {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
  
  // Calculate max heights after DOM update
  nextTick(() => {
    answerRefs.value.forEach((el, i) => {
      if (el) {
        const inner = el.querySelector('.faq-answer-inner')
        if (inner) {
          answerMaxHeights.value[i] = inner.scrollHeight + 20
        }
      }
    })
  })
}

// Toast
function showToast() {
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 3500)
}

// Counter animation
function animateCounters() {
  const counters = [
    { el: counter12K.value, target: 12, suffix: 'K' },
    { el: counter98.value, target: 98, suffix: '' },
    { el: counter45.value, target: 45, suffix: '' }
  ]
  
  counters.forEach(({ el, target, suffix }) => {
    if (!el) return
    
    const duration = 2000
    const startTime = performance.now()
    
    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      
      el.textContent = current + suffix
      
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    
    requestAnimationFrame(update)
  })
}

// Resize canvas
function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.parentElement.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
}

// Create particles
function createParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  particles = []
  const count = Math.floor((canvas.width * canvas.height) / 8000)
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.35 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    })
  }
}

// Draw particles
function drawParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    p.pulse += 0.02
    
    // Wrap around
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0
    
    const dynamicOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
    
    ctx.beginPath()
    ctx.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(11, 92, 213, ${dynamicOpacity})`
    ctx.fill()
  })
  
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 70) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        const lineOpacity = (1 - dist / 70) * 0.07
        ctx.strokeStyle = `rgba(11, 92, 213, ${lineOpacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
  
  animFrameId = requestAnimationFrame(drawParticles)
}

// Mouse parallax handler
function handleMouseMove(e) {
  const card = visualCardRef.value
  const shield = shieldContainerRef.value
  if (!card || !shield) return
  
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  
  shield.style.transform = `translate(${x * 10}px, ${y * 10}px)`
}

function handleMouseLeave() {
  const shield = shieldContainerRef.value
  if (!shield) return
  
  shield.style.transition = 'transform 0.5s ease'
  shield.style.transform = 'translate(0, 0)'
  setTimeout(() => {
    shield.style.transition = ''
  }, 500)
}

// Check reduced motion preference
const prefersReducedMotion = ref(false)


// ── Animate Steps on Scroll ──
function animateSteps() {
  const steps = document.querySelectorAll('.step-item')
  const connector = document.querySelector('.steps-connector')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((step) => step.classList.add('animate'))
          if (connector) connector.classList.add('animate')
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  const flow = document.querySelector('.steps-flow')
  if (flow) observer.observe(flow)
}


onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Initialize FAQ max heights
  answerRefs.value.forEach((el, i) => {
    if (el) {
      const inner = el.querySelector('.faq-answer-inner')
      if (inner) {
        answerMaxHeights.value[i] = inner.scrollHeight + 20
      }
    }
  })
  
  // Setup particle system
  if (!prefersReducedMotion.value && canvasRef.value) {
    resizeCanvas()
    createParticles()
    drawParticles()
    
    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })
  }
  
  // Setup counter observer
  if (statsRowRef.value) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters()
          statsObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    
    statsObserver.observe(statsRowRef.value)
  }
  
  // Setup mouse parallax
  if (!prefersReducedMotion.value && visualCardRef.value) {
    visualCardRef.value.addEventListener('mousemove', handleMouseMove)
    visualCardRef.value.addEventListener('mouseleave', handleMouseLeave)
  }


   animateSteps()
  // ... keep existing counter & particle logic
})

onBeforeUnmount(() => {
  // Clean up animations
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
  }
  
  // Clean up event listeners
  if (visualCardRef.value) {
    visualCardRef.value.removeEventListener('mousemove', handleMouseMove)
    visualCardRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>



<style scoped>

.v-one {
  --brand: #0b55b6;
  --brand-light: #e8f0fb;
  --brand-dark: #083d82;
  --brand-mid: #1a6fd4;
  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;
}

.section-faq {
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--surface);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.section-faq{
    /* font-family: 'DM Sans', sans-serif; */
    background: var(--bg);
    color: var(--fg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    overflow-x: hidden;
    position: relative;
}



  @keyframes floatBlob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, 40px) scale(1.05); }
    66% { transform: translate(20px, -20px) scale(0.95); }
  }

  .v-one .section-wrapper {
    max-width: 1200px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* Section header */
  .v-one .section-header {
    text-align: center;
    margin-bottom: 56px;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 0.8s ease forwards 0.2s;
  }

  .v-one .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: var(--accent-soft);
    border: 1px solid rgba(11,92,213,0.12);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #0b5cd5;
    margin-bottom: 20px;
  }

  .v-one .section-badge i {
    font-size: 10px;
  }

  .v-one .section-title {
    /* font-family: 'Space Grotesk', sans-serif; */
    font-size: clamp(32px, 4.5vw, 52px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1.5px;
    color: var(--fg);
    margin-bottom: 16px;
  }

  .v-one .section-title span {
    background: linear-gradient(135deg, #0b5cd5, #3b7de9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .v-one .section-subtitle {
    font-size: 16px;
    color: var(--fg-muted);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Main grid layout */
  .v-one .faq-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 48px;
    align-items: start;
  }

  /* FAQ list */
  .v-one .faq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .v-one .faq-item {
    background: var(--card);
    border: 1px solid #6e8cb826;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
    transform: translateX(-30px);
    cursor: pointer;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .v-one .faq-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: #0b5cd5;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 0 2px 2px 0;
  }

  .v-one .faq-item:hover {
    background: var(--card-hover);
    border-color: rgba(11,92,213,0.2);
    box-shadow: 0 4px 16px rgba(11,92,213,0.06);
  }

  .v-one .faq-item.active {
    background: var(--card-hover);
    box-shadow: 0 4px 30px var(--accent-glow), 0 0 0 1px rgba(11,92,213,0.08);
  }

  .v-one .faq-item.active::before {
    transform: scaleY(1);
  }

  .v-one .faq-question {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    user-select: none;
    position: relative;
  }

  .v-one .faq-number {
    /* font-family: 'Space Grotesk', sans-serif; */
    font-size: 13px;
    font-weight: 700;
    color: var(--fg-muted);
    background: var(--bg);
    border: 1px solid var(--border);
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.4s ease;
  }

  .v-one .faq-item.active .faq-number {
    background: #0b5cd5;
    color: #FFFFFF;
    border-color: #0b5cd5;
    box-shadow: 0 0 20px rgba(11,92,213,0.25);
  }

  .v-one .faq-question-text {
    /* font-family: 'Space Grotesk', sans-serif; */
    font-size: 15px;
    font-weight: 600;
    color: var(--fg);
    flex: 1;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  .v-one .faq-item.active .faq-question-text {
    color: #0b5cd5;
  }

  .v-one .faq-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    background: var(--bg);
    border: 1px solid var(--border);
  }

  .v-one .faq-icon i {
    font-size: 12px;
    color: var(--fg-muted);
    transition: all 0.4s ease;
  }

  .v-one .faq-item.active .faq-icon {
    background: #0b5cd5;
    border-color: #0b5cd5;
    transform: rotate(45deg);
  }

  .v-one .faq-item.active .faq-icon i {
    color: #FFFFFF;
  }

  .v-one .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.4s ease;
  }

  .v-one .faq-answer-inner {
    padding: 0 24px 20px 76px;
    font-size: 14px;
    color: var(--fg-muted);
    line-height: 1.8;
  }

  .v-one .faq-answer-inner a {
    color: #0b5cd5;
    text-decoration: none;
    border-bottom: 1px dashed rgba(11,92,213,0.35);
    transition: border-color 0.3s ease;
  }

  .v-one .faq-answer-inner a:hover {
    border-bottom-color: #0b5cd5;
  }

  /* Right side visual */
  .v-one .visual-side {
    position: sticky;
    top: 40px;
    opacity: 0;
    transform: translateX(30px);
    animation: fadeRight 0.8s ease forwards 0.6s;
  }

  @keyframes fadeRight {
    to { opacity: 1; transform: translateX(0); }
  }

  .v-one .visual-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03);
  }

  .v-one .visual-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(11,92,213,0.2), transparent);
  }

  .v-one .visual-card::after {
    content: '';
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(11,92,213,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Shield illustration */
  .v-one .shield-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  .v-one .shield-svg {
    width: 180px;
    height: 200px;
    filter: drop-shadow(0 0 30px rgba(11,92,213,0.12));
    animation: shieldFloat 6s ease-in-out infinite;
  }

  @keyframes shieldFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* Orbiting symbols */
  .v-one .orbit-ring {
    position: absolute;
    width: 260px;
    height: 260px;
    border: 1px dashed rgba(11,92,213,0.12);
    border-radius: 50%;
    animation: orbitSpin 30s linear infinite;
  }

  .v-one .orbit-ring:nth-child(2) {
    width: 310px;
    height: 310px;
    animation-duration: 40s;
    animation-direction: reverse;
    border-style: dotted;
    border-color: rgba(11,92,213,0.07);
  }

  @keyframes orbitSpin {
    to { transform: rotate(360deg); }
  }

  .v-one .orbit-symbol {
    position: absolute;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #0b5cd5;
    background: var(--bg-elevated);
    border: 1px solid rgba(11,92,213,0.18);
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: 0 2px 12px rgba(11,92,213,0.1);
    animation: counterSpin 30s linear infinite;
  }

  .v-one .orbit-ring:nth-child(2) .orbit-symbol {
    animation-direction: reverse;
    animation-duration: 40s;
    width: 32px;
    height: 32px;
    font-size: 13px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(11,92,213,0.08);
  }

  @keyframes counterSpin {
    to { transform: rotate(-360deg); }
  }

  .v-one .orbit-symbol:nth-child(1) { top: -19px; left: 50%; margin-left: -19px; }
  .v-one .orbit-symbol:nth-child(2) { bottom: -19px; left: 50%; margin-left: -19px; }
  .v-one .orbit-symbol:nth-child(3) { left: -19px; top: 50%; margin-top: -19px; }
  .v-one .orbit-symbol:nth-child(4) { right: -19px; top: 50%; margin-top: -19px; }

  /* Stats bar */
  .v-one .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .v-one .stat-item {
    text-align: center;
    padding: 14px 8px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    transition: all 0.3s ease;
  }

  .v-one .stat-item:hover {
    border-color: rgba(11,92,213,0.25);
    background: var(--accent-soft);
    box-shadow: 0 2px 12px rgba(11,92,213,0.06);
  }

  .v-one .stat-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #0b5cd5;
    line-height: 1;
    margin-bottom: 4px;
  }

  .v-one .stat-label {
    font-size: 11px;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* CTA */
  .v-one .visual-cta {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: linear-gradient(135deg, #0b5cd5, #3b7de9);
    border-radius: 14px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    width: 100%;
    justify-content: center;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .v-one .visual-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .v-one .visual-cta:hover::before {
    left: 100%;
  }

  .v-one .visual-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(11,92,213,0.3);
  }

  .v-one .visual-cta:active {
    transform: translateY(0);
  }

  .v-one .visual-cta i {
    font-size: 12px;
    transition: transform 0.3s ease;
  }

  .v-one .visual-cta:hover i {
    transform: translateX(3px);
  }

  /* Toast notification */
  .v-one .toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-active);
    color: var(--fg);
    padding: 14px 22px;
    border-radius: 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1), 0 0 20px rgba(11,92,213,0.08);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 100;
  }

  .v-one .toast.show {
    transform: translateY(0);
    opacity: 1;
  }

  .v-one .toast i {
    color: #0b5cd5;
    font-size: 16px;
  }

  /* Animations */
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Stagger FAQ items */
  .v-one .faq-item:nth-child(1) { animation: fadeUp 0.6s ease forwards 0.3s; }
  .v-one .faq-item:nth-child(2) { animation: fadeUp 0.6s ease forwards 0.4s; }
  .v-one .faq-item:nth-child(3) { animation: fadeUp 0.6s ease forwards 0.5s; }
  .v-one .faq-item:nth-child(4) { animation: fadeUp 0.6s ease forwards 0.6s; }
  .v-one .faq-item:nth-child(5) { animation: fadeUp 0.6s ease forwards 0.7s; }
  .v-one .faq-item:nth-child(6) { animation: fadeUp 0.6s ease forwards 0.8s; }

  /* Particles */
  .v-one .particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }




  /* right section */

  /* ── Process Card ── */
.process-card {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.process-header {
  text-align: center;
}

.process-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0B5CD5;
  background: rgba(11, 92, 213, 0.08);
  border: 1px solid rgba(11, 92, 213, 0.15);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 12px;
}

.process-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.process-subtitle {
  font-size: 13.5px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* ── Steps Flow ── */
.steps-flow {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px 0;
}

.steps-connector {
  position: absolute;
  left: 27px;
  top: 40px;
  bottom: 40px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(11, 92, 213, 0.25),
    rgba(11, 92, 213, 0.08),
    rgba(11, 92, 213, 0.25)
  );
  border-radius: 2px;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}

.steps-connector.animate {
  transform: scaleY(1);
}

/* ── Step Item ── */
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 0;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.step-item.animate {
  opacity: 1;
  transform: translateY(0);
}

.step-item.animate:nth-child(2) {
  transition-delay: 0.15s;
}


.step-item.animate:nth-child(3) {
  transition-delay: 0.3s;
}

.step-item.animate:nth-child(4) {
  transition-delay: 0.45s;
}

/* ── Step Number ── */
.step-number-wrap {
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.step-number {
  font-size: 11px;
  font-weight: 700;
  color: rgba(11, 92, 213, 0.35);
  letter-spacing: 0.05em;
  line-height: 1;
}

.step-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: #f8faff;
  border: 1.5px solid rgba(11, 92, 213, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B7DE9;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  z-index: 1;
}

.step-item:hover .step-icon {
  background: #0B5CD5;
  border-color: #0B5CD5;
  color: #fff;
  box-shadow: 0 8px 24px rgba(11, 92, 213, 0.25);
  transform: scale(1.05);
}

.step-item:hover .step-icon svg path,
.step-item:hover .step-icon svg circle,
.step-item:hover .step-icon svg rect {
  stroke: #fff;
}

.step-item:hover .step-icon svg text {
  fill: #fff;
}

.step-item:hover .step-icon--final {
  background: linear-gradient(135deg, #0B5CD5, #6BA3F5);
  border-color: transparent;
}

/* ── Step Content ── */
.step-content {
  padding-top: 4px;
  flex: 1;
}

.step-heading {
  font-size: 15px;
  font-weight: 650;
  color: #0f172a;
  margin: 0 0 5px;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.step-item:hover .step-heading {
  color: #0B5CD5;
}

.step-desc {
  font-size: 12.5px;
  color: #94a3b8;
  line-height: 1.55;
  margin: 0;
  transition: color 0.3s ease;
}

.step-item:hover .step-desc {
  color: #64748b;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .process-title {
    font-size: 19px;
  }

  .step-icon {
    width: 46px;
    height: 46px;
    border-radius: 13px;
  }

  .step-icon svg {
    width: 22px;
    height: 22px;
  }

  .steps-connector {
    left: 22px;
  }

  .step-heading {
    font-size: 14px;
  }

  .step-desc {
    font-size: 12px;
  }
}

  /* Responsive */
  @media (max-width: 900px) {
    .v-one .faq-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
   .v-one .visual-side {
      position: static;
      order: -1;
    }
    .v-one .shield-svg {
      width: 130px;
      height: 145px;
    }
    .v-one .orbit-ring {
      width: 200px;
      height: 200px;
    }
    .v-one .orbit-ring:nth-child(2) {
      width: 240px;
      height: 240px;
    }
  }

  @media (max-width: 500px) {
    .v-one .faq-question {
      padding: 16px 16px;
      gap: 12px;
    }
    .v-one .faq-answer-inner {
      padding: 0 16px 16px 64px;
    }
    .v-one .faq-number {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
    .v-one .faq-question-text {
      font-size: 14px;
    }
    .v-one .stats-row {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .v-one .visual-card {
      padding: 24px;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .v-one *, .v-one *::before, .v-one *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>