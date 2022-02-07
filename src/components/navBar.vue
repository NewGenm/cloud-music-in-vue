/* 子页面导航栏 */
<template>
  <div class="navBar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      text-color="black"
    >
      <el-menu-item index="/home/discovery/recommend" @click="pushRecommend">个性推荐</el-menu-item>
      <el-menu-item index="/home/discovery/musicList" @click="pushMusicList">歌单</el-menu-item>
      <el-menu-item index="/home/discovery/billboard" @click="pushBillboard">排行榜</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: {
    navBarItem: {
      type: Array,
    },
  },
  methods: {
    pushRecommend() {
      this.$router.push ({
        name: 'recommend'
      })
    },
    pushMusicList() {
      this.$router.push ({
        name: 'musicList'
      })
    },
    pushBillboard() {
      this.$router.push ({
        name: 'billboard'
      })
    },
    pushSinger() {
      this.$router.push ({
        name: 'singer'
      })
    },
  },
};
</script>
<style lang= 'less'>
.navBar {
  .el-menu-item {
    font-size: 16px;
  }
  /* 设置活跃时的样式 */
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #ec4141;
    font-size: 20px;
    font-weight: bold;
    color: #303133;
  }
}
</style>
