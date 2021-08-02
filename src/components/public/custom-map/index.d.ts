export interface UniMapOptionsConfigModel {
  /***
   * @params longitude {Number} 中心经度
   */
  longitude?: number;
  /***
   * @params latitude {Number} 中心纬度
   */
  latitude?: number;
  /**
   * @param scale {number} 缩放级别，取值范围为5-18 
   */
  scale?: number;
  /**
   * @param markers {Array} 标记点
   */
  markers?: Array<UniMapOptionsMarkerModel>;
  /**
   * @param markers {Array} 路线
   */
  polyline?: Array<UniMapOptionsPolylineModel>;
  /**
   * @param circles {Array} 圆
   */
  circles?: Array<UniMapOptionsCirclesModel>;
  /**
   * @param controls {Array} 控件
   */
  controls?: Array<UniMapOptionsControlsModel>;
  /**
   * @param includePoints {Array} 缩放视野以包含所有给定的坐标点
   */
  includePoints?: Array<UniMapOptionsPointsModel>;
  /**
   * @param trajectoryConfig {UniMapOptionsTrajectoryModel} 自定义轨迹回放数据配置 
   */
  trajectoryConfig?: UniMapOptionsTrajectoryModel|null;
  /**
   * @param able3D {boolean} 是否显示3D楼块
   */
  able3D?: boolean;
  /**
   * @param showCompass {boolean} 是否显示指南针
   */
  showCompass?: boolean;
  /**
   * @param enableZoom {boolean} 是否支持缩放
   */
  enableZoom?: boolean;
  /**
   * @param enableScroll {boolean} 是否支持拖动
   */
  enableScroll?: boolean;
  /**
   * @param enableRotate {boolean} 是否支持旋转
   */
  enableRotate?: boolean;
  /**
   * @param enableOverlooking {boolean} 是否开启俯视
   */
  enableOverlooking?: boolean;
  /**
   * @param enableSatellite {boolean} 是否开启卫星图
   */
  enableSatellite?: boolean;
  /**
   * @param enableTraffic {boolean} 是否开启实时路况
   */
  enableTraffic?: boolean;
  /**
   * @param enablePoi {boolean} 是否展示 POI 点	2.14.0
   */
  enablePoi?: boolean;
  /**
   * @param enableBuilding {boolean} 		否	是否展示建筑物	2.14.0
   */
  enableBuilding?: boolean;

  /**
   * @param setting {UniMapOptionsSubConfigModel} 子配置项 否	配置项	2.8.2
   */
  setting?: UniMapOptionsSubConfigModel;
  /**
   * @param showLocation {boolean} 显示带有方向的当前定位点
   */
  showLocation?: boolean;
  /**
   * @param polygons {Array} 多边形
   */
  polygons?: Array<UniMapOptionsPolygonModel>;
  /**
   * @param markertap {EventHandle} 点击标记点时触发，e.detail = {markerId}
   */
  markertap?: (e?: any) => void;
  /**
   * @param labeltap {EventHandle} 点击label时触发，e.detail = {markerId}
   */
  labeltap?: (e?: any) => void;
  /**
   * @param callouttap {EventHandle} 点击标记点对应的气泡时触发，e.detail = {markerId}
   */
  callouttap?: (e?: any) => void;
  /**
   * @param controltap {EventHandle} 点击控件时触发，e.detail = {controlId}
   */
  controltap?: (e?: any) => void;
  /**
   * @param regionchange {EventHandle} 视野发生变化时触发
   */
  regionchange?: (e?: any) => void;
  /**
   * @param @tap {EventHandle} 点击地图时触发; App-nuve、微信小程序2.9支持返回经纬度
   */
  tap?: (e?: any) => void;
  /**
   * @param @updated {EventHandle} 在地图渲染更新完成时触发
   */
  updated?: (e?: any) => void;
  polylineConfig?: UniMapOptionsPolylineModel;
  [x: string]: any;
}
/**
 * @interface UniMapOptionsTrajectoryModel 自定义轨迹回放数据模型
 */
export interface UniMapOptionsTrajectoryModel {
  /**
   * @param marker {UniMapOptionsPointsModel} 配置自定义轨迹的Marker
   */
  marker: UniMapOptionsPointsModel & { id: number };
  /**
   * @param path {UniMapOptionsLngLatModel} 配置轨迹点数据模型
   */
  path: Array<UniMapOptionsLngLatModel>;
  /**
   * @param autoRotate {Boolean} true	否	根据路径方向自动改变 marker 的旋转角度
   */
  autoRotate?: boolean;
  /** @param duration {number} 是	平滑移动的时间 每个点间隔的时间 */
  duration: number;		
  /**
   * @param success {Function} function		否	接口调用成功的回调函数
   */
  success(e: any): void;
  /**
   * @param fail {Function} function		否	接口调用失败的回调函数
   * @param e any
   */
  fail(e: any): void;
  /** @param complete {Function} 	function		否	接口调用结束的回调函数（调用成功、失败都会执行） */
  complete(e: any): void;
  [x: string]: any;
}
/**
 * @interface UniMapOptionsSubConfigModel 子配置项
 * @description 同 UniMapOptionsConfigModel
 */
