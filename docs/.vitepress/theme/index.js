import 'narrat/dist/style.css';
import DefaultTheme from 'vitepress/theme';
import FeedbackForm from '../../components/FeedbackForm.vue';

import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('FeedbackForm', FeedbackForm);
  },
};
