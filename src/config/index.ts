/*
 * @Author: your name
 * @Date: 2021-08-07 10:39:49
 * @LastEditTime: 2021-08-08 14:24:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/config/index.ts
 */
const apiConfig: PApiConfigModel = {
  apiBaseUrl: 'http://120.76.132.146:8888',
  // apiBaseUrl: '',
  staticUrl: 'http://127.0.0.1:3210/uemoto-edu-uni/src',
  // staticUrl: '',
  tencentKey: 'xxx',
  amapKey: 'xxxx',
  /* 微信小程序APPID */
  appid: 'xxx',
  /* 其他配置项 */
  // 登录平台类型：WEB-网站｜ANDROID-安卓|IOS-苹果｜WX-微信(小程序)
  platform: 'WX',
  // 小程序对应运营商的站点，对应总控平台-平台管理-选中平台-站点消息，站点site_code
  install: null,
  debug: true
}

console.log(process.env.development)

apiConfig.install = (Vue: { prototype: { [x: string]: any } }, options: any) => {
  Object.keys(apiConfig).map(key => {
    Vue.prototype[`$${key}`] = apiConfig[key]
  })
}
export const apiNetworkBaseUrl = apiConfig.apiBaseUrl
export const staticNetworkBaseUrl = apiConfig.staticUrl
export const tencentMapAPIKEY = apiConfig.tencentKey
export const gaodeMapAPIKEY = apiConfig.amapKey
export * from './api-config'

export default apiConfig
