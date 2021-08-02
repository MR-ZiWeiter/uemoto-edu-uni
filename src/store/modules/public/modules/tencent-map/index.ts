import Vue from 'vue'
import { tencentMapAPIKEY } from '@/config'
import { ToolsService } from '@/services/tools'
import { deepCopy } from '@/utils'

interface IAPITencentPolylineWalkingModel {
  from: string;
  to: string;
  to_poi?: string;
  key?: string;
  [x: string]: any;
}

const toolsService = new ToolsService()
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 线路规划 步行（walking）
    async asyncPublicTencentPolylineWalking({ commit }: any, info: IAPITencentPolylineWalkingModel) {
      return new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: 'https://apis.map.qq.com/ws/direction/v1/walking',
          method: 'GET',
          data: {
            key: tencentMapAPIKEY,
            ...info
          },
          success: (res: any) => {
            /* 当规划的线路存在时 */
            if (res.result.routes.length) {
              let result = deepCopy(res.result.routes[0])
              result.polyline = toolsService.tencentPolylineToLngLatArrayEvent(result.polyline)
              resolve(result)
            } else {
              toolsService.customToast('暂无合适的线路推荐')
            }
          },
          fail: (err: any) => {
            console.log(err)
            reject(err)
          }
        })
      })
    }
  },
  modules: {}
}
