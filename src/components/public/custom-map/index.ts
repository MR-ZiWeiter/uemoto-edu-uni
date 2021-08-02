// home-map-icon-car@2x.svg
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import {
  UniMapOptionsConfigModel,
  UniMapOptionsPointsModel,
  UniMapOptionsPolygonModel,
  UniMapOptionsMarkerModel,
  UniMapOptionsPolylineModel,
  UniMapOptionsTrajectoryModel
} from './index.d'
import { staticNetworkBaseUrl, tencentMapAPIKEY } from '@/config'
import { mapActions, mapGetters } from 'vuex'
import { ToolsService } from '@/services/tools'

@Component({
  computed: {
    ...mapGetters({
      LngLat: 'LngLat'
    })
  },
  methods: {
    ...mapActions({
      asyncPublicTencentPolylineWalking: 'asyncPublicTencentPolylineWalking'
    })
  }
})
export default class CustomMapComponent extends Vue {
  public map: any;
  /* 地图默认配置 */
  public defaultMapConfig: UniMapOptionsConfigModel = {
    /* 设置最小距离 是否进行线路规划 */
    minDistance: 10,
    /* 是否开启线路规划 默认出发地为当前坐标 */
    isOpenPolylineDirection: false,
    /* 指定坐标进行线路规划 */
    directionLocation: {
      /* 是否开启指定坐标为规划起点坐标 */
      isSpecify: false,
      longitude: 0,
      latitude: 0
    },
    /* 默认polyline颜色配置 */
    polylineConfig: {
      color: '#394C4D',
      /* 优先选择colorList */
      // colorList: [],
      width: 4,
      dottedLine: false,
      arrowLine: false,
      arrowIconPath: '',
      borderColor: '',
      borderWidth: 0,
      level: 'abovelabels'
    },
    /* 默认polygon颜色配置 */
    polygonCongfig: {
      strokeWidth: 4,
      strokeColor: '#6D96BD',
      fillColor: '#6D96BD',
      zIndex: 1,
      level: 'abovelabels'
    },
    /* isCustomMarker 自定义MarkerCallout */
    isCustomMarkerCallout: false,
    /* 自定义默认Marker样式 */
    customMarkerStyle: {
      iconPath: staticNetworkBaseUrl + '/statics/images/public/min-icon/home-map-icon-car@2x@2x.png',
      width: 40,
      height: 45,
      customCallout: {
        // display: 'BYCLICK'
        display: 'ALWAYS',
        // isShow: 1,
        // layout:{
        //   params:{
        //     title:"标题栏",
        //     bgColor:'#FF00FF'
        //   },
        //   src: "/components/plugins/custom-map/index_marker_customcallout.xml"
        // },
      },

      /* 处理支付宝Marker点的兼容问题 */
      /* #ifdef MP-ALIPAY */
      // customCallout: {
      //   // canShowOnTap: true,
      //   layout:{
      //     params:{
      //       title:"标题栏",
      //       bgColor:'#FF00FF'
      //     },
      //     src: "/components/plugins/custom-map/index_marker_customcallout.xml"
      //   },
      //   layoutBubble:{
      //     style:"bubble",
      //     bgColor:"#898986",
      //     borderRadius:0,
      //     padding:16
      //   },
      //   isShow: 1
      // },
      /* #endif */
      // customCallout: {
      // display: 'ALWAYS',
      /* #ifdef MP-ALIPAY */
      // "type": 2,
      // "descList": [{
      //   "desc": "预计",
      //   "descColor": "#333333"
      // }, {
      //   "desc": "5分钟",
      //   "descColor": "#108EE9"
      // }, {
      //   "desc": "到达",
      //   "descColor": "#333333"
      // }],
      // "isShow": 1
      /* #endif */
      // },
    },
    /* 自定义轨迹回放数据格式 */
    trajectoryConfig: null,
    /* 地图自定义样式 */
    subkey: tencentMapAPIKEY,
    longitude: 0,
    latitude: 0,
    scale: 10,
    markers: [],
    polyline: [],
    polygons: [],
    circles: [],
    controls: [],
    includePoints: [],
    enable3D: false,
    showCompass: true,
    enableZoom: true,
    enableScroll: true,
    enableRotate: true,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
    enablePoi: true,
    enableBuilding: true,
    showLocation: true,
    // 可视范围
    getRegionList:[],
  }
  // 记录上一次改变时的Markers状态
  private prevMarkersStatusArrayInfo: Array<UniMapOptionsMarkerModel> = [];

