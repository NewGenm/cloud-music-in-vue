/* 发现音乐页面 */
<template>
  <div class="discovery">
      <navBar class="navBar"></navBar>
    <div class="discoveryContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navBar from "components/navBar.vue";
export default {
  namne: "discovery",
  components: {
    navBar,
  },
  data() {
    return {};
  },
};
</script>
<style lang='less'>
// 隐藏滚动条
// .discovery::-webkit-scrollbar {display:none}
.discovery {
  width: calc(100% - 200px);
  height: calc(100vh - 120px);
  // background-color: #bfa;
  position: relative;
  // overflow: scroll;
  overflow-x:hidden;

  .navBar {
    width: 100%;
    position: fixed;
    z-index: 1;
  }

  .discoveryContainer {
    width: 100%;
    position: absolute;
    top: 61px;
  }
}
</style>