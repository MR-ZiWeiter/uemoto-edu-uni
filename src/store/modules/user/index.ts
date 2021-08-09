import Vue from 'vue'
// 数据模型Model
import {
  VUXUserModel,
  VUXWXUserInfoModel,
  VUXUserBasicInfoModel,
  VUXUserAccountInfoModel
} from '@/model/modules'
import apiConfig, { apiConfigClass } from '@/config'

// 账户信息
import AccountModel from './modules/account'
// 充值模块
import RechargeModel from './modules/recharge'
// 分红模块
import DividendModel from './modules/dividend'
// 客源模块
import CustomerSourceModel from './modules/customer-source'
// 优惠券模块
import CouponModel from './modules/coupon'

// 获取历史记录
const locationAppUserBasicInfoService = uni.getStorageSync('appUserBasicService') || {}
const locationAppAccountInfoService = uni.getStorageSync('appAccountInfoService') || {}
const locationAppWxUserInfoService = uni.getStorageSync('appWxUserInfoService') || {}
const locationAppAccessInfoService = uni.getStorageSync('appAccessInfoService') || {}
export default {
  state: {
    userBasicInfo: locationAppUserBasicInfoService,
    accountInfo: locationAppAccountInfoService,
    wxUserInfo: locationAppWxUserInfoService,
    /* 登录后请求其他接口需要的参数 */
    accessInfo: locationAppAccessInfoService
  },
  getters: {
    userBasicInfo: (state: VUXUserModel) => state.userBasicInfo,
    accountInfo: (state: VUXUserModel) => state.accountInfo,
    accessInfo: (state: VUXUserModel) => state.accessInfo,
    userCenterInfo: (state: VUXUserModel) => state.userCenterInfo
  },
  mutations: {
    // 更新微信用户数据
    UPDATA_WX_USERINFO(state: VUXUserModel, info: VUXWXUserInfoModel) {
      state.wxUserInfo = info
      uni.setStorageSync('appUserBasicService', info)
    },
    /* 用户基本信息 */
    UPDATA_USER_BASIC_INFO(state: VUXUserModel, info: VUXUserBasicInfoModel) {
      if (info.deep) {
        state.userBasicInfo = info.value
      } else {
        state.userBasicInfo = Object.assign({}, state.userBasicInfo, info.value)
      }
      uni.setStorageSync('appWxUserInfoService', state.userBasicInfo)
    },
    /* 账户信息 */
    UPDATA_ACCOUNT_INFO(state: VUXUserModel, info: VUXUserAccountInfoModel) {
      if (info.deep) {
        state.accountInfo = info.value
      } else {
        state.accountInfo = Object.assign({}, state.accountInfo, info.value)
      }
      uni.setStorageSync('appAccountInfoService', state.accountInfo)
    },
    /* 更新默认请求需要携带的公共参数 */
    UPDATA_ACCESS_INFO(state: VUXUserModel, info: VUXUserAccountInfoModel) {
      if (info.deep) {
        state.accessInfo = info.value
      } else {
        state.accessInfo = Object.assign({}, state.accessInfo, info.value)
      }
      uni.setStorageSync('appAccessInfoService', state.accessInfo)
    }
  },
  actions: {
    // 用户基本信息
    async asyncFetchUserBasicInfo({ commit }: any, info: any) {
      return new Promise((resolve, reject) => {
        // new Vue.HttpRequest({
        //   url: '/',
        //   method: 'POST',
        //   data: info,
        //   success: (res: ApiResponseModel) => {
        //     console.log(res)
        //     commit('UPDATA_USER_BASIC_INFO', {
        //       deep: false,
        //       value: res.rel
        //     })
        //     resolve(res)
        //   },
        //   fail: (err: any) => {
        //     console.log(err)
        //     reject(err)
        //   }
        // })
      })
    },
    /* #ifdef MP-WEIXIN */
    // 同步微信用户信息到后台
    async asyncFetchUserInfoToBackstage({ commit }:any, info: any) {
      return new Promise((resolve, reject) => {
        let platform: string;
        /* #ifdef MP-WEIXIN */
        platform = 'wx'
        /* #endif */
        /* #ifdef MP-ALIPAY */
        platform = 'ali'
        /* #endif */
        /* #ifdef H5 */
        platform = 'h5'
        /* #endif */
        new Vue.HttpRequest({
          url: `/xmdd-user/${platform}/user/info`,
          method: 'get',
          data: info,
          success: (res: ApiResponseModel) => {
            commit('UPDATA_USER_BASIC_INFO', {
              deep: false,
              value: res.rel
            })
            resolve(res)
          },
          fail: (err: any) => {
            console.log(err)
            reject(err)
          }
        })
      })
    }
    /* #endif */
  },
  modules: {
    AccountModel,
    RechargeModel,
    DividendModel,
    CustomerSourceModel,
    CouponModel
  }
}
