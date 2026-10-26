<script setup>
defineProps({
  t: { type: Function, required: true },
  projects: { type: Array, required: true }
});
</script>

<template>
  <section class="projects content-section section-shell reveal" id="projects">
    <div class="section-heading"><p class="eyebrow">{{ t('projects.eyebrow') }}</p><h2>{{ t('projects.title') }}</h2></div>
    <div class="project-grid">
      <article v-for="project in projects" :key="project.key" class="project-card">
        <div class="project-card-top"><span class="project-number">{{ t(`projects.${project.key}.number`) }}</span><span class="project-type">{{ t(`projects.${project.key}.type`) }}</span></div>
        <h3>{{ t(`projects.${project.key}.title`) }}</h3>
        <p>{{ t(`projects.${project.key}.description`) }}</p>
        <div class="tags"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div>
        <a class="project-link" :href="`https://github.com/dirb997/${project.repo}`" target="_blank" rel="noreferrer">{{ t('projects.viewCode') }} <span aria-hidden="true">↗</span></a>
      </article>
    </div>
  </section>
</template>
