export function time(value: number, type: string) {
  const m: number = parseInt(value / 60 + '', 10)
  const s: number = parseInt(value % 60 + '', 10)
  const mm: string = m < 10 ? '0' + m : m + ''
  const ss: string = s < 10 ? '0' + s : s + ''
  return `${mm}:${ss}`
}

export function timeMsgFormat(string: string) {
  string = string.replace(/-/g, '/')
  // console.log(string)
  const time = new Date(string)
  const timer = time.getTime()
  const timeMonths = time.getMonth() + 1
  const timeDates = time.getDate()
  const newTime = new Date()
  const newTimer = newTime.getTime()
  const count = ((newTimer - timer) / (1000 * 60)) | 0
  const years = new Date().getFullYear()
  const months = new Date().getMonth() + 1
  const dates = new Date().getDate()
  const olds = new Date(string).getTime()
  const day = ((new Date(`${years}/${months}/${dates} 23:59:59`).getTime() - olds) / (24 * 60 * 60 * 1000)) | 0
  const year = time.getFullYear()
  const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  // console.log(new Date(`${years}/${months}/${dates} 23:59:59`).getTime())
  // console.log(day)
  switch (day) {
    case 0:
      // console.log(string + ' ' + count)
      if (count < 1) {
        return `刚刚`
      } else if (count < 60) {
        return `${count}分钟前`
      } else if (count > 60) {
        return `今天 ${hours}: ${minutes}`
      }
      break
    case 1:
      return `昨天 ${hours}: ${minutes}`
    // case 2:
    //   return `前天 ${hours}: ${minutes}`
    case 3:
    default:
      return `${timeMonths}-${timeDates} ${hours}: ${minutes}`
  }
}

export function OTCTime(value: number, type: string) {
  const h: number = parseInt(value / 60 / 60 + '', 10)
  const m: number = parseInt(value / 60 % 60 + '', 10)
  const s: number = parseInt(value % 60 + '', 10)
  const hh: string = h < 10 ? '0' + h : h + ''
  const mm: string = m < 10 ? '0' + m : m + ''
  const ss: string = s < 10 ? '0' + s : s + ''
  return `${hh}:${mm}:${ss}`
}

export function OTCTimes(value: number, type: string) {
  const h: number = parseInt(value / 60 / 60 + '', 10)
  const m: number = parseInt(value / 60 % 60 + '', 10)
  const s: number = parseInt(value % 60 + '', 10)
  const hh: string = h < 10 ? '0' + h : h + ''
  const mm: string = m < 10 ? '0' + m : m + ''
  const ss: string = s < 10 ? '0' + s : s + ''
  return `${hh}时${mm}分`
}
export function getHour(value:number){
  const h: number = parseInt(value / 60 / 60 + '', 10)
  const hh: string = h < 10 ? '0' + h : h + ''
  return `${hh}小时`
}