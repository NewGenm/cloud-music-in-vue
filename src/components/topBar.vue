/* 顶部导航 */
<template>
<div id="topBar">
  <slot name="left"></slot>
  <slot name="center"></slot>
  <slot name="right"></slot>
</div>

</template>

<script>
export default {
  name: 'topBar',
}

</script>
<style lang='less'>
  #topBar{
    height: 60px;
    background-color: #ec4141;
    display: flex;
  }
</style>