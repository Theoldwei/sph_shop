/* 
vuex管理的home模块
*/
import { reqBaseCategoryList, reqBanners, reqFloors } from "@/api";

const state = {
  baseCategoryList: [], // 所有分类的数组
  banners: [], // 广告位轮播数据的数组
  floors: [], // 所有楼层数据的数组
};

const mutations = {
  /* 接收保存分类列表 */
  RECEIVE_BASE_CATEGORY_LIST(state, list) {
    // 后台数据返回过多，截取掉两个
    state.baseCategoryList = list.slice(0, list.length - 2);
  },

  /* 接收广告轮播列表 */
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners;
  },

  /* 接收楼层列表 */
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors;
  },
};

const actions = {
  // 异步获取商品三级分类列表
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit("RECEIVE_BASE_CATEGORY_LIST", result.data);
    }
  },

  //异步获取广告位轮播数据
  async getBannerList({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit("RECEIVE_BANNERS", result.data);
    }
  },

  //异步获取所有楼层数据
  async getFloorList({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit("RECEIVE_FLOORS", result.data);
    }
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
