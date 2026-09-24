    <template>
  <section class="trademark-section" id="process">
    <div class="container">
      <!-- Left Column: Introduction -->
      <div class="intro-panel">
        <span class="section-label">Simple Process</span>
        <h1>Our Trademark Search Process</h1>
        <p>
         Get your mark searched to eliminate any doubts or conflicts.
        </p>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">Easy Steps</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">USPTO Compliant</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Process Timeline -->
      <div class="process-panel">
        <div class="timeline-wrapper">
          <div class="vertical-line"></div>
          
          <div 
            v-for="step in steps" 
            :key="step.id" 
            class="step-card"
          >
            <div class="step-indicator">
              <span class="step-number">{{ step.id }}</span>
              <div class="step-icon" v-html="step.icon"></div>
            </div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.trademark-section {
  --neutral-500: #737373;
  --neutral-50: #fafafa;
  --navy-900: #0f172a;
}

/* ========== Section ========== */
.trademark-section {
  background: var(--neutral-50);
  padding: 72px 24px;
  position: relative;
  overflow: hidden;
}

/* Subtle mesh gradient instead of a blob */
.trademark-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 600px 400px at 85% 15%, rgba(249, 115, 22, 0.04) 0%, transparent 70%),
    radial-gradient(ellipse 400px 400px at 10% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: 56px;
  align-items: start;
  position: relative;
  z-index: 1;
}

/* ========== Left Panel ========== */
.intro-panel {
  padding-right: 8px;
  position: sticky;
  top: 80px;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #ea580c;
  margin-bottom: 18px;
  padding: 5px 12px;
  background: #fff7ed;
  border: 1px solid #ffedd5;
  border-radius: 100px;
}

.section-label::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f97316;
  flex-shrink: 0;
}

.intro-panel h1 {
  font-size: 38px;
  font-weight: 800;
  color: var(--navy-900);
  line-height: 1.12;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.highlight {
  color: #ea580c;
  position: relative;
  display: inline;
}

/* Clean underline instead of skewed block */
.highlight::after {
  content: '';
  position: absolute;
  bottom: 0.05em;
  left: -2px;
  right: -2px;
  height: 0.22em;
  background: #ffedd5;
  border-radius: 2px;
  z-index: -1;
}

.intro-panel p {
  font-size: 15px;
  line-height: 1.7;
  color: #525252;
  margin-bottom: 28px;
}

/* ---- Stats ---- */
.stats {
  display: flex;
  gap: 0;
  padding-top: 24px;
  border-top: 1px solid #e5e5e5;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding-right: 28px;
  margin-right: 28px;
  border-right: 1px solid #e5e5e5;
}

.stat-item:last-child {
  padding-right: 0;
  margin-right: 0;
  border-right: none;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: var(--navy-900);
  line-height: 1;
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: 13px;
  color: var(--neutral-500);
  line-height: 1.3;
}

/* ========== Right Panel (Timeline) ========== */
.process-panel {
  position: relative;
}

.timeline-wrapper {
  position: relative;
  padding-left: 0;
}

.vertical-line {
  position: absolute;
  left: 15px;
  top: 28px;
  bottom: 28px;
  width: 1.5px;
  background: linear-gradient(
    to bottom,
    #fdba74 0%,
    #e5e5e5 100%
  );
  border-radius: 1px;
}

/* ---- Step Card ---- */
.step-card {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  position: relative;
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-card:last-child {
  margin-bottom: 0;
}

.step-card:hover {
  transform: translateY(-2px);
}

/* ---- Step Indicator ---- */
.step-indicator {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #fff;
  border: 1.5px solid #fb923c;
  box-shadow: 0 0 0 4px var(--neutral-50);
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.step-card:hover .step-indicator {
  background: #ea580c;
  border-color: #ea580c;
  box-shadow: 0 0 0 4px #ffedd5, 0 4px 12px rgba(234, 88, 12, 0.15);
}

.step-icon {
  display: none;
}

.step-number {
  font-size: 12px;
  font-weight: 700;
  color: #ea580c;
  transition: color 0.25s ease;
  font-variant-numeric: tabular-nums;
}

.step-card:hover .step-number {
  color: #fff;
}

/* ---- Step Content Card ---- */
.step-content {
  background: #fff;
  padding: 20px 22px;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02);
  border: 1.5px solid #e5e5e5;
  flex-grow: 1;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-card:hover .step-content {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07), 0 1px 3px rgba(15, 23, 42, 0.03);
  border-color: #fed7aa;
}

.step-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy-900);
  margin-bottom: 6px;
  letter-spacing: -0.1px;
}

.step-content p {
  font-size: 14px;
  color: var(--neutral-500);
  line-height: 1.6;
  margin: 0;
  text-align: left;
}

/* ========== Responsive ========== */
@media (max-width: 900px) {
  .trademark-section {
    padding: 56px 20px;
  }

  .container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .intro-panel {
    padding-right: 0;
    text-align: center;
    position: static;
  }

  .section-label {
    margin-left: auto;
    margin-right: auto;
  }

  .intro-panel h1 {
    font-size: 30px;
  }

  .stats {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px 0;
  }

  .stat-item {
    padding-right: 20px;
    margin-right: 20px;
  }

  .timeline-wrapper {
    max-width: 480px;
    margin: 0 auto;
  }
}

@media (max-width: 520px) {
  .trademark-section {
    padding: 44px 16px;
  }

  .intro-panel h1 {
    font-size: 26px;
  }

  .intro-panel p {
    font-size: 14px;
    margin-bottom: 22px;
  }

  .stats {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border-top: none;
    padding-top: 0;
  }

  .stat-item {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e5e5e5;
  }

  .stat-item:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }

  .stat-number {
    font-size: 24px;
  }

  .step-content {
    padding: 16px 18px;
  }

  .step-content h3 {
    font-size: 15px;
  }

  .step-content p {
    font-size: 13px;
  }
}
</style>

<script setup>
import { ref } from 'vue'

// Data for the registration steps
const steps = ref([
  {
    id: '01',
    title: 'Tell us about your mark',
    description: 'Fill a brief questionnaire and provide details about your trademark for us to initiate your comprehensive trademark search.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>'
  },
  {
    id: '02',
    title: 'We conduct the search',
    description: 'Our trademark search experts run a comprehensive search for you using manual and AI-powered search tools.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>'
  },
  {
    id: '03',
    title: 'Get results via email',
    description: 'You receive an easy-to-read trademark search report along with a free evaluation call from one of our Trademark Specialists.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>'
  }
])
</script>