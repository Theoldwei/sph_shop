<template>
  <div class="type-nav">
    <div class="container">
      <!-- 控制一级列表的显示与隐藏（home一直显示，search默认隐藏，鼠标经过显示） -->
      <div @mouseenter="isShow = true" @mouseleave="hideCategorys">
        <h2 class="all">全部商品分类</h2>
        <!-- 判断是否显示一级分类 -->
        <div class="sort" v-show="isShow">
          <!-- 利用事件委托，将被本该加在a标签上的事件委托在父类上面，目的: 减少事件的绑定，提高性能 -->
          <div class="all-sort-list2" @click="toSearch">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(c1, index) in baseCategoryList"
              :key="c1.categoryId"
            >
              <h3
                :class="{ cur: index === currentIndex }"
                @mouseenter="showCategorys(index)"
              >
                <!-- 通过该方式会影响性能，应为router-link是组件 需要vue渲染，在for循环里面尽量不要用 -->
                <!-- <router-link :to="{path: '/search', query:{categoryName: c1.categoryName}}">{{c1.categoryName}}</router-link> -->
                <!-- 在a标签里面设置自定义属性用于区分是几级分类 -->
                <a
                  href="javascript:"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div class="subitem">
                  <!-- 二级分类 -->
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <!-- <router-link :to="{path: '/search', query:{categoryName: c2.categoryName}}">{{c2.categoryName}}</router-link> -->
                      <a
                        href="javascript:"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>

                    <dd>
                      <!-- 三级分类 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <router-link :to="{path: '/search', query:{categoryName: c3.categoryName}}">{{c3.categoryName}}</router-link> -->
                        <a
                          href="javascript:"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="javascript:;">服装城</a>
        <a href="javascript:;">美妆馆</a>
        <a href="javascript:;">尚品汇超市</a>
        <a href="javascript:;">全球购</a>
        <a href="javascript:;">闪购</a>
        <a href="javascript:;">团购</a>
        <a href="javascript:;">有趣</a>
        <a href="javascript:;">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'
// 引入节流函数（按需引入）
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",

  data() {
    return {
      currentIndex: -1, // 当前一级分类的下标(基2/3级分类需要显示)
      isShow: false, // 是否显示一级列表
    };
  },

  mounted() {
    // 如果请求的路径是根路径则显示一级分类列表(在home中显示，在其他页面中默认隐藏)
    this.isShow = this.$route.path === "/home";
    // 异步获取所有分类列表数据，将该请求放在App根组件里，减少请求次数（home和search都会发该请求）
    // this.$store.dispatch("getBaseCategoryList");
  },

  computed: {
    // 从vuex管理的state中读取数据到当前组件
    ...mapState({
      // 读取home模块的所有分类数组
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },

  methods: {
    /* 显示当前分类的下级分类列表 (使用lodash做节流处理) */
    showCategorys: throttle(function (index) {
      this.currentIndex = index;
    }, 10), // 间隔时间为10ms

    /* 隐藏显示的2/3级分类列表 */
    hideCategorys() {
      this.currentIndex = -1;
      // 如果当前不是是home就隐藏一级分类列表（用于Search页面）
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },

    toSearch(event) {
      // 得到事件源标签上的自定义属性
      const { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果有分类名称, 说明点击的是某个分类项
      if (categoryname) {
        // 准备query参数
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 跳转到搜索路由, 携带准备的query参数
        // this.$router.push({ path: "/search", query });

        // 结合query参数和params参数一起使用
        let location = { name: "search" };
        location.query = query;
        // 这里空对象和空数组都是true，所以用里面是否有数据来判断
        if (this.$route.params.keyword) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &.cur {
              background: skyblue;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
