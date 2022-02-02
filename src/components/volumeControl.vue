/* 音量控制 */
<template>
  <div class="volumeContain">
    <i
      class="el-icon-add24gl-volumeMiddle volume"
      @click="changeMutedState"
    ></i>
    <el-slider
      v-model="volume"
      class="volumeSlider"
      @input="changeVolume"
    ></el-slider>
  </div>
</template>

<script>
export default {
  name: "volumeControl",
  data() {
    return {
      // 音量
      volume: 30,
    };
  },
  methods: {
    // 拖动音量条的回调
    changeVolume(val) {
      this.volume = val;
      console.log(this.volume);
      this.$bus.$emit('changeVolume', val)
    },
    // 点击小喇叭的回调 （切换静音状态）
    changeMutedState() {
      this.$bus.$emit("changeMutedState");
    },
  },
  mounted() {
    this.$bus.$on('changeState', (val) => {
      this.volume = val
    })
  },
};
</script>
<style lang='less'>
.volumeContain {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 15px;

  .volume {
    font-size: 28px;
    margin-right: 20px;
  }

  .volumeSlider {
    width: 55px;
  }
}
</style>