  /* 当前Marker点的数据 */
  private currentMarkerInfo: any = {
    distance: 0,
    duration: 0,
    isOpenApp: false,
    openMarker: false
  };

  // 组件EV对象
  private componentEvent!: TouchEvent;

  /* 工具服务 */
  private toolsService = new ToolsService();

  /* 其他统一参数传入 */
  @Prop({ default: true }) public isShowNavIcon: boolean; // 是否显示汽泡导航按钮
  @Prop({ default: null }) public defaultConfig: UniMapOptionsConfigModel;
  @Watch('defaultConfig', { deep: true, immediate: true }) public defaultConfigChange(_n: UniMapOptionsConfigModel) {
    this.defaultMapConfig = Object.assign(this.defaultMapConfig, _n || {})
  }
  /* 中心坐标 */
  @Prop({ default: null }) public center: UniMapOptionsPointsModel;
  @Watch('center', { deep: true, immediate: true }) public centerChange(_n: UniMapOptionsPointsModel) {
    // console.log('center' + _n)
    this.defaultMapConfig = Object.assign(this.defaultMapConfig, _n || {})
  }
  // MarkerList传入参数
  @Prop({ default: [] }) public markers: Array<UniMapOptionsPointsModel & { id: number }>;
  @Watch('markers', { deep: true, immediate: true }) private markersChange(_n: Array<UniMapOptionsPointsModel & { id: number }>) {
    this.$nextTick(() => {
      if (this.map) {
        this.closeMarkerInfoEvent()
        this.prevMarkersStatusArrayInfo = _n.map(item => this.handlerMarkerToOption(item))
        // 判断是否有自定义轨迹回放的Marker
        if (this.defaultMapConfig.trajectoryConfig && this.defaultMapConfig.trajectoryConfig.marker) {
          this.prevMarkersStatusArrayInfo.push(this.handlerMarkerToOption(this.defaultMapConfig.trajectoryConfig.marker));
        }
        this.mapMarkerChange(this.prevMarkersStatusArrayInfo)
        // console.log('markers-ref', this.prevMarkersStatusArrayInfo)
      } else {
        setTimeout(() => {
          this.markersChange(_n)
        }, 100)
      }
    })
  };
  /* PolylineList传入参数 */
  @Prop({ default: [] }) public polylines!: Array<UniMapOptionsPolylineModel>;
  @Watch('polylines', { deep: true, immediate: true }) private polylinesChange(_n: Array<UniMapOptionsPolylineModel>) {
    this.$nextTick(() => {
      if (this.map) {
        this.defaultMapConfig.polyline = _n.map(item => this.handlerPolylineToOption(item))
        this.mapPolylineChange(this.defaultMapConfig.polyline)
      } else {
        setTimeout(() => {
          this.polylinesChange(_n)
        }, 100)
      }
    })
  };
  /* PolygonsList传入参数 */
  @Prop({ default: [] }) public polygons!: Array<UniMapOptionsPolygonModel>;
  @Watch('polygons', { deep: true, immediate: true }) private polygonsChange(_n: Array<UniMapOptionsPolygonModel>) {
    this.$nextTick(() => {
      if (this.map) {
        this.defaultMapConfig.polygons = (_n || []).map(item => this.handlerPolygonToOption(item))
        this.mapPolylineChange(this.defaultMapConfig.polygons)
        // console.log('polygons-ref', this.defaultMapConfig.polygons)
      } else {
        setTimeout(() => {
          this.polylinesChange(_n)
        }, 100)
      }
    })
  };

  /* isCenterMarker中心Marker显示与否 */
  @Prop({ default: false }) public isCenterMarker!: Boolean;

