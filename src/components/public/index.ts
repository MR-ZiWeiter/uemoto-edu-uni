import XmztButton from './xmzt-button/index.vue'
import XmztFromItem from './xmzt-from-item/index.vue'
import XmztInput from './xmzt-input/index.vue'
import XmztModal from './xmzt-modal/index.vue'
import XmztTap from './xmzt-tap/index.vue'
import XmztCell from './xmzt-cell/xmzt-cell.vue'
import XmztCheckCode from './xmzt-check-code/index.vue'
import XmztNotFound from './xmzt-not-found/index.vue'
import LsSweiper from './ls-swiper/index.vue'
import XmztShareAlert from './xmzt-share-alert/index.vue'
import XmztSelect from './xmzt-select/index.vue'
import XmztHeaderSelect from './xmzt-header-select/index.vue'
import XmztPopup from './xmzt-popup/index.vue'
// 全局注册组件
export const components = { XmztInput, XmztFromItem, XmztButton, XmztModal, XmztTap, XmztCell, XmztCheckCode, XmztNotFound, LsSweiper, XmztShareAlert, XmztSelect, XmztHeaderSelect, XmztPopup }

export const component = {
  install(Vue: any) {
    for (const key in components) {
      Vue.component(key, components[key])
    }
  }
}

export default component
