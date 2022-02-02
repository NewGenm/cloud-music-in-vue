/* 音乐播放器组件 */
<template>
  <div class="musicPlayer">
    <div class="button">
      <span><i class="el-icon-addshangyishou" @click="prepSong"></i></span>
      <span class="center"
        ><i
          :class="[
            !$store.state.isPlaying
              ? 'el-icon-addbofang'
              : 'el-icon-add24gf-pause2',
          ]"
          @click="play"
        ></i
      ></span>
      <span><i class="el-icon-addxiayishou" @click="nextSong"></i></span>
    </div>

    <!-- 进度条 -->
    <div class="slider">
      <div class="silderTime">{{ formatTime(music.currentTime) }}</div>
      <el-slider
        @change="changeTime"
        :format-tooltip="formatTime"
        :max="music.maxTime"
        v-model="music.currentTime"
        style="width: 375px"
        class="sliderItem"
      >
      </el-slider>
      <div class="silderTime">{{ formatTime(music.maxTime) }}</div>
    </div>
    <audio
      ref="mp"
      :src="musicId"
      @ended="ended"
      @timeupdate="timeupdate"
    ></audio>
  </div>
</template>

<script>
import { formatTime } from "plugin/utils.js";
let lastSecond = 0;
// 总时长的秒数
let durationNum = 0;
// 保存当前音量
let volumeSave = 0;
export default {
  name: "musicPlayer",
  data() {
    return {
      music: {
        currentTime: 0,
        maxTime: 0,
      },
      // 是否播放中
      // isPlay: false,
      // // 当前播放歌曲id
      musicId: "",
      // // 所有歌曲id
      // musicIds: [],
      // // 当前播放歌曲序号
      // index: null,
      // // 第一首听的歌
      // firstMusic: null,

      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
      // 音量
      volume: 30,
      // 是否静音
      isMuted: false,
    };
  },
  methods: {
    // 歌曲播放/连播相关
    play() {
      let index = this.$store.state.index;
      let firstMusic = this.$store.state.firstMusic;
      if (!this.musicId) {
        console.log("未播放");
        return;
      }
      if (!this.$store.state.isPlaying) {
        this.$refs.mp.play().catch((err) => {
          // console.log("测试有没进入");
          // 报错
          this.$toast.show("暂无版权，无法播放", 2000);
          console.log(err);
          // 是否开启连播
          // 如果是双击歌曲出现报错则不连播
          if (firstMusic == index) {
            return;
          } else if (firstMusic !== index) {
            // 改变序号
            this.$store.dispatch("changeIndex");
            // 改变ID
            this.$store.dispatch("changeId");
            this.musicId = `https://music.163.com/song/media/outer/url?id=${this.$store.state.musicId}.mp3`;
            setTimeout(() => {
              // this.isPlay = false;
              this.$store.commit("changeIsPlaying", false);
              this.play();
            }, 1000);
          }
          // console.log(err);
        });
        // 唱片机转动
        this.$bus.$emit("playDisc");
        // 获取歌曲
        this.$bus.$emit("getLyric");
        // this.isPlay = true;
        this.$store.commit("changeIsPlaying", true);
      } else if (this.$store.state.isPlaying) {
        this.$refs.mp.pause();
        // this.isPlay = false;
        this.$bus.$emit("playDisc");
        this.$store.commit("changeIsPlaying", false);
      }

      // if (!this.musicId) {
      //   return;
      // }
      // if (!this.isPlay) {
      //   this.$refs.mp.play().catch((err) => {
      //     // 报错
      //     this.$toast.show("暂无版权，无法播放", 2000);
      //     // 是否开启连播
      //     // 如果是双击歌曲出现报错则不连播
      //     if (this.firstMusic == this.index) {
      //       return;
      //     } else if (this.firstMusic !== this.index) {

      //         let count = this.index + 1;
      //         if (count > 20) {
      //           this.index = 0;
      //         }
      //         this.index = count;
      //         this.musicId = `https://music.163.com/song/media/outer/url?id=${
      //           this.musicIds[this.index].id
      //         }.mp3`;
      //         setTimeout(() => {
      //           this.isPlay = false;
      //           this.play();
      //         }, 1000);

      //     }
      //     // console.log(err);
      //   });
      //   this.isPlay = true;
      // } else if (this.isPlay) {
      //   this.$refs.mp.pause();
      //   this.isPlay = false;
      // }
    },
    // 监听歌曲是否结束
    ended() {
      // console.log("修改前" + this.index, this.musicId);
      // console.log(this.musicIds);

      // 单首播放直接结束
      if (this.$store.state.musicIds == undefined) {
        return;
      }
      // 播放下一首
      // this.$store.dispatch('nextMusic')

      for (const i of this.$store.state.musicIds) {
        if (i.index == this.$store.state.index) {
          // 改变序号
          this.$store.dispatch("changeIndex");
          // 改变ID
          this.$store.dispatch("changeId");
          console.log(this.$store.state.musicId);
          this.musicId = `https://music.163.com/song/media/outer/url?id=${this.$store.state.musicId}.mp3`;
          console.log(this.musicId);
          setTimeout(() => {
            console.log("播放");
            // this.isPlay = false;
            this.$store.commit("changeIsPlaying", false);
            this.play();
          }, 1000);
          // console.log(this.index)
          // console.log("修改后" + this.index, this.musicId);
          return;
        }
      }

      // this.musicId = this.musicIds[this.index]
      // this.isPlay = false
      // this.play()
      // console.log(this.index)
    },

    // 播放上一首
    prepSong() {
      this.$store.commit("prepSong");
      this.musicId = `https://music.163.com/song/media/outer/url?id=${this.$store.state.musicId}.mp3`;
      // 重置唱片机状态
      this.$bus.$emit("reset");
      setTimeout(() => {
        // console.log("播放");
        // this.isPlay = false;
        this.$store.commit("changeIsPlaying", false);
        this.play();
      }, 1000);
    },

    // 播放下一首
    nextSong() {
      this.$store.commit("nextSong");
      this.musicId = `https://music.163.com/song/media/outer/url?id=${this.$store.state.musicId}.mp3`;
      // 重置唱片机状态
      this.$bus.$emit("reset");
      setTimeout(() => {
        // console.log("播放");
        // this.isPlay = false;
        this.$store.commit("changeIsPlaying", false);
        this.play();
      }, 1000);
    },
    // 播放全部
    playAll() {
      // 播放第一首歌
      this.$store.commit("changeIndex", 0);
      this.$store.dispatch("changeId");
      let id = this.$store.state.musicId;
      this.musicId = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      setTimeout(() => {
        this.$store.commit("changeIsPlaying", false);
        this.play();
      }, 500);
    },
    // 当前播放时间位置
    timeupdate() {
      // 节流
      let time = this.$refs.mp.currentTime;
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      this.$store.commit("updateCurrentTime", time);

      time = Math.floor(time);
      if (time !== lastSecond) {
        // console.log(time);
        lastSecond = time;
        this.currentTime = time;
        // 计算进度条的位置
        this.timeProgress = Math.floor((time / durationNum) * 100);
        // console.log(this.timeProgress);
      }
    },
    // 拖动进度条的回调
    changeProgress(e) {
      // console.log(e);
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.mp.currentTime = this.currentTime;
    },
    // 拖动音量条的回调
    changeVolume(val) {
      // 改变audio的音量
      // input事件 实时触发
      this.$refs.mp.volume = val / 100;
      if (this.isMuted && val > 0) {
        this.isMuted = false;
      } else if (val == 0 && this.isMuted == false) {
        this.isMuted = true;
      }
    },
    // 点击小喇叭的回调 （切换静音状态）
    changeMutedState() {
      if (this.isMuted) {
        this.volume = volumeSave;
        this.$bus.$emit('changeState', this.volume)
      } else {
        volumeSave = this.volume;
        this.volume = 0;
        this.$bus.$emit('changeState', this.volume)
      }
      // console.log(volumeSave, this.isMuted);
      this.isMuted = !this.isMuted;
    },

    changeTime(time) {
      this.$refs.mp.currentTime = time;
    },
    listenMusic() {
      if (!this.$refs.mp) {
        return;
      }
      if (this.$refs.mp.readyState) {
        this.music.maxTime = this.$refs.mp.duration;
      }
      this.music.currentTime = this.$refs.mp.currentTime;
    },
    // 格式化时间
    formatTime,
  },

  mounted() {
    this.$nextTick(() => {
      // 定时，每一秒更新一次进度，符合时间变化
      setInterval(this.listenMusic, 1000);
    });

    // 接收双击点击的歌曲id
    // this.$bus.$on("music", (data) => {
    //   // console.log("看看有没有接收到，" + data);
    //   this.musicId = `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`;
    //   // 修改当前歌曲序号
    //   this.index = data.index - 1;
    //   // 修改第一首歌的序号
    //   this.firstMusic = data.index - 1;
    //   // 启动歌曲
    //   // 因为没加载，所以延迟播放
    //   setTimeout(() => {
    //     this.isPlay = false;
    //     this.play();
    //   }, 500);
    // });

    // 接收双击点击的歌曲id
    this.$bus.$on("music", () => {
      let id = this.$store.state.musicId;
      this.musicId = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

      // 启动歌曲
      // 因为没加载，所以延迟播放
      setTimeout(() => {
        // this.isPlay = false;
        this.$store.commit("changeIsPlaying", false);
        this.play();
      }, 500);
    });

    // 接收播放全部的事件
    this.$bus.$on("playAll", () => {
      this.playAll();
    });

    // 音量改变相关
    // 改变音量
    this.$bus.$on('changeVolume', (val) => {
      this.changeVolume(val)
    })
    // 开启声音或关闭声音
    this.$bus.$on('changeMutedState', () => {
      this.changeMutedState()
    })

  },
};
</script>
<style lang='less'>
.musicPlayer {
  width: 400px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;

  .center {
    margin: 0 40px;
  }

  i {
    transform: scale(2);
    cursor: pointer;
  }
}
.el-icon-caret-right {
  width: 20px;
  height: 20px;
}
.slider {
  height: 10px;
  line-height: 10px;
  display: flex;
  justify-items: center;

  .sliderItem {
    margin: 0 10px;
    // transform: scale(0.8);

    .el-slider__button {
      width: 8px;
      height: 8px;
    }
    .el-slider__runway {
      margin: 2px 0;
    }
  }
  .silderTime {
    font-size: 10px;
  }
}
</style>