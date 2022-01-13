import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
// import VueNear from 'vue-near'

const app = createApp(App);


app.use(store)
app.use(router)
app.use(naive)
// app.use(VueNear, {
//   // Needs the environment for the correct RPC to use
//   env: 'mainnet',
//   // config: {
//   //   appTite: 'Cool dApp',
//   //   contractName: 'cool_dapp.testnet',
//   // },
// })

app.mount('#app')
