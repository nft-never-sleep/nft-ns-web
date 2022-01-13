import { createI18n } from "vue-i18n";
import I18nConfig from '../../config/index'
import messages from './index'
const i18n = createI18n({
    locale: (() => {
        if (localStorage.lang) {
            return localStorage.lang
        } else {
            localStorage.lang = I18nConfig.default_lang
            return I18nConfig.default_lang //默认中文
        }
    })(),
    messages
})
export default i18n