const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const languageToggle = document.querySelector('.language-toggle');
const contactForm = document.querySelector('#contact-form');
const translationSections = [
  'meta',
  'nav',
  'hero',
  'facts',
  'experience',
  'skills',
  'education',
  'contact',
  'footer'
];
const translations = {};

const getValue = (language, key) => key.split('.').reduce((value, part) => value?.[part], translations[language]);

async function loadLanguage(language) {
  const selectedLanguage = language === 'es' ? 'es' : 'en';
  const files = await Promise.all(translationSections.map(async (section) => {
    const response = await fetch(`i18n/${selectedLanguage}/${section}.json`);
    if (!response.ok) throw new Error(`Unable to load ${selectedLanguage}/${section}.json`);
    return [section, await response.json()];
  }));

  translations[selectedLanguage] = Object.fromEntries(files);
  return selectedLanguage;
}

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : 'en';
  document.documentElement.lang = selectedLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getValue(selectedLanguage, element.dataset.i18n);
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-content]').forEach((element) => {
    const value = getValue(selectedLanguage, element.dataset.i18nContent);
    if (value) element.setAttribute('content', value);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const value = getValue(selectedLanguage, element.dataset.i18nAriaLabel);
    if (value) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-language-option]').forEach((option) => {
    option.classList.toggle('is-active', option.dataset.languageOption === selectedLanguage);
  });
  languageToggle.setAttribute('aria-pressed', String(selectedLanguage === 'es'));
  localStorage.setItem('portfolio-language', selectedLanguage);
}

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

languageToggle.addEventListener('click', async () => {
  const nextLanguage = document.documentElement.lang === 'en' ? 'es' : 'en';
  languageToggle.disabled = true;
  try {
    await loadLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  } catch (error) {
    console.error(error);
  } finally {
    languageToggle.disabled = false;
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:jdruizberlanga@gmail.com?subject=${subject}&body=${body}`;
  document.querySelector('#form-status').textContent = getValue(document.documentElement.lang, 'contact.status');
});

const initialLanguage = localStorage.getItem('portfolio-language') || 'en';
loadLanguage(initialLanguage)
  .then((language) => applyLanguage(language))
  .catch((error) => console.error(error));
