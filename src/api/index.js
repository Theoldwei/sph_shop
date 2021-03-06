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

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) =>
  ajax({ url: `/user/passport/sendCode/${phone}`, method: "get" });

//注册
//url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (data) =>
  ajax({ url: "/user/passport/register", data, method: "post" });

//登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) =>
  ajax({ url: "/user/passport/login", data, method: "post" });

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () =>
  ajax({ url: "/user/passport/auth/getUserInfo", method: "get" });

//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = () =>
  ajax({ url: "/user/passport/logout", method: "get" });

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () =>
  ajax({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () =>
  ajax({ url: "/order/auth/trade", method: "get" });

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) =>
  ajax({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) =>
  ajax({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>
  ajax({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  ajax({ url: `/order/auth/${page}/${limit}`, method: "get" });
