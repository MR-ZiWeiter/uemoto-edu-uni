import { staticNetworkBaseUrl } from "@/config";

export class CoreToolsFunction {
  static install: (Vue: any, options: any) => void;
  // 判断是安卓还是iOS
  public isAndroid_ios() {
    const u = navigator.userAgent
    const app = navigator.appVersion
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    return isAndroid === true
  }
  // 判断是否是微信
  public isWeiXin() {
    if (/MicroMessenger/gi.test((navigator || {}).userAgent)) {
      return true
    } else {
      return false
    }
  }
  // 公共方法
  public pxToVw(num: number): string {
    return num / 750 * 100 + 'vw'
  }
  public pxToPx(num: number): string {
    return num / 2 + 'px'
  }
  public pxFormat(num: number): number {
    return window.innerWidth / 750 * num
  }
  public meterFormat(num: number): string {
    if (num < 1000) {
      return Math.ceil(num) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'KM'
    }
    return (num).toString()
  }
  // 防抖
  public debounce(fn: () => void, wait: number) {
    let timeout: any = null
    return function() {
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(fn, wait)
    }
  }
  // 节流
  public throttle(fn: any, delay: number) {
    fn && clearTimeout(fn.timer)
    fn.timer = setTimeout(() => {
      fn.call(this)
    }, delay)
  }
  /* 处理图片路径问题 */
  public imageUrlToHostChange(url: string): string {
    return staticNetworkBaseUrl + url;
  }
}

CoreToolsFunction.install = (Vue, options) => {
  // eslint-disable-next-line new-cap
  Vue.prototype[`$CoreTools`] = new CoreToolsFunction()
}
