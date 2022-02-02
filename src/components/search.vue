/* 搜索框 */
<template>
  <div>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="input"
      @keyup.enter.native="searchMusic(input)"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    async searchMusic(id) {
      // 去除空格
      let result = id.replace(/^\s*|\s* $/g, "");
      // 防止搜索空格
      if (!result) {
        return;
      }
      // // 搜索
      // let res = await this.$request("/cloudsearch", {
      //   keywords: result,
      // });
      // console.log(res.data.result);
      // this.$store.commit("addSearchResult", res.data.result);

      this.$router.push({ name: "searchPage", params: { id } });
    },
  },
};
</script>
<style lang='less' >
.el-input {
  .el-input__inner {
    width: 180px;
    height: 35px;
    background-color: #e13e3e;
    color: white;
    border-color: #e13e3e;
    border-radius: 15px;
  }
  .el-input__inner:hover,
  .el-input__inner:focus {
    border-color: #f08080;
  }

  .el-input__inner::-webkit-input-placeholder {
    color: white;
  }

  .el-input__icon {
    line-height: 38px !important;
    color: rgb(235, 235, 235);
    transform: scale(0.9);
  }
}

// .el-input__inner:hover,
// .el-input__inner:focus
// {
//   border-color: red;
// }
</style>