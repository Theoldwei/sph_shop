/* 
收集所有vuex管理的模块
*/
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopCart from "./shopCart";
// 向外暴露包含所有vuex管理的模块的对象
export default {
  home,
  search,
  detail,
  shopCart,
};
