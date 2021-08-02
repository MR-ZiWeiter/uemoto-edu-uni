// import config from '@/config';
import store from '@/store';
/* 导出接口注解 */
export * from './account';

export class apiToolsModel {

  /**
   * @description post参数管理方法
   *
   * @param {string} code 接口CODE码，必传
   * @param {{[x: string]: any}} [child] 正常接口请求参数，内容部分 可选
   * @param {{[x: string]: any}} [parent] 父级参数 可全部自定义
   * @return {*} 
   * @memberof apiToolsModel
   */
  static post(code: string, child?: {[x: string]: any}, parent?: {[x: string]: any}): ApiRequestModel {
    let accessInfo: ApiRequestInAccessInfoModel = {};
    if (store.getters.token) {
      // console.log(store.getters)
      accessInfo = store.getters.accessInfo
    }
    return {
      format:true,
      postData: {
        ...accessInfo,
        action: code,
        paras: {
          /* 默认参数 */
          // site_code: config.site_code,
          // platform: config.platform,
          /* 其他参数 */
          ...child
        },
        /* 其他参数 可覆盖 */
        ...parent
      }
    }
  }
}