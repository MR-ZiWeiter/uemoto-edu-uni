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
    async asyncAccountMinLogin_({ commit, dispatch }: any, info?: any) {
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
    // 小程序用户登录操作
    async asyncAccountMinLogin({ commit, dispatch }: any) {
      return new Promise((resolve, reject) => {
        let code: string;
        // 用户登录操作
        uni.login({
          /* #ifdef MP-ALIPAY */
          scopes: ['auth_base', 'auth_user', 'auth_zhima'],
          /* #endif */
          success: response => {
            console.log(response);
            if (response.errMsg === 'login:ok') {
              code = response.code;
              /* #ifdef MP-ALIPAY */
              uni.getProvider({
                service: 'oauth',
                success: (result) => {
                  if (result.errMsg === 'getProvider:ok') {
                    uni.getUserInfo({
                      provider: result.provider[0],
                      withCredentials: true,
                      success: ({ userInfo, rawData, signature, encryptedData, iv, errMsg }) => {
                        // 更新微信/支付宝用户信息
                        userInfo && commit('UPDATA_WX_USERINFO', userInfo);
                        // console.log(response)
                        let platform: string;
                        /* #ifdef MP-WEIXIN */
                        platform = 'miniapp';
                        /* #endif */
                        /* #ifdef MP-ALIPAY */
                        platform = 'ali';
                        /* #endif */
                        /* #ifdef H5 */
                        platform = 'h5';
                        /* #endif */
                        new Vue.HttpRequest({
                          url: `/login`,
                          method: 'POST',
                          data: {
                            iv,
                            encryptedData,
                            code
                          },
                          success: ({ DATA, msg }: ApiResponseModel) => {
                            const failTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                            // 异步更新权限
                            dispatch('asyncFetchAuthorInfo')
                            // 更新token
                            commit('UPDATA_ANTHOR_TOKEN', DATA.token)
                            // 更新token失效时间
                            commit('UPDATA_APP_STATUS', { loginEndTime: failTime })
                            /* 更新用户信息 */
                            commit('UPDATA_USER_BASIC_INFO', {
                              deep: true,
                              value: DATA.userInfo
                            })
                            // 存储token时间
                            uni.setStorageSync('loginEndTime', failTime)
                            uni.reLaunch({
                              url: '/pages/home/index'
                            })
                            resolve({ status: true, res: DATA });
                          },
                          fail: (err: any) => {
                            console.log(err);
                            reject({ status: false, err });
                          }
                        });
                      },
                      fail: (error) => {
                        new Error(error);
                        uni.showToast({
                          title: '您已取消授权',
                          icon: 'none',
                          mask: true
                        });
                      }
                    });
                  }
                }
              });
              /* #endif */
            }
          },
          fail: (err) => {
            reject({ status: false, err });
          }
        });
        // #ifdef MP-WEIXIN
        uni.getUserProfile && uni.getUserProfile({
          desc: '获取您的昵称，头像，地区及性别',
          // provider: result.provider[0],
          // withCredentials: true,
          success: ({ userInfo, rawData, signature, encryptedData, iv, errMsg }) => {
            // console.log(userInfo, rawData, signature, encryptedData, iv, errMsg)
            if (errMsg === 'getUserProfile:ok') {
              // 更新微信/支付宝用户信息
              userInfo && commit('UPDATA_WX_USERINFO', userInfo);
              // console.log(response)
              let platform: string;
              /* #ifdef MP-WEIXIN */
              platform = 'miniapp';
              /* #endif */
              /* #ifdef MP-ALIPAY */
              platform = 'ali';
              /* #endif */
              /* #ifdef H5 */
              platform = 'h5';
              /* #endif */
              new Vue.HttpRequest({
                url: `/login`,
                method: 'POST',
                data: {
                  iv,
                  encryptedData,
                  code
                },
                success: ({ DATA, msg }: ApiResponseModel) => {
                  const failTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                  // 异步更新权限
                  dispatch('asyncFetchAuthorInfo')
                  // 更新token
                  commit('UPDATA_ANTHOR_TOKEN', DATA.token)
                  // 更新token失效时间
                  commit('UPDATA_APP_STATUS', { loginEndTime: failTime })
                  /* 更新用户信息 */
                  commit('UPDATA_USER_BASIC_INFO', {
                    deep: true,
                    value: DATA.userInfo
                  })
                  // 存储token时间
                  uni.setStorageSync('loginEndTime', failTime)
                  if (DATA.userInfo.phoneNo) {
                    // 跳转
                    if (uni.getStorageSync('redict-url')) {
                      uni.reLaunch({ url: uni.getStorageSync('redict-url') })
                      uni.removeStorageSync('redict-url')
                    } else {
                      uni.reLaunch({
                        url: '/pages/home/index'
                      })
                    }
                  } else {
                    if ((getCurrentPages()[0] as any).$page.fullPath || ('/' + getCurrentPages()[0].route) !== '/pages/start/index') {
                      uni.reLaunch({
                        url: '/pages/start/index'
                      })
                    }
                  }
                  resolve({ status: true, res: DATA });
                },
                fail: (err: any) => {
                  console.log(err);
                  reject({ status: false, err });
                }
              });
            } else {
              console.log('取消登录', 'backLogin');
              uni.reLaunch({ url: '/pages/start/index' });
            }
          },
          fail: (error) => {
            new Error(error);
            uni.showToast({
              title: '您已取消授权',
              icon: 'none',
              mask: true
            });
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/start/index'
              })
            }, 2000);
          }
        });
        // #endif
      });
    },
    // 小程序用户授权手机号码操作
    async asyncAccountUserBindPhone({ commit, dispatch }: any, { encryptedData, iv }: any) {
      return new Promise((resolve, reject) => {
        // 用户登录操作
        uni.login({
          /* #ifdef MP-ALIPAY */
          scopes: ['auth_base', 'auth_user', 'auth_zhima'],
          /* #endif */
          success: response => {
            console.log(response);
            if (response.errMsg === 'login:ok') {
              new Vue.HttpRequest({
                url: `/members/bindPhoneNo`,
                method: 'POST',
                data: {
                  iv,
                  encryptedData,
                  code: response.code
                },
                success: (res: any) => {
                  /* 更新TOKEN */
                  // res.rel.token && commit('UPDATA_ANTHOR_TOKEN', res.rel.token);
                  // 异步更新权限
                  dispatch('asyncFetchAuthorInfo');
                  // 异步更新用户信息
                  dispatch('asyncFetchUserBasicInfo');
                  // 跳转
                  if (uni.getStorageSync('redict-url')) {
                    uni.reLaunch({ url: uni.getStorageSync('redict-url') })
                    uni.removeStorageSync('redict-url')
                  } else {
                    uni.reLaunch({
                      url: '/pages/home/index'
                    })
                  }
                  resolve({ status: true, res });
                },
                fail: (err: any) => {
                  // console.log(err)
                  reject({ status: false, err });
                }
              });
            }
          }
        });
      });
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
      
    },
    // 完善我的信息
    async asyncAccountPutUserInfo({ commit, dispatch }: any, info: any) {
      // /members/completeInformation
      return await new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/members/completeInformation',
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
  modules: {}
}
