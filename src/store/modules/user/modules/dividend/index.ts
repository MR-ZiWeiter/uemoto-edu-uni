/*
 * @Author: houli
 * @Date: 2021-08-08 22:28:58
 * @LastEditTime: 2021-08-09 02:12:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/store/modules/user/modules/dividend/index.ts
 */
import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取可用分红金额
    async asyncFetchDividendInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/dividend/sumAvailable',
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
    // 查询分红明细记录列表
    async asyncFetchDividendListInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/dividend/dividendList',
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
    // 查询提现明细记录列表
    async asyncFetchWithdrawListInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/dividend/withdrawList',
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
    // 体现
    async asyncPostDividendInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/dividend/withdraw',
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
