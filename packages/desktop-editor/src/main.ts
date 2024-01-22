import "narrat/dist/style.css";
import { createApp, markRaw } from "vue";
import "virtual:windi.css";
import "./style.css";
import "./monaco/setup-monaco";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import IDEPage from "@/pages/IDEPage.vue";
import { setupEvents } from "./events/tauri-events";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdKeyboardarrowright,
  MdKeyboardarrowdown,
  OiDotFill,
} from "oh-vue-icons/icons";

const routes = [
  { path: "/", component: HomePage },
  { path: "/ide", component: IDEPage },
];

const pinia = createPinia();

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.component("v-icon", OhVueIcon);
addIcons(MdKeyboardarrowright, MdKeyboardarrowdown, OiDotFill);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.mount("#app");
setupEvents();
