/**
 * @time [2019-10-16]
 * @description 公共类方法
 */

export function deepSelectKeyToKeyPath(deepObject: { [x: string]: any }, key: string, pKey?: string) {
  let pathArray: any[] = []
  Object.keys(deepObject).map(itemKey => {
    if (Object.prototype.toString.call(deepObject[itemKey]) === '[object Object]') {
      // let cKeyArray = [itemKey]
      const deepKeyPath = deepSelectKeyToKeyPath(deepObject[itemKey], key, itemKey)
      if (deepKeyPath instanceof Array && deepKeyPath.length > 0) {
        pathArray = [...pathArray, itemKey, ...deepKeyPath]
      }
    }
    if (itemKey === key) {
      // pKey && pathArray.push(pKey)
      pathArray.push(itemKey)
      // return [pKey, itemKey]
    }
  }).filter(fs => fs)
  return pathArray
}

/**
 * @time [2019-10-25]
 * @description 获取节点信息
 */

export function queryView(context: any, name: string, success: (arg0: UniApp.NodeInfo) => any) {
  const query = uni.createSelectorQuery().in(context)
  query.select(name).boundingClientRect((res) => {
    // tslint:disable-next-line: no-unused-expression
    success && success(res)
  }).exec()
}

export function deepCopy(data: any) {
  let dataTmp: any = undefined
  if (data === null || !(typeof data === 'object')) {
    dataTmp = data
  } else {
    let type = data.constructor.name
    type === 'Array' && (dataTmp = [])
    type === 'Object' && (dataTmp = {})
    for (let key in data) {
      dataTmp[key] = deepCopy(data[key])
    }
  }

  return dataTmp
}

/**
 * @time [2021-1-5]
 * @description 去重
 */
export function unique(arr: Array<string>): Array<string> {
  return Array.from(new Set(arr))
}
// 格式化时间
export function formatDate(time: number) {
  //三目运算符
  const Dates = new Date(time);
  //年份
  const Year: number = Dates.getFullYear();
  //月份下标是0-11
  const Months: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
  //具体的天数
  const Day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
  //小时
  const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
  //分钟
  const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
  //秒
  const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
  //返回数据格式
  return Year + '-' + Months + '-' + Day + '-' + Hours + ':' + Minutes + ':' + Seconds;
}
// 七天前日期
export function getDay(day: number) {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  let tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}
export function doHandleMonth(month: any) {
  let m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}
// 取当前日期
export function getNowDay() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let nDay = doHandleMonth(day)
  let nMonth = doHandleMonth(month)
  return `${year}-${nMonth}-${nDay}`
}
// 取当前日期时分秒
export function getNowDayTime() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let nDay = doHandleMonth(day)
  let nMonth = doHandleMonth(month)
  const Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return `${year}-${nMonth}-${nDay} ${Hours}:${Minutes}:${Seconds}`
}
// 一年多少周
export function getWeek(dt: string) {
  let d1: any = new Date(dt);
  let d2: any = new Date(dt);
  d2.setMonth(0);
  d2.setDate(1);
  let rq: number = d1 - d2;
  let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
  let num = Math.ceil(days / 7);
  return num;
}
// 本月
export function getMonth(type: string, months: number) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  };
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + months;
    };
  };
  let monthY = month < 10 ? "0" + month : month;
  var date = d.getDate();
  var firstday = `${year}-${monthY}-01`;
  var lastday = "";
  if (monthY == "01" || monthY == "03" || monthY == "05" || monthY == "07" || monthY == "08" || monthY == "10" || monthY == "12") {
    lastday = `${year}-${monthY}-31`
  } else if (monthY == "02") {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = `${year}-${monthY}-29`;
    } else {
      lastday = `${year}-${monthY}-28`
    };
  } else {
    lastday = `${year}-${monthY}-30`
  };
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  };
  return day;
}
// 获取几年的日期
export function getYear(type: string, dates: number) {
  let dd = new Date();
  let n = dates || 0;
  let day = '';
  let year = dd.getFullYear() + Number(n);
  if (type == "s") {
    day = year + "-01-01";
  };
  if (type == "e") {
    day = year + "-12-31";
  };
  if (!type) {
    day = year + "-01-01/" + year + "-12-31";
  };
  return day;
}
// 获取半年日期
export function getHalfYear(y:number) {
  const times = new Date().getTime()
  let halfYear = 365/y * 24 * 3600 * 1000;
  let pastResult = times - halfYear
  let pastDate = new Date(pastResult),
    pastYear = pastDate.getFullYear(),
    pastMonth = pastDate.getMonth() + 1,
    pastDay = pastDate.getDate();
   return `${pastYear}-${pastMonth}-${pastDay}` 
}