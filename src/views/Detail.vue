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

    <n-modal v-model:show="dialog_show">
      <div class="dialog-card">
        <div class="title">
          {{ nft_type === 5 ? "On Sale" : "Bid" }}
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
                  <n-config-provider :locale="locale" :date-locale="dateLocale">
                    <n-date-picker
                      type="datetime"
                      clearable
                      v-model:value="startTime"
                    />
                  </n-config-provider>
                </div>
              </div>
              <div class="input-item">
                <p class="desc">End Time</p>
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
              <p class="title">Price per second</p>
              <p class="data">{{ unit_price }} Near</p>
            </div>
            <div class="duration">
              <!-- <p class="title">报价时长</p> -->
              <p class="title">Duration</p>
              <p class="data">{{ duration }}</p>
            </div>
          </div>
        </div>
        <button class="confirm-btn" @click="confirm">Confirm</button>
      </div>
    </n-modal>

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
                  <!--  -->
                  {{ is_consumed ? consume_info.bid_from : NFT_INFO.owner_id }}
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
            <div class="general-info">
              <div class="left">
                <p class="name">
                  {{ NFT_INFO.metadata.title }}
                </p>
                <p class="tag">Production name</p>
              </div>
              <!-- 有消费展示 -->
              <div class="right" v-if="is_consumed">
                <div class="near">
                  <div class="head">
                    <p>
                      {{ (consume_info.amount / 1e24).toFixed(4) }}
                    </p>
                    <img src="../assets/img/public/near.png" />
                  </div>
                  <div class="desc">Lease price</div>
                </div>
                <div class="period">
                  <div class="head">
                    <p>{{ consume_info.lasts }}s</p>
                  </div>
                  <div class="desc">Lease period</div>
                </div>
              </div>
            </div>

            <p class="desc">
              {{ NFT_INFO.metadata.description || "No description" }}
            </p>
            <div class="process">
              <div class="royal">
                <p class="name">Royalties:</p>
                <div class="line"></div>
                <div class="content">
                  {{ "0%" }}
                </div>
              </div>
              <div class="smart-contact">
                <p class="name">Smart contract:</p>
                <div class="line"></div>
                <div class="content">
                  <!-- {{ nft_info.royalties }} -->
                  paras-token-v2.testnet
                </div>
                <img
                  class="copy"
                  src="../assets/img/public/copy.png"
                  @click="() => copy('paras-token-v2.testnet')"
                />
              </div>
              <div class="nft-link">
                <p class="name">NFT Link:</p>
                <div class="line"></div>
                <div class="content">
                  <!-- {{ nft_info.nft_link }} -->
                  <a
                    :href="
                      'https://ipfs.fleek.co/ipfs/' + NFT_INFO.metadata.media
                    "
                  >
                    {{
                      "https://ipfs.fleek.co/ipfs/" + NFT_INFO.metadata.media
                    }}
                  </a>
                </div>
                <img
                  class="copy"
                  src="../assets/img/public/copy.png"
                  @click="
                    () =>
                      copy(
                        'https://ipfs.fleek.co/ipfs/' + NFT_INFO.metadata.media
                      )
                  "
                />
              </div>
              <!-- 只有出价列表里有才展示这个数据 -->
              <template v-if="is_consumed">
                <div class="start-time">
                  <p class="name">Lease commencement date:</p>
                  <div class="line"></div>
                  <div class="content">
                    <!-- {{ nft_info.royalties }} -->
                    {{
                      $moment(consume_info.start_at * 1000).format(
                        "yyyy/MM/DD HH:mm"
                      )
                    }}
                  </div>
                </div>
                <div class="expire-time">
                  <p class="name">Lease expiry time:</p>
                  <div class="line"></div>
                  <div class="content">
                    <!-- {{ nft_info.royalties }} -->
                    {{
                      $moment(
                        (consume_info.start_at + consume_info.lasts) * 1000
                      ).format("yyyy/MM/DD HH:mm")
                    }}
                  </div>
                </div>
                <div class="per-seconds-price">
                  <p class="name">The price per second:</p>
                  <div class="line"></div>
                  <div class="content">
                    <!-- {{ nft_info.royalties }} -->
                    {{
                      consume_info.amount > 1e20
                        ? (
                            consume_info.amount /
                            1e23 /
                            consume_info.lasts
                          ).toFixed(10) + "NEAR"
                        : consume_info.amount / consume_info.lasts +
                          " yocto NEAR"
                    }}
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="bid">
          <!-- 不属于当前账户 填写自己的出价信息 -->
          <div v-if="nft_type === 1">
            <div class="tip">
              The default quotation is 24 hours after initiation
            </div>
            <button
              @click="dialog_show = true"
              :disabled="is_approved || is_consumed"
            >
              Offer a price
            </button>
          </div>
          <!-- 当前nft有approved状态的出价，且出价人是本用户 -->
          <div v-if="nft_type === 2">
            <button @click="pay">Pay</button>
          </div>
          <!-- 当前nft是本人，且有一个报价在process -->
          <div v-if="nft_type === 3" class="type3">
            <button @click="dialog_show = true">Bid again</button>
            <button @click="recall">Recall</button>
          </div>
          <!-- 持有者 origin_owner是本人 点击展示on sale -->
          <div v-if="nft_type === 5">
            <button @click="dialog_show = true">On Sale</button>
          </div>
        </div>
      </div>
    </div>
    <div class="prices">
      <p class="title">Bid list</p>
      <div class="data-group">
        <div class="header">
          <div>Bidder</div>
          <div>Amount (NEAR)</div>
          <div>Duration</div>
          <div>Lease start time</div>
          <div>Status</div>
          <div class="operate" v-if="nft_type === 5">Operate</div>
        </div>
        <div class="item" v-for="(item, index) in nft_bids.values" :key="index">
          <div>{{ item.bid_from }}</div>
          <div>
            {{ (item.amount / 1e24).toFixed(4) }}
          </div>
          <div>
            <!-- {{ $moment(item.lasts * 1000).format("yyyy/MM/DD hh:mm") }} -->
            {{
              (() => {
                const days = Math.floor(
                  $moment.duration(item.lasts * 1000).asDays()
                );
                const hh = Math.floor(
                  (item.lasts - days * 24 * 60 * 60) / 60 / 60
                );
                const mm = Math.floor(
                  (item.lasts - days * 24 * 60 * 60 - hh * 60 * 60) / 60
                );
                const ss = Math.floor(
                  item.lasts - days * 24 * 60 * 60 - hh * 60 * 60 - mm * 60
                );
                return `${days}d:${hh}h:${mm}m:${ss}s`;
              })()
            }}
          </div>
          <div>
            {{ $moment(item.start_at * 1000).format("yyyy/MM/DD HH:mm") }}
          </div>
          <div>{{ item.expired ? "Expired" : item.bid_state }}</div>
          <div v-if="nft_type === 5" class="operate-btns">
            <button
              @click="() => unAgree(index)"
              :disabled="
                is_approved || is_consumed || item.bid_state === 'Rejected'
              "
            >
              Refuse
            </button>
            <button
              @click="() => agree(index)"
              :disabled="
                is_approved || is_consumed || item.bid_state === 'Rejected'
              "
            >
              Agree
            </button>
          </div>
          <!-- {{ is_approved || is_consumed || item.bid_state === 'Rejected'}} -->
          <!-- {{ item.src_nft_id }}{{ item.src_nft_id }} -->
        </div>
        <n-empty
          description="No quotation"
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
import { useMessage } from "naive-ui";
import { useDialog } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
export default {
  setup() {
    const { proxy } = getCurrentInstance(); //vue
    const loading = ref(true); //loading
    const message = useMessage();
    const nft_info = reactive({}); //nft信息
    const imgs = reactive([]); //下方热门nft
    const route = useRoute(); //路由
    const is_approved = ref(false); //是否有同意出价阶段的nft报价
    const is_consumed = ref(false); //是否有已经消费的nft
    let consume_info = reactive({}); //消费/租借信息
    const nft_type = ref(1);
    const dialog = useDialog();
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
        console.log(nft_bids.values);
        for (let item in nft_bids.values) {
          // 计算持续时间加上开始时间是否过期
          if (
            (nft_bids.values[item].lasts + nft_bids.values[item].start_at) *
              1000 <
            new Date().getTime()
          ) {
            delete nft_bids.values[item];
          }
        }
        for (let item in nft_bids.values) {
          const _item = toRaw(nft_bids.values[item]);

          if (_item.bid_state === "Approved") {
            // 已经至少有一条记录是赞同出价
            is_approved.value = true;
          }
          // 已经有一条记录是出借
          if (_item.bid_state === "Consumed") {
            console.log(_item);
            consume_info.amount = _item.amount;
            consume_info.bid_from = _item.bid_from;
            consume_info.bid_state = _item.bid_state;
            consume_info.lasts = _item.lasts;
            consume_info.msg = _item.msg;
            consume_info.orgin_owner = _item.orgin_owner;
            consume_info.src_nft_id = _item.src_nft_id;
            consume_info.start_at = _item.start_at;
            is_consumed.value = true; //
          }
        }
        //----------获得出价信息
        if (nft_info.values.owner_id === proxy.$near.user.accountId) {
          console.log("这是属于本人的nft");
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
            if (
              _item.bid_from === proxy.$near.user.accountId &&
              _item.bid_state === "InProgress"
            ) {
              nft_type.value = 3;
              console.log("这是本人出价的nft且状态为Inprocess");
            }
            if (
              _item.bid_from === proxy.$near.user.accountId &&
              _item.bid_state === "Consumed"
            ) {
              nft_type.value = 4;
              console.log("这是本人出价的nft且状态为consumed");
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
        console.log(nft_info.values);
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
      let start = new Date(startTime.value);
      let end = new Date(endTime.value);
      let D = proxy.$moment(end).diff(proxy.$moment(start), "days");
      let HH = proxy.$moment(end).diff(proxy.$moment(start), "h") % 24;
      let mm = proxy.$moment(end).diff(proxy.$moment(start), "m") % 60;
      let ss = proxy.$moment(end).diff(proxy.$moment(start), "s") % 60;
      return `${D}d:${HH}h:${mm}m:${ss}s`;
    });
    const unit_price = computed(() => {
      let start = new Date(startTime.value);
      let end = new Date(endTime.value);
      let data = Number(price.value) / proxy.$moment(end).diff(start, "s");
      return data.toFixed(10);
    });
    const confirm = async () => {
      if (nft_type.value === 5) {
        dialog.success({
          title: "Comming Soon....",
          content: "Functionality under development",
          positiveText: "OK",
        });
        dialog_show.value = false;

        return false;
      }

      // 数字合法性
      if (Number(proxy.digitalProcessing(price.value)) <= 0) {
        message.warning("The bidder's price cannot be zero");
        return false;
      }
      // 数字合法性

      let parasContract =
        process.env.NODE_ENV === "development"
          ? "paras-token-v2.testnet"
          : "x.paras.near";
      let start = new Date(startTime.value);
      let end = new Date(endTime.value);
      let data = {
        nft_id: route.params.token_id,
        bid_info: {
          src_nft_id: parasContract + ":" + route.params.token_id,
          orgin_owner: nft_info.values.owner_id,
          start_at: parseInt(proxy.$moment(start).format("X")),
          lasts: parseInt(proxy.$moment(end).diff(proxy.$moment(start), "s")),
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
      let near = 0;
      for (const key in nft_bids.values) {
        if (
          nft_bids.values[key].bid_state === "Approved" &&
          nft_bids.values[key].bid_from === proxy.$near.user.accountId
        ) {
          console.log(key);
          let data = {
            bid_id: parseInt(key),
          };
          console.log(nft_bids.values[key].amount);
          await proxy.useNnsApi(
            "claim_nft",
            data,
            "300000000000000",
            nft_bids.values[key].amount
          );
        }
      }
    };
    const like = ref(false);
    const copy = (text) => {
      // 复制方法
      if (document.queryCommandSupported("copy")) {
        var input = document.createElement("textarea");
        document.body.appendChild(input);
        input.value = text;
        input.select();
        if (document.queryCommandEnabled("copy")) {
          // 执行 copy 命令
          var success = document.execCommand("copy");
          input.remove();
          console.log("Copy Ok");
          // console.log(this.$snackbar);
          message.success("Copy success");
          return true;
        } else {
          console.log("queryCommandEnabled is false");
          message.warning(
            "The browser does not support this operation. Save the NFT information manually"
          );
          return false;
        }
      } else {
        console.log("当前浏览器不支持 copy命令");
        message.warning(
          "The browser does not support this operation. Save the NFT information manually"
        );
        return false;
      }
    };
    const recall = () => {
      dialog.warning({
        title: "Waring",
        content: "Are you sure you want to withdraw your offer？",
        positiveText: "Sure",
        negativeText: "Cancel",
        onPositiveClick: () => {
          message.success("Recall success");
        },
        onNegativeClick: () => {
          // message.error("不确定");
        },
      });
    };
    return {
      zhCN, //i18n
      dateZhCN, //i18n
      locale: ref(null), //i18n
      dateLocale: ref(null), //i18n
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
      is_approved,
      is_consumed,
      consume_info,
      copy,
      recall,
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
          & > .general-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
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
              & .desc {
                font-family: Barlow;
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                /* identical to box height, or 150% */
                margin-top: 25px;
                color: #000000;
              }
            }
            .right {
              margin-top: 20px;
              display: flex;
              height: 50px;

              & > div {
                height: 50px;
                display: flex;
                align-items: center;

                flex-direction: column;
                justify-content: space-between;
                &.period {
                  margin-left: 50px;
                }
                .head {
                  height: 30px;
                  display: flex;
                  align-items: center;
                  font-family: Barlow;
                  font-style: normal;
                  font-weight: 800;
                  font-size: 30px;
                  line-height: 30px;
                  img {
                    margin-left: 8px;
                  }
                  span {
                    font-size: 8px;
                    color: #4d4a40;
                  }
                }
                .desc {
                  font-family: Barlow;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 16px;
                  color: #000000;
                  opacity: 0.5;
                  text-align: left;
                  width: 100%;
                }
              }
            }
          }
          & > .desc {
            font-family: Barlow;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            /* identical to box height, or 150% */
            margin-top: 25px;
            color: #000000;
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
                img {
                  cursor: pointer;
                  margin-left: 10px;
                }
              }
              &.nft-link {
                &::before {
                  background: #2af192;
                }
                img {
                  cursor: pointer;
                  margin-left: 10px;
                }
              }
              &.start-time {
                &::before {
                  background: #2a3ef1;
                }
              }
              &.expire-time,
              &.per-seconds-price {
                &::before {
                  background: #000000;
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
          &:disabled {
            opacity: 0.5;
          }
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
                &:disabled {
                  border: 1px solid #ddd;
                }
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