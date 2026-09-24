<template>
  <section ref="sectionRef" class="testimonial-section">
    <div class="container testimonial-grid">
      <div class="testimonial-copy reveal">
        <span class="eyebrow">Testimonials</span>

        <h2 class="display-lg">
          Satisfied 
          <span class="text-gradient">Customers</span>
        </h2>

        <p>
          Trusted by over 10,000 businesses. Protect your intellectual property with confidence.
        </p>
      </div>

      <div class="testimonial-slider reveal">
        <!-- LEFT COLUMN -->
        <div class="review-column">
          <div
            ref="leftLaneRef"
            class="review-lane"
            @mouseenter="pauseAnimation"
            @mouseleave="resumeAnimation"
          >
            <article
              v-for="(review, index) in leftLaneReviews"
              :key="`left-${review.name}-${index}`"
              class="review-card"
            >
              <div class="quote">❝</div>

              <div class="stars">
                ★★★★★
              </div>

              <p>{{ review.text }}</p>

              <div class="reviewer">
                <img :src="review.image" :alt="review.name" />

                <div>
                  <strong>{{ review.name }}</strong>
                  <small>{{ review.role }}</small>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="review-column review-column-offset">
          <div
            ref="rightLaneRef"
            class="review-lane"
            @mouseenter="pauseAnimation"
            @mouseleave="resumeAnimation"
          >
            <article
              v-for="(review, index) in rightLaneReviews"
              :key="`right-${review.name}-${index}`"
              class="review-card"
            >
              <div class="quote">❝</div>

              <div class="stars">
                ★★★★★
              </div>

              <p>{{ review.text }}</p>

              <div class="reviewer">
                <img :src="review.image" :alt="review.name" />

                <div>
                  <strong>{{ review.name }}</strong>
                  <small>{{ review.role }}</small>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";


import img1 from "@/assets/r-w-14.png";
import img2 from "@/assets/r-w-15.png";
import img3 from "@/assets/r-w-16.png";
import img4 from "@/assets/r-m-14.png";
import img5 from "@/assets/r-m-14.png";
import img6 from "@/assets/r-m-14.png";

const sectionRef = ref(null);
const leftLaneRef = ref(null);
const rightLaneRef = ref(null);

let leftTimeline = null;
let rightTimeline = null;

const reviews = [
  {
    name: "Amanda Reynolds",
    role: "Trademark Customer",
    image: img1,
    text: "It's really great to speak with a real person by phone who is based in the US. There was zero waiting time. Skilled and supportive. Made the TM process very simple. Recommended."
  },
  {
    name: "David Miller",
    role: "Trademark Customer",
    image: img6,
    text: "The people I have worked with are professional, knowledgeable, and consistently go beyond expectations to help you handle your trademark registration with ease."
  },
  {
    name: "Rachel Bennett",
    role: "Trademark Customer",
    image: img3,
    text: "Skilled, dependable, simple to collaborate with, and fairly priced services. Additionally, their consistent follow-up ensures every detail is completed correctly and efficiently."
  },
  {
    name: "Melissa Harding",
    role: "Trademark Customer",
    image: img1,
    text: "They have partnered with me to achieve compliance and keep my mind at ease. They are top tier; I have gained knowledge about the trademark registration process."
  },
  {
    name: "Ana Velez",
    role: "Trademark Customer",
    image: img2,
    text: "The group of professionals at this company are highly efficient and clearly describe the process with clear guidance for every step, which greatly simplifies the work. Thank you team!"
  },
  {
    name: "Andrew Taylor",
    role: "Trademark Customer",
    image: img4,
    text: "Excellent experience. The staff were extremely informed and offered strong professional expert clear detailed valuable practical insight into the trademark approval process."
  },
  {
    name: "Danielle Morrison",
    role: "Trademark Customer",
    image: img5,
    text: "This group is extremely detailed. They responded all my inquiries, handled my concerns, and kept me updated every stage of the process. Absolutely using their services again."
  },
  {
    name: "Christopher Hale",
    role: "Trademark Customer",
    image: img3,
    text: "This team is extremely detailed. They responded all my questions, resolved my concerns, and kept me updated through each step of the process. Using their services again."
  }
];

