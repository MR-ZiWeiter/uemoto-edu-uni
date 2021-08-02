import Vue from 'vue'

import App from './App.vue'
import config from '@/config'
/* 公共模块注入 */
import httpRequestPlugin from '@/utils/plugins/request'
import navigateModel from '@/utils/plugins/navigator'
import validateModel from '@/utils/plugins/validate'
import { CoreToolsFunction } from './utils/core.tools'
import store from '@/store'


/* 全局指令 */
// import * as directives from '@/directives'
import * as filters from '@/filters'
/* model类引入 */
// import { DirectiveOptions } from 'vue/types/options'
/* 是否关闭警告 */
Vue.config.productionTip = false

Vue.prototype.$store = store
/* 注册全局指令 */
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
// })

/* 注册全局过滤器 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: any })[key])
})

Vue.use(config)
Vue.use(navigateModel)
Vue.use(httpRequestPlugin)
Vue.use(validateModel)
Vue.use(CoreToolsFunction)

new App({
  store
}).$mount()
