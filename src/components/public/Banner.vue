<template>
  <div class="Banner">
    <!-- <div class="slogen">
      <p class="p1">{{$t('banner.slogen')}}</p>
      <p class="p2">{{$t('banner.slogen')}}</p>
      <p class="p3">{{$t('banner.slogen')}}</p>
    </div>
    <div class="desc">
      {{$t('banner.desc')}}
    </div> -->
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

  width: 1344px;
  height: 244px;

  margin: 0 auto;
  padding-top: 13px;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/public/banner.png");
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