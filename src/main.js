import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
import VueNear from 'vue-near'

createApp(App)
    .use(store)
    .use(router)
    .use(naive)
    .use(VueNear, {
        // Needs the environment for the correct RPC to use
        env: process.env.NODE_ENV || 'development',
        // config: {
        //   appTite: 'Cool dApp',
        //   contractName: 'cool_dapp.testnet',
        // },
      })
    .mount('#app')
