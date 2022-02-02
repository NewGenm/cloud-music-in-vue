/* 歌曲详细信息页面（歌词、评论等） */
<template>
  <!-- <div class="musicDetailPage" :class="[isHide ? 'hide' :'noHide']"></div> -->
  <div class="musicDetailPage" :class="[!isHide ? '' : 'hide']">
    <div class="closePage" @click="closePage">
      <i class="el-icon-arrow-down"></i>
    </div>
    <div v-if="$store.state.index !== null">
      <!-- 歌曲名和歌手 -->
      <div class="musicTitle">
        <div class="title">{{ this.$store.getters.showName }}</div>
        <div class="singer">{{ this.$store.getters.showSinger }}</div>
      </div>
      <!-- 唱片机 -->
      <jukebox class="jukebox"></jukebox>
      <!-- 歌词 -->
      <lyricsScroll :lyric="lyric" class="lyricsScroll"></lyricsScroll>
      <!-- 评论 -->
      <!-- <div
        v-show="$store.state.musicId"
        v-for="(i, index) in comments"
        :key="i.id"
        class="comments"
      >
        <img :src="i.avatarUrl" />
        <span>{{ i.nickname }}</span>
        <span>{{ i.content }}</span>
        <div>{{ i.time }}</div>
      </div> -->
      <commentList class="commentList" :comments="comments" :totalComments='totalComments' :module='1'></commentList>
    </div>
    <!-- 没有播放音乐时显示 -->
    <div v-else class="noMusic">暂无音乐播放</div>
  </div>
</template>

<script>
import jukebox from "components/jukebox.vue";
import lyricsScroll from "components/lyricsScroll.vue";
import commentList from "components/commentList.vue";
export default {
  name: "musicDetailPage",
  components: {
    jukebox,
    lyricsScroll,
    commentList,
  },
  data() {
    return {
      isHide: true,
      lyric: [[0, "正在加载歌词"]],
      // 评论内容
      comments: [],
      // 当前页面
      currentPage: 1,
      // 总页数
      totalComments: null,
    };
  },
  methods: {
    // 点击左上角关闭页面
    closePage() {
      this.isHide = true;
      // console.log('成功')
    },

    //请求并处理歌词数据
    async getLyric() {
      let res = await this.$request("/lyric", {
        id: this.$store.state.musicId,
      });
      //   console.log(res);
      let lyrics = res.data.lrc.lyric;
      // 对获取到的歌词进行处理
      let arr = lyrics.split("\n");
      let array = [];
      // let obj = {};
      let time = "";
      let value = "";
      let result = [];

      //去除空行
      arr.forEach((item) => {
        if (item != "") {
          array.push(item);
        }
      });
      arr = array;
      arr.forEach((item) => {
        time = item.split("]")[0];
        value = item.split("]")[1];
        //去掉时间里的中括号得到xx:xx.xx
        var t = time.slice(1).split(":");
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });

      this.lyric = result;
      // console.log(this.lyric);
    },

    // 获取评论
    async getComment() {
      let result = await this.$request("/comment/music", {
        id: this.$store.state.musicId,
        // limit: 20,
        offset: (this.currentPage - 1) * 20,
      });
      // console.log(result);
      // 记录总页数
      this.totalComments = result.data.total

      if(this.currentPage !==1) {
        this.comments = []
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
  },
  mounted() {
    this.$bus.$on("hide", () => {
      this.isHide = !this.isHide;
      // console.log(this.isHide);
    });
    this.$bus.$on("getLyric", () => {
      // console.log("进入获取歌词");
      this.getLyric();
      this.getComment();
    });
    this.$bus.$on("changeCurrentPage1", (value) => {
      this.currentPage = value
      this.getComment()
      // console.log('成功')
    })
  },
};
</script>
<style lang='less' scoped>
.musicDetailPage {
  position: fixed;
  width: 100%;
  height: calc(100vh - 55px);
  // height: calc(80vh - 55px);
  bottom: 55px;
  left: 0;
  z-index: 5;
  transition: bottom 0.5s ease;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
  overflow-x: hidden;

  .closePage {
    margin: 20px 0 0 30px;
    cursor: pointer;

    .el-icon-arrow-down {
      font-size: 30px;
    }
  }

  // 唱片机
  .jukebox {
    position: absolute;
    left: 16%;
    top: 18%;
  }

  // 歌曲标题
  .musicTitle {
    width: 660px;
    position: absolute;
    left: 33%;
    // background-color: brown;
    text-align: center;

    .title {
      font-size: 22px;
      margin-bottom: 10px;
    }
    .singer {
      // margin: auto;
      color: #666;
    }
  }
  // 歌词滚动器
  .lyricsScroll {
    position: absolute;
    top: 28%;
    // font-size: 20px;
    // left: 5%;
  }
  // 评论列表
  .commentList{
    width: 44%;
    left: 28%;
    top: 70%;
  }
}
// 隐藏页面
.hide {
  bottom: calc(-100vh + 55px);
}
// 没有播放音乐
.noMusic {
  color: #666;
  font-size: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-55%, -50%);
}
</style>