  /* Polyline 配置项 */
  @Prop({ default: 10 }) public minDistance!: number;
  @Watch('minDistance', { immediate: true }) private minDistanceChange(_n: number) {
    this.defaultMapConfig.minDistance = _n
  }
  @Prop({ default: false }) public isOpenPolylineDirection!: boolean;
  @Watch('isOpenPolylineDirection', { immediate: true }) private isOpenPolylineDirectionChange(_n: boolean) {
    this.defaultMapConfig.isOpenPolylineDirection = _n
  }
  @Prop({ default: null }) public directionLocation!: { isSpecify: boolean; longitude?: number; latitude?: number };
  @Watch('directionLocation', { deep: true, immediate: true }) private directionLocationChange(_n: any) {
    this.defaultMapConfig.directionLocation = _n
  }
  @Prop({ default: null }) public polylineConfig!: UniMapOptionsPolylineModel;
  @Watch('polylineConfig', { deep: true, immediate: true }) private polylineConfigChange(_n: UniMapOptionsPolylineModel) {
    // this.$set(this.defaultMapConfig,'polylineConfig', _n)
    this.defaultMapConfig.polylineConfig = Object.assign(this.defaultMapConfig.polylineConfig, _n)
    // console.log(this.defaultMapConfig)
  }
  // 新增轨迹回放数据结构
  @Prop({ default: null }) public trajectoryConfig!: UniMapOptionsTrajectoryModel | null;
  @Watch('trajectoryConfig', { deep: true, immediate: true }) private trajectoryConfigChange(_n: UniMapOptionsTrajectoryModel | null) {
    this.defaultMapConfig.trajectoryConfig = _n
    // console.log(_n?.success)
    if (this.map && _n) {
      // 执行线路绘制
      this.handlerTrajectoryEvent(this.defaultMapConfig.trajectoryConfig)
    }
  }
  /* 设置地图中心点偏移 支付宝小程序不支持 */
  @Prop({ default: null }) public centerOffset!: Array<number>;
  @Watch('centerOffset', { deep: true, immediate: true }) private centerOffsetChange(_n: Array<number>) {
    if (this.map && _n) {
      /* #ifdef MP-WEIXIN */
      this.map.setCenterOffset({ offset: _n })
      /* #endif */
    }
  }
  @Watch('defaultConfig.centerOffset', { deep: true, immediate: true }) private defaultConfigCenterOffsetChange(_n: Array<number>) {
    /* #ifdef MP-WEIXIN */
    this.centerOffsetChange(_n)
    /* #endif */
  }
  /* Polyline end */
  // @Prop({ default: {} }) private center!: UniMapOptionsPointsModel;
  // @Prop({ default: {} }) private center!: UniMapOptionsPointsModel;
  // @Prop({ default: {} }) private center!: UniMapOptionsPointsModel;

  /* @Emit 传出回调 */
  @Emit('mapTapEvent') private mapTapEvent(info: any) { }
  @Emit('mapMarkerTapEvent') private mapMarkerTapEvent(info: any) { }
  @Emit('mapMarkerCalloutTapEvent') private mapMarkerCalloutTapEvent(info: any) { }
  @Emit('mapRegionHandlerEvent') private mapRegionHandlerEvent(info: any) { }
  @Emit('mapMarkerChange') private mapMarkerChange(info: any) { }
  @Emit('mapPolylineChange') private mapPolylineChange(info: any) { }
  /* Vuex Getters */
  private LngLat!: any;

  /* Vuex Actions */
  private asyncPublicTencentPolylineWalking: (info?: any) => Promise<any>;

  /* 0 */
  created() {
    this.initalMap()
    /* #ifdef MP-WEIXIN */
    this.centerOffsetChange(this.centerOffset)
    /* #endif */
  }
  // 初始化地图获取实例
  private initalMap() {
    this.map = uni.createMapContext('custom-map', this as any)
    // console.log(this)
  }

