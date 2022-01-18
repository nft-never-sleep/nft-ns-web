<template>
  <n-spin :show="loading">
    <div class="card-group">
      <div class="card-wrap" v-for="(item, index) in imgs" :key="index">
        <div class="card">
          <div class="top">
            <img :src="item.img" />
          </div>
          <div class="bottom">
            <button @click="() => detail(index)">Bid Now</button>
          </div>
        </div>
      </div>
    </div>
  </n-spin>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import chainMixin from "../utils/chainMixin";
import { onMounted } from "vue";
import { getCurrentInstance } from "vue";

export default {
  mixins: [chainMixin],
  data: () => {
    return {
      imgs: [],
      tokens: [],
      loading: true,
    };
  },
  setup() {
    const router = useRouter();
    const imgs = reactive([]);
    const tokens = reactive([]);
    const loading = ref(true);
    const { proxy } = getCurrentInstance();

    onMounted(() => {
      setTimeout(async () => {
        //获取nft列表 from_index必须为staring
        tokens.values = await proxy.useApi("nft_tokens", {
          from_index: "0",
          limit: 10,
        });
        // 拼接url
        loading.value = false;
        const media_base_url = "https://ipfs.fleek.co/ipfs/";
        imgs.values = tokens.map((e) => ({
          img: media_base_url + e.metadata.media,
          title: e.metadata.title,
        }));
      }, 40);
    });
    const detail = (index) => {
      router.push({
        name: "Detail",
        query: {
          type: 1,
          data: JSON.stringify(tokens.values[index]),
        },
      });
    };
    return {
      detail,
    };
  },
  async mounted() {
    setTimeout(async () => {
      //获取nft列表 from_index必须为staring
      this.tokens = await this.useApi("nft_tokens", {
        from_index: "0",
        limit: 10,
      });
      // 拼接url
      this.loading = false;
      const media_base_url = "https://ipfs.fleek.co/ipfs/";
      this.imgs = this.tokens.map((e) => ({
        img: media_base_url + e.metadata.media,
        title: e.metadata.title,
      }));
    }, 40);
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
