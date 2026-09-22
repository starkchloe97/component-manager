<script setup>
import customerImage from "@/assets/customer.svg";
import trustedImage from "@/assets/trusted.svg";
import tatImage from "@/assets/tat.svg";
import { SITE_NAME } from "@/config/siteInfo.js";
</script>

<template>
  <div class="fluid-container dark_blue">
    <div class="container">
      <div class="mb-4 text-center white">
        <h2>One-stop solution for your business protection</h2>
        <p>We're here to make sure your business is protected.</p>
      </div>
      <div class="row gx-5 gy-4">
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="customerImage" alt="" />
            <h3>Trademark Registration</h3>
            <p>
              Protect your rights to a name, logo, or slogan that identifies your business and get legal protection to
              stop competitors from copying your brand.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="trustedImage" alt="" />
            <h3>Trademark Search</h3>
            <p>
              Make sure your anticipated name, logo, or slogan is up for grabs before you apply for trademark
              registration to avoid wasting your time and money.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="tatImage" alt="" />
            <h3>Trademark Monitoring</h3>
            <p>
              Get notified when someone files a potentially infringing trademark. We actively monitor trademark
              applications so you can enforce your rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="fluid-container dark_blue">
    <div class="container">
      <div class="row gx-5 gy-4">
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="customerImage" alt="" />
            <h3>Trademark Office Action</h3>
            <p>
              Got an office action? Don't worry! We'll carefully address and resolve the issues identified by the
              examining attorney against your trademark application.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="trustedImage" alt="" />
            <h3>Copyright Registration</h3>
            <p>
              Protect your creative work against piracy. Own a copyright to your creation so you can freely exploit it
              on your own or license the use of it to another party.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="inner-conduct">
            <img :src="tatImage" alt="" />
            <h3>LLC Formation</h3>
            <p>
              No matter the business type, we can help you form your new company. Every day, people from all over the
              nation rely on us to help them form their company.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');


.mb-4.text-center.white {
  color: #ffffff;
  padding-bottom: 42px;
  text-align: center;
}

.mb-4.text-center.white p {
  opacity: 0.5;
  font-weight: 100;
  letter-spacing: 0px;
  font-size: 14px;
}

/* ─── Outer Section ─── */
.fluid-container.dark_blue {
  position: relative;
  background: #050505;
  padding: 64px 0 72px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.fluid-container.dark_blue::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.3) 50%, transparent 100%);
}

/* ─── Container ─── */
.container {
  position: relative;
  z-index: 1;
  max-width: 1290px;

  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Header ─── */
.row.mb-4 {
  text-align: center;
  margin-bottom: 36px !important;
}

.row.mb-4 h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0 0 8px;
}

.row.mb-4 p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: rgb(115, 115, 115);
  margin: 0;
}

/* ─── Cards Column ─── */
.row.gx-5 {
  display: flex;

  gap: 0;
  margin: 0;
}

.row.gx-5.gy-4 {
  row-gap: 0;
}

/* ─── Card Column ─── */
.col-md-4 {
  flex: 1 1 100%;
  max-width: 100%;
  padding: 0;
}

/* ─── Card ─── */
.inner-conduct {
  position: relative;

  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  max-width: 400px;
}

.inner-conduct:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.inner-conduct:first-child {
  padding-top: 0;
}

/* Left accent bar */
.inner-conduct::before {
  content: '';
  position: absolute;
  left: -17px;
  top: 20px;
  bottom: 20px;
  width: 2px;
  background: transparent;
  border-radius: 2px;
  transition: background 0.3s ease;
}

.inner-conduct:hover::before {
  background: linear-gradient(180deg, #f97316, rgba(249, 115, 22, 0.2));
}

.inner-conduct:hover {
  padding-left: 4px;
}

/* ─── Card Image ─── */
.inner-conduct img {
  display: block;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1) opacity(0.7);
  transition: all 0.3s ease;
}

.inner-conduct:hover img {
  filter: brightness(0) invert(72%) sepia(78%) saturate(600%) hue-rotate(355deg) brightness(102%) contrast(101%);
}

/* ─── Card Content ─── */
.inner-conduct h3 {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: #ffffff;
  margin: 0 0 4px;
}

.inner-conduct p {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.65;
  color: rgb(115, 115, 115);
  margin: 0;
  transition: color 0.3s ease;
}

.inner-conduct:hover p {
  color: rgb(156, 163, 175);
}

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .fluid-container.dark_blue {
    padding: 48px 0 56px;
  }

  .row.mb-4 {
    margin-bottom: 28px !important;
  }

  .row.mb-4 h2 {
    font-size: 20px;
  }

  .row.mb-4 p {
    font-size: 13px;
  }

  .inner-conduct {
    gap: 12px;
    padding: 16px 0;
  }

  .inner-conduct img {
    width: 36px;
    height: 36px;
  }

  .inner-conduct h3 {
    font-size: 14px;
  }

  .inner-conduct p {
    font-size: 12px;
  }
}
</style>