  /* 设置运营范围函数 */
  public setScopeOfOperationChange(pointArray: Array<UniMapOptionsPointsModel>, options?: UniMapOptionsPolygonModel) {
    /* 定义封闭数据 */
    const customMapPolygonObject: UniMapOptionsPolygonModel = {
      type: 'scopeOfOperation',
      points: pointArray,
      strokeColor: options?.strokeColor || '#6D96BD',
      strokeWidth: options?.strokeWidth || 2,
      fillColor: options?.fillColor || '#6D96BDFF',
      zIndex: options?.zIndex || 99
    }
    this.defaultMapConfig.polygons?.push(customMapPolygonObject)
  }
  // 处理合成Marker点数据
  private handlerMarkerToOption(info: UniMapOptionsPointsModel & { id: number }, otherOption?: {}): UniMapOptionsMarkerModel {
    return {
      /* 注意顺序不要随意调动 */
      ...info,
      id: Math.abs((Math.random() * 1000000000000) | 0),
      isClick: info.isClick !== undefined ? info.isClick : true,
      markerId: info.id,
      latitude: info.latitude,
      longitude: info.longitude,
      ...this.defaultMapConfig.customMarkerStyle,
      ...info.customMarkerOption,
      ...otherOption
    }
  }
  // 处理合成Polyline数据
  private handlerPolylineToOption(info: UniMapOptionsPolylineModel, otherOption?: {}): UniMapOptionsPolylineModel {
    return {
      /* 注意顺序不要随意调动 */
      ...this.defaultMapConfig.polylineConfig,
      ...otherOption,
      ...info
    }
  }
  // 处理合成Polygon数据
  private handlerPolygonToOption(info: UniMapOptionsPolygonModel, otherOption?: {}): UniMapOptionsPolygonModel {
    return {
      /* 注意顺序不要随意调动 */
      ...this.defaultMapConfig.polygonCongfig,
      ...otherOption,
      ...info
    }
  }
  /* 处理图片路径问题 */
  public imageUrlToHostChange(url: string): string {
    return staticNetworkBaseUrl + url
  }
  /* Marker点击后触发 */
  public markerHandlerChange(e: any, onEvent: boolean = true) {
    // console.log(e)
    // console.log(this.prevMarkersStatusArrayInfo)
    this.prevMarkersStatusArrayInfo.some((item: UniMapOptionsMarkerModel | any) => {
      // console.log(item)
      if (Number(item.id) === Number(e.detail.markerId) && this.currentMarkerInfo.id !== Number(e.detail.markerId)) {
        if (item.isClick) {
          /* 处理上一次没有关闭的 */
          this.closeMarkerInfoEvent()
          /* 更改为点击后的状态 */
          this.markerIdToMarkerInfoEvent(Number(e.detail.markerId))
          /* 赋值当前Marker */
          this.currentMarkerInfo = Object.assign({}, this.currentMarkerInfo, item)
          /* 判断是否开启线路规划 */
          if (this.defaultMapConfig.isOpenPolylineDirection) {
            /* 判断是否是最小区域范围内 */
            const distance = this.toolsService.mapGetDistance(item.latitude, item.longitude)
            // console.log(this.toolsService.mapGetDistance(item.latitude, item.longitude))
            if (this.toolsService.mapGetDistance(item.latitude, item.longitude) < this.defaultMapConfig.minDistance) {
              this.toolsService.customToast('您已到达附近，无需导航')
              this.defaultMapConfig.polyline = []
              this.currentMarkerInfo = Object.assign({}, this.currentMarkerInfo, {
                duration: 1,
                distance,
                isOpenApp: false
              })
              /* 回调事件 */
              onEvent && this.mapMarkerTapEvent({
                ev: e,
                current: this.currentMarkerInfo
              })
            } else {
              this.asyncPublicTencentPolylineWalking({
                from: [...this.LngLat].reverse().join(','),
                to: `${item.latitude},${item.longitude}`
              }).then(res => {
                /* 数据同步 */
                this.currentMarkerInfo = Object.assign({}, this.currentMarkerInfo, res, {
                  isOpenApp: true
                })
                /* 画线 */
                const navigatePolylineConfig = this.handlerPolylineToOption({ points: [{ longitude: this.LngLat[0], latitude: this.LngLat[1] }, ...res.polyline, item] })
                this.defaultMapConfig.polyline = [navigatePolylineConfig]
                // 判断是否存在其他Line
                // if (this.tr) {}
                // console.log(navigatePolylineConfig)
                onEvent && this.mapMarkerTapEvent({
                  pageEV: this.componentEvent,
                  ev: e,
                  current: this.currentMarkerInfo
                })
              })
            }
          } else {
            /* 判断是否是最小区域范围内 */
            const distance = this.toolsService.mapGetDistance(item.latitude, item.longitude) | 0
            this.currentMarkerInfo = Object.assign({}, this.currentMarkerInfo, {
              duration: 1,
              distance,
              isOpenApp: false
            })
            // console.log(this.currentMarkerInfo)
            onEvent && this.mapMarkerTapEvent({
              pageEV: this.componentEvent,
              ev: e,
              current: this.currentMarkerInfo
            })
          }
        }
        return true
      } else {
        console.log('-----未找到Marker-------')
      }
    })
  }
  /* 更改某一指定Marker的样式 markerId 不是传入的ID */
  public markerIdToMarkerInfoEvent(markerId: number, options?: UniMapOptionsMarkerModel) {
    this.prevMarkersStatusArrayInfo = this.prevMarkersStatusArrayInfo.map(info => {
      /* 默认处理打开的Marker */
      if (info.id === markerId) {
        return {
          ...info,
          width: 62,
          height: 70,
          /* 自定义Makers点击后样式 */
          ...info.customClickMarkerOption,
          ...options
        }
      }
      return info
    })
  }
  /* 通过传入的ID进行模拟点击事件并执行 */
  public optionsIdHandlerMarkerClickEvent(optionsId: number) {
    const currentMarkerInfo = this.getMarkerInfo(optionsId)
    if (currentMarkerInfo.id) {
      this.markerHandlerChange({
        type: 'handler',
        detail: {
          markerId: currentMarkerInfo.id
        }
      }, false)
    } else {
      this.toolsService.customToast('您当前附近暂无该车辆，请谨慎扫码付费')
    }
  }
  /* 点击Marker后再点击Callout */
  public markerCalloutHandlerChange(e: any) {
    this.mapMarkerCalloutTapEvent({
      ev: e,
      current: this.currentMarkerInfo
    })
    if (this.defaultMapConfig.isOpenPolylineDirection) {
      this.openOtherAppNavigate()
    }
  }
  /* 拉起其他APP端导航 */
  public openOtherAppNavigate() {
    if (this.currentMarkerInfo.isOpenApp) {
      this.map.openMapApp({
        longitude: this.currentMarkerInfo.longitude,
        latitude: this.currentMarkerInfo.latitude,
        destination: '百汇百通-GPS-' + this.currentMarkerInfo.markerId
      })
    } else {
      this.toolsService.customToast('您已在附近，无需导航')
    }
  }
  /* 关闭Marker弹窗 */
  public closeMarkerInfoEvent() {
    // console.log(this.prevMarkersStatusArrayInfo)
    /* 关闭Marker弹窗 */
    if (this.currentMarkerInfo.id) {
      const status = this.prevMarkersStatusArrayInfo.some(item => item.markerId === this.currentMarkerInfo.markerId)
      /* 删除被放大的Marker */
      this.prevMarkersStatusArrayInfo = this.prevMarkersStatusArrayInfo.filter(fs => fs.id !== this.currentMarkerInfo.id)
      if (status) {
        /* 新增默认Marker */
        this.prevMarkersStatusArrayInfo.push(this.handlerMarkerToOption({
          ...this.currentMarkerInfo,
          id: this.currentMarkerInfo.markerId
        }))
      }
      /* 恢复成默认值避免数据混乱 */
      this.currentMarkerInfo = {
        distance: 0,
        duration: 0,
        isOpenApp: false,
        openMarker: false
      }
    }
  }
  /* 点击地图 */
  public mapTabHandlerChange(e: any) {
    // console.log(e)
    this.closeMarkerInfoEvent()
    /* 清空线路规划 */
    this.defaultMapConfig.polyline = []
    /* 向上回调 */
    this.mapTapEvent({
      pageEV: this.componentEvent,
      ev: e,
      map: this.map,
      prevMarkerInfo: this.currentMarkerInfo,
      location: e.detail
    })
  }
  /* 更改地图层级 */
  public setZoom(zoom: number) {
    this.defaultMapConfig.scale = zoom
  }
  /* 更改地图中心点 */
  public setCenter(latLng: UniMapOptionsPointsModel) {
    this.defaultMapConfig.latitude = latLng.latitude
    this.defaultMapConfig.longitude = latLng.longitude
  }
  /* 根据地图Marker点及定位坐标进行自适应缩放地图 */
  public autoCenterAndZoom(points?: Array<{ lng: number; lat: number;[x: string]: any }>) {
    const allPoints = points || [{ lng: this.LngLat[0], lat: this.LngLat[1] }]
    let maxLng = allPoints[0].lng
    let minLng = allPoints[0].lng
    let maxLat = allPoints[0].lat
    let minLat = allPoints[0].lat
    let res
    for (let i = allPoints.length - 1; i >= 0; i--) {
      res = allPoints[i]
      if (res.lng > maxLng) maxLng = res.lng
      if (res.lng < minLng) minLng = res.lng
      if (res.lat > maxLat) maxLat = res.lat
      if (res.lat < minLat) minLat = res.lat
    }
    var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2
    var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2
    var zoom = this.getPointsZoom(maxLng, minLng, maxLat, minLat)
    this.setZoom(zoom)
    this.setCenter({
      latitude: cenLat,
      longitude: cenLng
    })
  }
  /* 根据坐标进行获取覆盖物的地图缩放层级 */
  public getPointsZoom(maxLng: number, minLng: number, maxLat: number, minLat: number): number {
    const zoom = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000]//级别18到3。
    const distance = this.toolsService.mapGetDistance(maxLat, maxLng, minLat, minLng)  //获取两点距离,保留小数点后两位  
    for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
      if (zoom[i] - distance > 0) {
        return 19 - i
      }
    }
    return 16
  }
  /* 通过点信息返回Marker点信息 */
  public getMarkerInfo(optionsId: number): UniMapOptionsMarkerModel {
    let resultInfo: UniMapOptionsMarkerModel | any = {}
    // console.log(this.prevMarkersStatusArrayInfo)
    this.prevMarkersStatusArrayInfo.some((item) => {
      // console.log(item)
      if (item.id === optionsId || item.markerId === optionsId || item.carNo === optionsId) {
        resultInfo = item
        return true
      }
    })
    return resultInfo
  }
  /* 拖动地图时触发 */
  public mapRegionHandlerChange(e: any) {
    // console.log(e)
    // if (e.type === 'end') {
    // console.log(e.detail.centerLocation)
    // console.log(this.defaultMapConfig.longitude, this.defaultMapConfig.latitude)
    // this.center = e.detail.centerLocation
    // this.defaultMapConfig.longitude = e.detail.centerLocation.longitude
    // this.defaultMapConfig.latitude = e.detail.centerLocation.latitude
    // }
    // console.log(e)
    let centerLocation: any;
    /* #ifdef MP-ALIPAY */
    if (e.type === 'end') {
      centerLocation = {
        longitude: e.longitude,
        latitude: e.latitude,
        type: e.type
      }
    } else {
      centerLocation = {
        type: e.type
      }
    }
    /* #endif */
    /* #ifdef MP-WEIXIN */
    if (e.type === 'end') {
      centerLocation = {
        longitude: e.detail.centerLocation.longitude,
        latitude: e.detail.centerLocation.latitude,
        type: e.type
      }
    } else {
      centerLocation = {
        type: e.type
      }
    }
    /* #endif */
    this.mapRegionHandlerEvent({
      ev: centerLocation,
      map: this.map,
      prevMarkerInfo: this.currentMarkerInfo
    })
  }
  /* map地图加载完成后-渲染完成后 */
  public mapRenderUpdatedChange(e: any) {
    // console.log(e)
  }
  /** @description 新增地图图层切换 是否开启实时路况 @param {n} Boolean|undefined 是否开启实时路况 */
  public mapSwitchTraffic(n?: boolean | undefined) {
    if (n !== null && n !== undefined) {
      this.defaultMapConfig.enableTraffic = n;
    } else {
      this.defaultMapConfig.enableTraffic = !this.defaultMapConfig.enableTraffic;
    }
    console.log(this.defaultMapConfig)
  }
  /** @description 新增地图涂层切换 是否开启卫星地图 @param {n} Boolean|undefined 是否开启卫星地图 */
  public mapSwitchSatellite(n?: boolean | undefined) {
    if (n !== null && n !== undefined) {
      this.defaultMapConfig.enableSatellite = n;
    } else {
      this.defaultMapConfig.enableSatellite = !this.defaultMapConfig.enableSatellite;
    }
    console.log(this.defaultMapConfig)
  }
  // customMapTapEvent 用户点击地图组件反馈的一个位置信息
  public customMapTapEvent(ev: TouchEvent) {
    console.log(ev);
    this.componentEvent = ev;
  }
  /** handlerTrajectoryEvent 新增轨迹回放函数处理 */
  private handlerTrajectoryEvent(info: UniMapOptionsTrajectoryModel | null) {
    if (!info) {
      console.warn('请先配置轨迹回放数据');
      return
    }
    if (!info.marker) {
      console.warn('请先配置轨迹回放的Marker点数据');
      return
    }
    if (!info.duration) {
      console.warn('请先配置轨迹回放的延迟播放时间');
      return
    }
    // 添加到Marker集合
    // this.defaultMapConfig.markers?.push(info.marker);
    this.prevMarkersStatusArrayInfo.push(this.handlerMarkerToOption(info.marker));
    this.mapMarkerChange(this.prevMarkersStatusArrayInfo)
    const markerInfo = this.prevMarkersStatusArrayInfo.filter(item => item.markerId === info.marker.id)[0]

    // 画出轨迹
    const trajectoryPolylineConfig = this.handlerPolylineToOption({ points: info.path })
    this.defaultMapConfig.polyline?.push({ ...trajectoryPolylineConfig, lineId: info.marker.id });
    console.log(this.defaultMapConfig.polyline)
    setTimeout(() => {
      console.log(new Date().getTime())
      this.map.moveAlong({
        markerId: markerInfo.id,
        ...info,
        success: (e: any) => {
          console.log(e, '提示')
        }
      })
    }, 200)
    // 开启轨迹回放画线
  }
  /** 暂停轨迹回放 */
  public stopTrajectoryPlay() { }
  /** 继续轨迹回放 */
  public rebroadcastTrajectoryPlay() { }
  /** 重新再次播放 */
  public reloadTrajectoryPlay() {
    this.closeTrajectoryEvent()
    // 执行线路绘制
    this.handlerTrajectoryEvent(this.defaultMapConfig.trajectoryConfig || null)
  }
  /** 关闭轨迹回放 并删除相应数据 */
  public closeTrajectoryEvent() {
    this.prevMarkersStatusArrayInfo = this.prevMarkersStatusArrayInfo.filter(item => item.markerId !== this.defaultMapConfig.trajectoryConfig?.marker.id);
    this.defaultMapConfig.polyline = this.defaultMapConfig.polyline?.filter(item => item.lineId !== this.defaultMapConfig.trajectoryConfig?.marker.id);
  }
  /**展示所有经纬度 */
  public includePoints(points: any) {
    this.map.includePoints({
      padding: ['50', '50', '60', '50'],
      points: points,
      success(res: any) {
        console.log(res)
      },
      fail(err: any) {
        console.log(err)
      }
    })
  }
  /**获取当前地图可视范围 */
  public getRegion(obj:any) {
    this.map.getRegion({
      success(res:any) {
        console.log(res)
        let obj = {
          southwest: JSON.stringify({
            x1: res.southwest.longitude.toString(),
            y1: res.southwest.latitude.toString()
          }),
          northeast: JSON.stringify({
            x2: res.northeast.longitude.toString(),
            y2: res.northeast.latitude.toString()
          })
        }
        uni.setStorageSync('getRegion',obj)
      },
      fail: (data:any, code:number) => {
        console.log('fail' + JSON.stringify(data));
      }
    })
  }
}