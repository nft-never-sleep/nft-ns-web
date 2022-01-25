<template>
  <n-spin :show="loading">
    <div class="card-group">
      <div class="card-wrap" v-for="(item, index) in imgs" :key="index">
        <div :class="'card ' + item.bid_state">
          <div class="top">
            <img
              class="inprogress"
              src="../assets/img/public/on-progress.png"
            />
            <img :src="item.metadata.img" />
          </div>
          <div class="bottom">
            <!-- <button @click="lease(item.data)">Bid Now</button> -->
            <button @click="() => detail(index)">Bid Now</button>
          </div>
        </div>
      </div>
    </div>
  </n-spin>
</template>

<script>
import loading from "naive-ui/lib/_internal/loading";
export default {
  data: () => {
    return {
      imgs: [],
      loading: true,
    };
  },
  methods: {
    detail(index) {
      // console.log(this.imgs[index]);
      // const { token_id } = tokens.values[index];
      this.$router.push("/detail/" + this.imgs[index].token_id);
    },
  },
  mounted() {
    setTimeout(async () => {
      let bidData = await this.useNnsApi("list_bids_by_sender", {
        sender_id: this.$store.getters.account_id,
      });
      let nftData = [];
      // 循环报价历史
      for (const key in bidData) {
        let token_id_meta = bidData[key].src_nft_id.split(":");
        let data = {
          ...bidData[key],
          bid_id: key,
          metadata: {},
          token_id: token_id_meta[1] + ":" + token_id_meta[2],
        };
        nftData.push(data);
        // 循环nft数据信息
        for (let index = 0; index < nftData.length; index++) {
          // 如果在此之前有相同的token_id数据就将其metadata拷贝至末位，如果没有就向链侧获取数据
          if (index === nftData.length - 1) {
            let data = await this.useParasApi("nft_token", {
              token_id: nftData[index].token_id,
            });
            nftData[index].metadata = data.metadata;
            nftData[index].metadata.img =
              "https://ipfs.fleek.co/ipfs/" + data.metadata.media;
          } else if (
            nftData[index].token_id === nftData[nftData.length - 1].token_id 
          ) {
            nftData[nftData.length - 1].metadata = nftData[index].metadata;
            break;
          }
        }
      }
      this.imgs = nftData;
      console.log(this.imgs);
      this.loading = false;
    }, 40);
    // setTimeout(async () => {
    // const tokens = await this.useApi('nft_tokens_for_owner',{account_id: 'huishanlhr2.testnet' })
    // // 拼接url
    // // this.loading=false
    // const media_base_url = "https://ipfs.fleek.co/ipfs/";
    // this.imgs = tokens.map((e) => ({
    //   img: media_base_url + e.metadata.media,
    //   title: e.metadata.title,
    //   data: e
    // }));
    // }, 40);
  },
};
</script>
<style lang="scss" scoped>
.card-group {
  min-height: 385px;
  margin-top: 32px;
  padding: 19px;
  box-sizing: border-box;
  background-color: #fff5d6;
  border-radius: 20px;
  .card-wrap {
    width: 20%;
    display: inline-block;
    .card {
      border: 1px solid rgba(245, 205, 146, 0.7);
      box-sizing: border-box;
      border-radius: 10px;
      width: 232px;
      height: 325.63px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 16px;
      transition: 0.3s;
      margin-top: 16px;
      transform: translateY(0);
      // 等待响应
      &.InProgress {
        .inprogress {
          display: block;
          position: absolute;
          width: 31px;
          right: 24px;
        }
      }
      .inprogress {
        display: none;
        position: absolute;
        width: 31px;
        right: 24px;
      }
      &:hover {
        cursor: pointer;
        transform: translateY(-3px);

        // box-shadow: 0px 0px 10px rgb(116, 116, 116);
        box-shadow: 8px 8px 11px #f0e6c9, -8px -8px 11px #ffffe3;
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
}
</style>
