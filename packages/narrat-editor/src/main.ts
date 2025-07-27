import 'narrat/dist/main.css';
import { createApp } from 'vue';
import 'virtual:windi.css';
import './style.css';
import './monaco/setup-monaco';
import { createPinia } from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
