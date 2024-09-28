import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus';
import { createPinia } from "pinia";
import persist from 'pinia-plugin-persistedstate'
export function createApp() {
  const pinia = createPinia();
  pinia.use(persist);
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(pinia);
  return {
    app,
  };
}
