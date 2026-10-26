<script setup>
defineProps({ t: { type: Function, required: true }, skills: { type: Array, required: true } });
</script>

<template>
  <section class="split-section section-shell reveal" id="skills">
    <div class="section-heading"><p class="eyebrow">{{ t('skills.eyebrow') }}</p><h2>{{ t('skills.title') }}</h2></div>
    <div class="skill-columns"><div v-for="[key, listKey] in skills" :key="key" class="skill-group"><h3>{{ t(`skills.${key}`) }}</h3><p>{{ t(`skills.${listKey}`) }}</p></div></div>
  </section>
</template>
