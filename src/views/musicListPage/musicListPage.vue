/* 单独歌单页面 */
<template>
  <div class="musicListPage">
    <!-- 歌曲信息 -->
    <div class="listInfo">
      <!-- 歌单图片 -->
      <div class="cover">
        <img :src="musicListData.coverImgUrl" />
      </div>
      <!-- 歌单右侧信息 -->
      <div class="listInfoRight">
        <!-- 歌单标题 -->
        <div class="title">
          <!-- 歌单tag信息 -->
          <div class="titleTag">歌单</div>
          <!-- 歌单标题内容 -->
          <div class="titleContent">{{ musicListData.name }}</div>
        </div>
        <!-- 创建者信息 -->
        <div class="creatorInfo">
          <div class="creatorImg">
            <!-- 使用template包含img，因为avatarUrl这个图片在挂载时没有请求到，
            会报错，使用v-if判断一下，有之后在挂载 -->
            <template v-if="musicListData.creator"> 
              <img :src="musicListData.creator.avatarUrl" />
            </template>
          </div>
          <template v-if="musicListData.creator"> 
            <!-- 昵称 -->
            <div class="nickName">{{ musicListData.creator.nickname}}</div>
          </template>
          <!-- 创建日期 -->
          <div>{{ musicListData.createTime | time }}</div>
        </div>
        <!-- 一些的按钮 -->
        <el-row>
          <el-button type="danger" icon="el-icon-add24gl-play" class="playAll" round @click="playAll">播放全部</el-button>
          <el-button icon="el-icon-addaixin" round>收藏</el-button>
          <el-button icon="el-icon-add31zhuanfa" round>分享</el-button>
        </el-row>
        <!-- 其他信息 -->
        <div class="otherInfo">
          <!-- tag标签 -->
          <div class="Tags">
            标签： <span v-for="(item, index) in musicListData.tags" :key="index">{{ item }}</span>
          </div>
          <!-- 歌曲量和播放数 -->
          <div class="others">
            歌曲：<span>{{ musicListData.trackCount }}</span>
            播放：<span>{{ musicListData.playCount | handleNumber }}</span>
          </div>
          <!-- 介绍 -->
          <div class="introduction">
            简介：
            <span>{{ musicListData.description ?  musicListData.description : '暂无' }}</span>
           
          </div>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="musicList">
      <!-- 导航 -->
     <el-tabs v-model="activeName" @tab-click="handleClick">
       <!-- 歌曲内容 -->
      <el-tab-pane label="歌曲" name="first">
        <el-table
          :data="musicListData.tracks"
          @cell-click = 'clickCell'
          @row-dblclick = 'dbClick'
          highlight-current-row
          stripe
          style="width: 100%;">
          <el-table-column
            label=""
            width="40"
            type="index"
          >
          </el-table-column>
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
      </el-tab-pane>
      <!-- 评论内容 -->
      <el-tab-pane label="评论" name="second">
        <commentList class="commentList" :comments="comments" :totalComments='totalComments' :module='2'></commentList> 
      </el-tab-pane>
      <!-- 收藏者 -->
      <!-- <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane> -->
    </el-tabs>

      <!--  -->
    </div>
  </div>
  </div>
</template>

