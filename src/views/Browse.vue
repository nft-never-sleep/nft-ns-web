<template>
  <div class="card-group">
    <div class="card" v-for="(item, index) in imgs" :key="index">
      <div class="top">
        <img :src="item.img" />
      </div>
      <div class="bottom">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      imgs: [
        {
          img: "https://img2.huashi6.com/images/resource/thumbnail/2021/12/16/14037_43794980032.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x>",
          title: "Art",
        },
        {
          img: "https://img2.huashi6.com/images/resource/2021/07/27/91h533226p0.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x>",
          title: "Collectibles",
        },
        {
          img: "https://img2.huashi6.com/images/resource/2021/09/25/929998h06p0.jpg?imageMogr2/quality/75/interlace/1/thumbnail/1400x>",
          title: "Domain",
        },
                {
          img: "https://img2.huashi6.com/images/resource/2019/10/25/77473h341p0.png?imageMogr2/quality/75/interlace/1/thumbnail/700x>/format/jpeg",
          title: "Ciri",
        },
        {
          img: "https://img2.huashi6.com/images/resource/2016/09/15/58h998602p0.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x>",
          title: "Collectibles",
        },
        {
          img: "https://img2.huashi6.com/images/resource/2019/10/25/77473h341p0.png?imageMogr2/quality/75/interlace/1/thumbnail/700x>/format/jpeg",
          title: "Domain",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  .card {
    border: 1px solid #e9eced;
    border-radius: 20px;
    overflow: hidden;
    width: 533px;
    margin-top: 0px;
    margin-top: 40px;
    transition: 0.6s;
    &:hover {
      cursor: pointer;
      margin-top: -3px;
      box-shadow: 0px 0px 6px rgb(116, 116, 116);
    }
    .top {
      height: 250px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .bottom {
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
