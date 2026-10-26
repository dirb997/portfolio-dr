<script setup>
defineProps({
  t: { type: Function, required: true },
  experiences: { type: Array, required: true },
  experienceItems: { type: Function, required: true }
});
</script>

<template>
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
</template>
