<script setup>
import { ref, onMounted } from 'vue'

const lineAnimated = ref(false)
const stepStates = ref([false, false, false, false, false, false])

const steps = [
  { num: '1', title: 'Trademark Search', desc: 'Comprehensive search across databases to ensure your mark is available' },
  { num: '2', title: 'Application Prep', desc: 'Expert preparation of your application with proper classification' },
  { num: '3', title: 'Filing', desc: 'Submission to the appropriate trademark office with all required documents' },
  { num: '4', title: 'Examination', desc: 'Government examiner reviews your application for compliance' },
  { num: '5', title: 'Publication', desc: 'Mark published in the official gazette for third-party opposition' },
  { num: '6', title: 'Registration', desc: 'Certificate issued and your mark is officially registered' }
]

onMounted(() => {
  const section = document.querySelector('.process-section')
  if (!section) return

  const trigger = () => {
    lineAnimated.value = true
    steps.forEach((_, i) => {
      setTimeout(() => {
        stepStates.value[i] = true
      }, 100 + i * 220)
    })
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      trigger()
      obs.disconnect()
    }
  }, { threshold: 0.1 })

  obs.observe(section)
})
</script>

<template>
  <div class="process-section v-two" id="process">
    <div class="section">
      <div class="animate-on-scroll" style="text-align: center;">
        <div class="section-label" style="margin: 0 auto 16px;"><i class="fas fa-route"></i> Process</div>
        <div class="section-title" style="margin-left: auto; margin-right: auto;">Trademark Registration Process</div>
        <div class="section-desc" style="margin-left: auto; margin-right: auto;">A streamlined 6-step process that takes you from initial search to final registration.</div>
      </div>

      <div class="process-timeline">
        <div class="timeline-connector">
          <div class="connector-fill" :class="{ animated: lineAnimated }"></div>
        </div>

        <div
          v-for="(step, index) in steps"
          :key="step.num"
          class="process-step"
          :class="stepStates[index] ? (index === steps.length - 1 ? 'last' : 'completed') : ''"
        >
          <div class="process-step-num">{{ step.num }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.process-section {
  background: #F6F4EF;
  border-radius: var(--radius-xl);
  margin: 0 24px;
}

.v-two .section {
  padding: 80px 40px;
  max-width: 1280px;
  margin: 0 auto;
}

.v-two .section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(26, 35, 126, 0.05);
  border: 1px solid rgba(26, 35, 126, 0.08);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.v-two .section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.15;
  margin-bottom: 16px;
  max-width: 600px;
}

.v-two .section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 520px;
  line-height: 1.7;
}

.v-two .process-timeline {
  display: flex;
  gap: 0;
  margin-top: 56px;
  position: relative;
}

.v-two .timeline-connector {
  position: absolute;
  top: 23px;
  left: calc(100% / 12);
  right: calc(100% / 12);
  height: 2px;
  background: var(--border-light);
  z-index: 0;
  overflow: hidden;
  border-radius: 99px;
}

.v-two .connector-fill {
  height: 100%;
  background: var(--teal);
  width: 0;
  transition: width 1.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 99px;
}

.v-two .connector-fill.animated { width: 100%; }

.v-two .process-step {
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 6px;
}

.v-two .process-step-num {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: var(--text-muted);
  margin: 0 auto 16px;
  transition: all 0.5s ease;
  position: relative;
  z-index: 1;
}

.v-two .process-step.completed .process-step-num {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
  box-shadow: 0 0 0 5px rgba(6, 126, 115, 0.12);
}

.v-two .process-step.last .process-step-num {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 0 0 5px rgba(240, 99, 6, 0.12);
}

.v-two .process-step h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
  line-height: 1.3;
}

.v-two .process-step p {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 140px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .v-two .process-section { margin: 0 16px; }
  .v-two .process-section .section { padding: 60px 24px; }

  .v-two .process-timeline {
    flex-direction: column;
    gap: 0;
    padding-left: 24px;
  }

  .v-two .timeline-connector {
    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
    width: 2px;
    height: 100%;
    overflow: visible;
  }

  .v-two .connector-fill {
    width: 100% !important;
    height: 0;
    transition: height 1.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .v-two .connector-fill.animated { height: 100%; }

  .v-two .process-step {
    display: flex;
    align-items: flex-start;
    text-align: left;
    gap: 16px;
    padding: 0 0 32px 0;
  }

  .v-two .process-step:last-child { padding-bottom: 0; }
  .v-two .process-step-num { margin: 0; flex-shrink: 0; }
  .v-two .process-step p { max-width: 100%; margin: 0; }
}
</style>