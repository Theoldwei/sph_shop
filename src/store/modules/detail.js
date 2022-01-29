import { reqDetailInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid--->生成一个随机字符串（不能在变了）
import { getUUID } from "@/utils/uuid_token";

const state = {
  // 商品详情信息
  detailInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
};

const mutations = {
  /* 
  接收商品详情信息
  */
  RECEIVE_DETAIL_INFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};

const actions = {
  /* 
  获取指定skuid的商品信息的异步action
  */
  async getDetailInfo({ commit }, skuId) {
    const result = await reqDetailInfo(skuId);
    if (result.code === 200) {
      const detailInfo = result.data;
      commit("RECEIVE_DETAIL_INFO", detailInfo);
    }
  },

  //将产品添加到购物车中
  //加入购物车的||修改某一个产品的个数
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      //返回的是成功的标记
      return "ok";
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("faile"));
    }
  },
};

const getters = {
  /* 
  返回三级分类名称数据的对象
  */
  categoryView(state) {
    const categoryView = state.detailInfo.categoryView;
    return categoryView ? categoryView : {};
  },

  /* 
  返回商品sku相关信息对象
  */
  skuInfo(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo ? skuInfo : {};
  },

  /* 
  返回商品的轮播的图片数组
  */
  skuImageList(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo ? skuInfo.skuImageList : [];
  },

  /* 
  返回商品SPU销售属性列表
  */
  spuSaleAttrList(state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList;
    return spuSaleAttrList ? spuSaleAttrList : [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
