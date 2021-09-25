<template>
  <view :class="[!customHeader ? 'layout-header' : 'cusotm-header-class']" :style="[{paddingTop: systemInfo.statusBarHeight + 'px'}, customStyle]">
    <block v-if="customHeader">
      <slot name="all"/>
    </block>
    <block v-else>
      <block v-if="customLeft">
        <slot name="left"/>
      </block>
      <block v-else>
        <view class="public-left-slot" @tap.prevent.stop="handlerLeftEvent" :style="[{top: systemInfo.statusBarHeight + 'px'}]" v-if="isBack">
          <image class="public-left-icon" :src="renderLeftIcon"></image>
          <text class="label-text" :style="[{color: navigateColor}]">返回</text>
        </view>
      </block>
      <block v-if="customCenter">
        <slot name="center"/>
      </block>
      <block v-else>
        <text class="public-title-text" :style="[{color: navigateColor}, customCenterStyle]">{{title}}</text>
      </block>
      <block v-if="customRight">
        <slot name="right"/>
      </block>
      <block v-else>
        <view class="public-right-slot">
          <slot name="right"/>
        </view>
      </block>
    </block>
  </view>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { staticNetworkBaseUrl } from '@/config'

@Component({
  computed: {
    ...mapGetters({
      systemInfo: 'systemInfo'
    })
  }
})
export default class LayoutHeaderComponent extends Vue {
  /**
   * 支持Slot插入
   * slot="left" 左侧插入
   * slot="center" 中间插入
   * slot="right" 右侧插入
   * slot="all" 全部自定义
   */
  public renderLeftIcon: string = staticNetworkBaseUrl + '/statics/svgs/public/min/public-min-gray-arrow@2x.svg';
  /**
   * 配置项
   * @Prop customLeft {boolean} 是否自定义左侧
   * @Prop leftIcon {string} 自定义左侧图标
   * @Prop title {string} 标题
   * @Prop customLeftEvent {Function} 自定义函数返回
   * @Prop customHeader {boolean} 自定义Header组件
   * @Prop customCenterStyle {string} 自定义Center样式
   * @Prop customStyle {string} 自定义Header组件样式
   * @Prop type {number} 1:返回 2:重定向 3:SwitchTab方式 4:跳转页面
   * @Prop delta {number} 返回页面的深度
   * @Prop url {string} 重定向或者SwitchTabURL或者跳转页面
   * @Prop navigateColor {string} #ffffff | #000000 顶部状态栏颜色
   */
  @Prop({ default: true }) private isBack!: boolean;
  @Prop({ default: false }) private customLeft!: boolean;
  @Prop({ default: null }) private leftIcon!: string;
  @Watch('leftIcon', { deep: true }) private leftIconChange(_n: string) {
    this.renderLeftIcon = _n
  }
  @Prop({ default: '标题' }) private title!: string|null;
  /* 事件类 */
  @Prop() private customLeftEvent: any;
  @Prop({ default: false }) private customCenter!: boolean;
  @Prop({ default: false }) private customRight!: boolean;
  @Prop({ default: false }) private customHeader!: boolean;

  @Prop({ default: '' }) private customCenterStyle!: any;
  @Prop({ default: '' }) private customStyle!: any;

  @Prop({ default: 1 }) private type!: number;
  @Prop({ default: 1 }) private delta!: number;
  @Prop({ default: '/' }) private url!: string;

  @Prop({ default: '#000000' }) private navigateColor!: '#ffffff' | '#000000';
  @Watch('navigateColor', { deep: true, immediate: true }) private navigateColorChange(_n: string) {
    if (_n) {
      setTimeout(() => {
        uni.setNavigationBarColor({
          frontColor: _n,
          complete: (e) => {
            console.log(e)
          }
        })
      }, 500)
      // console.log('xx', _n)
      if (_n === '#FFFFFF') {
        // 设置返回按钮的颜色
        this.renderLeftIcon = staticNetworkBaseUrl + '/statics/svgs/public/min/public-min-back-white-arrow@2x.svg'
      } else {
        // 设置返回按钮的颜色
        this.renderLeftIcon = staticNetworkBaseUrl + '/statics/svgs/public/min/public-min-gray-arrow@2x.svg'
      }
    }
  }

  // Vuex mapGetters
  public systemInfo!: any;

  /* 方法函数 */
  public handlerLeftEvent(ev: Event|any) {
    if (this.customLeftEvent) {
      this.customLeftEvent(ev)
    } else {
      switch(this.type) {
        case 1:
          this.$navigateModel.navigateBack({
            delta: this.delta,
            error: () => {
              const currentPages = getCurrentPages()
              console.log(currentPages)
              this.$navigateModel.switchTab({
                url: '/pages/home/index'
              })
            }
          })
          break
        case 2:
          this.$navigateModel.redirectTo({
            url: this.url,
            error: () => {
              const currentPages = getCurrentPages()
              console.log(currentPages)
              this.$navigateModel.switchTab({
                url: '/pages/home/index'
              })
            }
          })
          break
        case 3:
          this.$navigateModel.switchTab({
            url: this.url
          })
          break
        case 4:
          this.$navigateModel.navigateTo({
            url: this.url
          })
          break
      }
    }
  }

}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
