import Vue from 'vue'
import Vuex from 'vuex'
import apiConfig from '@/config'
import { CoreToolsFunction } from '@/utils/core.tools'
/**
 * 导入公共方法
 * @deepSelectKeyToKeyPath 深度查询对象数据并返回查询到的KeyPath
 */
import { deepSelectKeyToKeyPath } from '@/utils'
// 导入用户模块
import UserModel from './modules/user'
// 导入其他
import OtherModel from './modules/other/index'
/* 公共模块 */
import PublicModel from './modules/public'
// 导入首页模块
import HomeModel from './modules/home'
// 导入商品模块
import ProductModel from './modules/product'

Vue.use(Vuex)
// 获取历史记录
const locationLngLat = uni.getStorageSync('location') || [113.88308, 22.55329]
const locationAppAuthorService = uni.getStorageSync('appAuthService') || false
const store = new Vuex.Store({
  state: {
    // token值 用户关联
    token: uni.getStorageSync('wxAppToken'),
    // 测试用
    // token: '1c856b02c7c1469f9a4802a6b65d4120',
    // 客户端IP
    clientIP: null,
    // 系统信息 getSystemInfo()
    systemInfo: {},
    // 应用配置 包括公共状态等
    appStatus: {
      // 应用版本号
      version: 'V3.0.0',
      // 公共底部栏状态 0 1 2 3 4
      tabType: 0,
      // 当前页面地址详情
      currentPageUrl: '/pages/home/index',
      // 用户登录到期时间 // 2019-11-14 15:38:42
      loginEndTime: 1573717103756,
      // 小程序授权列表
      appAuthorSetting: {},
      // 用户是否授权接受服务条款
      appAuthService: locationAppAuthorService || false
    },
    // 位置配置
    locationConfig: {
      LngLat: locationLngLat,
      cityInfo: {
        city: '深圳市',
        initiative: false,
        // 详细街道地址
        formattedAddress: null,
        // 编码
        adcode: '440306',
        // 省份
        province: '广东省',
        // 城市编号
        citycode: '156440300',
        // code
        towncode: '156'
      }
    },
    // 公共工具注入
    coreTools: new CoreToolsFunction()
  },
  getters: {
    token: state => state.token,
    clientIP: state => state.clientIP,
    systemInfo: state => state.systemInfo,
    appStatus: state => state.appStatus,
    // 分开导出配置信息 高频修改类
    appVersion: state => state.appStatus.version,
    locationConfig: state => state.locationConfig,
    LngLat: state => state.locationConfig.LngLat,
    cityInfo: state => state.locationConfig.cityInfo,
    currentPageUrl: state => state.appStatus.currentPageUrl,
    appAuthService: state => state.appStatus.appAuthService
  },
  mutations: {
    // 更新token操作
    UPDATA_ANTHOR_TOKEN(state, info) {
      state.token = info
      uni.setStorageSync('wxAppToken', info)
      console.log('更新TOOKEN成功！', info)
    },
    // 更新系统信息
    UPDATA_SYSTEM_INFO(state, info) {
      state.systemInfo = info
      console.log('更新系统信息', info)
    },
    // 更新应用配置 深度deep 默认false
    UPDATA_APP_STATUS(state, info) {
      if (info.deep) {
        state.appStatus = info
      } else {
        // 继承方式更新数据
        Object.assign(state.appStatus, info)
      }
      console.log('正在更新应用配置-字段：' + Object.keys(info).join(','))
    },
    // 更新当前定位坐标
    UPDATA_LOCATION_LNGLAT(state, payload) {
      if (!Array.isArray(payload) || payload.length !== 2) {
        // payload = [113.88308, 22.55329]
        state.locationConfig.LngLat = [113.88308, 22.55329]
      } else {
        state.locationConfig.LngLat = payload
      }
      uni.setStorageSync('location', state.locationConfig.LngLat)
      console.log('存储定位-location' + JSON.stringify(state.locationConfig.LngLat))
    },
    // 更新当前定位城市
    UPDATA_CITYINFO(state, info) {
      if (info.deep) {
        state.locationConfig.cityInfo = info
      } else {
        Object.assign(state.locationConfig.cityInfo, info)
      }
      uni.setStorageSync('cityInfo', info)
      console.log('城市信息-cityInfo' + JSON.stringify(state.locationConfig.cityInfo))
      // console.log(state.cityinfo)
    },
    // 指定清空某个值的方法
    UPDATA_CLEAR_VALUE_TO_KEY(state, key) {
      // console.log(state)
      const keyPathArray = deepSelectKeyToKeyPath(state, key)
      if (keyPathArray instanceof Array && keyPathArray.length > 0) {
        const modificationValue = keyPathArray.reduce((a, b) => {
          // console.log(a,b)
          if (b === keyPathArray[keyPathArray.length - 1]) {
            // a[b] = payload[key]
            if (Object.prototype.toString.call(a[b]) === '[object Array]') {
              a[b] = []
            } else {
              a[b] = null
            }
          }
          return a[b]
        }, state)
        if (modificationValue === null || modificationValue === []) {
          console.log('清空数据成功：' + key)
        }
      }
    },
    // 任意更新State状态值
    UPDATA_ARBITRARILY_KEY_VALUE(state, payload) {
      // console.log(state)
      const key = Object.keys(payload)[0]
      const keyPathArray = deepSelectKeyToKeyPath(state, key)
      if (keyPathArray instanceof Array && keyPathArray.length > 0) {
        const modificationValue = keyPathArray.reduce((a, b) => {
          // console.log(a,b)
          if (b === keyPathArray[keyPathArray.length - 1]) {
            a[b] = payload[key]
          }
          return a[b]
        }, state)
        if (modificationValue === payload[key]) {
          console.log('更新数据成功：' + key)
        }
      }
    }
  },
  actions: {
    // 提取缓存中的地理位置和坐标信息
    async getLocation({ commit, getters, state, dispatch }, data) {
      /* 每次打开程序查询缓存中是否有经纬度记录，如果有，先直接使用，后续更新替换 */
      console.log('提取缓存中的坐标记录')
      const LngLat = await uni.getStorageSync('location')
      // console.log(LngLat)
      // 自动定位
      commit('UPDATA_LOCATION_LNGLAT', LngLat)
    },
    // 使用微信js进行定位的方案
    async wxlocationCity({ commit, getters, state, dispatch }, data) {
      // 更新坐标信息
      const LngLat = [data.longitude, data.latitude]
      commit('UPDATA_LOCATION_LNGLAT', LngLat)
      console.log('页面在微信中加载，使用微信定位方案')
      // console.log(Vue.httpRequest)
      // eslint-disable-next-line new-cap
      // url: `https://restapi.amap.com/v3/geocode/regeo?key=154bebc1b93fbcfa670017e0c8b3ab19&location=${data.longitude},${data.latitude}&radius=1000&extensions=all&batch=false&roadlevel=0`,
      new Vue.HttpRequest({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        method: 'GET',
        data: {
          location: [...LngLat].reverse().join(','),
          get_poi: 1,
          key: apiConfig.tencentKey
        },
        noToken: true,
        success: (respones: any) => {
          if (respones && respones.status === 0 && respones.message === 'query ok') {
            // console.log(respones)
            const info = {
              city: respones.result.address_component.city,
              formattedAddress: respones.result.address,
              province: respones.result.address_component.province,
              adcode: respones.result.ad_info.adcode,
              citycode: respones.result.ad_info.city_code,
              towncode: respones.result.ad_info.nation_code
            }
            commit('UPDATA_CITYINFO', info)
            // console.log(info)
          } else {
            console.log('数据查询错误将读取缓存数据-' + respones)

            // 获取历史位置
            const storageSync = uni.getStorageSync('cityInfo')
            if (storageSync) {
              commit('UPDATA_CITYINFO', Object.assign(storageSync, { deep: true }))
            }
          }
        },
        fail: (err: any) => {
          console.log(err)
        }
      })
    },
    // 更新系统信息
    async asyncFetchSystemInfo({ commit }) {
      const systemInfo: any = uni.getSystemInfoSync()
      const isBottomHeight = systemInfo.model.includes('iPhone X') || systemInfo.model.includes('iPhone 1')
      systemInfo.statusBottomHeight = isBottomHeight ? 34 : 0
      // console.log(systemInfo)
      commit('UPDATA_SYSTEM_INFO', systemInfo)
    },
    // 更新TABBAR页面
    async asyncFetchCurrentPageUrl({ commit }) {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      page && commit('UPDATA_APP_STATUS', { currentPageUrl: '/' + page.route })
      page && console.log('已更新Store中当前页面地址信息: ' + '/' + page.route)
    },
    // 更新权限管理 新增回调函数即更新权限后进行回调 避免获取异步问题
    async asyncFetchAuthorInfo({ commit }, fn) {
      /* #ifdef MP-WEIXIN */
      uni.getSetting({
        async success(res) {
          // console.log(res.authSetting)
          commit('UPDATA_APP_STATUS', { appAuthorSetting: res.authSetting })
          fn && fn(res.authSetting)
          console.log('当前小程序权限列表: ' + JSON.stringify(res.authSetting))
        }
      })
      /* #endif */
      /* #ifdef H5 */
      fn && fn()
      /* #endif */
    },
    // 验证权限单个验证
    async asyncFetchAuthorInfoCheckToKey({ getters, dispatch }, key) {
      // scope	对应接口	描述
      // scope.userInfo	wx.getUserInfo	用户信息
      // scope.userLocation	wx.getLocation, wx.chooseLocation	地理位置
      // scope.userLocationBackground	wx.startLocationUpdateBackground	后台定位
      // scope.address	wx.chooseAddress	通讯地址
      // scope.invoiceTitle	wx.chooseInvoiceTitle	发票抬头
      // scope.invoice	wx.chooseInvoice	获取发票
      // scope.werun	wx.getWeRunData	微信运动步数
      // scope.record	wx.startRecord	录音功能
      // scope.writePhotosAlbum	wx.saveImageToPhotosAlbum	保存到相册
      // scope.camera	camera 组件	摄像头
      // await dispatch('asyncFetchAuthorInfo', )
      return new Promise((resolve) => {
        dispatch('asyncFetchAuthorInfo', () => {
          resolve(getters.appStatus.appAuthorSetting[key])
        })
      })
      // return getters.appStatus.appAuthorSetting[key]
    },
    /* 统一登录 */
    async wechatLogin({ commit, state, dispatch }) {
      /* H5端微信/浏览器 */
      /* #ifdef H5 */
      if (state.coreTools.isWeiXin()) {
        const localUrl = encodeURIComponent(window.location.href)
        const redirectUrl = encodeURIComponent(`${apiConfig.staticUrl}/pages/auto-login/index?redirectUrl=${localUrl}`)
        // redirectUrl
        window.location.href = `${apiConfig.apiBaseUrl}/user/wx/mp/auth/oauth2?callBackUrl=${redirectUrl}`
        console.log(`${apiConfig.apiBaseUrl}/user/wx/mp/auth/oauth2?callBackUrl=${redirectUrl}`)
      } else {
        console.log('非Weixin内部')
      }
      /* #endif */
      /* 微信小程序 */
      /* #ifdef MP-WEIXIN || MP-ALIPAY */
      // dispatch('asyncAccountMinLogin')
      // 重新登录授权
      // 用户权限及登录处理
      dispatch('asyncFetchAuthorInfo', () => {
        dispatch('asyncFetchAuthorInfoCheckToKey', 'scope.userInfo').then(status => {
          // console.log('状态' + status)
          if (status) {
            // 当用户第二次进入小程序APP
            // this.UPDATA_USER_BASIC_INFO({ status: true })
            uni.getUserInfo({
              success: res => {
                // console.log(res)
                dispatch('asyncAccountMinLogin', { ...res, isLogin: 2 })
              }
            })
            // this.userLogin()
          } else {
            // 如果没有权限 则清除token登录状态
            commit('UPDATA_ANTHOR_TOKEN', null)
            // 清空用户信息状态
            commit('UPDATA_USER_BASIC_INFO', { deep: true, value: {status} })
            /* 登录账户 */
            // dispatch('asyncAccountMinLogin')
            /* 跳转登录界面 */
            uni.navigateTo({
              url: '/pagesB/user/account/login/index'
            })
          }
        })
      })
      /* #endif */
    },
    /* 刷新Token */
    async asyncUpDataToken({ commit, getters, dispatch }, ) {
      if (getters.token) {
        return new Promise((resolve, reject) => {
          new Vue.HttpRequest({
            url: '/xmdd-user/user/login/token/refresh',
            method: 'GET',
            data: {
              token: getters.token
            },
            success: (res: ApiResponseModel) => {
              // console.log(res)
              commit('UPDATA_ANTHOR_TOKEN', res.rel)
              dispatch('asyncFetchUserBasicInfo')
              resolve(res)
            },
            fail: (err: any) => {
              console.log(err)
              dispatch('wechatLogin')
              reject(err)
            }
          })
        })
      } else {
        dispatch('wechatLogin')
      }
    },
    /* 退出登录 */
    async asyncLoginOut({ commit }) {
      /* 清空token */
      commit('UPDATA_ANTHOR_TOKEN', null)
      /* 清空有关用户信息 */
      commit('UPDATA_WX_USERINFO', {})
      commit('UPDATA_USER_BASIC_INFO', {deep: true, value: {}})
      /* 自动返回首页 */
      uni.reLaunch({
        url: '/pages/home/index'
      })
    }
  },
  modules: {
    UserModel,
    PublicModel,
    OtherModel,
    HomeModel,
    ProductModel
  }
})

export default store
