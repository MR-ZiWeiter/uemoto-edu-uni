import Vue from 'vue'
import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator'
/* 引入插件 */
import lottie from
/* #ifdef MP-WEIXIN */
  'lottie-miniapp'
/* #endif */
/* #ifdef H5 */
// 'vue-lottie'
'lottie-web'
/* #endif */

// const lottie = typeof mlottie !== undefined ? mlottie : vlottie
console.log(lottie)

interface LottieOptionsModel {
  name?: string;
  loop?: boolean | true,
  autoplay?: boolean | true,
  path?: string,
  renderer?: 'canvas' | 'svg' | string,
  animationData?: any;
  [x: string]: any;
}
interface LottieSizeModel {
  width: number,
  height: number
}

@Component

export default class CustomLottieComponent extends Vue {
  private unit = 'rpx';
  private currentLottie!: any;
  public currentLottieStyle = {
    width: '100%',
    height: '100%'
  }
  /* H5版本参数 */
  public defaultOptions: LottieOptionsModel;
  /* 传入参数 */
  @Prop() private options: LottieOptionsModel;
  @Watch('options', { deep: true, immediate: true }) private optionsChange(_n: LottieOptionsModel, _o: LottieOptionsModel) {
    if (_n && Object.keys(_n)) {
      this.defaultOptions = _n
      console.log(_n)
    }
  }
  @Prop() private size: LottieSizeModel;
  @Watch('size', { deep: true, immediate: true }) private sizeChange(_n: LottieSizeModel, _o: LottieSizeModel | null) {
    if (_n !== _o) {
      this.currentLottieStyle.width = _n.width + this.unit
      this.currentLottieStyle.height = _n.height + this.unit
    }
  }
  @Emit() private lottieChange(info: any) {}
  @Ref('lottieRef') private lottieRef: any;
  mounted() {
    console.log(this.lottieRef)
    /* #ifdef MP-WEIXIN */
    const canvasContext: any = uni.createCanvasContext(this.options.name || 'lottie')
    canvasContext.canvas = this.size
    this.currentLottie = lottie.loadAnimation({
      loop: true,
      autoplay: true,
      // path: `http://172.16.234.74:8080/157/data.json`,
      ...this.options,
      renderer: 'canvas', // 只支持canvas
      rendererSettings: {
        context: canvasContext,
        clearCanvas: true
      }
    })
    this.lottieChange({ currentLottie: this.currentLottie, lottie })
    /* #endif */
    /* #ifdef H5 */
    this.currentLottie = lottie.loadAnimation({
      container: this.lottieRef.$el,
      renderer: this.options.renderer || 'svg',
      loop: this.options.loop || false,
      autoplay: this.options.autoplay || true,
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings,
      path: this.options.path,
      ...this.options
    })
    /* #endif */
    console.log(this.currentLottie)
  }
  /* 操作方法 */
  public play(name: string) {
    if (name) {
      lottie && lottie.play(name)
    } else {
      this.currentLottie && this.currentLottie.play()
    }
  }
  /* 停止当前动画 */
  public stop(name: string) {
    if (name) {
      lottie && lottie.stop(name)
    } else {
      this.currentLottie && this.currentLottie.stop()
    }
  }
  /* 停止所有动画 */
  public stopAll() {
    lottie && lottie.stop()
  }
  /* 暂停动画 */
  public pause(name: string) {
    if (name) {
      lottie && lottie.pause(name)
    } else {
      this.currentLottie && this.currentLottie.pause()
    }
  }
  /* 公共处理方法-自定义方法 */
  public handlerMethod(FunctionName: string, Name: string) {
    if (FunctionName) {
      if (Name) {
        this.currentLottie && this.currentLottie[FunctionName](Name)
      } else {
        lottie && lottie[FunctionName]()
      }
    } else {
      new Error('FunctionName is not fund')
    }
  }
}
