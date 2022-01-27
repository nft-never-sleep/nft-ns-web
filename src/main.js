import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
import i18n from './i18n/i18n'
import VueNear from './utils/vueNear'
import moment from 'moment'
import chainMixin from './utils/chainMixin'
import eventBus from 'vue3-eventbus'
import './assets/style/modal.scss'
const app = createApp(App);

app.use(store)
app.use(router)
app.use(naive)
app.use(i18n)
app.use(eventBus)
app.use(VueNear, { env: 'development' })
app.mixin(chainMixin)

app.config.globalProperties.$moment = moment

app.mount('#app')