/* 底部工具栏 */
<template>
  <div id="bottomBar">
    <slot name="left"></slot>
    <slot name="center" class="center"></slot>
    <slot name="right">2222</slot>
  </div>
</template>

<script>
export default {
  name: 'bottomBar'
}

</script>
<style lang='less'>
  #bottomBar{
    height: 60px;
    width: 100%;
    // background-color: #bfa;
    display: flex;
    align-items: center;
  }
  
</style>