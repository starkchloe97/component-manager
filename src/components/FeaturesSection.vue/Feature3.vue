<script setup>

  import WhyRegisterCopyRight from "./WhyRegisterCopyRight.vue";

</script>

<template>
  <main id="main-content">
    <section class="our-service">
      <div class="container">
        <div class="section_head text-center">
          <h2>Why should you register a copyright?</h2>
          <p>
            Thousands have protected their creative work by filing a copyright.
          </p>
        </div>
    <WhyRegisterCopyRight/>
      </div>
    </section>
  </main>

  <div style="display: none" class="popupform" id="popupform">
    <!-- Popup form content remains unchanged -->
  </div>
</template>
<style scoped>

section.s4.spad a.theme-btn.outlined_btn {
  background: transparent !important;
  border: 2px solid #fff !important;
  color: #fff !important;
}
.text-center {
    text-align: center;
}

@media (max-width: 767px) {
  .pkg-feature {
    margin: 30px 0px 20px 0px;
    padding: 0px 0px;
    min-height: 6px;
    text-align: center;
  }
  .img-serp {
    width: 40%;
  }
  .pkg-feature h4 {
    font-size: 15px;
  }
  .col-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
}

</style>
