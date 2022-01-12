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
import { NConfigProvider, createLocale } from "naive-ui";
import { zhCN, enUS, dateZhCN } from "naive-ui";

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
    return {
      locale,
      dateZhCN,
      language,
      toggle,
    };
  },
});
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
