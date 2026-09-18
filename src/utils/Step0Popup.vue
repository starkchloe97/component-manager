<template>
  <button @click="showPopup" :class="buttonClass" :style="buttonStyle">
    <span v-if="buttonPreIcon" class="iconify" :data-icon="buttonPreIcon" data-width="14"></span>
    {{ triggerText }}
    <span v-if="buttonPostIcon" class="iconify" :data-icon="buttonPostIcon" data-width="14"></span>
  </button>
</template>

<script setup>
// import { useRouter } from "vue-router";

// import Swal from "sweetalert2";

// import { API_ENDPOINTS, SITE_NAME } from "@/config/siteInfo.js";
// import { useFormStore } from "@/stores/formStore";
// import { useTrafficSource } from "@/composables/useTrafficSource";

// // import { trackZendeskPageView } from "@/router";

// const router = useRouter();
// const store = useFormStore();

// const { getTrafficSource } = useTrafficSource();
// const currentSource = getTrafficSource();

// store.setTrafficSource({
//   traffic_type: currentSource.traffic_type,
//   is_paid_ad: currentSource.is_paid_ad,
//   is_organic: currentSource.is_organic,
//   display_name: currentSource.display_name,
//   url: currentSource.url,
//   ad_campaign: currentSource.ad_campaign,
//   search_engine: currentSource.search_engine,
//   utm_params: currentSource.utm_params,
//   icon: currentSource.icon,
// });

const getGclidFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("gclid") || null;
};

const getMsclkidFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("msclkid") || null;
};

const gclid = getGclidFromUrl();
const msclkid = getMsclkidFromUrl();
const previousUrl =
  currentSource.url !== "Direct Traffic" ? currentSource.url : null;

if (gclid) store.form.gclid = gclid;
if (msclkid) store.form.msclkid = msclkid;
if (previousUrl && !store.form.previousUrl)
  store.form.previousUrl = previousUrl;

let hideTimer = null;

const props = defineProps({
  triggerText: { type: String, default: "Get Started" },
  buttonStyle: {
    type: Object,
  },
  buttonClass: { type: String, default: "popup-trigger" },
  buttonPreIcon: { type: String, default: "" },
  buttonPostIcon: { type: String, default: "" },
});

const POPUP_PATH = "/popup/step0-register-trademark";
const POPUP_TITLE = "Pop-up - Lead Form Appears";

