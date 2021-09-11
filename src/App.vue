<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { ToolsService } from '@/services/tools'
// import { transform } from '@/utils/plugins/WGS84_GCJ'
// import { compile } from 'vue/types/umd'
const toolsService = new ToolsService()
export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch')
    // 获取用户设备信息
    this.asyncFetchSystemInfo()
    // 获取用户信息
    if (this.token) {
      this.asyncFetchUserBasicInfo()
    } else {
      this.wechatLogin()
    }
  },
  onShow() {
    console.log('App Show')
    // console.log(toolsService)
  },
  onHide() {
    console.log('App Hide')
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  methods: {
    ...mapMutations({
      UPDATA_LOCATION_LNGLAT: 'UPDATA_LOCATION_LNGLAT'
    }),
    ...mapActions({
      asyncFetchAuthorInfoCheckToKey: 'asyncFetchAuthorInfoCheckToKey',
      asyncFetchUserBasicInfo: 'asyncFetchUserBasicInfo',
      asyncFetchSystemInfo: 'asyncFetchSystemInfo',
      asyncFetchAuthorInfo: 'asyncFetchAuthorInfo',
      wxlocationCity: 'wxlocationCity',
      getLocation: 'getLocation',
      wechatLogin: 'wechatLogin'
    })
  }
})
</script>

<style lang='scss'>
  page {
    @include wh(100%, 100%);
    background: #F5F7FA;
    // position: fixed;
    // top: 0;
    // left: 0;
  }
  /* 解决小程序和app滚动条的问题 */
  /* #ifdef MP-WEIXIN || APP-PLUS */
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
  /* #endif */

  /* 解决H5 的问题 */
  /* #ifdef H5 */
  uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
  /* #endif */
</style>
