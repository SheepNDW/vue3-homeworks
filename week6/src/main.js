import { createApp } from 'vue'
import App from './App.vue'

// 匯入 vee-validate 主套件
import { defineRule, configure } from 'vee-validate'
// 匯入 vee-validate 相關規則
import { required, email } from '@vee-validate/rules'
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import router from './router'
import store from './store'

// 匯入VueLoading元件
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

// 定義驗證規則
defineRule('required', required)
defineRule('email', email)
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }) // 載入繁體中文語系
})
setLocale('zh_TW')

createApp(App)
  .use(store)
  .use(router)
  .component('Loading', Loading)
  .mount('#app')
