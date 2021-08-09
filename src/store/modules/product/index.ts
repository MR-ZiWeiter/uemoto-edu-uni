/*
 * @Author: your name
 * @Date: 2021-08-07 10:39:49
 * @LastEditTime: 2021-08-08 13:43:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/store/modules/product/index.ts
 */
import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取热门商品
    async asyncFetchHotProductListInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/product/hotProducts',
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
    // 获取商品分类菜单 树形
    async asyncFetchProductMenuTreeInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/product/categoryList',
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
    // 通过分类ID获取商品列表
    async asyncFetchGateProductListInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/product/productsOfCategory',
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
    // 通过产品ID获取产品详情
    async asyncFetchProductInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/product/productDetail',
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
    // 通过老师ID获取老师详情
    async asyncFetchTeacherInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/teacher/teacherDetail',
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
    // 产品预约
    async asyncPostProductReserveInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/productAppointment/appointmentProduct',
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
  },
  modules: {
  }
}
