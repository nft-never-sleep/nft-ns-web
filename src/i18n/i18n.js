import { createI18n } from "vue-i18n";
import { default_lang } from '../../config/index'
import messages from './index'
const i18n = createI18n({
    locale: (() => {
        if (localStorage.lang) {
            return localStorage.lang
        } else {
            localStorage.lang = default_lang
            return default_lang //默认中文
        }
    })(),
    messages
})
export default i18n