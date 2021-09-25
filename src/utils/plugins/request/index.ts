import qs from 'qs'
import apiConfig from '@/config'
import store from '@/store'
import { CoreToolsFunction } from '@/utils/core.tools'
/* #ifdef H5 */
import { DataSecurityService } from '@/services/security'
/* #endif */
const returnCitySN: any = {}

// tslint:disable-next-line: class-name
class httpRequestPlugin extends CoreToolsFunction {
  private url: string
  private method: any;
  private header: { [x: string]: any }
  private data: { [x: string]: any }
  private extParams: {
    /* 超时时间，单位 ms	 */
    timeout?: number;
    /* 如果设为 json，会尝试对返回的数据做一次 JSON.parse	 */
    dataType?: 'json' | 'text' | 'xml' | string;
    /* 设置响应的数据类型。合法值：text、arraybuffer	 */
    responseType?: 'text' | 'arraybuffer';
    /* 验证 ssl 证书	 */
    sslVerify?: boolean;
    /* 跨域请求时是否携带凭证（cookies）	 */
    withCredentials?: boolean;
    /* DNS解析时优先使用ipv4 */
    firstIpv4?: boolean;
    [x: string]: any;
  }
  private client!: string | null
  private token!: string | null
  private hideLoading: boolean
  private requestUrl!: string
  // 注入解密或者加密
  /* #ifdef H5 */
  private securityService = new DataSecurityService();
  /* #endif */

  static install: (Vue: any, options: any) => void

