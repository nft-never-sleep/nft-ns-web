<template>
  <Category @toggle="toggle"></Category>
  <n-spin :show="loading">
    <div class="card-group">
      <div
        class="card-wrap"
        v-for="(item, index) in collectibles.values"
        :key="index"
         @click="() => detail(index)"
      >
        <div class="card">
          <div class="top">
            <img :src="item.img" />
          </div>
          <div class="bottom">
            <button>Bid Now</button>
          </div>
        </div>
      </div>
      <div class="next-page">
        <button
          v-if="collectibles.values.length + 11 < 30"
          @click="nexPage()"
        >
          Nex Page
        </button>
        <!-- <button
          v-if="collectibles.values.length < nft_total_supply"
          @click="nexPage()"
        >
          Nex Page
        </button> -->
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
import Category from "../components/Home/Category.vue";
export default {
  components: {
    Category,
  },
  setup() {
    const router = useRouter();

    const { proxy } = getCurrentInstance();
    const tokens = reactive([]);
    const collectibles = reactive([]);
    const loading = ref(true);
    const category_type = ref("All NFTs");

    const detail = (index) => {
      const { token_id } = collectibles.values[index].data;
      router.push("/detail/" + token_id);
    };
    const nft_total_supply = ref(0);
    const media_base_url = "https://ipfs.fleek.co/ipfs/";
    onMounted(() => {
      setTimeout(async () => {
        // nft_total_supply.value  = await proxy.useParasApi("nft_total_supply");
        // nft_total_supply.value = parseInt(nft_total_supply.value)
        nft_total_supply.value  = 45;
        if (nft_total_supply.value !== 0) {
          tokens.values = await proxy.useParasApi("nft_tokens", {
            from_index: "12",
            limit: 10,
          });
          console.log(tokens.values,nft_total_supply.value);
          // 拼接url
          loading.value = false;
          collectibles.values = tokens.values.map((e) => {
            return {
              img: media_base_url + e.metadata.media,
              title: e.metadata.title,
              data: e,
            };
          });
        }
      }, 40);
    });
    const get_and_clear_nfts = async () => {
      // nft_total_supply.value = await proxy.useParasApi("nft_total_supply");
      // nft_total_supply.value = parseInt(nft_total_supply.value);
      nft_total_supply.value  = 45;
      if (nft_total_supply.value !== 0) {
        // let remaining = nft_total_supply.value - collectibles.values.length;
        let remaining = nft_total_supply.value - 12 - collectibles.values.length;
        let from_index = category_type.value === "All NFTs" ? "0" : Math.ceil(Math.random() * 45).toString()
        tokens.values = await proxy.useParasApi("nft_tokens", {
          // 游戏时获取随机
          from_index,
          limit: nft_total_supply.value > 10 ? 10 : remaining,
        });
        loading.value = false;
        collectibles.values = tokens.values.map((e) => {
          return {
            img: media_base_url + e.metadata.media,
            title: e.metadata.title,
            data: e,
          };
        });
      }
    };

    const nexPage = async () => {
      if (collectibles.values.length < nft_total_supply.value - 12 && !loading.value) {
        loading.value = true;
        // let remaining = nft_total_supply.value - collectibles.values.length;
        let remaining = nft_total_supply.value - 12 - collectibles.values.length;
        let data = await proxy.useParasApi("nft_tokens", {
          from_index: (collectibles.values.length + 11).toString(),
          limit: remaining > 10 ? 10 : remaining,
        });
        console.log({
          from_index: (collectibles.values.length + 11).toString(),
          limit: remaining > 10 ? 10 : remaining,
        });
        let newData = data.map((e) => {
          return {
            img: media_base_url + e.metadata.media,
            title: e.metadata.title,
            data: e,
          };
        });
        collectibles.values.push(...newData);
        loading.value = false;
      }
    };
    window.nexPageBrowse = nexPage
    const toggle = (type) => {
      category_type.value = type;
      loading.value = true;
      get_and_clear_nfts();
    };

    return {
      detail,
      loading,
      collectibles,
      tokens,
      nft_total_supply,
      nexPage,
      category_type, //类目 all nft || game
      toggle,
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
          height: 100%;
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
  .next-page {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 10px;
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
</style>
