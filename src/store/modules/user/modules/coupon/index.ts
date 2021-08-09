/*
 * @Author: your name
 * @Date: 2021-08-09 04:06:14
 * @LastEditTime: 2021-08-09 04:07:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/store/modules/user/modules/coupon/index.ts
 */

import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取我的客源
    async asyncFetchCouponListInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/couponBag/info/shareHolder',
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
