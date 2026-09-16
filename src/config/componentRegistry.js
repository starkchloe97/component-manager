import CtaSection1 from "@/components/CTASection/CtaSection1.vue";
import CtaSection2 from "@/components/CTASection/CTASection2.vue";
import CtaSection3 from "@/components/CTASection/CtaSection3.vue";
import CtaSection4 from "@/components/CTASection/CtaSection4.vue";
import CtaSection5 from "@/components/CTASection/CtaSection5.vue";
import CtaSection6 from "@/components/CTASection/CtaSection6.vue";
import CtaSection7 from "@/components/CTASection/CtaSection7.vue";
import CtaSection8 from "@/components/CTASection/CtaSection8.vue";
import Faq1 from "@/components/FaqSection/Faq1.vue";
import Faq2 from "@/components/FaqSection/Faq2.vue";
import Faq3 from "@/components/FaqSection/Faq3.vue";
import Faq4 from "@/components/FaqSection/Faq4.vue";
import Faq5 from "@/components/FaqSection/Faq5.vue";
import Hero1 from "@/components/HeroSection.vue/Hero1.vue";
import Hero2 from "@/components/HeroSection.vue/Hero2.vue";
import Testimonial1 from "@/components/Testimonials/Testimonial1.vue";
import Testimonial2 from "@/components/Testimonials/Testimonial2.vue";
import Testimonial3 from "@/components/Testimonials/Testimonial3.vue";
import Testimonial4 from "@/components/Testimonials/Testimonial4.vue";
import Testimonial5 from "@/components/Testimonials/Testimonial5.vue";
import TextImage1 from "@/components/TextImage/TextImage1.vue";
import TextImage2 from "@/components/TextImage/TextImage2.vue";
import TextImage3 from "@/components/TextImage/TextImage3.vue";
import TextImage4 from "@/components/TextImage/TextImage4.vue";
import TextImage5 from "@/components/TextImage/TextImage5.vue";
import TextImage6 from "@/components/TextImage/TextImage6.vue";
import TextImage7 from "@/components/TextImage/TextImage7.vue";
import TextImage8 from "@/components/TextImage/TextImage8.vue";
import TextImage9 from "@/components/TextImage/TextImage9.vue";

const rawSource = (path) => () => import(`${path}?raw`);
const entry = (id, name, component, path) => ({ id, name, component, source: rawSource(path) });

export const componentRegistry = {
  TextImage1: entry("TextImage1", "Text Image 1", TextImage1, "@/components/TextImage/TextImage1.vue"),
  TextImage2: entry("TextImage2", "Text Image 2", TextImage2, "@/components/TextImage/TextImage2.vue"),
  TextImage3: entry("TextImage3", "Text Image 3", TextImage3, "@/components/TextImage/TextImage3.vue"),
  TextImage4: entry("TextImage4", "Text Image 4", TextImage4, "@/components/TextImage/TextImage4.vue"),
  TextImage5: entry("TextImage5", "Text Image 5", TextImage5, "@/components/TextImage/TextImage5.vue"),
  TextImage6: entry("TextImage6", "Text Image 6", TextImage6, "@/components/TextImage/TextImage6.vue"),
  TextImage7: entry("TextImage7", "Text Image 7", TextImage7, "@/components/TextImage/TextImage7.vue"),
  TextImage8: entry("TextImage8", "Text Image 8", TextImage8, "@/components/TextImage/TextImage8.vue"),
  TextImage9: entry("TextImage9", "Text Image 9", TextImage9, "@/components/TextImage/TextImage9.vue"),

  CtaSection1: entry("CtaSection1", "CTA Section 1", CtaSection1, "@/components/CTASection/CtaSection1.vue"),
  CtaSection2: entry("CtaSection2", "CTA Section 2", CtaSection2, "@/components/CTASection/CTASection2.vue"),
  CtaSection3: entry("CtaSection3", "CTA Section 3", CtaSection3, "@/components/CTASection/CtaSection3.vue"),
  CtaSection4: entry("CtaSection4", "CTA Section 4", CtaSection4, "@/components/CTASection/CtaSection4.vue"),
  CtaSection5: entry("CtaSection5", "CTA Section 5", CtaSection5, "@/components/CTASection/CtaSection5.vue"),
  CtaSection6: entry("CtaSection6", "CTA Section 6", CtaSection6, "@/components/CTASection/CtaSection6.vue"),
  CtaSection7: entry("CtaSection7", "CTA Section 7", CtaSection7, "@/components/CTASection/CtaSection7.vue"),
  CtaSection8: entry("CtaSection8", "CTA Section 8", CtaSection8, "@/components/CTASection/CTASection8.vue"),

  Faq1: entry("Faq1", "FAQ 1", Faq1, "@/components/FaqSection/Faq1.vue"),
  Faq2: entry("Faq2", "FAQ 2", Faq2, "@/components/FaqSection/Faq2.vue"),
  Faq3: entry("Faq3", "FAQ 3", Faq3, "@/components/FaqSection/Faq3.vue"),
  Faq4: entry("Faq4", "FAQ 4", Faq4, "@/components/FaqSection/Faq4.vue"),
  Faq5: entry("Faq5", "FAQ 5", Faq5, "@/components/FaqSection/Faq5.vue"),

  Hero1: entry("Hero1", "Hero 1", Hero1, "@/components/HeroSection.vue/Hero1.vue"),
  Hero2: entry("Hero2", "Hero 2", Hero2, "@/components/HeroSection.vue/Hero2.vue"),

  Testimonial1: entry("Testimonial1", "Testimonial 1", Testimonial1, "@/components/Testimonials/Testimonial1.vue"),
  Testimonial2: entry("Testimonial2", "Testimonial 2", Testimonial2, "@/components/Testimonials/Testimonial2.vue"),
  Testimonial3: entry("Testimonial3", "Testimonial 3", Testimonial3, "@/components/Testimonials/Testimonial3.vue"),
  Testimonial4: entry("Testimonial4", "Testimonial 4", Testimonial4, "@/components/Testimonials/Testimonial4.vue"),
  Testimonial5: entry("Testimonial5", "Testimonial 5", Testimonial5, "@/components/Testimonials/Testimonial5.vue"),
};
