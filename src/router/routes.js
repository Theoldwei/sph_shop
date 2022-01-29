import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
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
];
