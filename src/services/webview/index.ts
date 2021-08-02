import apiConfig from '@/config'

export class WebviewService {
  /**
   * 打开协议
   * @param type 协议类型
   */
  public openServiceRuleEvent(type: number): void {
    const encodeURL = encodeURIComponent(apiConfig.staticUrl + `/statics/html/rule.html?type=${type}&time=${new Date().getTime()}`)
    uni.navigateTo({
      url: '/pagesC/preview/webview/index?redirectUrl=' + encodeURL
    })
  }
  public openWebviewByUrl(url: string): void {
    const timer = new Date().getTime()
    const redirectUrl = (url.includes('http://') || url.includes('https://')) ? url : apiConfig.staticUrl + url
    // console.log(encodeURIComponent(redirectUrl))
    uni.navigateTo({
      url: '/pagesC/preview/webview/index?redirectUrl=' + encodeURIComponent(redirectUrl)
    })
  }
  public openURL(url: string): void {
    const timer = new Date().getTime()
    const redirectUrl = (url.includes('http://') || url.includes('https://')) ? url : apiConfig.staticUrl + url
    window.location.href = redirectUrl
  }
}
