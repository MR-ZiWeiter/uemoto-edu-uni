export class PatternService {
  public pattern = {
    isEmpty: /(^\s*)|(\s*$)/g,
    isZHUserName: /^[\u2E80-\u9FFF]+$/,
    isMobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
    isCnAndEn: /^[\u4E00-\u9FA5]+$/,
    isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
    isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
    isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    isAuthCode: /^[0-9]{6}$/,
    isTelAndMobile: /^(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/,
    isCardNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    isLicencePlate: /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  };

  public validator = {
    /**
     * 执行正则表达式
     * @param pattern 校验的正则表达式
     * @param strValue 校验的值
     * @returns {boolean}
     */
    executeExp: (pattern: { test: (arg0: any) => any; }, strValue: any) => {
      return pattern.test(strValue)
    },
    /**
     * 判断字符串是否为空
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isEmpty: (strValue: string) => {
      strValue = strValue.toString().replace(this.pattern.isEmpty, '')
      return strValue.length === 0
    },
    /**
     * 判断字符串是否非空
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isNotEmpty: (strValue: string) => {
      return !this.validator.isEmpty(strValue)
    },
    /**
     * 判断是否为中文
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isCnAndEn: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }

      return this.validator.executeExp(this.pattern.isCnAndEn, strValue)
    },
    /**
     * 判断是否为中英文、数字及'-'
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isCnAndEnAndNum: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }

      return this.validator.executeExp(this.pattern.isCnAndEnAndNum, strValue)
    },
    /**
     * 判断是否为用户名
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isUserName: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }

      return this.validator.executeExp(this.pattern.isUserName, strValue)
    },
    /**
     * 判断验证码格式
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isAuthCode: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }
      return this.validator.executeExp(this.pattern.isAuthCode, strValue)
    },
    /**
     * 判断是否为手机号码
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isMobile: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }
      return this.validator.executeExp(this.pattern.isMobile, strValue)
    },
    /**
     * 判断是否为手机或电话号码
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isTelAndMobile: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }
      return this.validator.executeExp(this.pattern.isTelAndMobile, strValue)
    },
    /**
     * 判断是否符合密码规则
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isPassword: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }
      return this.validator.executeExp(this.pattern.isPassword, strValue)
    },
    /**
     * 对象是否为空
     * @param obj 检验对象
     * @returns {boolean}
     */
    isEmptyObj: (obj: any) => {
      return Object.keys(obj).length === 0
    },
    /**
     * 是否在范围长度内
     * @param 范围数组 [1, 10] 长度在1-10内
     * @returns {boolean}
     */
    isLenRange: (strValue: string | any[], lenArr: number[]) => {
      return strValue.length >= lenArr[0] && strValue.length <= lenArr[1]
    },
    /**
     * 是否在数值范围内
     * @param 范围数组 [1, 10] 数值在1-10内
     * @returns {boolean}
     */
    isNumRange: (numValue: number, numArr: number[]) => {
      return numValue >= numArr[0] && numValue <= numArr[1]
    },
    /**
     * 判断是否为身份证格式
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isCardNo: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }
      return this.validator.executeExp(this.pattern.isCardNo, strValue)
    },
    /**
     * 判断是否为车牌号格式
     * @param strValue 校验的值
     * @returns {boolean}
     */
    isLicencePlate: (strValue: string) => {
      if (this.validator.isEmpty(strValue)) {
        return false
      }
      return this.validator.executeExp(this.pattern.isLicencePlate, strValue)
    },

    /**
     * javascript验证纳税人识别号格式
     * @param  taxId [纳税人识别号]
     * @return true格式正确，false格式错误
     */
    ischeckTaxId: (taxId: string) => {
      const regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i]
      const j = regArr.length
      for (let i = 0; i < j; i++) {
        if (regArr[i].test(taxId)) {
          return true
        }
      }
      // 纳税人识别号格式错误
      return false
    }
  };
}
