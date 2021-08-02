export function date(value: string, type?: string) {
  // console.log(type)
  // console.log(string)
  const time = new Date(value)
  const yyyy = time.getFullYear()
  const M = time.getMonth() + 1
  const MM = M < 10 ? '0' + M : M + ''
  const d = time.getDate()
  const dd = d < 10 ? '0' + d : d + ''

  const h: number = time.getHours()
  const m: number = time.getMinutes()
  const s: number = time.getSeconds()
  const hh: string = h < 10 ? '0' + h : h + ''
  const mm: string = m < 10 ? '0' + m : m + ''
  const ss: string = s < 10 ? '0' + s : s + ''
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}