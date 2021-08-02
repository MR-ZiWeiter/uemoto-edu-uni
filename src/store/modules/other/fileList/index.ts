import Vue from 'vue'
import OSS from 'ali-oss'

interface VUEXFileListStateModel {
  /* 多文件上传完成后的数据组 */
  commentFileList: any[];
  /* 是否是选择的 */
  isSelectFile: boolean;
  /* 选中的文件列表  上传成功后将会被清空 */
  selectFileList: any[];
  // 待裁剪对象
  cutFile: null;
  // OSS配置
  OSSConfig: {
    region: 'oss-cn-shenzhen' | string;
    // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
    accessKeyId: '<Your accessKeyId(STS)>' | string;
    accessKeySecret: '<Your accessKeySecret(STS)>' | string;
    stsToken: '<Your securityToken(STS)>' | string;
    bucket: 'xmzt-common' | 'xmzt-user' | 'xmzt-api' | 'xmzt-scenic' | string;
  };
  /* 上传成功后的列表 */
  upLoadSuccessList: any[];
}

interface ApiUploadFileListFormModel {
  isUpload?: boolean;
  type: 'image' | 'video' | 'audio' | string;
  name: string;
  file: Blob;
  [x: string]: any;
}

export default {
  state: {
    commentFileList: [],
    isSelectFile: false,
    selectFileList: [],
    // 待裁剪对象
    cutFile: null,
    // OSS配置
    OSSConfig: {
      region: 'oss-cn-shenzhen',
      // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
      accessKeyId: '<Your accessKeyId(STS)>',
      accessKeySecret: '<Your accessKeySecret(STS)>',
      stsToken: '<Your securityToken(STS)>',
      bucket: 'xmzt-common'
    },
    upLoadSuccessList: []
  },
  getters: {
    commentFileList: (state: VUEXFileListStateModel) => state.commentFileList,
    isSelectFile: (state: VUEXFileListStateModel) => state.isSelectFile,
    selectFileList: (state: VUEXFileListStateModel) => state.selectFileList,
    cutFile: (state: VUEXFileListStateModel) => state.cutFile,
    OSSConfig: (state: VUEXFileListStateModel) => state.OSSConfig,
    upLoadSuccessList: (state: VUEXFileListStateModel) => state.upLoadSuccessList
  },
  mutations: {
    UPDATA_COMMENT_FILE_LIST(state: VUEXFileListStateModel, info: { deep: any; value: any[] }) {
      if (info.deep) {
        state.commentFileList = info.value
      } else {
        state.commentFileList = [...state.commentFileList, ...info.value]
      }
    },
    UPDATA_IS_SELECT_FILE(state: VUEXFileListStateModel, info: boolean) {
      state.isSelectFile = info
    },
    UPDATA_SELECT_FILE_LIST(state: VUEXFileListStateModel, info: { deep: any; value: any[] }) {
      if (info.deep) {
        state.selectFileList = info.value
      } else {
        state.selectFileList = [...state.selectFileList, ...info.value]
      }
      // this.actions.asyncOssTokenKey()
      // console.log(this)
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this: any = this
      _this.dispatch('asyncOssTokenKey').then((res: any) => {
        _this.dispatch('asyncFileUploadOssServer', state.selectFileList)
      })
    },
    UPDATA_CUT_FILE(state: VUEXFileListStateModel, info: null) {
      state.cutFile = info
    },
    UPDATA_OSS_CONFIG(state: VUEXFileListStateModel, info: any) {
      state.OSSConfig = Object.assign({}, state.OSSConfig, info)
    },
    UPDATA_UPLOAD_SUCCESS_LIST(state: VUEXFileListStateModel, info: { deep: any; value: any[] }) {
      if (info.deep) {
        state.upLoadSuccessList = info.value
      } else {
        state.upLoadSuccessList = [...state.upLoadSuccessList, ...info.value]
      }
    },
    CLEAR_CURRENT_STORE_SESSION(state: VUEXFileListStateModel, info: any) {
      if (info) {
        state.commentFileList = []
        state.isSelectFile = false
        state.selectFileList = []
        state.cutFile = null
        state.upLoadSuccessList = []
        console.log('已清除当前评论缓存')
      }
    }
  },
  actions: {
    // 获取阿里云秘钥
    asyncOssTokenKey({ commit }: any, info: any) {
      return new Promise((resolve, reject) => {
        new Vue.HttpRequest({
          url: '/resource/open/getOssToken',
          method: 'GET',
          header: {},
          data: info,
          success: (res: ApiResponseModel) => {
            // console.log(res, 'ddd')
            commit('UPDATA_OSS_CONFIG', {
              accessKeyId: res.rel.credentials.accessKeyId,
              accessKeySecret: res.rel.credentials.accessKeySecret,
              stsToken: res.rel.credentials.securityToken
            })
            resolve(res)
          },
          fail: (err: any) => {
            console.log(err)
            reject(err)
          }
        })
      })
    },
    // 处理阿里上传操作
    asyncFileUploadOssServer({ commit, getters }: any, fileList: Array<ApiUploadFileListFormModel> & ApiUploadFileListFormModel) {
      uni.showLoading({
        title: '上传中...'
      })
      return new Promise((resolve, reject) => {
        const client = new OSS(getters.OSSConfig)
        // client.put()
        const promiseAll: any[] = []
        const times = new Date()
        const year = times.getFullYear()
        const month = times.getMonth() + 1
        const day = times.getDate()
        const formatTime = `${year}/${month}/${day}`
        const upLoadSuccessedList: any[] = []
        if (Object.prototype.toString.call(fileList) === '[object Array]') {
          fileList.map((item: ApiUploadFileListFormModel, index: number) => {
            // 判断该文件是否上传过 如果上传过 则跳过
            if (item.isUpload) {
              upLoadSuccessedList.push(item)
              return false
            }
            promiseAll.push(new Promise((resolves, rejects) => {
              client.put(`${item.type}/${formatTime}/${parseInt(String(Math.random() * 10000000000000))}.${item.name.split('.').reverse()[0]}`, item.file).then((res: { url: any }) => {
                console.log(res)
                uni.showLoading({
                  title: `已完成 ${parseInt(String((index + 1) / fileList.length))}%`
                })
                resolves(Object.assign({}, item, {
                  url: res.url,
                  types: item.type,
                  type: item.type === 'image' ? 1 : 2,
                  isUpload: true
                }))
              }).catch((err: any) => {
                console.log(err)
                rejects(false)
              })
            }))
          })
          Promise.all(promiseAll).then(res => {
            // console.log(res)
            resolve(res)
            commit('UPDATA_UPLOAD_SUCCESS_LIST', {
              deep: true,
              value: [...upLoadSuccessedList, ...res]
            })
            uni.showLoading({
              title: `已完成 100%`
            })
            setTimeout(() => {
              uni.hideLoading()
            }, 500)
          }).catch(resArray => {
            console.log(resArray)
            reject(resArray)
            if (resArray) {
              const handlerArray = resArray.filter((item: any) => item)
              console.log(handlerArray)
            }
          })
        } else {
          client.put(`${fileList.type}/${formatTime}/${parseInt(String(Math.random() * 10000000000000))}.${fileList.name.split('.').reverse()[0]}`, fileList.file).then((res: { url: any }) => {
            uni.showLoading({
              title: `已完成100%`
            })
            resolve(Object.assign({}, fileList, {
              url: res.url,
              types: fileList.type,
              type: fileList.type === 'image' ? 1 : 2,
              isUpload: true
            }))
          }).catch((err: any) => {
            console.log(err)
            reject(false)
          })
        }
      })
    }
  },
  modules: {}
}
