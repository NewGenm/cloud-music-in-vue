<template>
  <div class="searchSong">
    <!-- 歌曲内容 -->
    <template v-if="$store.state.searchResult !== null">
      <div class="musicListContaine">
        <el-table
          :data="$store.state.searchResult.songs"
          @cell-click="clickCell"
          @row-dblclick="dbClick"
          highlight-current-row
          stripe
          style="width: 100%"
        >
          <el-table-column label="" width="40" type="index"> </el-table-column>
          <el-table-column label="" width="40">
            <!-- 下载按钮 -->
            <i class="el-icon-addxiazai"></i>
          </el-table-column>
          <el-table-column prop="name" label="音乐标题" min-width="350">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" min-width="120">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" min-width="170">
          </el-table-column>
          <el-table-column prop="time" label="时长" min-width="100">
          </el-table-column>
        </el-table>
      </div>
    </template>
  </div>
</template>

<script>
import { handleMusicTime } from 'plugin/utils.js';
export default {
  name: "searchSong",
  data() {
    return {};
  },
  methods: {
    // 单击单元格
    clickCell(row) {
      console.log(row);
    },
    dbClick(row) {
      // 收集单曲数据
      let singleDate = {
        id: row.id,
        name: row.al.name,
        pigUrl: row.al.picUrl,
        singer: row.ar[0].name,
      };
      // 提供单曲数据
      this.$store.commit("addSingleDate", singleDate);
      // 清空歌单的数据
      this.$store.commit("addMusciIds", null);
      console.log(singleDate);
      // this.$bus.$emit("music", {id: row.id, index: row.index});
      // 向vuex提供当前播放歌曲的序号好id
      this.$store.commit("addInfo", { id: row.id });
      this.$bus.$emit("music");
    },
    async addMusic() {
      // 搜索
      let res = await this.$request("/cloudsearch", {
        keywords: this.$route.params.id,
      });
      console.log(res.data.result);
      for (const i of res.data.result.songs) {
        i.time = handleMusicTime(i.dt);
      }
      this.$store.commit("addSearchResult", res.data.result);
    },
  },
  created() {
    this.addMusic();
  },
};
</script>
<style lang='less'>
.searchSong {
  height: 81vh;
  overflow-x: hidden;
  padding: 0 40px;
  .musicListContaine {
    height: calc(100% - 189px);
    // margin: 0 40px;
    .el-tabs__item.is-active {
      color: #303133;
      font-weight: bold;
      font-size: 18px;
    }
    .el-tabs__active-bar {
      background-color: #e53f3f;
    }
  }
}
</style>