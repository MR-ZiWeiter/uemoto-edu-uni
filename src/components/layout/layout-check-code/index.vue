<template>
  <section class="validate-code-component" v-if="value">
    <section class="validate-code-container">
      <section class="model-content">
        <section class="model-item">
          <input
            placeholder="请输入验证码"
            v-model="fetchCodeForm.imgVerification"
            class="code-input"
            type="text"
            maxlength="4"/>
          <img
            class="code"
            :src="codeUrl"
            @click="changeCodeUrl()"
          />
        </section>
        <section class="button-group">
          <button class="custom-btn btn-cancel" @click="cancelChange()">取消</button>
          <button
            class="custom-btn btn-confirm"
            @click="confirmFetchCode()"
            >确定</button>
        </section>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch, Model } from 'vue-property-decorator'
import { ToolsService } from '@/services/tools'
import { apiNetworkBaseUrl } from '@/config'
import { mapActions } from 'vuex'
@Component({
  methods: {
    ...mapActions({
      getPhoneCode: 'getPhoneCode'
    })
  }
})
export default class LayoutCheckCodeComponent extends Vue {
  public toolsService = new ToolsService();
  public fetchCodeForm: any = {
    phone: null,
    imgVerification: null,
    renderId: null,
    sceneCode: 'login'
    // signId: 0,
    // configId: 0
  };
  public codeUrl: string = '';

  /* Prop */
  @Prop({ default: 'login' }) private sceneCode: string;
  @Watch('sceneCode', {deep: true, immediate: true}) private sceneCodeChange(_n: string) {
    this.fetchCodeForm.sceneCode = _n
  }
  // @Prop({ default: false }) public value: boolean;
  @Prop({ default: null }) public changePhone: boolean;
  @Watch('changePhone', { deep: true, immediate: true }) private changePhoneChange(_n: number) {
    this.fetchCodeForm.phone = _n
  }
  @Model('input') public value: boolean;
  @Watch('value', {deep: true, immediate: true}) valueChange(_n: boolean) {
    this.changeCodeUrl()
  }
  @Emit() input(e: boolean) {}

  @Emit('confirm') confirm(e?: any) {}

  /* Vuex 0*/
  private getPhoneCode: any;

  changeCodeUrl() {
    this.fetchCodeForm.renderId = Math.random() * 10000000000 | 0
    // console.log(this)
    this.fetchCodeForm.imgVerification = null;
    this.codeUrl = `${apiNetworkBaseUrl}/xmdd-user/sms/img/verification?renderId=${this.fetchCodeForm.renderId}&sceneCode=${this.fetchCodeForm.sceneCode}`;
  }

  confirmFetchCode() {
    if (this.fetchCodeForm.imgVerification) {
      this.getPhoneCode(this.fetchCodeForm).then((res: any) => {
        this.toolsService.customToast('验证码发送成功');
        this.confirm();
        this.changeCodeUrl();
        this.modalDismiss();
      }).catch((err: any) => {
        this.changeCodeUrl();
      })
    } else {
      this.toolsService.customToast('请输入图形验证码');
    }
    console.log(this.fetchCodeForm);
  }

  modalDismiss() {
    // this.modalController.dismiss();
    this.input(!this.value);
    console.log(!this.value)
  }

  cancelChange() {
    this.modalDismiss();
  }
  created() {
    this.changeCodeUrl();
  }
}
</script>
<style lang="sass" scoped>
  @import './index'
</style>
