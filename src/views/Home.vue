<template>
  <div class="home">
    <!-- 顶部导航 -->
    <topBar>
      <div slot="left" id="logo">
        <img src="@/assets/img/logo.png" />
      </div>
      <div slot="center" class="center">
        <history class="historyButton"></history>
        <search class="searchInput"></search>
      </div>
      <!-- <div slot="right" class="right">
        <h2>22222</h2>
      </div> -->
    </topBar>
    <!-- 中间部分 -->
    <div id="middle">
      <!-- 左侧菜单栏 -->
      <sideBar> </sideBar>

      <!-- 中间内容烂 -->
      <!-- 除首页之外的页面显示 -->
      <router-view except="home"></router-view>
      <!-- <discovery class="discovery"></discovery> -->
      <!-- <swiper></swiper> -->
    </div>
    <!-- 底部工具栏 -->
    <bottomBar class="bottomBar">
      <div slot="left" class="left">
        <musicInfoMini></musicInfoMini>
      </div>
      <div slot="center" class="center2">
        <musicPlayer class="mp"></musicPlayer>
      </div>
      <div slot="right" class="right">
        <volumeControl></volumeControl>
      </div>
    </bottomBar>
    <musicDetailPage></musicDetailPage>
  </div>
</template>

<script>
import topBar from "components/topBar.vue";
import sideBar from "components/sideBar.vue";
import bottomBar from "components/bottomBar.vue";
import history from "components/history.vue";
import search from "components/search.vue";
import swiper from "components/swiper.vue";
import musicPlayer from "components/musicPlayer.vue";
import volumeControl from "components/volumeControl.vue";
import musicInfoMini from "components/musicInfoMini.vue";
import musicDetailPage from "views/musicDetailPage/musicDetailPage.vue";

export default {
  name: "Home",
  components: {
    topBar,
    sideBar,
    bottomBar,
    history,
    search,
    swiper,
    musicPlayer,
    musicInfoMini,
    musicDetailPage,
    volumeControl,
  },
};
</script>

<style lang="less" scoped>
.home {
  // 左侧logo
  height: 100vh;
  overflow: hidden;
  position: relative;
  #logo {
    height: 100%;
    width: 200px;
    position: relative;
    img {
      display: inline-block;
      height: 60%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .left {
    height: 100%;
    width: 200px;
    // background-color: yellowgreen;
  }

  #middle {
    display: flex;
  }
  .center {
    width: calc(100% - 400px);
    height: 100%;
    position: relative;

    .historyButton {
      margin: 0 20px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .searchInput {
      margin-left: 100px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .right {
    height: 100%;
    width: 200px;
    // background-color: wheat;
  }

  .center2{
    width: calc(100% - 400px);

    .mp{
      margin-left: 36%;
    }
  }

  .bottomBar{
    position: absolute;
    z-index: 10;
  }
}
</style>