  constructor(param: any, backpage: any, backtype: any) {
    super()
    this.url = param.url
    this.method = param.method
    this.header = param.header || {
      'content-type': 'application/x-www-form-urlencoded'
      // 'content-type': 'application/json'
    }
    this.data = param.data || {}
    this.extParams = param.extParams || {}
    this.token = param.token || store.getters.token || null
    /* 新增设备类型 */
    // #ifdef MP-WEIXIN
    this.client = param.client || 'WX_MINI'
    // #endif
    // #ifdef MP-ALIPAY
    this.client = param.client || 'ALI_MINI'
    // #endif
    this.hideLoading = param.hideLoading || false
    this.requestUrl = this.url.includes('https://') || this.url.includes('http://') ? this.url : `${apiConfig.apiBaseUrl}${this.url}`
    /* 是否存在可序列化参数 使用QS模块进行序列化 */
    // param.formatdata
    param.formatdata && (this.requestUrl.includes('?') ? (this.requestUrl = this.requestUrl + '&' + qs.stringify(param.formatdata)) : (this.requestUrl = this.requestUrl + '?' + qs.stringify(param.formatdata)))
    // 设置设备信息
    // 时间戳
    const timestamp = Date.parse(new Date().toString())
    if (!this.url) return
    this.data.timestamp = timestamp
    // #ifdef MP-WEIXIN
    this.data.appDevice = 'WX-APP'
    this.data.appClient = 'WX_MINI'
    this.data.appVersion = store.getters.appStatus.version
    this.data.internalNetworkIp = store.getters.clientIP || returnCitySN.cip
    // #endif
    // #ifdef APP-PLUS || H5
    this.data.appDevice = 'H5'
    this.data.appClient = 'wx'
    // #endif
    // #ifdef MP-ALIPAY
    this.data.appDevice = 'ALI-APP'
    this.data.appClient = 'ALI_MINI'
    // #endif
    this.data.appVersion = store.getters.appStatus.version
    this.data.internalNetworkIp = store.getters.clientIP || returnCitySN.cip
    // 手动添加token
    // tslint:disable-next-line: no-unused-expression
    this.token && (this.header['Authorization-Token'] = this.token)
    /* 手动添加client */
    this.client && (this.header.client = this.client)
    /* 手动删除token */
    param.noToken && (delete this.header.token)
    console.log(this.requestUrl)
    // 用户交互:加载圈
    if (!this.hideLoading) {
      uni.showLoading({ title: '加载中...' })
    }
    // 网络请求
    uni.request({
      url: this.requestUrl,
      method: this.method,
      header: this.header,
      data: this.data,
      ...this.extParams,
      success: (response: any) => {
        // console.log('网络请求success:' + JSON.stringify(response))
        if (response.statusCode && response.statusCode !== 200) { // api错误
          uni.showModal({
            content: '' + response.data.message
          })
          return
        }
        // 处理后台返回数据问题 返回结果码code判断:0成功,1错误,-1未登录(未绑定/失效/被解绑)
        if (response.data.CODE) {
          if (response.data.CODE === '10003') {
            // _self.login(backpage, backtype)
            // 重新授权登录
            console.log('需要登录')
            if (!uni.getStorageSync('redict-url')) {
              uni.setStorageSync('redict-url', (getCurrentPages()[0] as any).$page.fullPath || ('/' + getCurrentPages()[0].route));
            }
            // uni.showModal({
            //   title: '提示',
            //   content: '用户验证失败，是否重新登录',
            //   success: function(res) {
            //     if (res.confirm) {
            //       store.dispatch('unifyLogin')
            //     } else if (res.cancel) {
            //       console.log('用户点击取消')
            //     }
            //   }
            // })
            // 关掉其他的 避免地狱调（官方不支持）存个变量跳过
            if (!uni.getStorageSync('reload_model')) {
              uni.setStorageSync('reload_model', true);
              // 登陆
              uni.showModal({
                title: '提示',
                content: '用户验证失败，是否重新登录',
                success: function(res) {
                  uni.setStorageSync('reload_model', false);
                  if (res.confirm) {
                    store.dispatch('unifyLogin')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    uni.reLaunch({
                      url: '/pages/start/login/index'
                    })
                  }
                }
              })
            } else {
              uni.setStorageSync('reload_model', false);
            }
            // 暂时回调错误
            // tslint:disable-next-line: no-unused-expression
            typeof param.fail === 'function' && param.fail(response.data)
            return
          }
          if (response.data.CODE === '10001') {
            // _self.login(backpage, backtype)
            // 重新授权登录
            console.log('需要登录')
            uni.showModal({
              title: '提示',
              content: '当前用户未登陆，请登陆后操作',
              success: function(res) {
                if (res.confirm) {
                  store.dispatch('unifyLogin')
                  // uni.reLaunch({
                  //   url: '/pages/start/index'
                  // })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // 暂时回调错误
            // tslint:disable-next-line: no-unused-expression
            typeof param.fail === 'function' && param.fail(response.data)
            return
          }
          /* token过期-重新拉取Token */
          if (response.data.CODE === 'X1004') {
            store.dispatch('asyncUpDataToken')
            typeof param.fail === 'function' && param.fail(response.data)
            return
          }
          /* 账户未绑定账号 统一处理 */
          if (response.data.CODE === -900) {
            uni.showModal({
              title: '提示',
              content: '您的微信暂未绑定账号，是否前往绑定账号？',
              success: function(res) {
                if (res.confirm) {
                  /* 跳转绑定账号界面 */
                  uni.navigateTo({
                    url: '/pages/start/bind-account/index'
                  })
                  // store.dispatch('unifyLogin')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // tslint:disable-next-line: no-unused-expression
            typeof param.success === 'function' && param.fail(response.data)
            return
          }
          if (response.data.CODE === 'X5102') {
            // 暂时回调错误
            // tslint:disable-next-line: no-unused-expression
            typeof param.fail === 'function' && param.fail(response.data)
            return
          }
          if (response.data.infocode === '10000') {
            // 暂时回调错误
            // tslint:disable-next-line: no-unused-expression
            typeof param.success === 'function' && param.success(response.data)
            return
          }
          if (response.data.CODE !== '00') {
            // uni.showModal({
            //   showCancel: false,
            //   content: '' + response.data.MSG
            // })
            uni.showToast({
              title: `提示：${response.data.MSG}`,
              icon: 'none'
            })
            // 暂时回调错误
            // tslint:disable-next-line: no-unused-expression
            typeof param.fail === 'function' && param.fail(response.data)
            return
          }
        } else if (response.data.info) { /* 处理高德相关API接口返回数据问题 */
          // tslint:disable-next-line: no-unused-expression
          typeof param.success === 'function' && param.success(response.data)
          return
        } else if (response.data.status === 0) { /* 处理腾讯相关API接口返回数据问题 */
          typeof param.success === 'function' && param.success(response.data)
        } else { /* 抛出通用错误 */
          // uni.showModal({
          //   showCancel: false,
          //   content: 'No ResultCode:' + response.data.MSG
          // })
          uni.showToast({
            title: `提示：${response.data.MSG}`,
            icon: 'none'
          })
          return
        }
        // tslint:disable-next-line: no-unused-expression
        typeof param.success === 'function' && param.success(this.handlerResponse(response.data))
      },
      fail: (e: any) => {
        console.log('网络请求fail:' + JSON.stringify(e))
        // uni.showModal({
        //   content: '' + e.MSG
        // })
        uni.showToast({
          title: `提示：${e.MSG}`,
          icon: 'none',
        })
        setTimeout(() => {
          // 暂时回调错误
          // tslint:disable-next-line: no-unused-expression
          typeof param.fail === 'function' && param.fail(e.data)
        }, 1500);
      },
      complete: () => {
        console.log('网络请求complete')
        if (!this.hideLoading) {
          uni.hideLoading()
        }
        // tslint:disable-next-line: no-unused-expression
        typeof param.complete === 'function' && param.complete()
        return
      }
    })
  }
  private handlerResponse(response: ApiResponseModel): ApiResponseModel {
    if (response.secret) {
      // response.rel =
      /* 仅仅针对H5处理加密数据 避免多端不统一问题 */
      /* #ifdef H5 */
      this.securityService.init(response.secret)
      response.rel = this.securityService.decrypt(response.rel)
      /* #endif */
      return response
    } else {
      return response
    }
  }
}

httpRequestPlugin.install = (Vue, options) => {
  Vue.HttpRequest = httpRequestPlugin
  Vue.prototype.$httpRequest = httpRequestPlugin
}

// Vue.use(httpRequest)

export default httpRequestPlugin
