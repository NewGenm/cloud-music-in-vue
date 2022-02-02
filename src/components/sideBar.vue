/* 左侧菜单栏 */
<template>
  <div id="sideBar">
    <!-- <h5>默认颜色</h5> -->
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo newStyle"
    >
      <el-menu-item index="/home/discovery" @click="pushDiscovery">
        <!-- <i class="el-icon-location"></i> -->
        <i class="el-icon-addyinle"></i>
        <span slot="title">发现音乐</span>
      </el-menu-item>
      <!-- <el-menu-item index="/home/videoPage" @click="pushVideo">
        <i class="el-icon-video-play"></i>
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/home/collection" @click="pushCollection">
        <i class="el-icon-star-off"></i>
        <span slot="title">收藏</span>
      </el-menu-item>
      <el-menu-item index="/home/dailyRecommend" @click="pushDailyRecommend">
        <i class="el-icon-adddianzan"></i>
        <span slot="title">每日推荐</span>
      </el-menu-item>
      <el-menu-item-group>
        <template slot="title">收藏的歌单</template>
        <el-menu-item index="5">
          <i class="el-icon-addmusic_playlist"></i>
          <span slot="title">测试</span>
        </el-menu-item>
      </el-menu-item-group> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "sideBar",
  methods: {
    pushDiscovery() {
      this.$router.push({
        name: "discovery",
      });
    },
    pushVideo() {
      this.$router.push({
        name: "videoPage",
      });
    },
    pushCollection() {
      this.$router.push({
        name: "collection",
      });
    },
    pushDailyRecommend() {
      this.$router.push({
        name: "dailyRecommend",
      });
    },
  },
  computed: {
    // 处理导航因路径不同不显示高亮的问题
    path() {
      let arr = this.$route.path.split('/')
      return `/${arr[1]}/${arr[2]}`
    }
  },


};
</script>
<style lang='less'>
#sideBar {
  width: 200px;
  // height: calc(100vh - 120px);
  // background-color: white;

  // 给目录增加样式
  .newStyle {
    height: calc(100vh - 120px);
  }
}
</style>