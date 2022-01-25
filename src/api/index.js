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
