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
            <button @click="() => detail(index)">On Sale</button>
          </div>
        </div>
      </div>
      <div class="empty" v-if="collectibles.values.length === 0">
        <img src="../assets/img/public/no-nft.png" />
      </div>
      <div class="next-page">
        <button
          v-if="collectibles.values.length < nft_supply_for_owner"
          @click="nexPage()"
        >
          Nex Page
        </button>
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
    const nft_supply_for_owner = ref(0);
    const media_base_url = "https://ipfs.fleek.co/ipfs/";
    onMounted(() => {
      setTimeout(async () => {
        nft_supply_for_owner.value = await proxy.useParasApi(
          "nft_supply_for_owner",
          {
            account_id: proxy.$store.getters.account_id,
          }
        );
        console.log()
        nft_supply_for_owner.value = parseInt(nft_supply_for_owner.value);
        if (nft_supply_for_owner.value !== 0) {
          tokens.values = await proxy.useParasApi("nft_tokens_for_owner", {
            account_id: proxy.$store.getters.account_id,
            from_index: "0",
            limit:
              nft_supply_for_owner.value > 10 ? 10 : nft_supply_for_owner.value,
          });
          console.log(tokens.values)
          collectibles.values = tokens.values.map((e) => {
            return {
              img: media_base_url + e.metadata.media,
              title: e.metadata.title,
              data: e,
            };
          });
        }
        loading.value = false;
        console.log(nft_supply_for_owner.value);
      }, 40);
    });

    const nexPage = async () => {
      loading.value = true;
      let remaining = nft_supply_for_owner.value - tokens.values.length;
      console.log(nft_supply_for_owner.value, tokens.values.length, {
        account_id: proxy.$store.getters.account_id,
        from_index: tokens.values.length.toString(),
        limit: remaining > 10 ? 10 : remaining,
      });
      let data = await proxy.useParasApi("nft_tokens_for_owner", {
        account_id: proxy.$store.getters.account_id,
        from_index: tokens.values.length.toString(),
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
    };
    return {
      detail,
      loading,
      collectibles,
      tokens,
      nft_supply_for_owner,
      nexPage,
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
          height: 100%;
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
  .empty {
    margin-top: 100px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    img {
      width: 140px;
    }
  }
}
</style>