export interface UniMapOptionsSubConfigModel {
  skew?: number;
  rotate?: number;
  showLocation?: boolean;
  showScale?: boolean;
  subKey?: string;
  layerStyle?: number;
  enableZoom?: boolean;
  enableScroll?: boolean;
  enableRotate?: boolean;
  showCompass?: boolean;
  enable3D?: boolean;
  enableOverlooking?: boolean;
  enableSatellite?: boolean;
  enableTraffic?: boolean;
}
/* marker */
export interface UniMapOptionsMarkerModel {
  /***
   * @param id {number} marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能。最大限制9位数 
   */
  id?: number;
  /**
   * @param latitude {number} 浮点数，范围 -90 ~ 90
   */
  latitude?: number;
  /**
   * @param longitude {number} 浮点数，范围 -180 ~ 180
   */
  longitude?: number;
  /**
   * @param title {string} 点击时显示，callout存在时将被忽略
   */
  title?: string;
  /**
   * @param iconPath {string} 项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径 
   */
  iconPath?: string;
  /**
   * @param rotate {number} 顺时针旋转的角度，范围 0 ~ 360，默认为 0
   */
  rotate?: number;
  /**
   * @param alpha {number} 默认1，无透明，范围 0 ~ 1 
   */
  alpha?: number;
  /**
   * @param width {number} 默认为图片实际宽度 
   */
  width?: number;
  /**
  * @param height {number} 默认为图片实际高度 
  */
  height?: number;
  /***
   * @param customCallout {boolean} 自定义Callout 2.12.0支持
   */
  customCallout?: {
    display: 'BYCLICK' | 'ALWAYS';
    anchorX?: number;
    anchorY?: number;
    [x: string]: any;
  };
  /**
   * @param callout {UniMapOptionsMarkerCalloutModel} 支持的属性见下表，可识别换行符。 
   */
  callout?: UniMapOptionsMarkerCalloutModel;
  /**
   * @param label {UniMapOptionsMarkerLabelModel} 支持的属性见下表，可识别换行符。 
   */
  label?: UniMapOptionsMarkerLabelModel;
  /**
   * @param anchor {UniMapOptionsMarkerAnchorModel} {x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点 
   */
  anchor?: UniMapOptionsMarkerAnchorModel;
  [x: string]: any;
}
/* marker 上的气泡 callout */
export interface UniMapOptionsMarkerCalloutModel {
  /* 文本 */
  content?: string;
  color: string;
  /* 文字大小 Number App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  fontSize: number;
  /* callout边框圆角 Number App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  borderRadius: number;
  /* 背景色 String App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  bgColor: string;
  /* 文本边缘留白 Number App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  padding: number;
  /* 'BYCLICK':点击显示; 'ALWAYS':常显 String App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  display: 'BYCLICK'|'ALWAY';
  /* 文本对齐方式。有效值: left, right, center String App-nvue 2.1.5+、微信小程序、百度小程序 */
  textAlign: 'left'|'right'|'center';
  [x: string]: any;
}

/* marker 上的标签 label */
export interface UniMapOptionsMarkerLabelModel {
  /* 文本 String  */
  content?: string;
  /* 文本颜色 String App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  color?: string;
  /* 文字大小 Number App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  fontSize?: number;
  /* label的坐标，原点是 marker 对应的经纬度 Number App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  x?: number;
  /* label的坐标，原点是 marker 对应的经纬度 Number App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  y?: number;
  /* 边框宽度 Number 微信小程序、百度小程序 */
  borderWidth?: number;
  /* 边框颜色 String 微信小程序、百度小程序 */
  borderColor?: number;
  /* 边框圆角 Number App-nvue 2.1.5+、微信小程序、百度小程序 */
  borderRadius?: number;
  /* 背景色 String App-nvue 2.1.5+、微信小程序、百度小程序 */
  bgColor?: string;
  /* 文本边缘留白 Number App-nvue 2.1.5+、微信小程序、百度小程序 */
  padding?: number;
  /* 文本对齐方式。有效值: left, right, center String App-nvue 2.1.5+、微信小程序、百度小程序 */
  textAlign?: 'left'|'right'|'center';
  [x: string]: any;
}

