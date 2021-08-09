/*
 * @Author: your name
 * @Date: 2021-08-09 02:41:17
 * @LastEditTime: 2021-08-09 02:43:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/store/modules/user/modules/customer-source/index.ts
 */

import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取我的客源
    async asyncFetchCustomerSourceInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/members/customers',
          method: 'POST',
          data: info,
          success: (res: ApiResponseModel) => {
            resolve(res)
          },
          fail: (err: any) => {
            // console.log(err)
            reject({ status: false, err })
          }
        })
      })
    },
    // 获取我已使用的客源
    async asyncFetchCustomerSourceUseInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/members/consumedCustomers',
          method: 'POST',
          data: info,
          success: (res: ApiResponseModel) => {
            resolve(res)
          },
          fail: (err: any) => {
            // console.log(err)
            reject({ status: false, err })
          }
        })
      })
    }
  },
  modules: {
  }
}