const leftReviews = computed(() =>
  reviews.filter((_, index) => index % 2 === 0)
);

const rightReviews = computed(() =>
  reviews.filter((_, index) => index % 2 === 1)
);

const leftLaneReviews = computed(() => [
  ...leftReviews.value,
  ...leftReviews.value
]);

const rightLaneReviews = computed(() => [
  ...rightReviews.value,
  ...rightReviews.value
]);

const createLoop = (lane, direction) => {
  const cards = lane.children;
  const uniqueCount = cards.length / 2;

  const cardHeight =
    cards[0].getBoundingClientRect().height + 20;

  const tl = gsap.timeline({
    repeat: -1
  });

  if (direction === "up") {
    for (let i = 1; i <= uniqueCount; i++) {
      tl.to(lane, {
        y: -(cardHeight * i),
        duration: 1.1,
        ease: "power2.out"
      });

      tl.to({}, { duration: 1.5 });
    }

    tl.set(lane, { y: 0 });
  } else {
    gsap.set(lane, {
      y: -(cardHeight * uniqueCount)
    });

    for (let i = uniqueCount - 1; i >= 0; i--) {
      tl.to(lane, {
        y: -(cardHeight * i),
        duration: 1.1,
        ease: "power2.out"
      });

      tl.to({}, { duration: 1.5 });
    }

    tl.set(lane, {
      y: -(cardHeight * uniqueCount)
    });
  }

  return tl;
};

const pauseAnimation = () => {
  leftTimeline?.pause();
  rightTimeline?.pause();
};

const resumeAnimation = () => {
  leftTimeline?.resume();
  rightTimeline?.resume();
};

onMounted(async () => {
  await nextTick();

  leftTimeline = createLoop(
    leftLaneRef.value,
    "up"
  );

  rightTimeline = createLoop(
    rightLaneRef.value,
    "down"
  );
});

onUnmounted(() => {
  leftTimeline?.kill();
  rightTimeline?.kill();
});
</script>

<style scoped>

.testimonial-section {
  --radius-card: 2rem;
  --primary: #003dc7bd;
}

.testimonial-section{
    font-family: "Instrument Sans", sans-serif !important;
}


.review-card {
    background: #fff;
    border-radius: var(--radius-card);
    padding: 28px;
    min-height: 260px;
    transition: .3s;
}

.eyebrow { 
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color:#003dc7bd;
    margin-bottom: 14px;
}
.display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
}
.text-gradient {
    background: linear-gradient(135deg, #003ec7 0%, #003ec7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 200;
}
.testimonial-section {
  padding: 80px 0;
  background: #faf8ff;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: .9fr 1.2fr ;
  gap: 70px ;
  align-items: center;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.testimonial-copy h2 {
  margin: 15px 0;
}

.testimonial-copy p {
  color: #44474f;
  line-height: 1.8;
}

.testimonial-slider {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
}

.review-column {
  height: 700px;
  overflow: hidden;
  mask-image: linear-gradient(  to top,  transparent 0%,  white 9%,  white 85%,  transparent 100%);
}


.review-column-offset {
  margin-top: 120px;
}

.review-lane {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  background: #fff;
  border-radius: 25px;
  padding: 28px;
  min-height: 260px;
  transition: .3s;
}

.review-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(19, 27, 46, 0.08);
}

.quote {
  font-size: 50px;
  color: var(--primary);
  opacity: .18;
  line-height: 1;
}

.stars {
  color: #ffb400;
  margin: 10px 0 15px;
  font-size: 18px;
}

.review-card p {
  line-height: 1.8;
  color:#44474f;
}

.reviewer {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.reviewer img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewer strong {
  display: block;
  color: #131b2e;
}

.reviewer small {
  color: #44474f;
}

@media (max-width: 1024px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .testimonial-slider {
    grid-template-columns: 1fr;
  }

  .review-column-offset {
    margin-top: 0;
  }

  .review-column {
    height: 450px;
  }
}
</style>