<script>
import { formatDate, handleNumber, handleMusicTime } from "plugin/utils.js";
import commentList from "components/commentList.vue";
// import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: "musicListPage",
  components: {
    commentList,
  },
  data() {
    return {
      // 歌单内容
      musicListData: [],
      // 默认点中的导航
      activeName: "first",
      // 歌单歌曲id
      trackIds: [],
      // 歌单歌曲信息
      musicListInfo: [],
      // 歌曲id
      musicListId: [],
      // 歌单评论数
      totalComments: null,
      // 评论
      comments: [],
      // 当前评论页
      currentPage: 1,
    };
  },
  computed: {},
  methods: {
    // 获取歌单的内容
    async getMusicListData() {
      let result = await this.$request("/playlist/detail", {
        id: this.$route.params.id,
      });
      this.musicListData = result.data.playlist;
      console.log(this.musicListData)
      // 增加序号index
      let index = 0;
      for (const i of this.musicListData.tracks) {
        i.time = handleMusicTime(i.dt);
        i.index = index;
        index++;
      }

      let trackIds = this.musicListData.trackIds;
      let tracks = this.musicListData.tracks;
      // console.log(this.musicListData);
      // console.log(tracks);
      // 获取歌单歌曲
      for (let index = 0; index < 10; index++) {
        // console.log(tracks[index].name)
        this.musicListId.push({
          index: index,
          id: trackIds[index].id,
          name: tracks[index].name,
          singer: tracks[index].ar[0].name,
          pigUrl: tracks[index].al.picUrl,
        });
      }
      // this.$bus.$emit('musicId',this.musicListId)

      // 向vuex增加数据
      this.$store.commit("addMusciIds", this.musicListId);
      // ...mapActions({})
    },
    // 播放全部
    playAll() {
      this.$bus.$emit("playAll");
    },
    // 点击导航事件
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 获取歌单评论
    async getPlayListCommends() {
      let result = await this.$request("/comment/playlist", {
        id: this.$route.params.id,
        offset: (this.currentPage - 1) * 20,
      });
      // console.log(result);
      // 记录总页数
      this.totalComments = result.data.total;

      if (this.currentPage !== 1) {
        this.comments = [];
      }

      for (const i of result.data.comments) {
        // console.log(i);
        let res = {
          nickname: i.user.nickname,
          avatarUrl: i.user.avatarUrl,
          content: i.content,
          time: i.time,
          userId: i.user.userId,
          replied: null,
          respondent: null,
        };
        if (i.beReplied[0]) {
          res.replied = i.beReplied[0].content;
          res.respondent = i.beReplied[0].user.nickname;
        }

        // console.log(i.beReplied[0])
        this.comments.push(res);
        // console.log(res);
      }
    },
    // 单击单元格
    clickCell(row, column, cell, event) {
      // console.log(row)
      // console.log(column)
      // console.log(cell)
      // console.log(event)
    },

    // 双击单元格，播放歌曲
    dbClick(row) {
      // console.log(row);
      // console.log(row.id);
      // this.$bus.$emit("music", {id: row.id, index: row.index});
      // 向vuex提供当前播放歌曲的序号好id
      this.$store.commit("addInfo", { id: row.id, index: row.index });
      this.$bus.$emit("music");
    },
    // 时间格式化
    handleMusicTime,
  },
  created() {
    this.getMusicListData();
  },
  mounted() {
    // 获取评论
    this.getPlayListCommends();

    // 更新评论
    this.$bus.$on("changeCurrentPage2", (value) => {
      this.currentPage = value;
      this.getPlayListCommends();
      // console.log('成功')
    });
  },
  filters: {
    time(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
    handleNumber,
  },
};
</script>
<style lang='less'>
.musicListPage {
  width: calc(100% - 200px);
  height: calc(100vh - 120px);
  // overflow: scroll;
  // 隐藏滚动条
  overflow-x: hidden;

  .listInfo {
    // max-width: 1200px;
    width: 80%;
    margin: 40px 40px 20px;
    display: flex;
    .cover {
      margin-right: 20px;
      img {
        width: 185px;
        height: 185px;
        border-radius: 15px;
      }
    }
    .title {
      display: flex;
      align-items: center;

      .titleTag {
        height: 20px;
        font-size: 12px;
        color: #ec4141;
        border: 1px solid #ec4141;
        padding: 1px 2px;
        border-radius: 2px;
        margin-right: 5px;
      }
      .titleContent {
        font-size: 26px;
        font-weight: bold;
      }
    }
    .creatorInfo {
      display: flex;
      margin: 6px 0;
      align-items: center;
      img {
        width: 30px;
        border-radius: 50%;
      }
      .nickName {
        margin: 0 10px;
      }
    }

    .el-row {
      left: -10px;

      .playAll {
        background-color: #ec4141;
        color: white;
      }
      .el-button {
        transform: scale(0.9);
        left: -10px;
      }
      .el-button:focus,
      .el-button:hover {
        background: #f7f7f7;
        border-color: #dcdfe6;
        color: black;
      }
      .el-button--danger:focus,
      .el-button--danger:hover {
        background: #e53f3f;
        border-color: #dcdfe6;
        color: #fff;
      }
    }

    .otherInfo {
      margin-top: 6px;
      font-size: 14px;
      color: #666666;
      .Tags {
        span {
          // display: inline-block;
          margin-right: 5px;
          color: #619195;
        }
      }

      .introduction {
        width: 1200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.musicList {
  height: calc(100% - 189px);
  margin: 0 40px;
  .el-tabs__item.is-active {
    color: #303133;
    font-weight: bold;
    font-size: 18px;
  }
  .el-tabs__active-bar {
    background-color: #e53f3f;
  }
}
.el-table .el-table__cell {
  padding: 6px 0 !important;
}

.selectRow {
  background-color: #efefef !important;
}

.el-table__row {
  cursor: pointer;
}

// 这鬼东西吧评论区隐藏了
.el-tabs__content {
  overflow: visible !important;
}

// 评论区
.commentList {
  // width: 100%;
  left: 0;
}
</style>