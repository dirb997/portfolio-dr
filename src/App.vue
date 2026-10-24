<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { translations } from './i18n';

const language = ref(localStorage.getItem('portfolio-language') || 'en');
const menuOpen = ref(false);
const formStatus = ref('');
const isSubmitting = ref(false);

const content = computed(() => translations[language.value]);
const t = (key) => key.split('.').reduce((value, part) => value?.[part], content.value) || key;

const experiences = [
  { key: 'eaship', number: '01', company: 'Eaship TMS', tags: ['Python', 'Django', 'FastAPI', 'Vue.js', 'React', 'Docker'] },
  { key: 'insuit', number: '02', company: 'inSuit', tags: ['Java', 'Spring Boot', 'OpenAPI', 'TypeScript', 'GitLab CI/CD'] },
  { key: 'forestwood', number: '03', company: 'Forestwood Ltd.', tags: ['PHP', 'Laravel', 'Vue.js', 'Docker'] },
  { key: 'growth', number: '04', company: 'Growth Japan Technologies Inc.', tags: ['JavaScript', 'Python', 'Node.js'] }
];

const skills = [
  ['languages', 'languagesList'],
  ['frameworks', 'frameworksList'],
  ['cloud', 'cloudList'],
  ['infrastructure', 'infrastructureList'],
  ['operatingSystems', 'operatingSystemsList']
];

const education = [
  { key: 'uoc' },
  { key: 'kyushu' }
];

watch(language, (value) => {
  document.documentElement.lang = value;
  document.title = t('meta.title');
  localStorage.setItem('portfolio-language', value);
});

document.documentElement.lang = language.value;
document.title = t('meta.title');

onMounted(() => {
  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
});

function toggleLanguage() {
  language.value = language.value === 'en' ? 'es' : 'en';
}

function experienceItems(experience) {
  return [1, 2, 3]
    .map((item) => t(`experience.${experience.key}.item${item}`))
    .filter((item) => !item.startsWith(`experience.${experience.key}.item`));
}

