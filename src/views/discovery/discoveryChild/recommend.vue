/* 个性推荐板块 */
<template>
  <div class="recommendContainer">
    <div class="recommend">
      <swiper :bannerData="bannerData" class="swiper"></swiper>
    </div>
    <div class="recommendList">
      <h2>推荐歌单</h2>
      <div class="musciList">
        <recommendListItem
          v-for="(item, index) in musicList"
          :key="item.id"
          class="listItem"
          @click.native="pushMusicListPage(item.id)"
          style="cursor: pointer"
        >
          <img  :src="(item.picUrl || defaultImg)" slot="img" />
          <!-- <img :src="defaultImg" slot="img" > -->
          <span slot="introduction">{{ item.name }}</span>
        </recommendListItem>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "components/swiper.vue";
import defaultImg from 'assets/img/imgLoading.png'
import recommendListItem from "components/recommendListItem.vue";
export default {
  name: "recommend",
  data() {
    return {
      // 轮播图数据
      bannerData: [],
      // 获取推荐歌单音乐
      musicList: [],
      // 为加载时显示的歌单封面
      defaultImg,
    };
  },
  components: {
    swiper,
    recommendListItem,
  },
  methods: {
    // 获取轮播图数据
    async getBanner() {
      let result = await this.$request("/banner");
      this.bannerData = result.data.banners;
    },
    // 获取推荐歌单信息
    getMusciList() {
      this.$request("/personalized", { limit: 10 }).then((res) => {
        // console.log(res);
        this.musicList = res.data.result;
      });
    },
    // 点击推荐歌单跳转
    pushMusicListPage(id) {
      this.$router.push({
        name: "musicListPage",
        params: { id },
      });
    },
  },
  mounted() {
    this.getBanner();
    this.getMusciList();
  },
};
</script>
<style lang='less' scoped>
.recommendContainer {
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;

  .recommend {
    width: 100%;

    .swiper {
      margin-top: 40px;
    }
  }
  .recommendList {
    width: 1200px;
    // background-color: burlywood;

    .musciList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .listItem {
        width: 210px;
        height: 250px;
        margin-right: 30px;
        margin: 20px 30px 20px 0;

        display: flex;
        flex-direction: column;
        img {
          width: 100%;
          border-radius: 15px;
        }
        span {
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>