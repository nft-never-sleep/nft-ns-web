<template>
  <n-spin :show="loading">
    <div class="card-group">
      <div class="card-wrap" v-for="(item, index) in collectibles" :key="index">
        <div class="card">
          <div class="top">
            <img :src="item.img" />
          </div>
          <div class="bottom">
            <button @click="detail">Bid Now</button>
          </div>
        </div>
      </div>
    </div>
  </n-spin>
</template>

<script>
import chainMixin from "../utils/chainMixin";
import { useRouter } from "vue-router";
export default {
  mixins: [chainMixin],
  data() {
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
      collectibles: [],
      loading: true,
    };
  },

  async mounted() {
    setTimeout(async () => {
      const tokens = await this.useApi('nft_tokens_for_owner',{account_id: this.$store.getters.account_id })
      console.log(tokens);
      // 拼接url
      this.loading=false
      const media_base_url = "https://ipfs.fleek.co/ipfs/";
      this.collectibles = tokens.map((e) => ({
        img: media_base_url + e.metadata.media,
        title: e.metadata.title,
      }));
    }, 40);
  },
  setup() {
    const router = useRouter();
    return {
      detail: () => {
        router.push({
          name: "Detail",
        });
      },
    };
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
