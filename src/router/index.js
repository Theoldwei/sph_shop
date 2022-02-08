import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

//重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  mode: "history", // 没有#的模式
  routes,
  // 滚动行为,解决页面跳转后滚动条位置不变的情况
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

//设置全局导航前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //1、有token代表登录，全部页面放行
  if (token) {
    //1.1登陆了，不允许前往登录页
    if (to.path === "/login") {
      next("/home");
    } else {
      //1.2、因为store中的token是通过localStorage获取的，token有存放在本地
      // 当页面刷新时，token不会消失，但是store中的其他数据会清空，
      // 所以不仅要判断token,还要判断用户信息

      //1.2.1、判断仓库中是否有用户信息，有放行，没有派发actions获取信息
      if (name) {
        next();
      } else {
        //1.2.2、如果没有用户信息，则派发actions获取用户信息
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //1.2.3、获取用户信息失败，原因：token过期
          //清除前后端token，跳转到登陆页面
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next("/login?redirect=" + toPath);
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
});

export default router;
