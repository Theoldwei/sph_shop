/* 
利用mockjs来mock数据接口
*/
import Mock from "mockjs";
// json数据可以直接引入使用，不需要它暴露
import banners from "./banners.json";
import floors from "./floors.json";

// 提供广告位轮播数据的接口
Mock.mock("/mock/banners", {
  code: 200,
  data: banners,
});

// 提供所有楼层数据的接口
Mock.mock("/mock/floors", {
  code: 200,
  data: floors,
});
