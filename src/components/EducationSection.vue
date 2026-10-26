<script setup>
defineProps({ t: { type: Function, required: true }, education: { type: Array, required: true } });
</script>

<template>
  <section class="split-section education section-shell reveal">
    <div class="section-heading"><p class="eyebrow">{{ t('education.eyebrow') }}</p><h2>{{ t('education.title') }}</h2></div>
    <div class="education-list"><article v-for="item in education" :key="item.key"><p class="date">{{ t(`education.${item.key}.date`) }}</p><h3>{{ t(`education.${item.key}.institution`) }}</h3><p>{{ t(`education.${item.key}.degree`) }}</p></article></div>
    <div class="language-strip"><div><strong>{{ t('education.english') }}</strong><span>{{ t('education.englishLevel') }}</span></div><div><strong>{{ t('education.japanese') }}</strong><span>{{ t('education.japaneseLevel') }}</span></div><div><strong>{{ t('education.spanish') }}</strong><span>{{ t('education.native') }}</span></div></div>
  </section>
</template>