const showPopup = async () => {
  store.resetForm();

  const originalTitle = document.title;

  const { value: data } = await Swal.fire({
    title: "Register your trademark",
    html: `
      <div class="step0-form">
        <p class="subtitle">Complete the fields below to access your trademark application questionnaire.</p>

        <div class="form-group">
          <input type="text" id="name" class="swal2-input" placeholder="Full Name" value="${
            store.form.name || ""
          }">
          <div class="error-message" id="name-error"></div>
        </div>
        <div class="form-group">
          <input type="email" id="email" class="swal2-input" placeholder="Email" value="${
            store.form.email || ""
          }">
          <div class="error-message" id="email-error"></div>
        </div>
        <div class="form-group">
          <input type="tel" id="phone" class="swal2-input" placeholder="Phone Number" value="${
            store.form.phone || ""
          }">
          <div class="error-message" id="phone-error"></div>
        </div>
        <div class="info-note">
          <label class="checkbox-label">
            <input type="checkbox" id="agree" ${
              store.form.checkBox ? "checked" : ""
            }>
          </label>
          <span>By checking this box, I agree to receive SMS messages about appointment scheduling, notice reminders, application updates, and billing notifications from ${SITE_NAME} at the phone number provided above. The SMS frequency may vary. Data rates may apply. Text HELP for assistance. Reply STOP to opt out of receiving SMS messages. Please review our&nbsp;<a href="/privacy-policy" class="link-style">Privacy Policy</a> and <a href="/terms-of-service" class="link-style">Terms of Service</a>.</span>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Get Started",
    cancelButtonText: "Cancel",
    allowOutsideClick: true,
    showLoaderOnConfirm: false,
    scrollbarPadding: false,
    heightAuto: false,
    customClass: {
      container: "step0-swal-container",
      popup: "step0-swal-popup",
      confirmButton: "btn-primary",
    },

    didOpen: () => {
      document.title = POPUP_TITLE;
      history.pushState({ zendeskPopup: true }, POPUP_TITLE, "#popup");
      setTimeout(() => {
        trackZendeskPageView(POPUP_PATH, POPUP_TITLE);
      }, 150);
    },
    willClose: () => {
      document.title = originalTitle;
    },

    preConfirm: async () => {
      clearTimeout(hideTimer);
      Swal.resetValidationMessage();

      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const agree = document.getElementById("agree").checked;

      let isValid = true;

      if (!name.trim()) {
        document.getElementById("name-error").textContent =
          "Full name is required";
        isValid = false;
      }

      if (!email.trim()) {
        document.getElementById("email-error").textContent =
          "Email is required";
        isValid = false;
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        document.getElementById("email-error").textContent =
          "Valid email required";
        isValid = false;
      }

      if (!phone.trim()) {
        document.getElementById("phone-error").textContent =
          "Phone number is required";
        isValid = false;
      }

      if (!isValid) {
        Swal.showValidationMessage("Please fix the errors");

        hideTimer = setTimeout(() => {
          Swal.resetValidationMessage();
        }, 3000);

        return false;
      }

      Swal.resetValidationMessage();

      const confirmButton = Swal.getConfirmButton();
      if (confirmButton) {
        confirmButton.disabled = true;
        confirmButton.textContent = "Submitting...";
      }

      try {
        const response = await fetch(API_ENDPOINTS.LEAD, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create",
            name: name,
            email: email,
            phone: phone,
            checkBox: agree,
            gclid: gclid,
            msclkid: msclkid,
            previousUrl: previousUrl,
            traffic_source: store.form.trafficSource,
            utm_source: currentSource.utm_params?.utm_source,
            utm_medium: currentSource.utm_params?.utm_medium,
            utm_campaign: currentSource.utm_params?.utm_campaign,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          let userMessage = "Submission failed. Please check your information.";

          if (result.message) {
            const jsonStart = result.message.indexOf("{");
            if (jsonStart !== -1) {
              try {
                const jsonPart = result.message.slice(jsonStart);
                const errorData = JSON.parse(jsonPart);
                if (Array.isArray(errorData.data)) {
                  const fieldErrors = errorData.data
                    .map((item) => {
                      const field = item.details?.api_name || "field";
                      return `Invalid ${field}.`;
                    })
                    .join(" ");
                  if (fieldErrors) userMessage = fieldErrors;
                }
              } catch (e) {
                userMessage = result.message;
              }
            } else {
              userMessage = result.message;
            }
          }

          throw new Error(userMessage);
        }

        store.setStep0Response(result.application_id, result.lead_id);

        store.form.name = name;
        store.form.email = email;
        store.form.phone = phone;
        store.form.checkBox = agree;
        if (gclid) store.form.gclid = gclid;
        if (msclkid) store.form.msclkid = msclkid;
        if (previousUrl) store.form.previousUrl = previousUrl;

        store.form.reference_url = result.reference_url ?? null;
        store.form.device = result.device ?? null;
        store.form.operating_system = result.operating_system ?? null;
        store.form.browser = result.browser ?? null;

        store.form.email_formatted = email.toLowerCase().trim();
        store.form.phone_formatted = "+" + phone.trim().replace(/\D/g, "");

        return {
          name,
          email,
          phone,
          agree,
          applicationId: result.application_id,
          leadId: result.lead_id,
        };
      } catch (error) {
        if (confirmButton) {
          confirmButton.disabled = false;
          confirmButton.textContent = "Get Started";
        }

        Swal.showValidationMessage(`Submission failed: ${error.message}`);

        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          Swal.resetValidationMessage();
        }, 1500);

        return false;
      }
    },
  });

  if (!data && history.state?.zendeskPopup) {
    history.back();
  }

  if (data) {
    if (data.leadId) {
      router.push(`/trademarkform?lead_id=${data.leadId}`);
    } else {
      router.push("/trademarkform");
    }
  }
};
</script>

<style>
/* ===== SweetAlert2 validation toast ===== */
.swal2-validation-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10001;
  margin: 0 !important;
  padding: 8px 12px !important;
  background: #d64545 !important;
  color: #fff !important;
  font-size: 12px !important;
  font-weight: 500;
  text-align: center;
  border-radius: 16px 16px 0 0 !important;
  transform: translateY(-100%);
  opacity: 0;
  transition:
    transform 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.3s ease;
  pointer-events: none;
}

.swal2-validation-message[style*="flex"] {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.swal2-validation-message::before {
  content: "⚠ ";
  margin-right: 6px;
  font-size: 14px;
}

.step0-swal-popup {
  position: relative;
  overflow: hidden;
  padding-top: 22px;
}
/* @media (max-width: 768px) {
  body.swal2-shown.swal2-height-auto {
    padding-right: 0px !important;
  }
} */
</style>

<style scoped>
.popup-trigger.hover-scale.meme {
  display: none !important;
}

div:where(.swal2-container) {
  z-index: 10000;
  background: rgba(11, 15, 22, 0.75) !important;
  backdrop-filter: blur(4px);
}

@media (max-width: 768px) {
  .swal2-custom-popup {
    max-width: 100%;
  }

  .popup-trigger {
    padding: 12px 22px !important;
    font-size: 14px !important;
  }
}

.swal2-custom-content {
  padding: 15px 24px 0;
  width: 100%;
}

/* ===== Trigger button — matches .btn-primary / nav CTA styling ===== */
.popup-trigger {
  background: var(--brand, #0b55b6);
  color: #fff;
  border: none;
  padding: 12px 26px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
}
.popup-trigger:hover {
  background: #094a9c;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(11, 85, 182, 0.25);
}
</style>

<style>
/* ===== Modal shell ===== */
div:where(.step0-swal-container) {
  z-index: 10000;
  background: rgba(11, 15, 22, 0.75) !important;
  backdrop-filter: blur(4px);
}

.step0-swal-popup {
  border-radius: 16px;
  max-width: 450px;
  padding: 24px;
  box-shadow: 0 24px 60px rgba(11, 15, 22, 0.25);
  border: 1px solid rgba(212, 224, 240, 0.6);
}

.step0-form .form-group {
  margin-bottom: 5px;
}

.swal2-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--ink, #0b0f16);
}

.step0-form .subtitle {
  margin: 0 0 22px;
  color: var(--muted, #64748b);
  font-size: 13px;
  line-height: 1.55;
}

.info-note p {
  margin: 0;
  font-size: 14px;
  line-height: 14px !important;
}

div#swal2-html-container {
  padding: 15px 25px 5px;
;
}

.swal2-actions {
  margin: 4px 0 0 0 !important;
}

/* ===== Confirm / cancel buttons ===== */
/* .swal2-confirm {
  background: var(--brand, #0b55b6) !important;
  color: #fff !important;
  border: none !important;
  padding: 12px 26px !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 20px rgba(11, 85, 182, 0.25) !important;
  transition: all 0.25s ease !important;
}

.swal2-confirm:hover:not(:disabled) {
  background: #094a9c !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 10px 24px rgba(11, 85, 182, 0.3) !important;
}

.swal2-confirm:disabled {
  opacity: 0.6;
  box-shadow: none !important;
  transform: none !important;
} */

button.swal2-cancel.swal2-styled {
  display: none !important;
}

button.swal2-close {
  display: block !important;
  color: var(--muted, #94a3b8);
  position: relative;
  right: -12px;
  top: -18px;
  transition: color 0.2s ease;
}
button.swal2-close:hover {
  color: var(--ink, #0b0f16);
}

/* ===== Inputs — rounded, brand-focus, consistent with site form fields ===== */
.step0-form .swal2-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid rgba(212, 224, 240, 0.9);
  border-radius: 10px;
  font-size: 14px;
  color: var(--ink, #0b0f16);
  margin: 0;
  box-sizing: border-box;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.step0-form .swal2-input:focus {
  border: 1px solid #d9d9d9;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(11, 85, 182, 0.12);
  outline: none;
}

.step0-form .swal2-input::placeholder  {
  color: #bbbbbb;
  font-weight: 200;
}

.error-message {
  margin: 4px 0 0 2px;
}

.step0-form .error-message {
  color: #d64545;
  font-size: 11px;
  font-weight: 500;
  text-align: left;
}

.swal2-input {
  border-radius: 10px !important;
  margin: 2px 0 !important;
}

/* ===== Consent note — soft card matching mega-menu CTA panel style ===== */
.step0-form .info-note {
  margin-top: 6px;
  padding: 14px 10px;
  background: #f4f6f8;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  line-height: 1.4;
  text-align: left;
}

.info-note span {
  font-size: 11.5px;
  text-align: left;
  color:black;
  line-height: 1.5;
}

.step0-form .checkbox-label {
  font-size: 12px;
  display: inline-flex;
  color: var(--ink, #0b0f16);
  text-align: left;
  flex-shrink: 0;
}

.step0-form .checkbox-label a {
  color: var(--brand, #0b55b6);
  text-decoration: none;
}

.step0-form .checkbox-label a:hover {
  text-decoration: underline !important;
}

.step0-form .checkbox-label input {
  margin: 2px 0 0 0;
  width: 15px;
  height: 15px;
  accent-color: var(--brand, #0b55b6);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .swal2-custom-popup {
    max-width: 100%;
  }

  button.swal2-close {
    right: -16px;
    top: -20px;
    font-size: 30px;
  }

  .popup-trigger {
    padding: 12px 22px;
    font-size: 14px;
  }

  .swal2-title {
    font-size: 18px;
    letter-spacing: -0.01em;
    color: var(--ink, #0b0f16);
  }

  div#swal2-html-container {
    padding: 8px 20px 0;
  }

  .step0-form .subtitle {
    margin: 12px 0 20px 0;
    color: var(--muted, #64748b);
    font-size: 13px;
    line-height: 1.5;
  }

  .step0-swal-popup {
    max-width: 92%;
    padding: 18px;
  }

  .cutom-padd .popup-trigger {
    margin: 0px;
  }

  .content-box .theme-btn.outlined_btn {
    padding: 8px 22px;
    font-size: 14px;
  }
}

.iconify {
  display: inline-block;
  vertical-align: middle;
}
</style>