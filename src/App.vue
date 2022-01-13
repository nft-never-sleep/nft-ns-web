<template>
  <n-config-provider :locale="locale" :date-locale="dateZhCN">
    <Layout>
      <div>{{ locale.Input.placeholder }}</div>
      <div>{{ language }}</div>
      <button @click="toggle">toggle</button>
      <router-view></router-view>
    </Layout>
  </n-config-provider>
</template>
<script>
import Layout from "./layout/index.vue";
import { defineComponent, reactive, ref } from "vue";
import { mapActions } from 'vuex'
import { NConfigProvider, createLocale } from "naive-ui";
import { zhCN, enUS, dateZhCN } from "naive-ui";
import near from './utils/near'

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
      locale,
      dateZhCN,
      language,
      toggle,
    };
  },
  methods:{
    ...mapActions(['update','logout']),
    async setAccount() {
      let currentUser = await near.currentUser
      // this.accountId = currentUser.accountId
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
    await near.init()
    this.setAccount()
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
