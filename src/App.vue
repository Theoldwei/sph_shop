<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },

  mounted() {
    // 三级分类请求统一在这里发送，避免在home和search中都发送，影响性能
    this.$store.dispatch("getBaseCategoryList");
  },
};
</script>

<style lang="less" scoped></style>
