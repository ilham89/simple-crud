import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { VueQueryPlugin } from "vue-query";
import router from "./router";

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        staleTime: 100000,
      },
    },
  },
};

createApp(App)
  .use(router)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(ElementPlus)
  .mount("#app");
