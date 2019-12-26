<template>
  <div class="model" :style="modelWidth">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="close">
      <slot name="close"></slot>
    </div>
    <div class="new-content">
      <slot name="new-content"></slot>
    </div>

    <slot name="buttons"></slot>
  </div>
</template>

<script>

  export default {
    name: "Pop-ups-model",
    data(){
      return {
        modelWidth: {
          width: '490px'
        },
      }
    }
  }
</script>

<style scoped>
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background:rgba(0,0,0,0.2) ;
  }
  .model {
    position: absolute;
    background: #fff;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /*width: 490px;*/
    height: 610px;
    z-index: 100;
    box-shadow: 1px 1px 15px rgba(0,0,0,.3);
  }
  .model .title {
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    background-color: #F8F8F8;
    border-radius: 2px 2px 0 0;
  }
  .model .close{
    position: absolute;
    top: 11px;
    right: 15px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  .model .new-content{
    width: 100%;
    height: 94%;
    padding: 15px;
  }
</style>
