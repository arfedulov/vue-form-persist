import Vue from "vue";
import ExampleApp from "./ExampleApp.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(ExampleApp)
}).$mount("#app");
