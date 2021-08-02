import Vue from 'vue'
/* 导入腾讯WebServiceAPI相关模块 */
import TencentMap from './modules/tencent-map'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取JSSDK签名
    async asyncFetchJSSDKSignatureConfig({ commit }: any, info: any) {
      return new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/user/wx/mp/auth/jsapiSignature',
          method: 'GET',
          data: info,
          success: (res: ApiResponseModel) => {
            console.log(res)
            resolve(res)
          },
          fail: (err: any) => {
            console.log(err)
            reject(err)
          }
        })
      })
    }
  },
  modules: {
    TencentMap
  }
}
