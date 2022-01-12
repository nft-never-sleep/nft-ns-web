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
import Layout from "./layout/index.vue";
import { NConfigProvider, createLocale } from "naive-ui";
import { zhCN, enUS, dateZhCN } from "naive-ui";
export default defineComponent({
  components: {
    NConfigProvider,
    Layout,
  },
  setup() {
    return {
      zhCN,
      dateZhCN,
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
