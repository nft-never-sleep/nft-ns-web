<template>
  <div class="Detail">
    <div class="loading" v-if="loading">
      <img src="../assets/img/public/loading.gif" />
    </div>
    <n-modal v-model:show="img_preview">
      <div class="wrap" :style="{ position: 'relative' }">
        <img
          @click="img_preview = false"
          src="../assets/icon/delete.svg"
          :style="{
            position: 'absolute',
            cursor: 'pointer',
            right: '-40px',
            top: '-10px',
          }"
        />
        <div
          class="img-wrap"
          :style="{
            width: '670px',
            border: '4px solid #fecc00',
            borderRadius: '10px',
            overflow: 'hidden',
          }"
        >
          <img
            :style="{ width: '100%', display: 'block' }"
            :src="'https://ipfs.fleek.co/ipfs/' + NFT_INFO.metadata.media"
          />
        </div>
      </div>
    </n-modal>
    <div class="dialog-modal" v-if="dialog_show">
      <div class="dialog-card">
        <div class="title">
          {{
            nft_type === 1
              ? "Bid"
              : type === 2
              ? "On sale"
              : type === 3
              ? "Bid again"
              : "Bid again"
          }}
        </div>
        <div class="main">
          <div class="input-group">
            <div class="input-item">
              <p class="desc">Price</p>
              <div class="input custom">
                <input
                  placeholder="Amount"
                  class="number"
                  v-model="price"
                  type="number"
                />
                <img src="../assets/icon/input.png" />
              </div>
            </div>
            <div class="time-input">
              <div class="input-item">
                <p class="desc">Start Time</p>
                <div class="input">
                  <n-date-picker
                    type="datetime"
                    clearable
                    v-model:value="startTime"
                  />
                </div>
              </div>
              <div class="input-item">
                <p class="desc">Ending Time</p>
                <div class="input">
                  <n-date-picker
                    type="datetime"
                    clearable
                    v-model:value="endTime"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="other">
            <div class="price">
              <p class="title">每秒价格</p>
              <p class="data">{{ unit_price }} Near</p>
            </div>
            <div class="duration">
              <p class="title">报价时长</p>
              <p class="data">{{ duration }}</p>
            </div>
          </div>
        </div>
        <button class="confirm-btn" @click="confirm">Confirm</button>
      </div>
    </div>
    <div class="exhibition">
      <div class="image-wrap">
        <img :src="'https://ipfs.fleek.co/ipfs/' + NFT_INFO.metadata.media" />
        <div class="expand" @click="img_preview = true">
          <img src="../assets/icon/expand.png" />
        </div>
      </div>

      <div class="other-info">
        <div class="content">
          <div class="top">
            <div class="user">
              <div class="info">
                <p class="name">
                  {{ NFT_INFO.owner_id }}
                </p>
                <p class="tag">Owner</p>
              </div>
            </div>
            <div class="like">
              <div
                :class="like ? 'like' : 'dislike'"
                @click="like = !like"
              ></div>
            </div>
          </div>
          <div class="nft-info">
            <p class="name">
              {{ NFT_INFO.metadata.title }}
            </p>
            <p class="tag">Production name</p>
            <p class="desc">
              {{ NFT_INFO.metadata.description || "没有 description" }}
            </p>
            <div class="process">
              <div class="royal">
                <p class="name">Royalties:</p>
                <div class="line"></div>
                <div class="content">
                  <!-- {{ nft_info.royalties }} -->
                </div>
              </div>
              <div class="smart-contact">
                <p class="name">Smart contract:</p>
                <div class="line"></div>
                <div class="content">
                  <!-- {{ nft_info.royalties }} -->
                  paras-token-v2.testnet
                </div>
              </div>
              <div class="nft-link">
                <p class="name">NFT Link:</p>
                <div class="line"></div>
                <div class="content">
                  <!-- {{ nft_info.nft_link }} -->
                  {{ "https://ipfs.fleek.co/ipfs/" + NFT_INFO.metadata.media }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bid">
          <!-- 未租赁：没有人报价，新的nft还没有mint -->
          <!-- 有报价的未租赁：有人报价，未统一，新的nft还没有mint -->
          <!-- 已租赁&可使用：新的nft已经mint，expired time没过期 -->
          <!-- 已租赁&不可使用：新的nft已经mint，expired time已经过期 -->

          <div v-if="nft_type === '1'">
            <button @click="dialog_show = true">Bid Now</button>
          </div>
          <div v-if="nft_type === '2'">
            <button @click="dialog_show = true">On sale</button>
          </div>
          <div v-if="nft_type === '3'" class="type3">
            <button @click="dialog_show = true">Bid again</button>
            <button @click="recall">Recall</button>
          </div>
          <div v-if="nft_type === '4'">
            <button @click="dialog_show = true">Bid again</button>
          </div>

          <!-- 不属于当前账户 填写自己的出价信息 -->
          <div v-if="nft_type === 1">
            <div class="tip">报价默认为自发起后的24小时</div>
            <button @click="dialog_show = true">出价</button>
          </div>
          <!-- 当前nft有approved状态的出价，且出价人是本用户 -->
          <div v-if="nft_type === 2">
            <button @click="pay">pay</button>
          </div>
        </div>
      </div>
    </div>
    <div class="prices">
      <p class="title">Bid list</p>
      <div class="data-group">
        <div class="header">
          <div>报价者</div>
          <div>报价金额</div>
          <div>报价结束时间</div>
          <div>租赁开始时间</div>
          <div>报价状态</div>
          <div class="operate" v-if="nft_type === 5">操作</div>
        </div>
        <div class="item" v-for="(item, index) in nft_bids.values" :key="index">
          <div>{{ item.bid_from }}</div>
          <div>{{ item.amount }}</div>
          <div>{{ $moment(item.lasts * 1000).format("yyyy/MM/DD hh:mm") }}</div>
          <div>
            {{ $moment(item.start_at * 1000).format("yyyy/MM/DD hh:mm") }}
          </div>
          <div>{{ item.bid_state }}</div>
          <div v-if="nft_type === 5" class="operate-btns">
            <button @click="() => unAgree(index)" :disabled="is_bided">
              Refuse
            </button>
            <button @click="() => agree(index)" :disabled="is_bided">
              Agree
            </button>
          </div>
          <!-- {{ item.src_nft_id }}{{ item.src_nft_id }} -->
        </div>
        <n-empty
          description="暂无报价"
          v-if="Object.keys(nft_bids.values).length === 0"
        >
        </n-empty>
      </div>
    </div>
    <div class="other-nft">
      <p class="title">🔥Hot NFTs</p>
      <div class="card-group">
        <div
          class="card-wrap"
          v-for="(item, index) in imgs.values"
          :key="index"
        >
          <div class="card">
            <img :src="item.img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRef, toRefs, computed, toRaw } from "@vue/reactivity";
import { getCurrentInstance } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const { proxy } = getCurrentInstance(); //vue
    const loading = ref(true); //loading
    const nft_info = reactive({}); //nft信息
    const imgs = reactive([]); //下方热门nft
    const route = useRoute(); //路由
    const is_bided = ref(false); //是否已经出借

    const nft_type = ref(1);
    const dialog_show = ref(false); //出价对话框
    // 展示的信息
    let NFT_INFO = reactive({
      owner_id: "id",
      metadata: {
        title: "title",
      },
    });
    let nft_bids = reactive([]); //报价信息
    onMounted(() => {
      setTimeout(async () => {
        // ---------------在进入页面是通过params获取nft的token_id然后从链侧获取nft信息
        nft_info.values = await proxy.useParasApi("nft_token", {
          token_id: route.params.token_id,
        });
        console.log(nft_info.values);
        // ----------------在进入页面是通过params获取nft的token_id然后从链侧获取nft信息

        //----------没有热门fnt接口直接获取随机连续nft
        const hot_nft = await proxy.useParasApi("nft_tokens", {
          from_index: Math.ceil(Math.random() * 30).toString(),
          limit: 6,
        });
        //----------没有热门fnt接口直接获取随机连续nft

        // ? nft_info.values.owner_id === this.$near.user.accountId  为自己的nft

        //----------获得出价信息
        let parasContract =
          process.env.NODE_ENV === "development"
            ? "paras-token-v2.testnet"
            : "x.paras.near";
        // 获取该nft的报价信息
        nft_bids.values = await proxy.useNnsApi("list_bids_by_nft", {
          nft_id: parasContract + ":" + route.params.token_id,
        });
        for (let item in nft_bids.values) {
          if (nft_bids.values[item].bid_state === 'Expired') {
            delete nft_bids.values[item]
          }
        }
        for (let item in nft_bids.values) {
          // 已经出借
          if (toRaw(nft_bids.values[item]).bid_state === "Consumed") {
            is_bided.value = true;
            break;
          }
        }
        //----------获得出价信息

        if (nft_info.values.owner_id === proxy.$near.user.accountId) {
          console.log("your nft");
          // 这里是属于自己的nft
          nft_type.value = 5;
        } else {
          //不是属于自己的nft
          nft_type.value = 1;
          // 判断是否nft的状态为同意出价 bid_state=Approved 且bid_from为当前用户
          for (let item in nft_bids.values) {
            let _item = toRaw(nft_bids.values[item]);
            if (
              _item.bid_state === "Approved" &&
              _item.bid_from === proxy.$store.getters.account_id
            ) {
              console.log("该nft是当前账户出价且卖家已经同意出价");
              nft_type.value = 2;
            }
          }
        }
        // 热门nft
        imgs.values = hot_nft.map((e) => {
          return {
            img: "https://ipfs.fleek.co/ipfs/" + e.metadata.media,
            title: e.metadata.title,
          };
        });

        // let { type, data } = route.params;
        // const _data = JSON.parse(data);
        // console.log(_data);
        // console.log(type);
        // nft_type.value = type || 1;
        // NFT_INFO.values= nft_info.values
        NFT_INFO.owner_id = toRaw(nft_info.values).owner_id;
        NFT_INFO.token_id = toRaw(nft_info.values).token_id;
        NFT_INFO.metadata = toRaw(nft_info.values).metadata;
        NFT_INFO.approved_account_ids = toRaw(
          nft_info.values
        ).approved_account_ids;
        loading.value = false;
      }, 40);
    });

    //提出报价
    const price = ref("0");
    const startTime = ref(proxy.$moment().toDate());
    const endTime = ref(proxy.$moment().add(7, "d").toDate());
    const duration = computed(() => {
      let D = proxy.$moment(endTime.value).diff(startTime.value, "days");
      let HH = proxy.$moment(endTime.value).diff(startTime.value, "HH") % 24;
      let mm = proxy.$moment(endTime.value).diff(startTime.value, "mm") % 60;
      let ss = proxy.$moment(endTime.value).diff(startTime.value, "ss") % 60;
      return `${D}d:${HH}h:${mm}m:${ss}s`;
    });
    const unit_price = computed(() => {
      let data =
        Number(price.value) /
        proxy.$moment(endTime.value).diff(startTime.value, "ss");
      return data.toFixed(10);
    });
    const confirm = async () => {
      let parasContract =
        process.env.NODE_ENV === "development"
          ? "paras-token-v2.testnet"
          : "x.paras.near";
      let data = {
        nft_id: route.params.token_id,
        bid_info: {
          src_nft_id: parasContract + ":" + route.params.token_id,
          orgin_owner: nft_info.values.owner_id,
          start_at: parseInt(proxy.$moment(startTime.value).format("X")),
          lasts: parseInt(
            proxy
              .$moment(endTime.value)
              .diff(proxy.$moment(startTime.value), "X")
          ),
          amount: proxy.digitalProcessing(price.value),
          msg: "",
          bid_from: proxy.$near.user.accountId,
        },
      };
      await proxy.useNnsApi(
        "offer_bid",
        data,
        "300000000000000",
        "1000000000000000000000000"
      );
      dialog_show.value = false;
    };

    // 同意报价
    const agree = async (key) => {
      let data = {
        bid_id: Number(key),
        opinion: true,
      };
      await proxy.useNnsApi("take_offer", data, "300000000000000", "1");
    };

    // 拒绝报价
    const unAgree = async (key) => {
      let data = {
        bid_id: Number(key),
        opinion: false,
      };
      await proxy.useNnsApi("take_offer", data, "300000000000000", "1");
    };

    // 同意报价后租借者确认支付
    const pay = async () => {
      let data = {
        bid_id: 5,
      };
      let near = 0;
      for (const key in bid_state.values) {
        if (
          bid_state.values[key].bid_state === "Approved" &&
          bid_state.values[key].bid_from === this.$near.user.accountId
        ) {
          near =
            Number(bid_state.values[key].amount) * 1000000000000000000000000;
          await proxy.useNnsApi(
            "claim_nft",
            data,
            "300000000000000",
            near.toString()
          );
        }
      }
    };
    const like = ref(false);
    return {
      like, //右上角的喜欢
      NFT_INFO,
      // nft_info, //详细nft信息
      imgs, //下方热点nft
      img_preview: ref(false), //是否显示预览图
      nft_type, //当前nft状况
      confirm,
      dialog_show,
      price,
      startTime,
      endTime,
      duration,
      unit_price,
      loading,
      nft_bids,
      agree,
      unAgree,
      pay,
      is_bided,
    };
  },
};
</script>

