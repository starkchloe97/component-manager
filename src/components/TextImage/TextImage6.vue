<script setup>
// Import only the images that are actually used in the template
import brandsHero16 from "@/assets/Brands-HeroImages-16.webp";
import brandsHero20 from "@/assets/Brands-HeroImages-20.webp";

import { SITE_NAME } from "@/config/siteInfo.js";
// import CtaSection from "../components/VersionFive/CtaSection.vue"
// import Testimonials from "../components/VersionFive/Testimonials.vue"
// import TrustBar from "../components/VersionFive/TrustBar.vue";

</script>

<template>
  <main id="main-content">
    <section class="sidebar_template spad">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="section_head">
              <h2 class="fade-h">{{ SITE_NAME }}</h2>
              <p class="fade-t">
                {{ SITE_NAME }} was started by experienced attorneys and
                high-tech experts to bring trademark services to individuals and
                business owners. We provide efficient and economical approaches
                to protect customers brands, businesses, and ideas worldwide.
              </p>
              <br />

              <p>
                {{ SITE_NAME }} has deep knowledge of business processes and
                branding that allows us to deliver effective, affordable
                solutions tailored to your company's unique needs. Our attorneys
                have helped thousands clients including first-time
                entrepreneurs, small businesses, and sophisticated corporations.
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="img_holder desktop about-img-padding">
              <img
                :src="brandsHero16"
                alt="{{ SITE_NAME }} About Us"
                class="fade-in img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div style="display: none" class="popupform" id="popupform">
    <!-- Popup form content remains unchanged -->
  </div>
</template>

<style scoped>


/* Responsive adjustments */
@media (max-width: 991px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-text {
    max-width: 100%;
    margin-bottom: 2rem;
  }
  
  .header-text h1 {
    font-size: 2.75rem;
  }
  
  .header-text p {
    max-width: 100%;
  }
  
  .header-image {
    max-width: 70%;
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .header-text h1 {
    font-size: 2.25rem;
  }
  
  .header-image {
    max-width: 85%;
  }
}
/* =========================================
   YOUR EXISTING UTILITY CSS (Kept intact)
   ========================================= */
.get_trademark_sec a.theme-btn.outlined_btn {
  background: transparent !important;
  border: 2px solid #000 !important;
  color: #000 !important;
}
.theme-btn {
  background: rgb(14, 16, 26) !important;
  padding: 8px 22px;
  display: inline-block;
  font-family: "InstrumentSans", sans-serif !important;
  color: #fff !important;
  position: relative;
  text-decoration: none;
  font-weight: 700 !important;
  text-align: center;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: 0.3s ease-in-out;
  align-content: center;
}
.theme-btn.outlined_btn {
  background: transparent !important;
  border: 2px solid rgb(14, 16, 26) !important;
  color: rgb(14, 16, 26) !important;
}
.link-style-darkbg {
  color: rgb(14, 16, 26) !important;
}
.btn_group a {
  margin-right: 0px !important;
  color: #fff !important;
}
#call-action-ff .fom-text::after {
  color: #fff !important;
}
.plain-cta-text p a {
  color: #fff !important;
}
.get_trademark_sec {
  background: #00122c !important;
}

/* =========================================
   NEW PROFESSIONAL ABOUT SECTION STYLES
   ========================================= */

/* Main Section Wrapper */

body {
   font-family: "Inter", sans-serif;
   margin: 0;
 }
.sidebar_template {
    background-color: white;
    position: relative;
    overflow: hidden;
    padding: 75px 0 ;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
   }

/* Center columns vertically on desktop */
.sidebar_template .row {
  align-items: center;
}

.row {
    display: flex;
    margin: 0 -1rem;
}

.row {
    padding: 0 1rem; 
  } 

/* Text Content Styling */
.section_head {
  padding-left: 2.5rem;
  border-left: 2px solid #EA580C; /* Theme Orange accent */
  margin-bottom: 2rem;
}

.section_head h2.fade-h {
  color: #020617; /* Theme Dark */
  font-family: Instrument Sans, sans-serif !important;
  font-size: 2.75rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.section_head p {
  color: #4a5568; /* Soft dark gray for readability */
      font-family: Instrument Sans, sans-serif !important;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  font-weight: 400;
}

/* Clean up the spacing caused by the <br /> tag in the HTML */
.section_head br {
  display: block;
  margin-bottom: 1rem;
  content: "";
}

/* Image Holder Styling (Modern Card Look) */
.img_holder.about-img-padding {
  position: relative;
  background: white;
  padding: 1.25rem; /* Gives a nice frame effect around the image */
  border-radius: 16px;

}



/* The Image Itself */
.img_holder img {
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

/* =========================================
   RESPONSIVENESS
   ========================================= */
@media (max-width: 991px) {
  .section_head {
    padding: 30px 30px 0 30px;
    border-left: none;
    border-top: 2px solid #EA580C; /* Switch to top border on mobile */
    margin-bottom: 3rem;
    /* text-align: center; */
  }

  .section_head h2.fade-h {
    font-size: 2.25rem;
  }
  
  .section_head p {
    font-size: 1.05rem;
  }

  .img_holder.about-img-padding {
    max-width: 500px;
    margin: 0 auto; /* Center image on mobile */
  }
}

@media (max-width: 576px) {
  .section_head h2.fade-h {
    font-size: 1.85rem;
  }
  
  .img_holder.about-img-padding {
    padding: 0.75rem;
  }
}
</style>
