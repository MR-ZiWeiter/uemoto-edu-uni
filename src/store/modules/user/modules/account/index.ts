import Vue from 'vue'
import config, { apiConfigClass } from '@/config'
import { apiToolsModel, AccountEnum } from '@/utils/model/api'

interface IAccountVuexModel {
  wechatInfo: {[x: string]: any};
  [x: string]: any;
}

// 获取历史记录
const locationAppWechatService = uni.getStorageSync('appWechatService') || {};
const locationAppVipUserInfo = uni.getStorageSync('appVipUserInfo') || {};

export default {
  state: {
    wechatInfo: locationAppWechatService,
    vipUserInfo: locationAppVipUserInfo
  },
  getters: {
    wechatInfo: (state: IAccountVuexModel) => state.wechatInfo,
    vipUserInfo: (state: IAccountVuexModel) => state.vipUserInfo
  },
  mutations: {
    UPDATE_WECHAT_INFO(state: IAccountVuexModel, info: any) {
      if (info.deep) {
        state.wechatInfo = info.value
      } else {
        state.wechatInfo = Object.assign({}, state.wechatInfo, info.value);
      }
      uni.setStorageSync('appWechatService', state.wechatInfo)
    },
    UPDATE_VIP_USERINFO(state: IAccountVuexModel, info: any) {
      if (info.deep) {
        state.vipUserInfo = info.value
      } else {
        state.vipUserInfo = Object.assign({}, state.vipUserInfo, info.value);
      }
      uni.setStorageSync('appVipUserInfo', state.vipUserInfo)
    }
  },
  actions: {
    // 小程序用户登录操作
    async asyncAccountMinLogin({ commit, dispatch }: any, info?: any) {
      return new Promise((resolve, reject) => {
        // 更新微信/支付宝用户信息
        info && commit('UPDATA_WX_USERINFO', info.userInfo)
        // 处理多余数据
        info.userInfo && delete info.userInfo
        // 用户登录操作
        uni.login({
          /* #ifdef MP-ALIPAY */
          scopes: ['auth_base', 'auth_user', 'auth_zhima'],
          /* #endif */
          success: res => {
            console.log(res)
            if (res.errMsg === "login:ok") {
              // console.log(res)
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
                url: '/login',
                method: 'POST',
                data: {...info, code: res.code},
                success: (res: ApiResponseModel) => {
                  console.log(res)
                  /* 更新OPENID及SESSION_KEY */
                  // commit('UPDATE_WECHAT_INFO', {
                  //   deep: true,
                  //   value: res.Data
                  // })
                  // console.log(res)
                  const failTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                  // 异步更新权限
                  dispatch('asyncFetchAuthorInfo')
                  // 更新token
                  commit('UPDATA_ANTHOR_TOKEN', res.DATA.token)
                  // 更新token失效时间
                  commit('UPDATA_APP_STATUS', { loginEndTime: failTime })
                  /* 更新用户信息 */
                  commit('UPDATA_USER_BASIC_INFO', {
                    deep: true,
                    value: res.DATA.userInfo
                  })
                  /* 更新账户信息 */
                  // commit('UPDATA_ACCOUNT_INFO', {
                  //   deep: true,
                  //   value: res.Data.AccountInfo
                  // })
                  /* 更新接口请求公共参数 */
                  // commit('UPDATA_ACCESS_INFO', {
                  //   deep: true,
                  //   value: {
                  //     account: res.Data.AccountInfo.login_account,
                  //     client_id: res.Data.ClientID,
                  //     org_code: res.Data.AccountInfo.org_code,
                  //     org_name: res.Data.AccountInfo.org_name,
                  //     real_name: res.Data.AccountInfo.real_name,
                  //     token: res.Data.Token
                  //   }
                  // })
                  // 存储token时间
                  uni.setStorageSync('loginEndTime', failTime)
                  uni.reLaunch({
                    url: '/pages/home/index'
                  })
                  resolve({ status: true, res: res.rel })
                },
                fail: (err: any) => {
                  // console.log(err)
                  reject({ status: false, err })
                }
              })
            } else {
              reject({ status: false, res })
              console.log('登录失败！' + res.errMsg)
            }
          },
          fail: (err) => {
            reject({ status: false, err })
          }
        })
      })
    },
    // 小程序用户授权手机号码操作
    async asyncAccountUserBindPhone({ commit, dispatch }: any, info: any) {
      return new Promise((resolve, reject) => {
        // 用户登录操作
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
          url: `/xmdd-user/${platform}/user/phone`,
          method: 'GET',
          data: { ...info },
          success: (res: any) => {
            /* 更新TOKEN */
            res.rel.token && commit('UPDATA_ANTHOR_TOKEN', res.rel.token)
            // 异步更新权限
            dispatch('asyncFetchAuthorInfo')
            // 异步更新用户信息
            dispatch('asyncFetchUserBasicInfo')
            resolve({ status: true, res })
          },
          fail: (err: any) => {
            // console.log(err)
            reject({ status: false, err })
          }
        })
      })
    },
    /* 小程序一键授权手机号绑定账户 */
    async asyncAccountUserPhoneBindInfo({ commit, dispatch }: any, info: any) {
      return new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: apiConfigClass.center_db_api_host,
          method: 'POST',
          data: apiToolsModel.post(AccountEnum.AxABAD, info),
          success: (res: ApiResponseModel) => {
            console.log(res)
            // this.asyncAccountMinLogin();
            dispatch('asyncAccountMinLogin')
            // commit('UPDATA_ANTHOR_TOKEN', res.rel)
            // 异步更新用户信息
            // dispatch('asyncFetchUserBasicInfo')
            resolve(res)
          },
          fail: (err: any) => {
            console.log(err)
            reject(err)
          }
        })
      })
    },
    // 获取用户会员信息
    async asyncAccountUserInfo({commit, dispatch}: any, info: any) {
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/members/memberInfo',
          method: 'POST',
          data: info,
          success: (res: ApiResponseModel) => {
            commit('UPDATE_VIP_USERINFO', res.DATA);
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
  modules: {}
}