<style lang="scss">
p {
  margin: 0;
}
.Detail {
  .exhibition {
    margin-top: 25px;
    height: 470px;
    display: flex;
    justify-content: space-between;
    .image-wrap {
      width: 48%;
      border: 4px solid #fccb01;
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      .expand {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.4);
        padding: 6px;
        border-radius: 5px;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      img {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .other-info {
      width: 50%;
      background: #fff5d6;
      border-radius: 10px;
      box-sizing: border-box;
      padding-left: 22.95px;
      padding-right: 29px;
      padding-top: 29px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      & > .content {
        flex: 1;
        .top {
          display: flex;
          justify-content: space-between;
          .user {
            height: 34px;
            display: flex;
            .avatar {
              width: 34px;
              height: 34px;
              border-radius: 50%;
              overflow: hidden;
              img {
                object-fit: cover;
              }
            }
            .info {
              height: 100%;
              display: flex;
              flex-direction: column;
              margin-top: 2px;
              p {
                margin: 0;
                &.name {
                  font-family: Barlow;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 16px;
                  line-height: 16px;
                }
                &.tag {
                  font-family: Barlow;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 16px;
                  opacity: 0.5;
                }
              }
            }
          }
          & > .like {
            & > div {
              margin-left: 8px;
              display: inline-block;
              width: 24.19px;
              height: 20.56px;
              background-image: url("../assets/img/public/unactive-like.png");
              background-size: 100%;
            }
            & > .like {
              background-image: url("../assets/img/public/active-like.png");
            }
          }
        }
        .nft-info {
          & > .name {
            font-family: Barlow;
            font-style: normal;
            font-weight: 800;
            font-size: 30px;
            line-height: 30px;
            color: #000000;
            margin-bottom: 0;
            margin-top: 28px;
          }

          .tag {
            font-family: Barlow;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;
            color: #000000;
            opacity: 0.5;
            margin-top: 5px;
          }
          .desc {
            font-family: Barlow;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height, or 150% */
            margin-top: 25px;
            color: #000000;
          }
          .process {
            width: 474px;

            & > div {
              display: flex;
              height: 16px;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
              &::before {
                content: "";
                display: block;
                border-radius: 50%;
                height: 14px;
                width: 14px;
                background-color: black;
              }
              &.royal {
                &::before {
                  background: #f7941d;
                }
              }
              &.smart-contact {
                &::before {
                  background: rgba(255, 50, 50, 0.7);
                }
              }
              &.nft-link {
                &::before {
                  background: #2af192;
                }
              }
              .content {
                max-width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .name {
                margin-left: 10px;
                font-family: Barlow;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;
                /* identical to box height, or 114% */

                text-align: center;

                color: rgba(0, 0, 0, 0.7);
              }
              .line {
                flex: 1;
                border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
                height: 100%;
                transform: translateY(-8px);
                margin: 0 6px;
              }
              .content {
              }
            }
          }
        }
      }

      .bid {
        .tip {
          font-family: Barlow;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          /* identical to box height */

          color: #a29571;
        }
        button {
          margin-top: 16px;
          cursor: pointer;
          outline: none;
          border: none;
          width: 155.71px;
          height: 42px;
          display: block;
          background: #fecc00;
          border-radius: 10px;
          font-family: Barlow;
          font-style: normal;
          font-weight: 600;
          font-size: 15px;

          text-align: center;

          color: #000000;
        }
        .type3 {
          display: flex;
          button {
            &:nth-of-type(2) {
              background-color: transparent;
              border: 1px solid #000000;
              margin-left: 16.88px;
            }
          }
        }
      }
    }
  }
  .other-nft {
    .title {
      margin-top: 20px;
      font-family: Barlow;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 30px;
      color: #000000;
    }
    .card-group {
      margin-top: 12px;

      background: #fff5d6;
      padding: 16px;
      display: flex;
      .card-wrap {
        width: 16.66667%;
        .card {
          width: 200px;
          height: 250px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  .prices {
    .title {
      margin-top: 20px;
      font-family: Barlow;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 30px;
      color: #000000;
    }
    .data-group {
      margin-top: 10px;
      background-color: #fff5d6;
      padding-bottom: 50px;

      & > div {
        display: flex;
        & > div {
          flex: 1;
          padding: 0 27px;
        }
        &.header {
          height: 53px;
          line-height: 53px;
          font-family: Barlow;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          color: #4d4a40;
        }
        &.item {
          height: 34.73px;
          display: flex;
          align-items: center;
          font-family: Barlow;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 14px;
          color: #000000;
          &:hover {
            background-color: #fff1c6;
          }
          .operate-btns {
            button {
              width: 71.7px;
              height: 30px;
              border: none;
              background-color: transparent;
              outline: none;
              box-sizing: border-box;
              border-radius: 5px;
              cursor: pointer;
              &:first-of-type {
                border: 1px solid #000000;
              }
              &:last-of-type {
                background: #fecc00;
                margin-left: 9px;
              }
            }
          }
          // &:last-of-type {
          //   width: 1px;
          //   flex: auto;
          // }
        }
      }
    }
  }
  .wrap {
    width: 688.2px;
    .img {
      width: 100%;
    }
  }
  .dialog-modal {
    z-index: 999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .dialog-card {
      width: 300px;
      height: 336px;
      background-color: white;
      border: 4px solid #fccb01;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-family: Barlow;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 14px;
        color: #000000;
      }
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .input-group {
          .input-item {
            position: relative;
            margin-top: 21px;
            .desc {
              font-family: Barlow;
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              color: #333333;
            }
            .input.custom {
              // 自定义的input区域需要
              &::before {
                content: "";
                display: block;
                position: absolute;
                height: 10px;
                width: 2px;
                background-color: #f7941d;
                left: 12px;
                bottom: 12px;
              }
              input.number {
                box-sizing: border-box;
                padding: 0 19px;
                width: 100%;
                outline: none;
                height: 34px;
                border: 1px solid #fde47c;
                border-radius: 6px;
                color: #333333;
                font-family: Barlow;
                font-style: normal;
                font-weight: bold;
                font-size: 16px;
                &:focus-visible {
                  border: 1px solid #fde47c;
                }
              }
              img {
                position: absolute;
                right: 10px;
                bottom: 8px;
              }
            }
          }
          .time-input {
            display: flex;
            .input-item {
              &:nth-of-type(1) {
                margin-right: 5px;
              }
              &:nth-of-type(2) {
                margin-left: 5px;
              }
            }
          }
        }
        .other {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          .duration,
          .price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
            .title {
              font-family: Barlow;
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
            }
            .data {
              color: #0c9f59;
            }
          }
        }
      }

      .confirm-btn {
        cursor: pointer;
        height: 42px;
        line-height: 42px;
        outline: none;
        border: none;
        background: #fecc00;
        border-radius: 10px;
        font-family: Barlow;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        color: #000000;
      }
    }
  }
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    /* text-align: center; */
    align-items: center;
    justify-content: center;
    img {
      width: 140px;
    }
  }
}
</style>