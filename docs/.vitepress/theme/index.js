import 'narrat/dist/style.css';
import DefaultTheme from 'vitepress/theme';
import FeedbackForm from '../../components/FeedbackForm.vue';

import './custom.css';

// Using ES6 import syntax
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import narrat from '../../utils/narrat-hljs';

import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github-dark.css';

// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('narrat', narrat);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('FeedbackForm', FeedbackForm);
  },
};
