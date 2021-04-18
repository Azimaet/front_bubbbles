import { createApp } from "vue";
import App from "./App.vue";
import store from "./store.js";
import "./assets/css/reset.css";
import "./assets/css/colors.css";

createApp(App)
  .use(store)
  .mount("#app");
