<template>
  <view>
    <div>{{ obj.name }}</div>
    <div>{{ obj.sonobj.name }}</div>
  </view>
</template>

<script>
import { onMounted, reactive, toRef, toRefs } from "vue";
export default {
  setup() {
   let obj = reactive({
      name: "name",
      sonobj: {
        name: "sonname",
      },
    });
    onMounted(() => {
      setTimeout(() => {
        obj = {
          name: "nagfds33",
          sonobj: {
            name: "so421233",
          },
        };
        console.log(obj)
      }, 1000);
    });

    return {
      obj
    };
  },
};
</script>

<style>
</style>