import { ToolsDateCalendarService, ToolsDateCalendarSolar2LunarModel } from './calendar'
/**
 * 时间服务模块
 *
 * @export
 * @class ToolsDateService
 * @extends {ToolsDateCalendarService}
 */
export class ToolsDateService extends ToolsDateCalendarService {
  public today: Date
  public y = 0
  public m = 0
  public d = 0
  public daysPerMonth: Array<number>

  constructor() {
    super()
    this.today = new Date()
    this.y = this.today.getFullYear()
    this.m = this.today.getMonth()
    this.d = this.today.getDate()
    this.daysPerMonth = [31, 28 + this.isLeap(this.y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // const firstday = new Date(this.y, this.m, 1)
    // const dayOfWeek = firstday.getDay()
    // const dateColumnNum = Math.ceil((dayOfWeek + this.daysPerMonth[this.m]) / 7)
  }
  /* 获取是否闰年 */
  private isLeap(y: number) {
    return y % 4 === 0 ? (y % 100 !== 0 ? 1 : (y % 400 === 0 ? 1 : 0)) : 0
  }
  /* 根据月份获取当月的所有数据 */
  public monthToDaysInfo(m: number, y?: number): {child?: Array<any>, y?: number, m?: number} {
    if (!m) {
      return {}
    }
    const currentYear = (y || this.y) + Math.floor(m / 13)
    let daysPerMonth = this.daysPerMonth
    /* 更新年份 避免传入跨年问题 */
    if (currentYear !== new Date().getFullYear()) {
      daysPerMonth = [31, 28 + this.isLeap(currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }
    const currentMonth = (m % 12) ? (m % 12) : 12
    const firstday = new Date(currentYear, currentMonth - 1, 1)
    // console.log(firstday.getDate())
    // console.log(firstday.getDay())
    const dayOfWeek = firstday.getDay()
    const dateColumnNum = Math.ceil((dayOfWeek + daysPerMonth[currentMonth - 1]) / 7)
    const resultDateArray = []
    // console.log(dayOfWeek, dateColumnNum)
    for (let row = 0; row < dateColumnNum; row++) {
      const rowArray: Array<ToolsDateCalendarSolar2LunarModel|null|number> = []
      for (let col = 0; col < 7; col++) {
        const currentDay = row * 7 + col
        // console.log(currentYear, currentMonth, currentDay)
        if (!(currentDay < dayOfWeek) && (currentDay - dayOfWeek) < daysPerMonth[currentMonth - 1]) {
          // const days =
          // console.log(currentYear, currentMonth, currentDay - dayOfWeek + 1)
          rowArray.push(this.solar2lunar(currentYear, currentMonth, currentDay - dayOfWeek + 1))
        } else {
          rowArray.push(null)
        }
      }
      resultDateArray.push(rowArray)
    }
    // console.log(resultDateArray)
    return {
      child: resultDateArray,
      y: currentYear,
      m: currentMonth
    }
  }
  /**
   * 根据开始月份和数量获取多个月数据
   * @param m {number} 今年开始获取的月份<仅支持获取今年>
   * @param n {numbber} 获取月份的数量
   * @param y {number} 开始年份
   */
  public getCurrentMonthNumArray(m: number, n: number, y?: number): Array<any> {
    // this.monthToDaysArray(m)
    const resultMonthArray = []
    for (let k = 0; k < n; k++) {
      resultMonthArray.push(this.monthToDaysInfo(m + k, y))
    }
    return resultMonthArray
  }
  /**
   * 根据指定时间传入指定天数获取时间数据结构
   * @param timer {number} 传入开始时间戳 13位标准时间戳 不传时默认当天
   * @param day {number} 天数
   * @return {Object<start,end,renderArray>}
   */
  public getCurrentDaysInfo(timer?: number, day = 2): {start: ToolsDateCalendarSolar2LunarModel | number, end: ToolsDateCalendarSolar2LunarModel | number, renderArray: Array<ToolsDateCalendarSolar2LunarModel | number>} {
    const startTimer = timer || new Date().getTime()
    const resultObject: {start: ToolsDateCalendarSolar2LunarModel | number, end: ToolsDateCalendarSolar2LunarModel | number, renderArray: Array<ToolsDateCalendarSolar2LunarModel | number>} = {
      start: 0,
      end: 0,
      renderArray: []
    }
    for (let i = 0; i < day; i++) {
      const currentDate = new Date(startTimer + i * 24 * 60 * 60 * 1000)
      const y = currentDate.getFullYear()
      const m = currentDate.getMonth() + 1
      const d = currentDate.getDate()
      const currnetDateInfo = this.solar2lunar(y, m, d)
      if (i === 0) {
        resultObject.start = currnetDateInfo
      } else if (i === day - 1) {
        resultObject.end = currnetDateInfo
      }
      resultObject.renderArray.push(currnetDateInfo)
    }
    return resultObject
  }
}
