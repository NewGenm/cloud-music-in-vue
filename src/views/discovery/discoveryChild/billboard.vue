/* 排行榜板块 */
<template>
  <div class="billboard">
    <div v-show="officialBillboardDetail" class="officialBillboardContaine">
      <div class="title">官方榜</div>
      <div
        class="musicListContaine"
        v-for="(item, index) in officialBillboardDetail"
        :key="item.id"
      >
        <div class="test">
          <!-- 歌单图片 -->
          <recommendListItem
            class="listItem"
            @click.native="pushMusicListPage(item.id)"
            style="cursor: pointer"
          >
            <img :src="item.coverImgUrl" slot="img" />
          </recommendListItem>

          <!-- 歌曲列表 -->
          <div class="musicListItem" slot="music">
            <el-table
              :data="musicListData[index]"
              @cell-click="clickCell"
              @row-dblclick="dbClick"
              highlight-current-row
              stripe
              class="item"
            >
              <el-table-column label="" width="40" type="index">
              </el-table-column>
              <el-table-column prop="al.name" min-width="500">
              </el-table-column>
              <el-table-column prop="ar[0].name" min-width="120" align="right">
              </el-table-column>
            </el-table>
            <div class="more" @click="pushMusicListPage(item.id)">查看更多 ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="globalBillboardContaine" v-show="globalBillboardDetail">
      <div class="title">全球榜</div>
      <div class="musicListContaine">
        <recommendListItem
          v-for="(item, index) in globalBillboardDetail"
          :key="item.id"
          class="listItem"
          @click.native="pushMusicListPage(item.id)"
          style="cursor: pointer"
        >
          <img :src="item.coverImgUrl" slot="img" />
          <span slot="introduction">{{ item.name }}</span>
        </recommendListItem>
      </div>
    </div>
  </div>
</template>

<script>
import recommendListItem from "components/recommendListItem.vue";
export default {
  name: "billboard",
  components: {
    recommendListItem,
  },
  data() {
    return {
      // 官方榜
      officialBillboardDetail: null,
      // 全球榜
      globalBillboardDetail: null,
      // 官方榜的歌曲
      musicListData: [],
      // 当前播放的歌单
      index: null,
    };
  },
  methods: {
    // 获取排行榜单
    async getBillboardDetail() {
      let result = await this.$request("/toplist/detail");
      let res = result.data.list;
      this.officialBillboardDetail = res.slice(0, 4);
      this.globalBillboardDetail = res.splice(4, res.length);

      this.getmMsicListData();
    },
    // 获取全球榜数据
    async getmMsicListData() {
      for (const i of this.officialBillboardDetail) {
        let result = await this.$request("/playlist/detail", {
          id: i.id,
        });
        let res = result.data.playlist.tracks;
        this.musicListData.push(res.slice(0, 5));
      }
      // console.log(this.musicListData)
    },
    pushMusicListPage(id) {
      this.$router.push({
        name: "musicListPage",
        params: { id },
      });
    },
    // 单击单元格
    clickCell(row) {
      console.log(row);
      // if(this.index !== index) {
      //   this.index = index

      //   this.$store.commit('addMusciIds')
      // }
    },

    //   this.musicListId.push({
    // index: index,
    // id: trackIds[index].id,
    // name: tracks[index].name,
    // singer: tracks[index].ar[0].name,
    // pigUrl: tracks[index].al.picUrl,
    // 双击单元格，播放歌曲
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
  },
  created() {
    this.getBillboardDetail();
    // this.getmMsicListData()
  },
};
</script>
<style lang='less'>
.billboard {
  width: 1200px;
  margin: 0 auto;
}
.officialBillboardContaine {
  margin-top: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: #666;
}
.musicListContaine {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // margin-top: 50px;
  .listItem {
    width: 210px;
    height: 250px;
    margin-right: 30px;
    margin: 40px 30px 20px 0;

    display: flex;
    flex-direction: column;
    img {
      width: 100%;
      border-radius: 15px;
    }
    span {
      width: 100%;
      margin-top: 10px;
    }
  }

  .test {
    width: 100%;
    display: flex;

    .musicListItem {
      width: 100%;

      .more{
        margin: 5px 0 0 5px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
      }
    }
  }
}
</style>