```vue
<script setup>
import { ref } from "vue";
import { ArrowRight, Phone, Plus } from "@lucide/vue";

const SITE_NAME = "Trademark Atlas";

const faqs = ref([
  {
    q: "What is a trademark?",
    a: `Trademark Definition: A trademark is a word, phrase, symbol, or design that identifies and distinguishes the source of the goods of one party from those of another. You might also hear or read about 'service marks,' which distinguish the source of a service rather than a good. Typically, both marks are referred to simply as a 'trademark' or 'mark.'`,
    open: false,
  },

  {
    q: `Can I apply to register my trademark through ${SITE_NAME}?`,
    a: `Yes. ${SITE_NAME}'s filing service starts at $35 plus federal filing fees which is $450 per class. At ${SITE_NAME}, we take care of your application so that you can focus on other important things that matter to you. Get started today in applying for your trademark through ${SITE_NAME}.`,
    open: false,
  },

  {
    q: `How long does it take to process a trademark registration request through ${SITE_NAME}?`,
    a: `After you submit your application, our legal team does the case review and availability search for your trademark application. If we require any additional information from you, we will contact you either by phone or email. The application is usually ready within 1-2 business days after which it is filed. Sometimes, the process can take longer if there are delays getting responses from clients or if there are further clarifications required. It takes around 6-9 months for the USPTO to issue the registration certificate after the filing date, if there are no legal issues with the application.`,
    open: false,
  },

  {
    q: "How much does it cost to register my trademark?",
    a: `Typically, you will have to pay legal preparation and federal filing fees to register your trademark. At ${SITE_NAME}, the legal preparation fee for a US trademark starts at $35 plus the federal filing fee of $450 per class. During the examining phase of your application by the government, if there are any legal challenges by the government or a third party due to potentially confusingly similar trademarks, you will have to pay an additional fee for the office action response if you wish for an attorney to draft a response on your behalf. The cost can range from $999 to $1,999 depending on the complexity of the issue.`,
    open: false,
  },

  {
    q: "I found a trademark similar to mine. Can I still register it?",
    a: `Oftentimes no. However, if the other mark is linked to different products or services, it might be possible because there would be fewer chance of confusion between existing and potential customers. For example, Domino Sugar and Domino Pizza coexist because they both sell different products to prevent confusion between consumers.`,
    open: false,
  },

  {
    q: "Do I need to register my business name and logo separately?",
    a: `Yes. The USPTO allows one trademark per application. That means one trademark application can only register either a name, a logo or a slogan. A logo trademark application can include text, but then the design and the text together are considered one trademark. You would have to file two applications if you want them protected individually.`,
    open: false,
  },

  {
    q: "Can I trademark my business name before I open my business?",
    a: `You can start the registration process, but the USPTO will not officially register your trademark until you can show a proof of use of the mark in commerce. Some people get on with their business to see if it's viable before registering the trademark while others begin the registration process to make sure their business is protected before spending time and money building it.`,
    open: false,
  },

  {
    q: "What are trademark classes?",
    a: `You can think of trademark classes as categories that fall under your application depending on the types of goods and/or services you offer. The USPTO trademark classification system divides all goods and services into 45 trademark classes —34 for goods and 11 for services. Correctly identifying your goods and services is one of the most critical aspects of your application. A failure to correctly list the goods and services with which you use the mark may prevent you from registering your mark. And you will not be given a refund. The selected class(es) must correspond to the list of goods and services mentioned in the application in order to achieve full trademark protection.`,
    open: false,
  },
]);

function toggleFaq(i) {
  faqs.value[i].open = !faqs.value[i].open;
}
</script>

