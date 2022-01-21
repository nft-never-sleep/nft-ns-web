<template>
  <n-spin :show="loading">
    <div class="card-group">
      <div
        class="card-wrap"
        v-for="(item, index) in collectibles.values"
        :key="index"
      >
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
import chainMixin from "../utils/chainMixin";
import { useRouter } from "vue-router";
import { getCurrentInstance, onMounted, ref, reactive } from "vue";
export default {
  mixins: [chainMixin],
  setup() {
    const router = useRouter();

    const { proxy } = getCurrentInstance();
    const tokens = reactive([]);
    const collectibles = reactive([]);
    const loading = ref(true);
    const detail = (index) => {
      const { token_id } = tokens.values[index];
      router.push("/detail/" + token_id);
    };
    onMounted(() => {
      setTimeout(async () => {
        tokens.values = await proxy.useParasApi("nft_tokens_for_owner", {
          account_id: proxy.$store.getters.account_id,
        });
        console.log(tokens.values);
        loading.value = false;
        const media_base_url = "https://ipfs.fleek.co/ipfs/";
        collectibles.values = tokens.values.map((e) => {
          return {
            img: media_base_url + e.metadata.media,
            title: e.metadata.title,
            data: e,
          };
        });
      }, 40);
    });
    return {
      detail,
      loading,
      collectibles,
      tokens,
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
