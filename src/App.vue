<template>
  <n-message-provider>
    <Layout>
      <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <router-view></router-view>
      </n-config-provider>
    </Layout>
  </n-message-provider>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import Layout from "./layout/index.vue";
import { NConfigProvider, createLocale, zhCN, enUS, dateZhCN } from "naive-ui";

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
      zhCN,
      dateZhCN,
    };
  },
  methods: {
  },
  async mounted(){
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
