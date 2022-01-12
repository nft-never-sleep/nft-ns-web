<template>
  <div class="tab-group">
    <router-link to="collectible" class="tab">My Collectibles</router-link>
    <router-link to="browse" class="tab">Browse by category</router-link>
    <router-link to="recent" class="tab">Recent activity</router-link>
  </div>
</template>
  <script >
import { ref, watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
export default {
  setup() {
    const num = ref();
    // const num = ref(0);
    // // watch(要侦听的数据,回调函数)
    // watch(num, (v1, v2) => {
    //   // v1 是改变以后的新值
    //   // v2 是改变前的值
    //   console.log(v1, v2);
    //   // 要点：侦听普通函数可以获取修改前后的值，被侦听的数据必须是响应式的
    // });
    // // 单机事件
    // const butFn = () => {
    //   num.value++;
    // };

    // return { butFn, num };
    onBeforeRouteUpdate((to) => {
      console.log(to.fullPath, "=====");
    });
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
  height: 82px;
  line-height: 82px;
  display: flex;
  justify-content: space-between;
  .tab {
    background: rgba(255, 172, 50, 0.3);
    border-radius: 40px;
    display: block;
    width: 527px;
    text-align: center;
    color: #898397;
    font-size: 48px;
    text-decoration: none;
  }
}
</style>