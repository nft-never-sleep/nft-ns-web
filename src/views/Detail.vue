<template>
  <div class="Detail">
    <div class="exhibition">
      <div class="image-wrap">
        <img
          src="http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202106/87ad8b2009c489546b5d0a9482b5f08a--164538143.jpg"
        />
      </div>
      <div class="other-info">
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
        </div>
      </div>
    </div>
    <div class="other-nft"></div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    const nft_info = reactive({
      nft_img_url: "",
      nft_link: "",
      production_name: "Unic - NFT Marketplace",
      royalties: "20",
      smart_contact: "link",
      user: {
        avatar:
          "http://cdn-ali-img-shstaticbz.shanhutech.cn/bizhi/staticwp/202106/87ad8b2009c489546b5d0a9482b5f08a--164538143.jpg",
        name: "小王",
      },
    });
    return {
      nft_info,
    };
  },
};
</script>

<style lang="scss" scoped>
p{
    margin: 0;
}
.Detail {
  .exhibition {
    margin-top: 25px;
    height: 470px;
    display: flex;
    .image-wrap {
      width: 50%;
      border: 4px solid #fccb01;
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
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
        .name {
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
      }
    }
  }
}
</style>