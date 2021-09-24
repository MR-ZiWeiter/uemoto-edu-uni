<!--
 * @Author: your name
 * @Date: 2021-09-06 16:45:33
 * @LastEditTime: 2021-09-06 17:25:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ticai-ui-individual-uni/src/pagesF/preview/webview/index.vue
-->
<template>
  <view class="webview-page">
    <web-view :src="redirectUrl" />
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface IWebViewUrlModel {
  redirectUrl: string;
  [x: string]: any;
}

@Component
export default class WebViewPage extends Vue {
  public redirectUrl: string|null = null;
  onLoad(options: IWebViewUrlModel) {
    this.redirectUrl = decodeURIComponent(options.redirectUrl);
  }
}
</script>

<style lang="scss" scoped>
  .webview-page {
    @include wh(100%, 100%);
  }
</style>