async function submitForm(event) {
  const form = event.currentTarget;
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    formStatus.value = t('contact.configurationError');
    return;
  }

  isSubmitting.value = true;
  formStatus.value = t('contact.sending');

  const data = new FormData(form);
  data.append('access_key', accessKey);
  data.append('subject', `Portfolio message from ${data.get('name')}`);
  data.append('from_name', 'Portfolio contact form');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Web3Forms submission failed');
    }

    form.reset();
    formStatus.value = t('contact.success');
  } catch (error) {
    console.error('Unable to send contact form', error);
    formStatus.value = t('contact.error');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#top" :aria-label="t('nav.top')">Juan Diego Ruiz Berlanga<span>.</span></a>
    <div class="header-tools">
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="site-nav" @click="menuOpen = !menuOpen">{{ t('nav.menu') }}</button>
    </div>
    <nav id="site-nav" class="site-nav" :class="{ 'is-open': menuOpen }" :aria-label="t('nav.label')">
      <a href="#about" @click="menuOpen = false">{{ t('nav.about') }}</a>
      <a href="#experience" @click="menuOpen = false">{{ t('nav.experience') }}</a>
      <a href="#skills" @click="menuOpen = false">{{ t('nav.skills') }}</a>
      <a href="#contact" @click="menuOpen = false">{{ t('nav.contact') }}</a>
    </nav>
  </header>
  <button class="language-toggle" type="button" :aria-label="t('nav.language')" :aria-pressed="language === 'es'" @click="toggleLanguage">
    <span :class="{ 'is-active': language === 'en' }">EN</span><span aria-hidden="true">/</span><span :class="{ 'is-active': language === 'es' }">ES</span>
  </button>

  <main id="top">
    <section class="hero section-shell" id="about">
      <div class="hero-copy">
        <p class="eyebrow" v-html="t('hero.eyebrow')"></p>
        <h1 v-html="t('hero.title')"></h1>
        <p class="hero-lede">{{ t('hero.lede') }}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#contact">{{ t('hero.talk') }} <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="https://www.linkedin.com/in/juan-diego-ruiz-berlanga-795701372" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="https://github.com/dirb997" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside class="hero-note" :aria-label="t('hero.availabilityLabel')">
        <span class="status-dot"></span>
        <p>{{ t('hero.availability') }}</p>
        <span class="note-index">01 / 04</span>
      </aside>
    </section>

    <section class="facts section-shell reveal" :aria-label="t('facts.label')">
      <div><strong>4+</strong><span>{{ t('facts.years') }}</span></div>
      <div><strong>4</strong><span>{{ t('facts.roles') }}</span></div>
      <div><strong>3</strong><span>{{ t('facts.languages') }}</span></div>
      <div><strong>∞</strong><span>{{ t('facts.curiosity') }}</span></div>
    </section>

    <section class="content-section section-shell reveal" id="experience">
      <div class="section-heading"><p class="eyebrow">{{ t('experience.eyebrow') }}</p><h2>{{ t('experience.title') }}</h2></div>
      <div class="timeline">
        <article v-for="(experience, index) in experiences" :key="experience.key" class="timeline-item" :class="{ current: index === 0 }">
          <div class="timeline-meta"><span>{{ t(`experience.${experience.key}.date`) }}</span><span>{{ experience.number }}</span></div>
          <div class="timeline-body">
            <h3>{{ t(`experience.${experience.key}.role`) }}</h3>
            <p class="company">{{ experience.company }} <span class="location">/ {{ t(`experience.${experience.key}.location`) }}</span></p>
            <ul><li v-for="item in experienceItems(experience)" :key="item">{{ item }}</li></ul>
            <div class="tags"><span v-for="tag in experience.tags" :key="tag">{{ tag }}</span></div>
          </div>
        </article>
      </div>
    </section>

    <section class="split-section section-shell reveal" id="skills">
      <div class="section-heading"><p class="eyebrow">{{ t('skills.eyebrow') }}</p><h2>{{ t('skills.title') }}</h2></div>
      <div class="skill-columns"><div v-for="[key, listKey] in skills" :key="key" class="skill-group"><h3>{{ t(`skills.${key}`) }}</h3><p>{{ t(`skills.${listKey}`) }}</p></div></div>
    </section>

    <section class="split-section education section-shell reveal">
      <div class="section-heading"><p class="eyebrow">{{ t('education.eyebrow') }}</p><h2>{{ t('education.title') }}</h2></div>
      <div class="education-list"><article v-for="item in education" :key="item.key"><p class="date">{{ t(`education.${item.key}.date`) }}</p><h3>{{ t(`education.${item.key}.institution`) }}</h3><p>{{ t(`education.${item.key}.degree`) }}</p></article></div>
      <div class="language-strip"><div><strong>{{ t('education.english') }}</strong><span>{{ t('education.englishLevel') }}</span></div><div><strong>{{ t('education.japanese') }}</strong><span>{{ t('education.japaneseLevel') }}</span></div><div><strong>{{ t('education.spanish') }}</strong><span>{{ t('education.native') }}</span></div></div>
    </section>

    <section class="contact section-shell reveal" id="contact">
      <div class="contact-copy"><p class="eyebrow">{{ t('contact.eyebrow') }}</p><h2>{{ t('contact.title') }}</h2><p>{{ t('contact.description') }}</p></div>
      <div class="contact-details"><a href="mailto:jdruizberlanga@gmail.com">jdruizberlanga@gmail.com <span>↗</span></a><a href="tel:+34664258720">+34 664 258 720 <span>↗</span></a><p>Valencia, Spain</p></div>
      <form class="contact-form" @submit.prevent="submitForm"><label for="name">{{ t('contact.name') }}</label><input id="name" name="name" type="text" autocomplete="name" required><label for="email">{{ t('contact.email') }}</label><input id="email" name="email" type="email" autocomplete="email" required><label for="message">{{ t('contact.message') }}</label><textarea id="message" name="message" rows="4" required></textarea><button class="button button-primary" type="submit" :disabled="isSubmitting">{{ isSubmitting ? t('contact.sending') : t('contact.send') }} <span aria-hidden="true">↗</span></button><p class="form-status" role="status" aria-live="polite">{{ formStatus }}</p></form>
    </section>
  </main>

  <footer class="site-footer section-shell reveal"><span>© 2026 Juan Diego Ruiz Berlanga</span><span>{{ t('footer.built') }}</span></footer>
</template>
