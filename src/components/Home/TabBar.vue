<template>
  <div>
    <n-modal :show="tip_show">
      <div class="tip">
        <img src="../../assets/img/public/no-link.png" />
        <button @click="logoin">Connect wallet</button>
      </div>
    </n-modal>
    <div class="tab-group">
      <div v-for="(item, i) in routes" :key="i" :class="get_class(item)">
        <router-link :to="item.to" :class="get_class(item)">{{
          item.desc
        }}</router-link>
      </div>
    </div>
  </div>
</template>
<script >
import { useStore } from "vuex";
import { reactive, ref } from "@vue/reactivity";
import { onMounted , getCurrentInstance , toRaw} from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
export default {
  methods: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const tip_show = ref(false);
    const routes = reactive([
      { to: "browse", desc: "Browse by category", active:  true },
      { to: "collectible", desc: "My Collectibles", active: false},
      { to: "recent", desc: "Recent activity", active: false },
    ]);
    const set_cur_active_route = (path) => {
      routes.forEach((e, i) => {
        if (e.to === path) {
          routes[i].active = true;
        } else {
          routes[i].active = false;
        }
      });
    };
    onMounted(() => {
      const router = useRouter();
      set_cur_active_route(
        router.currentRoute.value.fullPath.substr("/home".length + 1)
      );
    });

    const store = useStore();
    onBeforeRouteUpdate((to) => {
      const permit = store.getters.account_id; //账户是否登陆
      if (permit) {
        const route_name_length = "/home".length + 1;
        set_cur_active_route(to.fullPath.substr(route_name_length));
      } else {
        tip_show.value = true;
        return false;
      }
    });
    const get_class = (item) => "tab " + (item.active ? "active" : "unactive");

    const logoin = async () => {
      await proxy.$near.loginAccount()
    }
    return {
      routes,
      tip_show,
      get_class,
      logoin
    };
  },
};
</script>


<style lang="scss" scoped>
.tab-group {
  width: 533px;
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
.tip {
  width: 260.44px;
  height: 223.32px;
  background: #ffffff;
  border: 4px solid #fccb01;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 27px;
    width: 135px;
    height: 100.6px;
  }
  button {
    cursor: pointer;
    margin-top: 35px;
    outline: none;
    display: block;
    width: 120px;
    height: 34px;
    background: #fde47c;
    border: 1px solid #fdcc01;
    border-radius: 10px;
    font-family: Barlow;
    font-weight: 600;
    font-size: 14px;

    text-align: center;

    color: #000000;
  }
}
</style>