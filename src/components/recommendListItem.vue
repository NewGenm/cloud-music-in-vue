/* 推荐歌单单个音乐展示组件 */
<template>
  <div>
    <div>
      <slot name="img"></slot>
      <slot name="introduction"></slot>
    </div>
    <div name="music"></div>
  </div>
</template>

<script>
export default {
  name: "recommendListItem",
};
</script>
<style lang='less'>
</style>
