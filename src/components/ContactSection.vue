<script setup>
defineProps({
  t: { type: Function, required: true },
  formStatus: { type: String, required: true },
  isSubmitting: { type: Boolean, required: true }
});

defineEmits(['submit']);
</script>

<template>
  <section class="contact section-shell reveal" id="contact">
    <div class="contact-copy"><p class="eyebrow">{{ t('contact.eyebrow') }}</p><h2>{{ t('contact.title') }}</h2><p>{{ t('contact.description') }}</p></div>
    <div class="contact-details"><a href="mailto:jdruizberlanga@gmail.com">jdruizberlanga@gmail.com <span>↗</span></a><a href="tel:+34664258720">+34 664 258 720 <span>↗</span></a><p>Valencia, Spain</p></div>
    <form class="contact-form" @submit.prevent="$emit('submit', $event)"><label for="name">{{ t('contact.name') }}</label><input id="name" name="name" type="text" autocomplete="name" required><label for="email">{{ t('contact.email') }}</label><input id="email" name="email" type="email" autocomplete="email" required><label for="message">{{ t('contact.message') }}</label><textarea id="message" name="message" rows="4" required></textarea><button class="button button-primary" type="submit" :disabled="isSubmitting">{{ isSubmitting ? t('contact.sending') : t('contact.send') }} <span aria-hidden="true">↗</span></button><p class="form-status" role="status" aria-live="polite">{{ formStatus }}</p></form>
  </section>
</template>
