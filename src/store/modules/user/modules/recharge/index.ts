/*
 * @Author: houli
 * @Date: 2021-08-08 22:28:58
 * @LastEditTime: 2021-08-08 22:32:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/store/modules/user/modules/recharge/index.ts
 */
import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取当前用户余额
    async asyncFetchRechargeInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/accountBalance/sumAvailable',
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
    // 获取充值列表
    async asyncFetchRechargeListInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/accountBalance/list',
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
    // 充值
    async asyncPostRechargeInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/accountBalance/recharge',
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
