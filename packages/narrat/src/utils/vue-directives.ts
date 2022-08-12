import { App } from 'vue';

export function addDirectives(vue: App) {
  // Create a vue directive to control element visibility
  vue.directive('visible', {
    mounted(el, binding) {
      if (binding.value) {
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'hidden';
      }
    },
    updated(el, binding) {
      if (binding.value) {
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'hidden';
      }
    },
  });
}
