<template>
  <div class="pagination">
    <!-- 当前页码等于1就不可操作 -->
    <button :disabled="mcPage === 1" @click="changeCurrentPage(mcPage - 1)">
      上一页
    </button>
    <!-- 只有start大于1 -->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!-- 只有start大于2 -->
    <button disabled v-if="startEnd.start > 2">···</button>

    <!-- 连续页码 -->
    <span v-for="item in startEnd.end" :key="item">
      <button
        v-if="item >= startEnd.start"
        @click="changeCurrentPage(item)"
        :class="{ active: mcPage === item }"
      >
        {{ item }}
      </button>
    </span>

    <!-- 只有end<totalPages-1才显示  -->
    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <!-- 只有end<totalPages才显示 -->
    <button
      v-if="startEnd.end < totalPages"
      @click="changeCurrentPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <!-- 当前页码等于总页码就不可操作 -->
    <button
      :disabled="mcPage === totalPages"
      @click="changeCurrentPage(mcPage + 1)"
    >
      下一页
    </button>
    <!-- 总记录数 -->
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    currentPage: {
      // 当前页码
      type: Number,
      default: 1,
    },
    pageSize: {
      // 每页数量
      type: Number,
      default: 5,
    },
    total: {
      // 总数量
      type: Number,
      default: 0,
    },
    showPageNo: {
      // 连续页码数
      type: Number,
      default: 5,
    },
  },

  //只会在页面第一次挂载时调用一次
  data() {
    return {
      mcPage: this.currentPage, // 保存自己的当前页码
    };
  },

  computed: {
    // 计算出总页码数
    totalPages() {
      // 解构出依赖数据
      const { total, pageSize } = this;
      // 返回计算后的结果
      return Math.ceil(total / pageSize);
    },
    // 计算出开始页和结束页
    startEnd() {
      // 解构出需要的值，这里的showPageNo连续页一般设为奇数（因为这样可以对称）
      const { mcPage, showPageNo, totalPages } = this;

      // 计算出开始页，以当前页开始计算（以达成对称的目的）
      let start = mcPage - Math.floor(showPageNo / 2);
      if (start < 1) {
        start = 1;
      }

      // 计算出结束页，在开始页的基础上计算
      let end = start + showPageNo - 1;
      // 如果end超过了totalPages, 修正为totalPages
      if (end > totalPages) {
        end = totalPages;
        // 根据最大连续页码修正start
        start = end - showPageNo + 1;
        // start不能小于最小值1
        if (start < 1) {
          start = 1;
        }
      }

      return { start, end };
    },
  },

  watch: {
    // 当接收的currentPage发生改变时，重新给data中的mcPage数据赋值
    currentPage(value) {
      // 将当前页码指定为外部传入的值
      this.mcPage = value;
    },
  },

  methods: {
    // 将当前页码改为指定页码
    changeCurrentPage(page) {
      // 修改当前页码
      this.mcPage = page;
      // 通知外部父组件
      this.$emit("currentChange", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
