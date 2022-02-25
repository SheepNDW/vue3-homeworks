// 插件 - Plugin
// vue3.0插件的寫法要素: 匯出一個物件, 有install函式, 默認傳入app應用實例, app基礎之上擴展

import UiPagination from './ui-pagination.vue'

export default {
  install(app) {
    app.component(UiPagination.name, UiPagination)
  }
}
