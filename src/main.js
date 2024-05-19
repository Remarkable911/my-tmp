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
Vue.prototype.$trimInput = function (event) {
    // 确保 event.target 存在并且是一个 DOM 元素
    if (!event.target ) {
      return;
    }
  // 获取输入框的值并去除首尾空格
  const value = event.target.value.trim();
  // 查找与输入框绑定的 Vue 实例
  const vm = this;
  const model = event.target.getAttribute("v-model");

  // 通过 v-model 更新 Vue 实例中的数据
  if (model && vm.hasOwnProperty(model)) {
    vm[model] = value;
  }

  // 手动触发 input 事件，以确保 v-model 同步
  event.target.value = value;
  event.target.dispatchEvent(new Event("input"));
};

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
