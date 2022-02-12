import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
/* 
所有静态路由配置的数组
*/
export default [
  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    component: Home,
  },

  {
    name: "search",
    path: "/search/:keyword?", // params参数可传可不传
    component: Search,
  },

  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
  },

  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    beforeEnter(to, from, next) {
      // 得到要跳转到目路由的query参数
      const skuNum = to.query.skuNum;
      // 读取保存的数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem("SKUINFO"));
      // 只有都存在, 才放行
      if (skuNum && skuInfo) {
        next();
      } else {
        // 在组件对象创建前强制跳转到首页
        next("/");
      }
    },
  },

  {
    path: "/shopcart",
    component: ShopCart,
  },

  {
    path: "/register",
    component: Register,
    meta: {
      // 需要隐藏footer的路由添加此配置
      isHideFooter: true,
    },
  },

  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
  },

  {
    path: "/trade",
    component: Trade,
    // 路由独享的守卫
    beforeEnter: (to, from, next) => {
      if (from.path !== "/shopcart") {
        next({ path: "/shopcart" });
      } else {
        next();
      }
    },
  },

  {
    path: "/pay",
    component: Pay,
    // 路由独享的守卫
    beforeEnter: (to, from, next) => {
      if (from.path !== "/trade") {
        next({ path: "/trade" });
      } else {
        next();
      }
    },
  },

  {
    path: "/paysuccess",
    component: PaySuccess,
  },

  {
    path: "/center",
    component: Center,
    // 二级路由
    children: [
      {
        // path: '/center/myorder',
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      // 子路由重定项·
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
];
