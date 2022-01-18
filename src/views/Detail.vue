<template>
  <div class="Detail">
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
            src="http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202106/87ad8b2009c489546b5d0a9482b5f08a--164538143.jpg"
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
                <input placeholder="Amount" class="number" />
                <img src="../assets/icon/input.png" />
              </div>
            </div>
            <div class="time-input">
              <div class="input-item">
                <p class="desc">Start Time</p>
                <div class="input">
                  <n-date-picker type="datetime" clearable />
                </div>
              </div>
              <div class="input-item">
                <p class="desc">Ending Time</p>
                <div class="input">
                  <n-date-picker type="datetime" clearable />
                </div>
              </div>
            </div>
          </div>
          <div class="other">
            <div class="price">
              <p class="title">每秒价格</p>
              <p class="data">0 Near</p>
            </div>
            <div class="duration">
              <p class="title">报价时长</p>
              <p class="data">2d：14h：54m：32s</p>
            </div>
          </div>
        </div>
        <button class="confirm-btn" @click="confirm">Confirm</button>
      </div>
    </div>
    <div class="exhibition">
      <div class="image-wrap">
        <img
          src="http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202106/87ad8b2009c489546b5d0a9482b5f08a--164538143.jpg"
        />
        <div class="expand" @click="img_preview = true">
          <img src="../assets/icon/expand.png" />
        </div>
      </div>

      <div class="other-info">
        <div class="content">
          <div class="top">
            <div class="user">
              <div class="avatar">
                <img :src="nft_info.user.avatar" />
              </div>
              <div class="info">
                <p class="name">{{ nft_info.user.name }}</p>
                <p class="tag">Owner</p>
              </div>
            </div>
            <div class="like"></div>
          </div>
          <div class="nft-info">
            <p class="name">
              {{ nft_info.production_name }}
            </p>
            <p class="tag">Production name</p>
            <p class="desc">{{ nft_info.description }}</p>
            <div class="process">
              <div class="royal">
                <p class="name">Royalties:</p>
                <div class="line"></div>
                <div class="content">
                  {{ nft_info.royalties }}
                </div>
              </div>
              <div class="smart-contact">
                <p class="name">Smart contract:</p>
                <div class="line"></div>
                <div class="content">
                  {{ nft_info.royalties }}
                </div>
              </div>
              <div class="nft-link">
                <p class="name">NFT Link:</p>
                <div class="line"></div>
                <div class="content">
                  {{ nft_info.nft_link }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bid">
          <!-- 未租赁：没有人报价，新的nft还没有mint -->
          <div v-if="nft_type === 1">
            <div class="tip">报价默认为自发起后的24小时</div>
            <button @click="dialog_show = true">Bid Now</button>
          </div>
          <!-- 有报价的未租赁：有人报价，未统一，新的nft还没有mint -->
          <div v-if="nft_type === 2">
            <button @click="dialog_show = true">On sale</button>
          </div>
          <!-- 已租赁&可使用：新的nft已经mint，expired time没过期 -->
          <div v-if="nft_type === 3" class="type3">
            <button @click="dialog_show = true">Bid again</button>
            <button @click="recall">Recall</button>
          </div>
          <!-- 已租赁&不可使用：新的nft已经mint，expired time已经过期 -->
          <div v-if="nft_type === 4">
            <button @click="dialog_show = true">Bid again</button>
          </div>
        </div>
      </div>
    </div>
    <div class="other-nft">
      <p class="title">🔥Hot NFTs</p>
      <div class="card-group">
        <div class="card-wrap" v-for="(item, index) in imgs" :key="index">
          <div class="card">
            <img :src="item.img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const nft_info = reactive({
      nft_img_url: "",
      nft_link: "https:// ipfs.ajsf.5862",
      production_name: "Unic - NFT Marketplace",
      royalties: "20",
      description:
        "<link rel=preconnect href=https://fonts.gstatic.com crossorigin>",
      smart_contact: "0xsmart",
      user: {
        avatar:
          "http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202106/87ad8b2009c489546b5d0a9482b5f08a--164538143.jpg",
        name: "小王",
      },
    });
    const imgs = reactive([
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
    ]);
    const route = useRoute();
    // ? type = 1  未租赁：没有人报价，新的nft还没有mint
    // ? type = 2 有报价的未租赁：有人报价，未统一，新的nft还没有mint
    // ? type = 3 已租赁&可使用：新的nft已经mint，expired time没过期
    // ? type = 4 已租赁&不可使用：新的nft已经mint，expired time已经过期
    const nft_type = ref(1);
    const dialog_show = ref(false);

    onMounted(() => {
      const { type, data } = route.query;
      // nft_type.value = type;
      console.log(JSON.parse(data));
      nft_type.value = 4;
    });
    const confirm = () => {
      dialog_show.value = false;
    };
    return {
      nft_info, //详细nft信息
      imgs, //下方热点nft
      img_preview: ref(false), //是否显示预览图
      nft_type, //当前nft状况
      confirm,
      dialog_show,
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
              margin-left: 10px;
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
          }
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
}
</style>