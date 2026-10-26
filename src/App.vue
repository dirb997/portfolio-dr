<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { translations } from './i18n';
import AboutSection from './components/AboutSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ContactSection from './components/ContactSection.vue';

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

const projects = [
  { key: 'familyMenu', repo: 'family-menu-ai', tags: ['Vue', 'Python', 'AI'] },
  { key: 'deviceManager', repo: 'device-manager', tags: ['Python', 'Backend', 'Systems'] },
  { key: 'movieSearch', repo: 'movie-search-tool', tags: ['JavaScript', 'API'] },
  { key: 'fileSearch', repo: 'file_search_delete', tags: ['Python', 'CLI'] }
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
      <a href="#projects" @click="menuOpen = false">{{ t('nav.projects') }}</a>
      <a href="#skills" @click="menuOpen = false">{{ t('nav.skills') }}</a>
      <a href="#contact" @click="menuOpen = false">{{ t('nav.contact') }}</a>
    </nav>
  </header>
  <button class="language-toggle" type="button" :aria-label="t('nav.language')" :aria-pressed="language === 'es'" @click="toggleLanguage">
    <span :class="{ 'is-active': language === 'en' }">EN</span><span aria-hidden="true">/</span><span :class="{ 'is-active': language === 'es' }">ES</span>
  </button>

  <main id="top">
    <AboutSection :t="t" />
    <ExperienceSection :t="t" :experiences="experiences" :experience-items="experienceItems" />
    <ProjectsSection :t="t" :projects="projects" />
    <SkillsSection :t="t" :skills="skills" />
    <EducationSection :t="t" :education="education" />
    <ContactSection :t="t" :form-status="formStatus" :is-submitting="isSubmitting" @submit="submitForm" />
  </main>

  <footer class="site-footer section-shell reveal"><span>© 2026 Juan Diego Ruiz Berlanga</span><span>{{ t('footer.built') }}</span></footer>
</template>
