<script setup>
defineProps({ t: { type: Function, required: true } });
</script>

<template>
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
      <span class="note-index">01 / 05</span>
    </aside>
  </section>

  <section class="facts section-shell reveal" :aria-label="t('facts.label')">
    <div><strong>4+</strong><span>{{ t('facts.years') }}</span></div>
    <div><strong>4</strong><span>{{ t('facts.roles') }}</span></div>
    <div><strong>3</strong><span>{{ t('facts.languages') }}</span></div>
    <div><strong>∞</strong><span>{{ t('facts.curiosity') }}</span></div>
  </section>
</template>
