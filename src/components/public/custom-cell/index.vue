<template>
  <view class="cell-page">
    <view class="item-box" :style="[{marginBottom: marginBom +'rpx'}]">
     <view :style="[{alignItems:alignItems}]" class="cell-left">
      <text class="item-txt" :style="[{width:width},{paddingTop:paddingTop+'rpx'}]">{{title}}</text>
      <text class="item-value" :style="[{marginLeft:marginLeft+'rpx'},{paddingRight:paddingRight+'rpx'}]">{{value}}</text>
     </view>
      <slot name="rightIcon"></slot>
    </view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Prop} from "vue-property-decorator";
@Component
export default class cellComponents extends Vue{
  @Prop({ default: '时间' }) public title!: string;
  @Prop({default:''}) public value!:string;
  @Prop ({default:16}) public marginBom!:number;
  @Prop({default:0}) public marginLeft!:number;
  @Prop ({default:''}) public width:string;
  @Prop ({default:0}) public paddingRight:number;
  @Prop ({default:'center'}) public alignItems!:string;
  @Prop ({default:0}) public paddingTop!:number;
}
</script>
<style scoped lang="scss">
.cell-page{
  .item-box{
    @include flex-justify-align();
    // margin-bottom: format(10);
    .cell-left{
      @include flex-justify-align(flex-start,flex-start);
    }
  }
  .item-txt{
    @include sc(format(28),$default_color_31);
    text-align: left;
  }
  .item-value{
    flex: 2;
    @include sc(format(28),$fzColor);
    line-height: format(48);
    padding-right: format(10);
    word-break: break-all;
    width: 100%;
    flex-wrap: wrap;
    
  }
  .popup{
    @include flex-justify-align(flex-start);
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>