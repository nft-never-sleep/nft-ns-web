<template>
  <n-spin :show="loading">
    <div class="card-group">
      <div
        class="card-wrap"
        v-for="(item, index) in collectibles.values"
        :key="index"
        @click="() => detail(index)"
      >
        <div :class="'card ' + (item.price ? 'price' : '')">
          <div class="top">
            <div class="mask">
              <img src="../assets/img/public/price.png" />
            </div>
            <img :src="item.img" />
          </div>
          <!-- <div class="bottom">
            <button>On Sale</button>
          </div> -->
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
import { getCurrentInstance, onMounted, ref, reactive, toRaw } from "vue";
export default {
  mixins: [chainMixin],
  setup() {
    const router = useRouter();

    const { proxy } = getCurrentInstance();
    const tokens = reactive([]);
    const collectibles = reactive([]);
    const loading = ref(true);
    const detail = (index) => {
      const { token_id } = collectibles.values[index].data;
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
        nft_supply_for_owner.value = parseInt(nft_supply_for_owner.value);
        if (nft_supply_for_owner.value !== 0) {
          tokens.values = await proxy.useParasApi("nft_tokens_for_owner", {
            account_id: proxy.$store.getters.account_id,
            from_index: "0",
            limit:
              nft_supply_for_owner.value > 10 ? 10 : nft_supply_for_owner.value,
          });

          //------------ 获得拥有的每一个nft的报价列表
          // let have_price_group = []; //有报价的nft索引值
          let parasContract =
            process.env.NODE_ENV === "development"
              ? "paras-token-v2.testnet"
              : "x.paras.near";
          const token_ids = toRaw(tokens.values).map((e) => e.token_id);
          const result = await Promise.all(
            token_ids.map((e) => {
              return proxy.useNnsApi("list_bids_by_nft", {
                nft_id: parasContract + ":" + e,
              });
            })
          );
          console.log("promise all", result);
          // result.forEach((e, i) => {
          //   if (Object.keys(e).length > 0) {
          //     have_price_group.push(i);
          //   }
          // });
          //------------ 获得拥有的每一个nft的报价列表

          collectibles.values = tokens.values.map((e, i) => {
            return {
              img: media_base_url + e.metadata.media,
              title: e.metadata.title,
              data: e,
              price: Object.keys(result[i]).length > 0,
            };
          });
          loading.value = false;
          console.log(nft_supply_for_owner.value);
        } else {
          loading.value = false;
        }
      }, 40);
    });

    const nexPage = async () => {
      if (collectibles.values.length < nft_supply_for_owner.value) {
        loading.value = true;
        let remaining = nft_supply_for_owner.value - collectibles.values.length;
        let data = await proxy.useParasApi("nft_tokens_for_owner", {
          account_id: proxy.$store.getters.account_id,
          from_index: collectibles.values.length.toString(),
          limit: remaining > 10 ? 10 : remaining,
        });
        const token_ids = data.map((e) => e.token_id); //获得新的tokens_id
        let parasContract =
          process.env.NODE_ENV === "development"
            ? "paras-token-v2.testnet"
            : "x.paras.near";
        // 获得每一个nft的报价列表
        const result = await Promise.all(
          token_ids.map((e) => {
            return proxy.useNnsApi("list_bids_by_nft", {
              nft_id: parasContract + ":" + e,
            });
          })
        );

        // console.log(have_price_group);
        // result.forEach
        let newData = data.map((e, i) => {
          console.log(result[i]);
          return {
            img: media_base_url + e.metadata.media,
            title: e.metadata.title,
            data: e,
            price: Object.keys(result[i]).length > 0,
          };
        });

        collectibles.values.push(...newData); //添加新数据
        console.log(token_ids);

        loading.value = false;
      }
    };
    window.nexPageCollectible = nexPage;
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
      overflow: hidden;
      box-sizing: border-box;
      padding: 16px;
      transition: 0.3s;
      margin-top: 16px;
      transform: translateY(0);
      .mask {
        display: none;
      }
      &.price {
        .mask {
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          img {
            width: 42px;
            height: auto;
          }
        }
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
        position: relative;

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
