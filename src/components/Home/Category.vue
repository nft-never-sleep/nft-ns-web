<template>
  <div class="Category">
    <div
      :class="get_class(item.active)"
      v-for="(item, index) in imgs"
      :key="index"
    >
      <div class="img">
        <img :src="get_img(item.img)" />
      </div>
      <div class="desc">
        {{ item.desc }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    const imgs = reactive([
      {
        img: "all.png",
        desc: "All NFTs",
        active: true,
      },
      {
        img: "game.png",
        desc: "Game",
        active: false,
      },
      {
        img: "collection.png",
        desc: "Collectibles",
        active: false,
      },
      {
        img: "music.png",
        desc: "Music",
        active: false,
      },
      {
        img: "domain.png",
        desc: "Domain Name",
        active: false,
      },
      {
        img: "nba.png",
        desc: "NBA sport",
        active: false,
      },
      {
        img: "new.png",
        desc: "New",
        active: false,
      },
      {
        img: "photography.png",
        desc: "Photography",
        active: false,
      },
      {
        img: "trading.png",
        desc: "Trading Cards",
        active: false,
      },
      {
        img: "utility.png",
        desc: "Utility",
        active: false,
      },
      {
        img: "virtual.png",
        desc: "Virtual Worlds",
        active: false,
      },
      {
        img: "3d.png",
        desc: "3D World",
        active: false,
      },
    ]);
    const get_img = (name) => require("../../assets/img/tab/" + name);
    const get_class = (active) => "tab " + (active ? "active" : "unactive");
    return {
      imgs,
      get_img,
      get_class
    };
  },
};
</script>

<style lang="scss" scoped>
.Category {
  height: 88px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  .tab {
    width: 112px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.unactive{
        .img{
            opacity: .6;
        }
        .desc{
            opacity: .2;
        }
    }
    .img {
      width: 62px;
      height: 62px;
      display: block;
      border-radius: 10px;
      overflow: hidden;
    }
    .desc {
      margin-top: 8px;
      font-family: Barlow;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>