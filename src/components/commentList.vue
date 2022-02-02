/* 评论列表 */
<template>
  <div class="commentList">
    <div style="font-weight: bold">全部评论（{{totalComments}}）</div>
    <div
      v-show="$store.state.musicId || $route.params.id"
      v-for="(i, index) in comments"
      :key="i.id"
      class="listItem"
    >
      <div class="left">
        <img :src="i.avatarUrl" />
      </div>
      <div class="right">
        <div>
          <span class="nickname">{{ i.nickname }}:&nbsp</span>
          <span>{{ i.content }}</span>
        </div>
        <div v-show="i.respondent" class="respondent">
          <span class="nickname">@{{ i.respondent }}:&nbsp</span>
          <span>{{ i.replied }}</span>
        </div>
        <div class="time">{{ i.time | time }}</div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="totalComments"
      @current-change="changeCurrentPage"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>
  
<script>
import { formatDate } from "plugin/utils.js";
export default {
  name: "commentList",
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    totalComments: {
      type: Number,
      default() {
        return 1;
      },
    },
    module: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    changeCurrentPage(value) {
      console.log(value)
      this.$bus.$emit(`changeCurrentPage${this.module}`, value)
    }
  },
  filters: {
    time(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>
<style lang='less'>
// 评论
.commentList {
  width: 100%;
  // margin-left: 30%;
  position: absolute;
  // left: 30%;
  // top: 70%;

  .listItem {
    display: flex;
    // justify-content: center;
    align-items: center;
    // height: 78px;
    // margin: 20px 0;
    padding: 19px 0;
    border-bottom: 1px #B0C4DE solid;

    .left {
      margin-right: 10px;
    }
    .right {
      font-size: 14px;
      width: calc(100% - 40px);
      .nickname {
        color: #85b9e6;
      }
      .time {
        margin-top: 10px;
      }
      .respondent {
        width: 100%;
        padding: 5px 0 5px 5px;
        margin-top: 10px;
        background-color: #f4f4f4;
      }
    }
  }
  img {
    width: 40px;
    border-radius: 50%;
  }
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
}
</style>