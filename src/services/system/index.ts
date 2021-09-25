// import { loadingController } from '@ionic/vue'
import store from '@/store'

// import wx from 'weixin-ts-sdk'
import { ToolsService } from '../tools'
/* #ifdef H5 */
import wx from 'weixin-js-sdk'
/* #endif */
export class SystemService {
  public loading: any;

  public failNum = 0;

  private toolsService = new ToolsService()

  constructor() {
    this.initJSSDKChange()
  }

  public setJSSDK_CONFIG(info: ApiJSSDKModel) {
    this.initalJSSDKCONFIG(info)
  }

  public initalJSSDKCONFIG(config: ApiJSSDKModel) {
    wx.config({
      beta: true,
      debug: false,
      ...config,
      // 这里是把所有的方法都写出来了 如果只需要一个方法可以只写一个
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
        'openWXDeviceLib',
        'closeWXDeviceLib',
        'configWXDeviceWiFi',
        'getWXDeviceInfos',
        'sendDataToWXDevice',
        'startScanWXDevice',
        'stopScanWXDevice',
        'connectWXDevice',
        'disconnectWXDevice',
        'getWXDeviceTicket',
        'WeixinJSBridgeReady',
        'onWXDeviceBindStateChange',
        'onWXDeviceStateChange',
        'onScanWXDeviceResult',
        'onReceiveDataFromWXDevice',
        'onWXDeviceBluetoothStateChange'
      ]
    })
  }

  public async openLoading(message: string) {
    // this.loading = await loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message
    // })
    // await this.loading.present()
    // return this.loading
  }

  public async closeLoading() {
    if (this.loading) {
      await this.loading.dismiss()
    }
  }

  public createToast({title, icon, mask, duration}: UniApp.ShowToastOptions = {title: '提示', icon: 'none', mask: true, duration: 2000}) {
    uni.showToast({
      title,
      icon,
      mask,
      duration
    })
  }

  // 获取地址
  public getLocation(callback: (latLng: LMapPointCoordsArrayModel) => void) {
    /* #ifdef H5 */
    uni.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: (res: any) => {
        callback([res.latitude, res.longitude])
      },
      fail: () => {
        this.initJSSDKChange()
        setTimeout(() => {
          this.failNum++
          if (this.failNum >= 10) {
            this.failNum = 0
            this.toolsService.customToast('获取定位失败!请刷新页面后再试!')
          } else {
            this.getLocation(callback)
          }
        }, 1000)
      }
    })
    /* #endif */
  }

  // 打开地址
  public async openLocation(config: ApiJSSDKLocationModel) {
    let loading = false
    await this.openLoading('加载地图中,请稍后...')
    /* #ifdef H5 */
    uni.openLocation({
      ...config,
      success: () => {
        this.loading.dismiss()
        loading = true
      },
      fail: () => {
        this.initJSSDKChange()
        setTimeout(() => {
          this.failNum++
          if (this.failNum >= 10) {
            this.failNum = 0
            this.toolsService.customToast('打开导航失败!请刷新页面后再试!')
          } else {
            this.openLocation(config)
          }
        }, 1000)
      }
    })
    /* #endif */
    setTimeout(() => {
      if (!loading) {
        this.loading.dismiss()
      }
    }, 10000)
  }

  // 预览图片
  public async priviewImage(config: ApiJSSDKPreviewImageMode) {
    let loading = false
    await this.openLoading('正在加载预览图片,请稍后...')
    /* #ifdef H5 */
    uni.previewImage({
      ...config,
      success: () => {
        setTimeout(() => {
          this.loading.dismiss()
          loading = true
        }, 300)
      },
      fail: () => {
        this.initJSSDKChange()
        setTimeout(() => {
          this.failNum++
          if (this.failNum >= 10) {
            this.failNum = 0
            this.toolsService.customToast('打开图片预览失败!请刷新页面后再试!')
          } else {
            this.priviewImage(config)
          }
        }, 1000)
      }
    })
    /* #endif */
    setTimeout(() => {
      if (!loading) {
        this.loading.dismiss()
      }
    }, 1000)
  }

  // 初始化SDK
  public initJSSDKChange() {
    // store.dispatch('asyncFetchJSSDKSignatureConfig').then((infos: ApiResponseModel) => {
    //   this.setJSSDK_CONFIG(infos.rel)
    // })
  }

  // 调用 微信/支付宝 支付方法
  public openLoadWexPlayChange(info: ApiWexPlayModel) {
    /* #ifdef MP-WEIXIN || MP-ALIPAY */
    uni.requestPayment({
      // appId: 'wx248faf9f9c2a9d9c',
      provider: 'wxpay',
      /* #ifdef MP-ALIPAY */
      orderInfo: info.prepayId,
      /* #endif */
      timeStamp: String(info.timeStamp),
      nonceStr: info.nonceStr,
      package: info.package,
      // package: 'prepay_id=' + info.prepayId,
      signType: info.signType,
      paySign: info.paySign || info.sign,
      success: info.success,
      fail: info.fail
    })
    /* #endif */
    /* #ifdef H5 */
    wx.chooseWXPay({
      timestamp: String(info.timeStamp),
      // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: String(info.nonceStr),
      // 支付签名随机串，不长于 32 位
      package: String(info.package),
      // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: info.signType || 'MD5',
      // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: String(info.sign),
      // 支付签名, // 支付签名
      success: info.success,
      fail: info.fail
    })
    /* #endif */
  }

  /* 打开照相机扫码 */
  public openCaramCodeChange(fn: (info: any) => void) {
    /* #ifdef H5 */
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: (res: { resultStr: any }) => {
        const result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        if (result.indexOf('xmzt.cn') != -1) {
          fn && fn(res.resultStr)
        } else {
          uni.showToast({
            title: '请扫描官方提供的二维码~',
            position: 'center',
            duration: 1500
          })
        }
      }
    })
    /* #endif */
    /* #ifdef MP-WEIXIN || MP-ALIPAY */
    uni.scanCode({
      success(res: any) {
        if (res.errMsg === 'scanCode:ok') {
          fn && fn(res.result)
        } else {
          uni.showToast({
            title: '请扫描官方提供的二维码~',
            position: 'center',
            duration: 1500
          })
        }
      }
    })
    /* #endif */
  }

  // 打开拨号
  public openCall(options: UniApp.MakePhoneCallOptions) {
    uni.makePhoneCall({
      ...options
    })
  }
}
