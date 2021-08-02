/**
 * 日志类
 *
 * 发现现在 Log 打印的信息太多，有时候测试同学不好找，只有 warn 比较干净。
 * 所以要给测试看的，打在 warn 内。
 */

import config from '@/config'
import { deepCopy } from '@/utils'

class Logger {
  private tag: string|null = '';
  private prefix!: string;
  private _prefix!: string;
  constructor(tag?: string) {
    if (tag) {
      this.tag = tag
      this.prefix = '[' + tag + ']'
    }
    this._prefix = tag ? '[' + tag + '] ' : ''
  }

  /**
   * 是否禁用日志（生产环境禁用）
   */
  get disabled() {
    return !config.debug
  }

  /**
   * 处理参数
   *
   * 对象深拷贝，添加日志前缀。
   */
  _handleArgs(args: any[]) {
    args = args.map(item => {
      if (item instanceof Error) {
        return item
      } else if (typeof item === 'object') {
        return deepCopy(item)
      } else {
        return item
      }
    })
    if (this.prefix) args.unshift(this.prefix)
    return args
  }

  info(...args: any[]) {
    if (this.disabled) return
    args = this._handleArgs(args)
    console.info(...args)
  }

  log(...args: any[]) {
    if (this.disabled) return
    args = this._handleArgs(args)
    console.log(...args)
  }

  warn(...args: any[]) {
    if (this.disabled) return
    args = this._handleArgs(args)
    console.warn(...args)
  }

  error(...args: any[]) {
    if (this.disabled) return
    args = this._handleArgs(args)
    console.error(...args)
  }
}

export default Logger
