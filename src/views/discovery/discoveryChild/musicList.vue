/* 歌单板块 */
<template>
  <div class="musicList">
    <template v-if="first !== null">
      <div class="highqualityEntry">
        <img :src="first.coverImgUrl"  class="backgroundImg" />
        <div class="cover">
          <img :src="first.coverImgUrl"  />
        </div>
        <div class="EntryInfo">
          <div class="tag"><i class="el-icon-adddianzan"></i> 精品歌单</div>
          <div class="name">{{ first.name }}</div>
          <div class="desc">{{ first.copywriter }}</div>
        </div>
      </div>
    </template>

    <div class="navbar">
      <div class="left">
        <el-popover
          placement="right"
          width="400"
          trigger="click"
          ref="popverRef"
        >
          <el-button slot="reference" round
            >{{ activeTag }}
            <i class="el-icon-arrow-right"></i>
          </el-button>
          <div class="tagList">
            <el-row class="windowsButton">
              <el-button
                round
                v-for="(item, index) in tagList"
                :key="index"
                @click="changeTag(item.name)"
                >{{ item.name }}</el-button
              >
            </el-row>
          </div>
        </el-popover>
      </div>
      <div class="right">
        <el-row>
          <el-button round @click="changeTag('华语')" v-focus>华语</el-button>
          <el-button round @click="changeTag('粤语')">粤语</el-button>
          <el-button round @click="changeTag('欧美')">欧美</el-button>
          <el-button round @click="changeTag('日语')">日语</el-button>
          <el-button round @click="changeTag('流行')">流行</el-button>
          <el-button round @click="changeTag('ACG')">ACG</el-button>
        </el-row>
      </div>
    </div>
    <div class="musicListContaine">
      <recommendListItem
        v-for="(item, index) in musicList"
        :key="item.id"
        class="listItem"
        @click.native="pushMusicListPage(item.id)"
        style="cursor: pointer"
      >
        <img :src="item.coverImgUrl || defaultImg" slot="img" />
        <span slot="introduction">{{ item.name }}</span>
      </recommendListItem>
    </div>
  </div>
</template>

<script>
import defaultImg from "assets/img/imgLoading.png";
import recommendListItem from "components/recommendListItem.vue";
export default {
  name: "musicList",
  components: {
    recommendListItem,
  },
  data() {
    return {
      // 默认歌单图片
      defaultImg,
      // 歌单列表
      musicList: [],
      // Tags列表
      tagList: [],
      // 被选中的tag，默认华语
      activeTag: "华语",
      first: null,
    };
  },
  methods: {
    // 获得精品歌单
    async getHqPlaylist() {
      let result = await this.$request("/top/playlist/highquality", {
        limit: 20,
        cat: " 华语 ",
      });
      // console.log(result);
      this.musicList = result.data.playlists;
      // console.log(this.musicList);
    },
    // 获取歌单tag
    async getPlaylistTags() {
      let result = await this.$request("/playlist/highquality/tags", {});
      // console.log(result);
      this.tagList = result.data.tags;
      // console.log(this.tagList);

      let res = await this.$request("/top/playlist/highquality", {
        limit: 1,
      });
      //   console.log(result);
      this.first = res.data.playlists[0];
    },
    // 点击推荐歌单跳转
    pushMusicListPage(id) {
      this.$router.push({
        name: "musicListPage",
        params: { id },
      });
    },
    // 点击切换歌单类型
    async changeTag(tag) {
      this.closeWindow();
      this.activeTag = tag;
      let result = await this.$request("/top/playlist/highquality", {
        limit: 20,
        cat: tag,
      });
      this.musicList = result.data.playlists;
      // console.log(this.musicList);
    },
    // 关闭弹窗
    closeWindow() {
      this.$refs.popverRef.doClose();
    },
  },
  mounted() {
    this.getHqPlaylist();
    this.getPlaylistTags();
  },
  // 自定义指令，默认选中
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>
<style lang='less'>
.musicList {
  width: 1200px;
  margin: 0 auto;
}
.highqualityEntry {
  position: relative;
  width: 98%;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  .backgroundImg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-80px);
    filter: blur(30px) brightness(70%);
  }

  .cover {
    width: 140px;
    height: 140px;
    margin: 10px;
  }

  .cover img {
    border-radius: 10px;
    width: 100%;
  }

  .tag {
    color: #d59e54;
    border: 1px solid #d59e54;
    padding: 5px 10px;
    width: 88px;
    font-size: 16px;
    margin: 20px 10px 15px;
    border-radius: 15px;
  }

  .tag i {
    font-size: 14px;
  }

  .name {
    color: white;
    font-size: 16px;
    margin: 10px 0;
  }

  .desc {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    transform: scale(0.9, 0.9);
  }
}
.navbar {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-button {
    font-size: 14px;
    border: none;
  }
  .el-button.is-round {
    padding: 8px 10px;
  }
  .el-button:focus,
  .el-button:hover {
    background: #fdf5f5;
    color: #ec4747;
  }
}
.windowsButton {
  // width: 420px;
  display: flex;
  flex-wrap: wrap;
  .el-button {
    font-size: 14px;
    border: none;
    margin: 0;
  }
  .el-button.is-round {
    padding: 8px 10px;
  }
  .el-button:focus,
  .el-button:hover {
    background: #fdf5f5;
    color: #ec4747;
  }
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
    margin: 20px 30px 20px 0;

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
}
</style>