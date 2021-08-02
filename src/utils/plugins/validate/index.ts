// 正则匹配
const Pattern = {
  isEmpty: /(^\s*)|(\s*$)/g,
  isZHUserName: /^[\u2E80-\u9FFF]+$/,
  isMobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
  isCnAndEn: /^[\u4E00-\u9FA5]+$/,
  isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
  isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
  isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  isAuthCode: /^[0-9]{6}$/,
  isTelAndMobile: /^(1[3|4|5|6|7|8|9][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/,
  isCardNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  isLicencePlate: /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
}

const validator = {
  /**
   * 执行正则表达式
   * @param pattern 校验的正则表达式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  executeExp: (pattern: RegExp, strValue: string) => {
    return pattern.test(strValue)
  },
  /**
   * 判断字符串是否为空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isEmpty: function(strValue: string) {
    strValue = strValue.replace(Pattern.isEmpty, '')
    return strValue.length === 0
  },
  /**
   * 判断字符串是否非空
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isNotEmpty: function(strValue: string) {
    return !this.isEmpty(strValue)
  },
  /**
   * 判断是否为中文
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEn: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isCnAndEn, strValue)
  },
  /**
   * 判断是否为中英文、数字及'-'
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isCnAndEnAndNum: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isCnAndEnAndNum, strValue)
  },
  /**
   * 判断是否为用户名
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isUserName: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }

    return this.executeExp(Pattern.isUserName, strValue)
  },
  /**
   * 判断验证码格式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isAuthCode: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isAuthCode, strValue)
  },
  /**
   * 判断是否为手机号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isMobile: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isMobile, strValue)
  },
  /**
   * 判断是否为手机或电话号码
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isTelAndMobile: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isTelAndMobile, strValue)
  },
  /**
   * 判断是否符合密码规则
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isPassword: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isPassword, strValue)
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
  isCardNo: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isCardNo, strValue)
  },
  /**
   * 判断是否为车牌号格式
   * @param strValue 校验的值
   * @returns {boolean}
   */
  isLicencePlate: function(strValue: string) {
    if (this.isEmpty(strValue)) {
      return false
    }
    return this.executeExp(Pattern.isLicencePlate, strValue)
  }
}

/**
 * 搜索键关键字变色
 * @param {*} data 要替换的数组
 * @param {*} key 替换字段的key值
 * @param {*} value 搜索的关键字
 */
export function searchNotes(data: any, key: string | number, value: any) {
  // 搜索键关键字变色
  const nWord = value // 获取el表达式冲文本框输入的关键字
  const array = nWord.split('') // 分割
  const dsa = data // 获取全部商品
  for (let t = 0; t < dsa.length; t++) {
    for (let i = 0; i < array.length; i++) {
      // 创建表达式，匹配替换
      const reg = new RegExp('(' + array[i].replace(/,/, '|') + ')', 'g')
      // 替换重新写入商品名， 匹配结果中对应的分组匹配结果
      dsa[t][key] = dsa[t][key].replace(reg, "<span style='color:#f44336;'>$1</span>")
    }
  }
  return dsa
}

/**
 * 日期格式转换
 * @param type 日期限制
 * @returns {Sting}
 */
export function getDate(type: string) {
  const date = new Date()
  const year = date.getFullYear()
  let month: string|number = date.getMonth() + 1
  let day: string|number = date.getDate()

  month = month > 9 ? month : '0' + month
  day = day > 9 ? day : '0' + day
  if (type == 'mmdd') {
    return `${month}-${day}`
  } else {
    return `${year}-${month}-${day}`
  }
}
/**
 * 日期格式转换
 * @param timestamp 时间戳
 * @param type 日期格式
 * @returns {Sting}
 */
export function timeFormat(timestamp: string | number | Date, type: string) {
  // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  const time = new Date(timestamp)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  if (type == 'yy') {
    return year + '年'
  } else if (type == 'yy-mm') {
    return year + '年' + month + '月'
  } else if (type == 'mm-dd') {
    return month + '月' + date + '日'
  } else if (type == 'yy-mm-dd') {
    return year + '年' + month + '月' + date + '日'
  }
}
/**
 * base64转为本地图片
 * @param base64data 图片内容
 * @returns {Sting}
 */
export function base64src(base64data: string, cb: (arg0: string) => void) {
  // console.log(base64data)
  const fsm = uni.getFileSystemManager()
  const FILE_BASE_NAME = 'tmp_base64src' // 自定义文件名
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
  if (!format) {
    return new Error('ERROR_BASE64SRC_PARSE')
  }
  const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`
  const buffer = uni.base64ToArrayBuffer(bodyData)
  // console.log(filePath)
  // console.log(buffer)
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath)
    },
    fail() {
      return new Error('ERROR_BASE64SRC_WRITE')
    }
  })
}

/**
 * 防抖函数
 * @param func 方法
 * @param delay 时间
 * @returns {Sting}
 */
export function debounce(func: { apply: (arg0: any, arg1: any[]) => void }, delay: number | undefined) {
  let timer: number
  return function(...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 返回指定天数的时间戳
 * @param count 天数
 * @returns {Sting}
 */
export function timeForMat(count: number) {
  const time1 = new Date()
  time1.setTime(time1.getTime())
  const Y1 = time1.getFullYear()
  const M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  const D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
  const timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
  const time2 = new Date()
  time2.setTime(time2.getTime() + (24 * 60 * 60 * 1000 * count))
  const Y2 = time2.getFullYear()
  const M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
  const D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())
  const timer2 = Y2 + '-' + M2 + '-' + D2 // 之后的七天或者一个月
  return new Date(timer2).getTime()
}

/**
 * 返回两个时间戳相隔的天数
 * @param count 天数
 * @returns {Sting}
 */
export function calculateDiffTime(start_time: any, end_time: any) {
  const start = start_time// 2017-4-10 10:00
  const end = end_time// 2017-5-10 10:00
  const utc = end - start
  return utc / (24 * 60 * 60 * 1000) + 1// 30
}

/**
 * 返回两个时间戳相隔的天数
 * @param UUserCard 身份证
 * @returns {Sting}
 */
export function IdCardAge(UUserCard: { substring: (arg0: number, arg1: number) => number }) {
  // 获取年龄
  const myDate = new Date()
  const month = myDate.getMonth() + 1
  const day = myDate.getDate()
  let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
  if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
    age++
  }

  return age
}

/**
 * 根据日期计算年龄
 * @param strBirthday 天数
 * @returns {Sting}
 */
export function GetAge(strBirthday: string) {
  let returnAge
  const strBirthdayArr = strBirthday.split('-')
  const birthYear = strBirthdayArr[0]
  const birthMonth = strBirthdayArr[1]
  const birthDay = strBirthdayArr[2]
  const d = new Date()
  const nowYear = d.getFullYear()
  const nowMonth = d.getMonth() + 1
  const nowDay = d.getDate()
  if (nowYear === Number(birthYear)) {
    returnAge = 0 // 同年 则为0周岁
  } else {
    const ageDiff = nowYear - Number(birthYear) // 年之差
    if (ageDiff > 0) {
      if (nowMonth == Number(birthMonth)) {
        const dayDiff = nowDay - Number(birthDay) // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - Number(birthMonth) // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge // 返回周岁年龄
}

const validateModel: any = {
  Pattern,
  validator,
  install: null
}
validateModel.install = (Vue: { prototype: { [x: string]: any } }, options: any) => {
  Vue.prototype[`$ValidateTools`] = validateModel
}
export default validateModel
