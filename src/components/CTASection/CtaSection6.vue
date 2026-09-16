<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import callto from "@/assets/call-to.webp";
import { useComponentStyles } from "@/composables/useComponentStyles";

const route = useRoute();

// Check if current route is trademark-registration-overview
// const isTrademarkOverview = computed(() => {
//   return route.path === '/trademark-registration-overview';
// });

const isTrademarkOverview = computed(() => {
  return route.path.startsWith('/trademark-registration-overview');
});

const styles = useComponentStyles("CtaSection6", {
  primary: "#ffffff",
  background: "rgb(0, 18, 44)",
  fontSize: " 3rem",
  fontSizeBody: "1.125rem",
});

</script>

<template>
  <section class="get_trademark_sec has_elem gray_bg cta-new" :style="{ background: '#00122c', color: '#fff' }"
    :class="{ 'trademark-overview-page': isTrademarkOverview }" id="call-action-ff-not-all">
    <div class="container">
      <div class="row midxx">
        <div class="col-md-7 call-to-footer">
          <h2>Ready to get your trademark registered?</h2>

          <div data-v-0f8fa859="" class="btn_group justify-content-center"
            style="justify-content: flex-start !important;"><button data-v-8e7847e8="" data-v-0f8fa859=""
              class="popup-trigger" confirm-button-text="Get Started"
              style="background: rgb(255, 255, 255); margin: 0px 20px 0px 0px; color: rgb(0, 0, 0);">Get
              Started</button><a data-v-0f8fa859="" href="/trademark-registration" class="fom-text">Find out more</a>
          </div>
        </div>
        <div class="col-md-5">
          <div class="inner-img1">
            <img :src="callto" alt="Call to action" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Your existing CSS styles */
.cta-new{
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  background-color: var(--bg);
}
.popup-trigger {
  padding: 12px 24px;
}

.popup-trigger {
  background: #0b55b6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.midxx {
  align-items: center;
}

.row {
  display: flex;
  margin: 0 -1rem;
}

.col-md-7.call-to-footer {
  margin: 40px 0 0 0;
}

.row {
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .col-md-7 {
    width: 58.333333%;
  }
}

.btn_group.justify-content-center {
  margin: 30px 0 0 0;
}

.fom-text {
  color: #fff !important;
  text-decoration: none;
}

.call-to-footer a.fom-text::after {
  color: #fff !important;
}

.get_trademark_sec {
  padding: 0px !important;
  background: linear-gradient(180deg, transparent 20%, #00122c 20%);
}

.midxx {
  align-items: center;
}

.inner-img1 {
  width: 100%;

  align-items: baseline;
  display: flex;
  position: static;
}

/* Default state - white background */
section#call-action-ff-not-all::before {
  content: "";
  background: #fff;
  height: 60px;
  width: 100%;
  position: absolute;
  top: 0px;
}

/* Route-specific state - red background */
section#call-action-ff-not-all.trademark-overview-page::before {
  background: #f8f9fa;
  /* Red */
}

.col-md-7.call-to-footer {
  margin: 40px 0 0 0;
}

.inner-img1 img {
  position: static;
  /* max-width: 55%; */
}

@media (max-width: 767px) {
  section#call-action-ff-not-all::before {
    display: none;
  }

  .get_trademark_sec {
    padding: 20px 0 70px 0 !important;
  }
}
</style>
  