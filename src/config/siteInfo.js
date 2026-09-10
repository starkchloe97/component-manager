export const SITE_NAME = "Trademark Charter";
export const SITE_PHONE = "(855) 255-1899"
export const SITE_PHONE_RAW = "+18552551899"
export const SITE_EMAIL = "support@trademarkcharter.com"
export const SITE_ADDRESS_LINE1 = "Test Street #00000"
export const SITE_ADDRESS_LINE2 = "Test, TX 00000"
export const SITE_DOMAIN = "trademarkcharter.com"

import logo from "@/assets/images/logo.svg";
export const SITE_LOGO = logo;

export const BASE_URL = 'https://trademarkcharter.com'
export const VITE_PAYMENT_LINK_API_URL = 'https://trademarkcharter.com/pay.php'

export const EXTERNAL_API_BASE_URL = 'https://payment-module-api.authlinkpay.com'
export const BRAND_CODE = '133'

export const API_ENDPOINTS = {
  LEAD: `${BASE_URL}/lead-api.php`,
  UPLOAD_IMAGE: `${BASE_URL}/upload-image.php`,

  EXTERNAL_API_STEP_MERCHANT_KEYS_URL:`${EXTERNAL_API_BASE_URL}/api/external/brand/${BRAND_CODE}/merchant-keys/step_form`,
  EXTERNAL_API_LINK_MERCHANT_KEYS_URL:`${EXTERNAL_API_BASE_URL}/api/external/brand/${BRAND_CODE}/merchant-keys/link_form`,
  EXTERNAL_API_PROCESS_PAYMENT_URL: `${EXTERNAL_API_BASE_URL}/api/external/brand/${BRAND_CODE}/process-payment`,
  EXTERNAL_API_GENERATE_PAYMENT_LINK_URL: `${EXTERNAL_API_BASE_URL}/api/external/brand/${BRAND_CODE}/generate_payment_link`,
  EXTERNAL_API_GET_PAYMENT_LINK_URL: `${EXTERNAL_API_BASE_URL}/api/external/brand/${BRAND_CODE}/payment_link`
}