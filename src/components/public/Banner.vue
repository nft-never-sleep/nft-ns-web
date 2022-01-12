<template>
  <div class="Banner">
    <div class="slogen">
      <p class="p1">NFT NEVER SLEEP</p>
      <p class="p2">NFT NEVER SLEEP</p>
      <p class="p3">NFT NEVER SLEEP</p>
    </div>
    <div class="desc">
      {{$t('banner.desc')}}
      <!-- 搜索藏家，租来使用吧｜连接你的钱包，立刻有｜往下逛逛，喜欢就报价 -->
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this);
  },
};
</script>

<style lang="scss" scoped>
.Banner {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  height: 150px;
  padding-bottom: 60px;

  border-bottom: 3px solid rgba(255, 186, 13, 0.8);
  &::after {
    content: "";

    position: absolute;
    bottom: 0px;

    transform: translate(2px, 7px);

    display: block;
    width: 100%;
    height: 3px;
    background-color: #7b36ff;
  }
  .slogen {
    position: relative;
    height: 100px;
    p {
      width: 100%;
      font-size: 60px;
      font-weight: 600;
      margin: 0;
      position: absolute;
      top: 0;
    }
    .p1 {
      position: relative;
      z-index: 4;
      color: #ffac32;
    }
    .p2 {
      z-index: 3;
      color: #7b36ff;
      transform: translate(4px, 4px);
    }
    .p3 {
      z-index: 2;
      transform: translate(8px, 8px);
      color: #ffac32;
    }
  }
  .desc {
    font-family: PingFang TC;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 34px;
    /* or 106% */

    display: flex;
    align-items: center;
    text-align: center;

    color: #898397;
  }
}
</style>