<template>
  <!-- 将Home页组件化 -->
  <div>
    <!-- 全局的三级分类导航: 向后台服务器发送了分类请求 -->
    <typeNav />
    <!-- 包含轮播列表的容器：内部向mock发送了获取轮播图的请求 -->
    <ListContainer />
    <!-- 今日推荐：静态组件 -->
    <Recommend />
    <!-- 排行：静态组件 -->
    <Rank />
    <!-- 猜你喜欢：静态组件 -->
    <Like />
    <!-- 楼层组件：自己在组件内部是没有发请求的，数据是父组件发送mock请求后传递的（因为要使用for循环决定楼层数） -->
    <Floor v-for="floor in floors" :key="floor.id" :list="floor" />
    <!-- 品牌：静态组件 -->
    <Brand />
  </div>
</template>

<script>
//非路由组件在使用的时候分为三大步：定义、注册、使用
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Brand from "./Brand";
import Floor from "./Floor";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor,
  },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
};
</script>

<style scoped></style>
