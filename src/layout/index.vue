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
      <div class="tool-btns">
        <n-button round type="warning" @click="nearAccount">{{
          userType
        }}</n-button>
        <n-switch
          checked-value="zh"
          unchecked-value="en"
          @update:value="toggle_lang"
        >
          <template #checked>EN</template>
          <template #unchecked>中文</template>
        </n-switch>
        <p>{{count}}</p>
      </div>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import { reactive } from "@vue/reactivity";
export default {
  name: "Layout",
  data() {
    return {
      userType: null,
    };
  },
  methods: {
    async nearAccount() {
      if (this.userType) {
        await this.$near.loginAccount();
      } else {
        this.$near.logoutAccount();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.userType = this.$near.user
        ? this.$near.user.accountId
        : "connect-wallet";
    });
  },
  setup() {
    const message = useMessage();
    const { locale } = useI18n();
    
    return {
      toggle_lang(value) {
        locale.value = value;
        localStorage.setItem("lang", value);
        message.info(value);
      },
    };
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
      transform: translate(3px, 3px);
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
  .tool-btns {
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