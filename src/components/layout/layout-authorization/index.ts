import { Component, Emit, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions({
      asyncAccountMinLogin: 'asyncAccountMinLogin',
      asyncAccountUserBindPhone: 'asyncAccountUserBindPhone'
    })
  }
})
export default class LayoutAuthorizationComponent extends Vue {

  public isShow: boolean = false;
  @Watch('isShow') private isShowChange(_n: boolean) {
    this.inputChange(_n)
  }

  @Prop({ default: '提示' }) public title: string;
  @Prop({ default: '为了给您提供更好的服务，请授权绑定您的手机号？' }) public content: string;
  @Prop({ default: '绑定' }) public confirm: string;
  @Prop({ default: '取消' }) public cancel: string;
  @Prop({ default: true }) public isConfirm: boolean;
  @Prop({ default: false }) public isCancel: boolean;
  @Prop({ default: true }) public isAuth: boolean;
  // 类别 0登录授权  1手机号码授权
  @Prop({ default: 1 }) public type: number;
  @Emit('input') private inputChange(_n: boolean) {}
  @Model('inputChange', { default: false }) public value: boolean;
  @Watch('value', { immediate: true }) private valueChange(_n: boolean) {
    this.isShow = _n
  }

  @Emit() private success(_n?: any) {
    this.isShow = false
  }
  @Emit() private failed(_n?: any) {
    this.isShow = false
  }
  @Emit() private confirmEvent(_n?: any) {
    this.isShow = false
  }
  @Emit() private cancelEvent(_n?: any) {
    this.isShow = false
  }

  /* VUEX */
  private asyncAccountMinLogin!: (info: any) => Promise<ApiResponseModel>;
  private asyncAccountUserBindPhone!: (info: any) => Promise<ApiResponseModel>;

  getAuthorInfo(e: { detail: { errMsg: string; }; }) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      this.asyncAccountMinLogin(e.detail).then(() => {
        this.success()
      }).catch((err: any) => {
        this.failed(err)
      })
    }
  }

  getPhoneInfo(e: { detail: { errMsg: string; }; }) {
    console.log(e)
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      this.asyncAccountUserBindPhone(e.detail).then(() => {
        this.success()
      }).catch((err: any) => {
        this.failed(err)
      })
    } else {
      my.getPhoneNumber({
        success: (res) => {
          console.log(res)
          this.asyncAccountUserBindPhone({encryptedData: res.response}).then(() => {
            this.success()
          }).catch((err: any) => {
            this.failed(err)
          })
        }
      })
    }
  }
  onConfirm(e: any) {
    this.isShow = false
    this.confirmEvent(e)
  }
  onCancel(e: any) {
    this.isShow = false
    this.cancelEvent(e)
  }
}
