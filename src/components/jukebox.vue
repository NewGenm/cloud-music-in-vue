/* 唱片机播放组件 */
<template>
  <div class="jukebox">
    <div class="needle">
      <img src="@/assets/img/MusicDetailCard/needle.png" :class="style" />
    </div>
    <div class="disc">
      <!-- <img src="@/assets/img/test.jpg" class="pic" :class="style2"> -->
      <img
        v-show="$store.state.index !== null"
        :src="$store.getters.showPig"
        class="pic"
        :class="style2"
      />
      <img
        src="@/assets/img/MusicDetailCard/disc.png"
        class="imgDisc"
        :class="style2"
      />
    </div>
    <!-- <button @click="play">播放</button> -->
  </div>
</template>

<script>
export default {
  name: "jukebox",
  data() {
    return {
      // 是否正在播放音乐
      isPlaying: false,
      // 指针的播放动画样式
      style: [],
      // 唱片的播放动画样式
      style2: [],
    };
  },
  methods: {
    // 按下播放键
    play() {
      // console.log("进入唱片机");
      // 指针摆动
      if (!this.$store.state.isPlaying) {
        // console.log("开始");
        // 指针摆动
        this.style.push("needleAnimation");
        // 延迟归位
        setTimeout(() => {
          this.style.shift();
          this.style.push("to");
        }, 800);

        // 唱片转动
        if (this.style2.length == 2) {
          // 如果已经暂停过，重新启动唱片旋转
          setTimeout(() => {
            this.style2.splice(1, 1, "run");
          }, 800);
        } else {
          // 第一次播放，启动旋转动画
          this.style2.push("discAnimation");
        }
        // 修改播放状态
        // this.isPlaying = true;
        // this.$store.commit('changeIsPlaying', true)
      } else if (this.$store.state.isPlaying) {
        // console.log("暂停");
        // 指针归位
        this.style.push("needleAnimation2");
        setTimeout(() => {
          // 延迟归位
          this.style = [];
        }, 800);
        // 唱片停止
        if (this.style2.length == 2) {
          // 如果暂停过,防止样式过多
          this.style2.splice(1, 1, "pause");
        } else {
          // 如果没暂停过,暂停动画
          this.style2.push("pause");
        }
        // 修改播放状态
        // this.isPlaying = false;
        // this.$store.commit('changeIsPlaying', false)
      }
    },
  },
  mounted() {
    this.$bus.$on("playDisc", () => {
      this.play();
    })
    
    this.$bus.$on("reset", () => {
      // console.log('成功')
      this.style = []
      this.style2 = []
    })
  },
};
</script>
<style lang='less'>
.jukebox {
  position: relative;
  .needle {
    img {
      width: 110px;
      margin-left: 130px;
      transform-origin: left top;
      position: absolute;
      z-index: 2;
    }

    .needleAnimation {
      animation: needle 0.8s linear;
    }
    .needleAnimation2 {
      animation: needle2 0.8s linear;
    }

    .to {
      transform: rotateZ(20deg);
    }
  }
  .disc {
    img {
      top: 70px;
      position: absolute;
    }
    .imgDisc {
      width: 260px;
    }
    .pic {
      width: 178px;
      top: 111px;
      left: 41px;
    }
    .discAnimation {
      // 25s一圈转动，无限转动
      animation: disc 25s linear infinite;
      // 延迟动画
      animation-delay: 0.8s;
    }
    // 暂停
    .pause {
      animation-play-state: paused;
    }
    // 启动
    .run {
      animation-play-state: running;
    }
  }

  // 指针动画
  @keyframes needle {
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(20deg);
    }
  }

  @keyframes needle2 {
    from {
      transform: rotateZ(20deg);
    }
    to {
      transform: rotateZ(0);
    }
  }

  // 唱片动画
  @keyframes disc {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

</style>