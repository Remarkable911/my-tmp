import Vue from "vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import "./tailwind.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Element);
// 将echarts注册为全局组件
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //全局事件总线
  },
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
