import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
<<<<<<< HEAD
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
=======
import VueNear from 'vue-near'
import i18n from './i18n/i18n'
createApp(App)
  .use(store)
  .use(router)
  .use(naive)
  .use(i18n)
  .use(VueNear, {
    // Needs the environment for the correct RPC to use
    env: process.env.NODE_ENV || 'development',
    // config: {
    //   appTite: 'Cool dApp',
    //   contractName: 'cool_dapp.testnet',
    // },
  })
  .mount('#app')
>>>>>>> bf3f3dc0388294a3bb08436308fcc037cd04f4c8
