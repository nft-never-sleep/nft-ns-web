<template>
  <div class="Layout">
    <div class="TopBar">
      <div class="logo">
        <!-- <p class="p1">NFT Lease</p>
        <p class="p2">NFT Lease</p> -->
        <img src="../assets/img/public/logo.png" />
      </div>
      <div class="search-area">
        <div class="input">
          <n-icon class="icon" size="18">
            <Search />
          </n-icon>
          <input :placeholder="$t('input.placeholder')" />
        </div>
      </div>
      <div class="tool-btns">
        <button class="connect-btn" @click="nearAccount">
          {{ gitAccountId ? gitAccountId : "connect-wallet" }}
        </button>
        <n-switch
          class="toggle-lang-btn"
          :value="lang"
          checked-value="zh"
          unchecked-value="en"
          @update:value="toggle_lang"
        >
          <template #checked>EN</template>
          <template #unchecked>中文</template>
        </n-switch>
      </div>
    </div>
    <div class="bg-wrap">
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import near from "../utils/near";
import {
  GameControllerOutline,
  GameController,
  Search,
} from "@vicons/ionicons5";
import { reactive } from "@vue/reactivity";
export default {
  name: "Layout",
  components: {
    GameController,
    GameControllerOutline,
    Search,
  },
  data() {
    return {
      userType: null,
    };
  },
  methods: {
    async nearAccount() {
      if (this.gitAccountId) {
        near.logout();
      } else {
        near.login();
      }
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.userType = this.$near.user
    //     ? this.$near.user.accountId
    //     : "Connect wallet";
    // });
  },
  computed: {
    gitAccountId() {
      return this.$store.getters.account_id;
    },
  },
  setup() {
    const message = useMessage();
    const { locale } = useI18n();
    const lang = ref(localStorage.getItem("lang"));
    return {
      toggle_lang(value) {
        lang.value = value;
        locale.value = value;
        localStorage.setItem("lang", value);
        message.info(value);
      },
      lang,
    };
  },
};
</script>

<style lang="scss" scoped>
.Layout {
  display: flex;
  height: 100%;
  flex-direction: column;
  min-height: 0;
  flex: 1 1;
}
.TopBar {
  background: white;
  width: 100%;
  height: 60px;
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
    display: flex;
    align-items: center;

    .input {
      position: relative;
      width: 938px;
      height: 34px;
      .icon {
        position: absolute;
        color: #fde47c;
        left: 8px;
        top: 10px;
      }
      input {
        width: 100%;
        height: 100%;
        border: 1px solid #fde47c;
        border-radius: 10px;
        outline: none;
        padding-left: 30px;
        &:focus-visible {
          border: 1px solid #fde47c;
        }
      }
    }
  }
  .tool-btns {
    width: 217px;
    display: flex;
    align-items: center;
    .connect-btn {
      font-family: "Barlow", sans-serif;
      cursor: pointer;
      width: 120px;
      height: 34px;
      background: #fde47c;
      border: 1px solid #fdcc01;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      color: #000000;
    }
    .toggle-lang-btn {
      margin-left: 10px;
    }
  }
}
.bg-wrap {
  flex: 1 1;
    overflow-y: scroll;
  background-color: #fff9e7;
  .container {
    width: 1344px;
    margin: 0 auto;
  }
}
</style>