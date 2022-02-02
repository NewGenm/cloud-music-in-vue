/* 轮播图 */
<template>
  <div class="recommend">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item
          v-for="(item, index) in bannerData"
          :key="bannerData.targetId"
        >
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    bannerData: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  // mounted() {
  //   console.log(this.bannerData)
  // }
};
</script>
<style lang='less'>
.recommend {
  max-width: 1000px;
}

.carousel {
  width: 100%;
  .el-carousel {
    margin: auto;
    max-width: 1080px;

    .el-carousel__item {
      border-radius: 10px;

      img {
        height: 100%;
      }
    }
  }
}

.el-carousel__item .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>