import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/fontawesome/css/all.min.css";
import "@/assets/custom.css";

const app = createApp(App);

app
  .use(router)
  .mount("#app");
