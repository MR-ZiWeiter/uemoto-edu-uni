<template>
  <view class="layout-context-null-conponent">
    <block v-if="isCustom">
      <slot></slot>
    </block>
    <block v-else>
      <image class="context-image" :src="imageUrlToHostChange('/statics/images/public/default/is-null.png')"></image>
      <text class="label-label">{{label}}</text>
      <text class="label-desc">{{desc}}</text>
    </block>
  </view>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { staticNetworkBaseUrl } from "@/config";
@Component({
  methods:{
    imageUrlToHostChange(url) {
      return staticNetworkBaseUrl + url;
    },
  }
})
export default class Test extends Vue {
  @Prop({default: ''}) public imgSrc: string;
  @Prop({default: ''}) public label: string;
  @Prop({default: '暂无数据!'}) public desc: string;
  @Prop({default: false}) public isCustom: boolean;
}
</script>
<style lang="scss" scoped>
  .layout-context-null-conponent{
     @include wh(100%, 100%);
    @include flex-justify-align(center, center);
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transform: translateY(50%);
    // min-height: format(800);
    .context-image{
      @include wh(format(420), format(318));
    }
    .label-label{
       @include sc(format(30), $default_color_1);
    }
    .label-desc{
       @include sc(format(28), $default_color_3);
      margin-top: format(40);
    }
     
  }
   
</style>
