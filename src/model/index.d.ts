/* 顶级配置数据模型 */
interface PApiConfigModel {
  apiBaseUrl: string;
  staticUrl: string;
  amapKey: string;
  tencentKey: string;
  debug: boolean|true;
  appid: string;
  platform: string;
  install: any;
  [x: string]: any;
}

// Window定义变量
interface Window {
  // 高德地图对象
  AMap: any;
  [propsName: string]: any;
}

// 接口请求API对象
interface ApiRequestModel {
  postData?: ApiRequestPostModel;
  getData?: ApiRequestGetModel;
  [propsName: string]: any;
}
/**
 * @description 用户登录后 需要鉴权的部分数据
 *
 * @interface ApiRequestInAccessInfoModel
 */
interface ApiRequestInAccessInfoModel {
  account?: string;
  client_id?: string;
  sign?: string;
  org_code?: string;
  org_name?: string;
  real_name?: string;
  [x: string]: any;
}

interface ApiRequestPostModel {
  action?: string;
  paras?: {
    /** @param string site_code 接口编码，一般情况是必传 */
    site_code?: string;
    /** @param string code 小程序授权码 特定情况需要 */
    code?: string;
    /** @param string platform 平台类型 */
    platform?: 'WX'|'WEB'|'ANDROID'|'IOS'|string;
    [propsName: string]: any;
  };
  [propsName: string]: any;
}

interface ApiRequestGetModel {}

// 接口返回API对象
interface ApiResponseModel {
  code: string;
  success: boolean;
  msg: string;
  rel: any;
  [propsName: string]: any;
}

// 命名规则 P-xxx-Model
interface PNavigateConfigModel {
  data?: any;
  url: string;
  query?: any;
  delta?: number;
  fail?: (e: any) => void;
  success?: (e: any) => void;
  complete?: (e: any) => void;
  [x: string]: any;
}
interface PNavigateBackConfigModel {
  data?: any;
  delta?: number;
  animationType?: 'pop-out'|string|any;
  animationDuration?: number;
  [x: string]: any;
}

// 调用微信支付必须数据模型
interface ApiWexPlayModel {
  appId?: string;
  nonceStr?: string;
  package?: string;
  prepay_id?: string;
  sign?: string;
  paySign?: string;
  signType?: 'MD5'|'SHA1';
  timeStamp?: string;
  timestamp?: string;
  [propsName: string]: any;
}
interface ApiJSSDKModel {
  appId: string;
  nonceStr: string;
  timestamp: number;
  url: string;
  signature: string;
  [propsName: string]: any;
}

interface ApiJSSDKLocationModel {
  latitude: number; // 纬度，浮点数，范围为90 ~ -90
  longitude: number; // 经度，浮点数，范围为180 ~ -180。
  name: string; // 位置名
  address: string; // 地址详情说明
  scale: number; // 地图缩放级别,整形值,范围从1~28。默认为最大
  infoUrl: string; // 在查看位置界面底部显示的超链接,可点击跳转
  [x: string]: any;
}

interface ApiJSSDKPreviewImageMode {
  current: string; // 当前显示图片的http链接
  urls: Array<string>; // 需要预览的图片http链接列表
  [x: string]: any;
}
/** 定义数据类型为[x, y]; */
interface LMapPointCoordsArrayModel {
  [0]: number;
  [1]: number;
}

/** 定义数据类型为[lng, lat]; */
interface LMapPointArrayModel {
  [0]: number;
  [1]: number;
}

interface LMapPointXYModel {
  x: number;
  y: number;
  [x: string]: any;
}

/* 定义Wxjssdk */
declare module 'jsencrypt'
/* 定义lottie */
declare module 'lottie-miniapp'
declare module 'vue-lottie'
declare module '@/components/plugins/uni-mescroll/mescroll-mixins.js'
// declare module 'MescrollMixin'
