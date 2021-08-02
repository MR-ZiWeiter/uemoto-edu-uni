import store from '@/store'

export class AudioService {
  public audioConfig = {
    playId: null,
    isPlay: false,
    title: null,
    total: 0,
    currentTime: 0,
    status: 'stop',
    audioStatus: 'init'
  };

  public AudioElement: HTMLMediaElement|any;
  // public $audioConfig: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // // 加载完成
  // private $canplay: Subject<Event> = new Subject<Event>();
  // // 播放结束
  // private $ended: Subject<Event> = new Subject<Event>();
  // // 播放错误
  // private $error: Subject<Event> = new Subject<Event>();
  // // 元数据加载完成
  // private $loadedmetadata: Subject<Event> = new Subject<Event>();
  // // 更新时间
  // private $timeupdate: Subject<Event> = new Subject<Event>();
  // // 结束播放
  // private $stop: Subject<Event> = new Subject<Event>();
  // // 播放开始
  // private $play: Subject<Event> = new Subject<Event>();
  // // 播放暂停
  // private $pause: Subject<Event> = new Subject<Event>();

  constructor() {
    this.AudioElement = new Audio()
    this.createAudioEvent()
  }

  public setAudioConfig(info: any) {
    this.audioConfig = Object.assign({}, this.audioConfig, info)
    // this.$audioConfig.next(this.audioConfig)
    store.commit('UPDATA_AUDIO_CONFIG', this.audioConfig)
    // console.log(info)
  }
  public setCanplay(ev: Event) {
    this.audioConfig.total = this.AudioElement.duration
    this.audioConfig.audioStatus = 'canplay'
    store.commit('UPDATA_AUDIO_CONFIG', this.audioConfig)
  }
  public setEnded(ev: Event) {
    this.setAudioConfig({
      isPlay: false,
      status: 'stop',
      audioStatus: 'ended'
    })
  }
  public setError(ev: Event) {
    this.setAudioConfig({
      isPlay: false,
      status: 'stop',
      audioStatus: 'error'
    })
  }
  // public setLoadedmetadata(ev: Event) {
  //   this.$loadedmetadata.next(ev)
  // }
  // public setTimeupdate(ev: Event) {
  //   this.$timeupdate.next(ev)
  // }
  // public setStop(ev: Event) {
  //   this.$stop.next(ev)
  // }
  // public setPlay(ev: Event) {
  //   this.$play.next(ev)
  // }
  // public setPause(ev: Event) {
  //   this.$pause.next(ev)
  // }

  // 设置播放音频
  public setAuidoToPlay(url: string, isReset = false, isAutoPlay = true, options = {}) {
    const cloneOptions = options
    // console.log(url, isReset, isAutoPlay, options)
    if (isReset) {
      // this.stop();
      // this.AudioElement.remove();
      // this.AudioElement = new Audio();
      this.createAudioEvent()
      this.AudioElement.src = url
      this.AudioElement.controls = false
      this.AudioElement.crossOrigin = 'anonymous'
      // this.createAudioContext(this.AudioElement);
      if (isAutoPlay) {
        this.play()
      }
    } else {
      if (this.AudioElement.src === url) {
        if (this.AudioElement.paused) {
          if (isAutoPlay) {
            this.play()
          }
        } else {
          this.pause()
        }
      } else {
        if (this.AudioElement.src) {
          this.AudioElement.src = url
          if (isAutoPlay) {
            this.play()
          }
        } else {
          this.setAuidoToPlay(url, true)
        }
      }
    }
    this.setAudioConfig(cloneOptions)
  }

  // 播放
  public play() {
    this.setAudioConfig({
      isPlay: true,
      status: 'play',
      audioStatus: 'play'
    })
    this.AudioElement.play()
  }

  // 暂停
  public pause() {
    this.setAudioConfig({
      isPlay: false,
      status: 'pause',
      audioStatus: 'pause'
    })
    this.AudioElement.pause()
  }

  // 停止
  public stop() {
    this.AudioElement.stop()
    this.setAudioConfig({
      isPlay: false,
      status: 'stop',
      audioStatus: 'stop'
    })
  }

  // 重播
  public restart() {
    this.AudioElement.restart()
  }

  // 动态添加Audio的事件处理
  private createAudioEvent() {
    this.AudioElement.oncanplay = (ev: Event) => {
      this.setCanplay(ev)
    }
    this.AudioElement.onended = (ev: Event) => {
      this.setEnded(ev)
    }
    this.AudioElement.onerror = (ev: Event) => {
      this.setError(ev)
    }
    this.AudioElement.onloadedmetadata = (ev: Event) => {
      // console.log(ev)
      this.setAudioConfig({
        audioStatus: 'loadedmetadata'
      })
    }
    this.AudioElement.ontimeupdate = (ev: Event) => {
      // console.log(this.AudioElement.currentTime)
      this.setAudioConfig({
        currentTime: this.AudioElement.currentTime,
        audioStatus: 'timeupdate'
      })
    }
    this.AudioElement.addEventListener('play', (ev: Event) => {
      // this.setAudioConfig({
      //   audioStatus: 'play'
      // })
    })
    this.AudioElement.addEventListener('pause', (ev: Event) => {
      // this.setAudioConfig({
      //   audioStatus: 'pause'
      // })
    })
    // 拓展原生方法
    // tslint:disable-next-line: only-arrow-functions
    Audio.prototype.stop = function() {
      this.pause()
      this.currentTime = 0
      this.src = ''
    }
    Audio.prototype.restart = function() {
      this.pause()
      this.currentTime = 0
      this.play()
    }
  }
}
