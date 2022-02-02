/* 左下角迷你歌曲信息 */
<template>
  <div class="musicInfoMini">

      <div class="infoRight" @click="showMusicdetail">
        <img v-if="$store.state.index !== null" :src="$store.getters.showPig" alt="">
        <img v-else :src="imgUrl" />
      </div>
      <div class="infoLeft">
        <div class="title">{{this.$store.getters.showName}}</div>
        <div class="singer">{{this.$store.getters.showSinger}}</div>
      </div>

  </div>
</template>

<script>
import img from "assets/img/test.jpg";
export default {
  name: "musicInfoMini",
  data() {
    return {
      imgUrl: img,
    };
  },
  methods: {
    showMusicdetail() {
      this.$bus.$emit('hide')
    }
  }
};
</script>
<style lang='less'>
.musicInfoMini {
  width: 200px;
  height: 60px;
  // padding: 7px 10px;
  position: relative;
  // background-color: burlywood;


    .infoRight {
      position: absolute;
      top: 52%;
      left: 8%;
      transform: translateY(-50%);
      img {
        height: 46px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
    .infoLeft{
      width: 100px;
      position: absolute;
      top: 50%;
      left: 36%;
      transform: translateY(-50%);

      .title{
        font-size: 16px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .singer{
        font-size: 14px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

}
</style>