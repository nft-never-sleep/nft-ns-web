<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <Layout>
        <router-view></router-view>
      </Layout>
    </n-message-provider>
  </n-config-provider>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { mapActions } from "vuex";
import Layout from "./layout/index.vue";
import { NConfigProvider, createLocale, zhCN, enUS, dateZhCN } from "naive-ui";
import near from './utils/near'
import * as nearAPI from 'near-api-js'

const zh = createLocale(
  {
    Input: {
      placeholder: "不提申请不构成加班",
    },
  },
  zhCN
);
const en = createLocale(
  {
    Input: {
      placeholder: "fuck",
    },
  },
  enUS
);

export default defineComponent({
  components: {
    NConfigProvider,
    Layout,
  },
  setup() {
    const language = ref("zh");
    const locale = ref(zh);
    const toggle = () => {
      const { value } = language;
      language.value = value === "zh" ? "en" : "zh";
      locale.value = language.value === "zh" ? zh : en;
      // language.pack = language.cur === "zh" ? zh : en;
      // console.log(language.pack);
      console.log(language.value);
    };
    // await near.init()
    return {
      zhCN,
      dateZhCN,
    };
  },
  methods:{
    ...mapActions(['update']),
    async setAccount() {
      let currentUser = await near.currentUser
      // 账户NEAR余额
      // console.log(currentUser.balance.total / 1e24);
      if (currentUser) {
        this.update({ key: 'account_id', value: currentUser.accountId })
        this.update({ key: 'account', value: { ...currentUser } })
      }else{
        this.update({ key: 'account_id', value: null })
        this.update({ key: 'account', value: {  } })
      }
    },
  },
  async mounted(){
    // const { keyStores } = nearAPI;
    // const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    // await near.init()
    // this.setAccount()
    // setTimeout(async () => {
    //   let t = await near.authToken()
    //   console.log(t);
    // }, 2000);
  }
});
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
