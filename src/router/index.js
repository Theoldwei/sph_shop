import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history", // 没有#的模式
  routes,
  // 滚动行为,解决页面跳转后滚动条位置不变的情况
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

export default router;
