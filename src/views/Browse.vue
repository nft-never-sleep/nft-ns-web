<template>
  <div class="card-group">
    <div class="card" v-for="(item, index) in imgs" :key="index">
      <div class="top">
        <img :src="item.img" />
      </div>
      <div class="bottom">
        <button>Bid Now</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {
      imgs: [],
    };
  },
  async mounted() {
    setTimeout(async () => {
      //获取nft列表 from_index必须为staring
      let tokens = await this.useApi('nft_tokens',{from_index: '0' ,limit: 10})
      tokens = tokens ? tokens : []
      // 拼接url
      this.loading=false
      const media_base_url = "https://ipfs.fleek.co/ipfs/";
      this.imgs = tokens.map((e) => ({
        img: media_base_url + e.metadata.media,
        title: e.metadata.title,
        data: e
      }));
    }, 40);
  },
};
</script>
<style lang="scss" scoped>
.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 32px;
  padding: 19px;
  box-sizing: border-box;
  background-color: #fff5d6;
  border-radius: 20px;
  .card {
    border: 1px solid rgba(245, 205, 146, 0.7);
    box-sizing: border-box;
    border-radius: 10px;
    width: 232px;
    height: 325.63px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 16px;
    transition: .3s;
    margin-top: 16px;
    &:hover {
      cursor: pointer;
      margin-top: -3px;
      box-shadow: 0px 0px 6px rgb(116, 116, 116);
    }
    .top {
      width: 100%;
      height: 250px;
      overflow: hidden;
      border-radius: 10px;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .bottom {
      margin-top: 15px;
      height: 32px;
      font-weight: 600;
      text-align: center;
      button {
        background: #fecc00;
        border-radius: 6px;
        width: 200px;
        height: 32px;
        border: none;
        font-family: Barlow;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        color: #000000;
      }
    }
  }
}
</style>