<template>
  <section class="section-faq v-four">
    <div class="container">
      <div class="faq-grid">
        <div class="faq-sidebar">
          <div class="faq-sticky">
            <span class="eyebrow">Support</span>

            <h2 class="display-lg faq-heading">
              Expert <span class="text-primary">Inquiry</span>
            </h2>

            <p class="faq-sub">
              Find clarity in the complexities of intellectual property
              protection.
            </p>

            <div class="faq-links">
              <a href="#" class="faq-link">
                <span>Live Specialist</span>
                <ArrowRight :size="15" />
              </a>

              <a href="tel:8557602012" class="faq-link">
                <span>(855) 760-2012</span>
                <Phone :size="15" class="text-secondary" />
              </a>
            </div>
          </div>
        </div>

        <div class="faq-items">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq-item"
            :class="{ 'faq-open': faq.open }"
          >
            <button class="faq-question" @click="toggleFaq(i)">
              <span>{{ faq.q }}</span>

              <Plus
                :size="17"
                class="faq-icon"
                :class="{ rotated: faq.open }"
              />
            </button>

            <div v-show="faq.open" class="faq-answer">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── TOKENS ─── */

.v-four {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --on-surface: #131b2e;
  --background: #faf8ff;
  --radius-3xl: 1.5rem;
}

/* ─── BASE ─── */

.v-four *,
.v-four *::before,
.v-four *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Instrument Sans", sans-serif !important;
}

.v-four img {
  display: block;
  max-width: 100%;
}

.v-four a {
  text-decoration: none;
  color: inherit;
}

.v-four button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

/* ─── CONTAINER ─── */

.v-four .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── TYPOGRAPHY ─── */

.v-four .display-lg {
  font-size: clamp(1.6rem, 3.2vw, 2.6rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.v-four .eyebrow {
  display: block;
  margin-bottom: 14px;
  color: var(--primary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.v-four .text-primary {
  color: var(--primary);
}

.v-four .text-secondary {
  color: var(--secondary);
}

/* ─── FAQ SECTION ─── */

.section-faq {
  padding: 40px 0;
  margin-top: 60px;
  overflow-x: hidden;
  color: var(--on-surface);
  font-family: "Instrument Sans", sans-serif !important;
  font-size: 15px;
  line-height: 1.6;
  background: #fff;
}

.v-four .faq-grid {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 72px;
}

.v-four .faq-sticky {
  position: sticky;
  top: 100px;
}

.v-four .faq-heading {
  margin: 0 0 16px;
  line-height: 1.1;
}

.v-four .faq-sub {
  margin-bottom: 32px;
  color: rgba(68, 71, 79, 0.6);
  font-size: 16px;
  font-weight: 300;
}

.v-four .faq-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-four .faq-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border: 1px solid rgba(195, 197, 217, 0.3);
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  transition: background 0.2s, box-shadow 0.2s;
}

.v-four .faq-link:hover {
  background: #fff;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.07);
}

.v-four .faq-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.v-four .faq-item {
  border-bottom: 1px solid rgba(195, 197, 217, 0.2);
  transition: all 0.3s;
}

.v-four .faq-item.faq-open {
  margin: 3px 0;
  background: #fff;
  border: none;
  border-radius: var(--radius-3xl);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
}

.v-four .faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  background: transparent;
  color: var(--on-surface);
  font-size: 1rem;
  /* font-weight: 600; */
  letter-spacing: -0.01em;
  text-align: left;
  transition: padding 0.3s;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.v-four .faq-item.faq-open .faq-question {
  padding: 20px 24px;
}

.v-four .faq-icon {
  flex-shrink: 0;
  color: var(--primary);
  transition: transform 0.4s;
}

.v-four .faq-icon.rotated {
  transform: rotate(45deg);
}

.v-four .faq-answer {
  padding: 0 24px 24px;
  color: rgba(68, 71, 79, 0.7);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.7;
}

/* ─── RESPONSIVE ─── */

@media (max-width: 1024px) {
  .v-four .container {
    padding: 0 20px;
  }

  .v-four .faq-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .v-four .faq-sticky {
    position: static;
  }
}

@media (max-width: 640px) {
  .v-four .container {
    padding: 0 16px;
  }

  .v-four .faq-question {
    font-size: 0.92rem;
  }
}
</style>
