import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import typeNav from "@/components/TypeNav";
import Carsousel from "@/components/Carsousel";
import Pagination from "./components/Pagination";

//全局组件：第一个参数 组件名字  第二个参数：那个组件
Vue.component(typeNav.name, typeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component("Pagination", Pagination);

//引入MockServe.js----mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";
//统一接口api文件夹里面全部请求函数
import * as API from "@/api";
// 加载element-ui需要的组件
import "./elements";

Vue.config.productionTip = false;

new Vue({
  router,
  store, // 注册vuex的store对象  ==> 所有组件对象都有一个$store属性
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: (h) => h(App),
}).$mount("#app");
