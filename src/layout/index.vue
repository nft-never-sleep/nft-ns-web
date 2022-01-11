<template>
  <div class="Layout">
    <div class="TopBar">
      <div class="logo">NFT LEASE</div>
      <div class="search-area">
        <input placeholder="搜索 : 账户ID" />
      </div>
      <div class="connect-wallet">
        <n-button round type="warning">connect-wallet</n-button>
      </div>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.TopBar {
  background: #6039ce;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 183px;
    font-size: 30px;
    color: white;
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