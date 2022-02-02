/* 网页前进后退组件 */
<template>
  <div id="histroy">
    <el-row>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-arrow-left"
        id="test"
        circle
        @click="back"
      ></el-button>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-arrow-right"
        circle
        @click="forward"
      ></el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "history",
  methods: {
    forward() {
      this.$router.forward()
    },
    back() {
      this.$router.back()
    }
  }
};
</script>
<style lang="less">
#histroy {
  .el-button--danger{
    background-color: #E13E3E;
    border-color: #E13E3E;
  }

  .el-button--danger:focus,
  .el-button--danger:hover {
  background: 	#F08080;
  border-color: #F08080;
  color: #fff;
}
}
</style>