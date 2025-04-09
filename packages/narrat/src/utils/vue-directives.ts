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

  vue.directive('selected', {
    mounted(el, binding) {
      if (binding.value) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    },
    updated(el, binding) {
      if (binding.value) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    },
  });
}
