<template>
  <div class="Layout">
    <div class="TopBar">
      <div class="logo">
        <p class="p1">NFT Lease</p>
        <p class="p2">NFT Lease</p>
      </div>
      <div class="search-area">
        <input placeholder="搜索 : 账户ID" />
      </div>
      <div class="connect-wallet">
        <n-button v-if="accountId" round type="warning" @click="logout">{{accountId}}</n-button>
        <n-button v-if="!accountId" round type="warning" @click="login">connect-wallet</n-button>
      </div>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: "Layout",
  data(){
    return{
      accountId: null,
    }
  },
  methods:{
    ...mapActions(['update']),
    async login() {
      await this.$near.loginAccount()
    },
    logout() {
      this.$near.logoutAccount()
      this.$router.push('/',{query:{}})
      this.accountId = null
      this.update({ key: 'account_id', value: this.accountId })
      this.update({ key: 'account', value: null })
    },
    setAccount() {
      this.accountId = this.$near.user && this.$near.user.accountId ? this.$near.user.accountId : null
      this.update({ key: 'account_id', value: this.accountId })
      this.update({ key: 'account', value: { ...this.$near.user } })
    },
  },
  mounted(){
    setTimeout(() => {
      this.setAccount()
    }, 40)
    setTimeout(() => {
      this.setAccount()
    }, 4000)
  },
};
</script>

<style lang="scss" scoped>
.TopBar {
  background: #6039ce;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 52px;
  box-sizing: border-box;
  align-items: center;
  & > div {
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 183px;
    font-size: 30px;
    position: relative;
    letter-spacing: 2px;
    .p1 {
      color: white;
      z-index: 3;
    }
    .p2 {
      position: absolute;
      top: 0;
      color: #ffac32;
      z-index: 2;
      transform: translate(3px,3px);
    }
  }
  .search-area {
    flex: 1;
    padding: 0 40px;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      height: 40px;
      background: #eff0f6;
      border-radius: 6px;
      outline: none;
      border: none;
      padding-left: 30px;
    }
  }
  .connect-wallet {
    width: 217px;
    display: flex;
    align-items: center;
  }
}
.container {
  width: 1660px;
  margin: 0 auto;
}
</style>