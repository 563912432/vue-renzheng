<template>
  <div class="answerboard">
    <!--<div class="mask"></div>-->
    <div class="model">
      <!--内容-->
      <div class="content">
        <slot name="content"></slot>
      </div>
      <!--切换-->
      <div class="bottons">
        <slot name="buttons"></slot>
      </div>
      <!--材料内容-->
      <!--<div class="material">-->
        <!--<slot name="material"></slot>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "answer-board",
  }
</script>

<style scoped>
  /*.h-400{*/
    /*height: 400px;*/
  /*}*/
  .h-42{
    height: 42px;
  }
  .answerboard{
    position: relative;
    width: 100%;
    height: 100%;
    bottom: 0px;
    right: 0px;
  }
  .model {
    position: absolute;
    background: #fff;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  }
  .model .content,
  .model .material{
    padding: 10px;
    position: absolute;
    width: 100%;
    bottom: 42px;
    left: 0px;
    top: 0px;
    overflow: auto;
    min-height: 0px;
  }
  .model .bottons{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 43px;
    text-align: center;
    line-height: 42px;
    border-top: 1px solid #eeeeee;
  }
</style>
