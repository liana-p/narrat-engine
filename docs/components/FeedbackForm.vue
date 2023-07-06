<template>
  <div class="feedback-container">
    <h2>Feedback</h2>
    <h3>
      Want to improve this page? You can
      <a
        :href="`https://github.com/liana-p/narrat-engine/edit/main/docs/${slug}.md`"
        >edit it yourself!</a
      >
    </h3>
    <h3>Want to send feedback about this documentation? Fill this form!</h3>
    <form
      class="feedback-form"
      action="https://formspree.io/f/mvojogkz"
      method="POST"
    >
      <div class="feedback-element">
        <label name="title" for="title" class="feedback-label"
          >Feedback title
        </label>
        <input
          required
          type="text"
          name="title"
          :value="`Feedback about page: ${title} (${slug}.md)`"
          class="feedback-input"
        />
      </div>
      <div class="feedback-element">
        <label name="feedback" for="feedback">Your feedback </label>
        <textarea
          name="feedback"
          required
          class="feedback-input"
          placeholder="Write your feedback here"
        ></textarea>
      </div>
      <div class="feedback-element">
        <label name="email" for="email" class="feedback-label"
          >Your email (optional) if you want a response
        </label>
        <input
          type="email"
          name="email"
          class="feedback-input"
          placeholder="me@email.com"
        />
      </div>
      <div class="feedback-element">
        <button class="feedback-button" type="submit">Send</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: String,
  slug: String,
});
</script>

<style>
.feedback-container {
}
.feedback-form {
  font-size: 1.2rem;
}
.feedback-element {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.feedback-label {
}
.feedback-input {
  border: 2px solid cyan;
  padding: 5px;
  border-radius: 10px;
}
.feedback-button {
  font-size: 1.2rem;
  background-color: var(--vp-c-brand-dark);
  padding: 10px;
  border-radius: 10px;
}
</style>
