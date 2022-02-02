<template>
  <div class="searchPage">
    <!-- 导航 -->
    <div class="navBar">
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        text-color="black"
      >
        <el-menu-item index="1" @click="pushSearchSong">单曲</el-menu-item>
        <!-- <el-menu-item index="/home/discovery/musicList" @click="pushMusicList"
          >歌单</el-menu-item
        >
        <el-menu-item index="/home/discovery/billboard" @click="pushBillboard"
          >排行榜</el-menu-item
        >
        <el-menu-item index="/home/discovery/singer" @click="pushSinger"
          >歌手</el-menu-item
        > -->
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchPage",
  data() {
    return {
      activeIndex: 1,
    };
  },
  methods: {
    pushSearchSong() {},
  },
};
</script>
<style lang='less'>
.searchPage {
  width: calc(100% - 200px);
  height: calc(100vh - 120px);
}
</style>