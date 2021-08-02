import store from '@/store'
import Logger from '@/utils/plugins/logger'

// const logger = new Logger('Navigator')

// tslint:disable-next-line: class-name
class navigateModel {
  public name = 'Navigator';
  private navigatorData: string | null = '';
  private navigatorURL: string | null = '';
  public logger = new Logger('Navigate');
  static install: (Vue: any, options: any) => void;
  /**
   * 格式化key-value对象为'key=value'查询字符串
   * @param {Object} query
   * @returns {string}
   */
  public _formatQuery(query: any): string {
    const qs: string[] = []
    Object.getOwnPropertyNames(query || {})
      // 只允许类型为string或者number的query
      .filter(key => {
        const value = query[key]
        const type = typeof value
        return type === 'string' || type === 'number'
      })
      .map(key => {
        const value = query[key]
        qs.push(`${key}=${value}`)
      })
    return qs.join('&')
  }

  /**
   * 统一格式化导航方法。包括：
   * 1.增加query属性，省得调用导航方法的时候拼成url
   * 2.如果没有fail回调，自动添加，方便报错的时候能够丢出错误。比如navigateTo调用超过5次无响应问题
   * @param config
   * @returns {*}
   * @private
   */
  public _formatConfig(config: PNavigateConfigModel) {
    // this.log('config', { ...config })

    if (config.query) {
      config.url = `${config.url}?${this._formatQuery(config.query)}`
      // this.log(config.url, '---')
      config.query = undefined
    }
    // 保存数据
    this.navigatorData = config.data
    this.navigatorURL = config.url
    config.data = undefined

    if (!config.fail) {
      config.fail = err => {
        console.error(err)
      }
    }
    return config
  }

  /**
   * 获取跳转所传入的data数据，比query好的地方是支持任何数据格式
   * @returns {*}
   */
  public getNavigateData() {
    if (!this.navigatorData) {
      console.warn(`跳转到${this.navigatorURL}的data不存在，可能是跳转的时候未使用封装的跳转方法或者未传入data值`)
    }
    return this.navigatorData
  }
  /**
   * 读取后立即清除
   *
   * 避免其他页面获取到脏数据，通过示例说明，假设存在如下跳转关系：A -> B -> A -> C -> A
   * 如果 B 返回数据给 A，而 C 没有返回数据给 A，那么最后一次  A 获取的范围数据不是空，而是页面 B 的返回数据，这回导致页面 B 出现逻辑错误
   */
  public getAndClearNavigateData() {
    const _navigatorData = this.navigatorData
    this.navigatorData = null
    return _navigatorData
  }

  /**
   * @param {Object} config
   * @param {string} config.url
   * @param {Object} [config.query] - 跳转参数
   * @param {Object} [config.data] - 跳转数据
   * @param {Function} [config.success]
   * @param {Function} [config.fail]
   * @param {Function} [config.complete]
   * @returns {undefined}
   */
  public navigateTo(config: PNavigateConfigModel) {
    uni.navigateTo(this._formatConfig(config))
  }

  /**
   * @param {Object} config
   * @param {string} config.url
   * @param {Object} [config.query] - 跳转参数
   * @param {Object} [config.data] - 跳转数据
   * @param {Function} [config.success]
   * @param {Function} [config.fail]
   * @param {Function} [config.complete]
   * @returns {undefined}
   */
  public redirectTo(config: PNavigateConfigModel): void {
    uni.redirectTo(this._formatConfig(config))
  }

  /**
   * @param {Object} config
   * @param {string} config.url
   * @param {Object} [config.query] - 跳转参数
   * @param {Object} [config.data] - 跳转数据
   * @param {Function} [config.success]
   * @param {Function} [config.fail]
   * @param {Function} [config.complete]
   * @returns {undefined}
   */
  public reLaunch(config: PNavigateConfigModel): void {
    uni.reLaunch(this._formatConfig(config))
  }

  /**
   * @param {Object} config
   * @param {string} config.url
   * @param {Object} [config.data]
   * @param {Function} [config.success]
   * @param {Function} [config.fail]
   * @param {Function} [config.complete]
   */
  public switchTab(config: PNavigateConfigModel): void {
    uni.switchTab(this._formatConfig(config))
    store.dispatch('asyncFetchCurrentPageUrl')
  }

  /**
   * @param {Object} config
   * @param {number} [config.delta]
   * @param {Array} [config.backPages]
   * 注意backPages里面的必须是如/pages/index/home之类的绝对路径
   */
  public navigateBack(config: PNavigateBackConfigModel): void {
    if (config.data) {
      this.navigatorData = config.data
      this.navigatorURL = 'Back'
    }

    // console.log(getCurrentPages())
    if (getCurrentPages().length > 1) {
      // 1. delta形式返回
      if (typeof config.delta === 'number') {
        return uni.navigateBack(config)
      }
      // 2. 指定页面名称返回
      const historyPages = getCurrentPages()
      for (let i = 0, len1 = config.backPages.length; i < len1; i += 1) {
        const backPage = config.backPages[i]
        for (let j = 0, len2 = historyPages.length; j < len2; j += 1) {
          const route = `/${historyPages[len2 - j - 1].route}`
          if (route === backPage) {
            return uni.navigateBack({ delta: j })
          }
        }
      }
    } else {
      const urlArray = getCurrentPages()[0].route?.split('/') || []
      // console.log(urlArray)
      if (urlArray.length > 2) {
        urlArray.splice(urlArray.length - 2, 1)
        this.redirectTo({
          url: '/' + urlArray.join('/'),
          fail: () => {
            urlArray[0] = 'pages'
            this.redirectTo({
              url: '/' + urlArray.join('/'),
              fail: () => {
                this.redirectTo({
                  url: '/pages/home/index'
                })
              }
            })
          }
        })
      } else {
        this.redirectTo({
          url: '/pages/home/index'
        })
      }
    }
    // console.log(config.backPages.length)
    /* 其他方式 回到钩子函数 */
    return uni.navigateBack(config)
  }

  public getCurrentRouterName = () => {
    const historyPages = getCurrentPages()
    if (historyPages.length) {
      const current = historyPages[historyPages.length - 1].route
      return current
    } else {
      console.warn('没有找到页面路由路由')
      return ''
    }
  }
}

// const navigateModel = {
//   navigateTo,
//   redirectTo,
//   reLaunch,
//   switchTab,
//   getNavigateData,
//   getAndClearNavigateData,
//   navigateBack,
//   getCurrentRouterName
// }

navigateModel.install = (Vue, options) => {
  // eslint-disable-next-line new-cap
  Vue.prototype[`$navigateModel`] = new navigateModel()
}

export default navigateModel
// export default class navigateModel {}
// export default extends(navigateModel)
