<template>
  <div class="tab-group">
    <!-- <router-link to="collectible" class="tab active"
      >My Collectibles</router-link
    >
    <router-link to="browse" class="tab unactive"
      >Browse by category</router-link
    >
    <router-link to="recent" class="tab unactive">Recent activity</router-link> -->
    <div v-for="(item, i) in routes" :key="i" :class="get_class(item)">
      <router-link :to="item.to" :class="get_class(item)">{{
        item.desc
      }}</router-link>
    </div>
  </div>
</template>
  <script >
import { reactive, ref } from "@vue/reactivity";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  methods: {},
  setup() {
    const routes = reactive([
      { to: "collectible", desc: "My Collectibles", active: true },
      { to: "browse", desc: "Browse by category", active: false },
      { to: "recent", desc: "Recent activity", active: false },
    ]);
    onBeforeRouteUpdate((to) => {
      console.log(to.fullPath.substr(1), "=====");
      routes.forEach((e, i) => {
        console.log();
        if (e.to === to.fullPath.substr(1)) {
          routes[i].active = true;
        }else{
          routes[i].active = false;
          
        }
      });
    });
    const get_class = (item) => "tab " + (item.active ? "active" : "unactive");
    return {
      routes,
      get_class,
    };
  },
};
// export default {
//   name: "Tabbar",
//   mounted() {
//     console.log(this.$route);
//   },
//   watch: {
//     $router(to) {
//       console.log(1);
//     },
//   },
// };
//

// //通过useRouter()获取路由器的实例
// const router = useRouter();
// backToHome(){
//   router.push("/");
// };

// //route是响应式对象，可监控其变化，需要用useRoute()获取
// const route = useRoute();
// watch(
//   () => route.query,
//   (query) => {
//     console.log(query);
//   }
// );
</script>


<style lang="scss" scoped>
.tab-group {
  width: 533px;
  height: 82px;
  line-height: 82px;
  display: flex;
  justify-content: space-between;
  margin-top: 27px;
  .tab {
    display: block;
    border-radius: 10px;
    width: 155.71px;
    height: 42px;
    text-align: center;

    font-size: 15px;
    line-height: 42px;
    font-family: Barlow;
    text-decoration: none;
    background: #fecc00;

    &.unactive {
      opacity: 0.2;
      font-family: Barlow;
      font-weight: normal;
      color: #000000;
      opacity: 0.5;
    }
    &.active {
      color: #000000;
      font-weight: 600;
    }
  }
}
</style>