<template>
  <div class="Home">
    <Banner></Banner>
    <div class="main">
      <Tabbar></Tabbar>
      <transition name="slide">
        <router-view v-slot="{ Component }">
          <transition name="slide">
            <component :is="Component" />
          </transition>
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Banner from "../components/public/Banner.vue";
import Tabbar from "../components/Home/TabBar.vue";
export default {
  components: {
    Banner,
    Tabbar,
  },
  data() {
    return {
      accountId: null,
    };
  },
  methods: {
    setAccount() {
      // this.accountId = this.$near.user && this.$near.user.accountId ? this.$near.user.accountId : null
      // this.update({ key: 'account_id', value: this.accountId })
      // this.update({ key: 'account', value: { ...this.$near.user } })
    },
  },
  async mounted() {
    // console.log(this.$near);
    // setTimeout(() => {
    //   this.$near.loginAccount()
    // }, 1000);
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 40px;
}
</style>