/* marker anchor */
export interface UniMapOptionsMarkerAnchorModel {
  x: number;
  y: number;
  [x: string]: any;
}

/* polyline 指定一系列坐标点，从数组第一项连线至最后一项 */
export interface UniMapOptionsPolylineModel {
  /* 经纬度数组	Array	是	[{latitude: 0, longitude: 0}]	 */
  points?: Array<UniMapOptionsPointsModel>;
  /* 线的颜色	String	否	8位十六进制表示，后两位表示alpha值，如：#0000AA	 */
  color?: string;
  /* 线的宽度	Number	否	 */	
  width?: number;
  /* 是否虚线	Boolean	否	默认false	App-nvue 2.1.5+、微信小程序、H5、百度小程序、支付宝小程序 */
  dottedLine?: boolean;
  /* 带箭头的线	Boolean	否	默认false，微信小程序开发者工具暂不支持该属性	App-nvue 2.1.5+、微信小程序、百度小程序 */
  arrowLine?: boolean;
  /* 更换箭头图标	String	否	在arrowLine为true时生效	App-nvue 2.1.5+、微信小程序、百度小程序 */
  arrowIconPath?: string;
  /* 线的边框颜色	String	否		App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  borderColor?: string;
  /* 线的厚度	Number	否		App-nvue 2.1.5+、微信小程序、H5、百度小程序 */
  borderWidth?: number;
  [x: string]: any;
}

/* 点 */
export interface UniMapOptionsPointsModel {
  latitude: number;
  longitude: number;
  /* 该点是否可点击 */
  isClick?: boolean;
  /** @param customMarkerOption 自定义MarkerOptions */
  customMarkerOption?: UniMapOptionsMarkerModel;
  /** @param customClickMarkerOption 自定义点击后MarkerOptions */
  customClickMarkerOption?: UniMapOptionsMarkerModel;
  [x: string]: any;
}

/** 坐标点的模型 */
export interface UniMapOptionsLngLatModel {
  latitude: number;
  longitude: number;
  [x: string]: any;
}

/* polygon 指定一系列坐标点，根据 points 坐标数据生成闭合多边形 */
export interface UniMapOptionsPolygonModel {
  /* 经纬度数组	array	是	[{latitude: 0, longitude: 0}] */
  points: Array<UniMapOptionsPointsModel>;
  /* 描边的宽度	Number	否	 */
  strokeWidth: number;
  /* 描边的颜色	String	否	十六进制 */
  strokeColor: string;
  /* 填充颜色	String	否	十六进制 */
  fillColor: string;
  /* 设置多边形 Z 轴数值	Number	否 */
  zIndex: number;
  [x: string]: any;
}

/* circles 在地图上显示圆 */
export interface UniMapOptionsCirclesModel {
  /* 纬度	Number	是	浮点数，范围 -90 ~ 90 */
  latitude: number;
  /* 经度	Number	是	浮点数，范围 -180 ~ 180 */
  longitude: number;
  /* 描边的颜色	String	否	8位十六进制表示，后两位表示alpha值，如：#0000AA */
  color: string;
  /* 填充颜色	String	否	8位十六进制表示，后两位表示alpha值，如：#0000AA */
  fillColor: string;
  /* 半径	Number	是	 */
  radius: number;
  /* 描边的宽度	Number	否 */
  strokeWidth: number;
  [x: string]: any;
}

/* controls 在地图上显示控件，控件不随着地图移动 */
export interface UniMapOptionsControlsModel {
  /**
   * @param id {number} 控件id	Number	否	在控件点击事件回调会返回此id
   */
  id: number;
  /**
   * @param position {UniMapOptionsPointsModel} 控件在地图的位置	Object	是	控件相对地图位置
   */
  position: UniMapOptionsPointsModel;
  /**
   * @param iconPath 显示的图标	String	是	项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对项目根目录；也支持临时路径 */
  iconPath: string;
  /**
   * @param clickable {Boolean} 是否可点击	Boolean	否	默认不可点击 */
  clickable: boolean;
  [x: string]: any;
}

/* position  */
export interface UniMapOptionsPositionModel {
  /**
   * @param left {Number} 距离地图的左边界多远	Number	否	默认为0
  */
  left: number;
  /**
   * @param top {number} 距离地图的上边界多远	Number	否	默认为0 */
  top: number;
  /**
   * @param width {number} 控件宽度	Number	否	默认为图片宽度 */
  width: number;
  /**
   * @param height {number} 控件高度	Number	否	默认为图片高度 */
  height: number;
  [x: string]: any;
}
