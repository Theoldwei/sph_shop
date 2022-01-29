/* 
包含所有接口请求函数的模块
*/
import ajax from "./ajax";
import mockAjax from "./ajaxMock";

//获取商品的三级分类列表
export const reqBaseCategoryList = () =>
  ajax.get("/product/getBaseCategoryList");

// 获取广告轮播列表
export const reqBanners = () => mockAjax.get("/banners");

// 获取首页楼层列表
export const reqFloors = () => mockAjax.get("/floors");

// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) =>
  ajax.post("/list", searchParams);

// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`);

// 添加到购物车(修改购物项数量)
// skuNum指定为改变的数量, 如果是减少就是负数
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);
// 获取购物车数据列表
export const reqCartList = () => ajax.get("/cart/cartList");
// 指定购物项的选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  ajax.get(`/cart/checkCart/${skuId}/${isChecked}`);
// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);
