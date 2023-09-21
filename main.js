const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const Pause = '<i class="fa-solid fa-pause"></i>'
const Play = '<i class="fa-solid fa-play"></i>'

const playSong = $('.play-song_play')
const coverSong = $('.content_body-cover-song')
const audio = $('.audio_play')
const imgSong = $('.play-song_img')
const nameSong = $('.play-song_name')
const single = $('.play-song_single')
const inputProgress = $('.input_process')
const nextPlay = $('.play-song_next')
const prevPlay = $('.play-song_prev')
const playContent = $('.content_body-play')
const playHeader = $('.header_navbar-play')
const RandomBtn = $('.play-song_random')
const repeatBtn = $('.play-song_repeat')
const inputSound = $('.input_sound')
const song = $('.content_body-cover-song')
const btnFlow = $('.btn-flow')
const showMoreBtn = $('.btn-more')

var app =  {
    isPlaying: false,
    isIndex: 0,
    indexSong: 0,
    isRandom: false,
    isRepeat: false,
    isFlow: false,
    isHeart: false,
    dataSong: [
        {
            song: 'Seven (feat. Latto) (Explicit Ver.) ',
            single: 'Jung Kook, latto',
            img: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/9/17/1242745/Screenshot-2023-07-2.jpg',
            audio: './audio/song1.mp3',
            quantity: '708.165.478',
            time: '3:46',
        },
        {
            song: 'BTS (방탄소년단) Dynamite Official MV',
            single: 'BTS',
            img: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2020/8/21/829789/BTS-Dynamite-1-03.jpg?w=800&h=496&crop=auto&scale=both',
            audio: './audio/song2.mp3',
            quantity: '2.708.165.478',
            time: '3:43'
        },
        {
            song: '(Boy With Luv) (feat. Halsey)',
            single: 'BTS',
            img: 'https://www.allkpop.com/upload/2021/07/content/180502/web_data/allkpop_1626599807_btsposter-collage.jpg',
            audio: './audio/song3.mp3',
            quantity: '2.508.165.478',
            time: '4:12'
        },
        {
          song: 'BTS (방탄소년단) DNA ',
          single: 'BTS',
          img: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/10/5/841938/BTS.jpg',
          audio: './audio/song4.mp3',
          quantity: '2.608.165.478',
          time: '4:15'
      },
      {
        song: 'BTS (방탄소년단) FAKE LOVE',
        single: 'BTS',
        img: 'https://0.soompi.io/wp-content/uploads/2021/09/07133418/bts1.jpeg?s=900x600&e=t',
        audio: './audio/song5.mp3',
        quantity: '2.708.165.478',
        time: '5:18'
      },
    ],   
    
    render() {
       coverSong.innerHTML = ''
       var html = this.dataSong.map((song, index) => {
        var hiddenClass = index >= 3 ? 'hidden' : '';
          return `
          <div class="content_body-song ${index === this.isIndex ? 'active' : ''} ${hiddenClass}" data-index="${index}">
                <div class="content_body-first">
                <span class="content_body-song-play">
                    <i class="fa-solid fa-play"></i>
                </span>
                    <p class="content_body-number">
                      ${index += 1}
                    </p>
                    <div class="content_body-photo">
                    <img src="${song.img}" alt="" class="content_body-img">
                    </div>
                    <h3 class="content_body-song-name">
                      ${song.song}
                    </h3>
                </div>
                <p class="content_body-sound-quantity">
                    ${song.quantity}
                </p>
                
                <div class="content_body-end">
                    <div class="content_body-heart">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="content_body-time">
                      ${song.time}
                    </div>
                </div>
          </div>
          `
       }).join('')
       coverSong.innerHTML = html
    },

    getSongFirst() {
       var first = this.dataSong[this.isIndex]
        this.loadCurrentSong(first)
    },

    HandleSong() {
      playSong.onclick = function() {
         if(app.isPlaying) {
            audio.pause()
         } else {
            audio.play()
         }
      }

      playContent.onclick = function() {
        if(app.isPlaying) {
            audio.pause()
         } else {
            audio.play()
         }

         render()
      }

      playHeader.onclick = function() {
        if(app.isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
      }

      audio.onplay = function() {
         app.isPlaying = true
         playSong.innerHTML = Pause
         playContent.innerHTML = Pause
         playHeader.innerHTML = Pause
      }

      audio.onpause = function() {
        app.isPlaying = false
        playSong.innerHTML = Play
        playContent.innerHTML = Play
        playHeader.innerHTML = Play
      }
      
      // progress
      audio.ontimeupdate = function() {
        if(audio.duration) {
           const progress = Math.floor(audio.currentTime / audio.duration * 100) 
           inputProgress.value = progress
        }
      }

      inputProgress.onchange = function(e) {
            const seekTime = (audio.duration / 100 * e.target.value)
            audio.currentTime = seekTime
      }
    
       //   nút next song
      nextPlay.onclick = function() {
        if(app.isRandom) {
           app.RandomSong()
        } else {
          app.isIndex++;
          if(app.isIndex >= app.dataSong.length) {
              app.isIndex = 0
          } 
          var data = app.dataSong[app.isIndex]
          app.loadCurrentSong(data)
        }
        app.render()
        audio.play()
      }

       // nút prev song 
      prevPlay.onclick = function() {
        if(app.isRandom) {
          app.RandomSong()
       } else {
          app.isIndex--;
          if(app.isIndex < 0) {
              app.isIndex = app.dataSong.length - 1 
          } 
    
          var data = app.dataSong[app.isIndex]
          app.loadCurrentSong(data)
        }
        app.render()
        audio.play()
      }

      // random song
      RandomBtn.onclick = function() {
        app.isRandom = !app.isRandom
        RandomBtn.classList.toggle('active', app.isRandom)
      }

      // repeat song

      repeatBtn.onclick = function() {
        app.isRepeat = !app.isRepeat
        repeatBtn.classList.toggle('active', app.isRepeat)
      }

      audio.onended = function() {
        if(app.isRepeat) {
          audio.play()
        } else {
          nextPlay.click()
        }

      }

      inputSound.oninput = function() {
        var volume = parseFloat(inputSound.value);
        audio.volume = volume
      }

      song.onclick = function(e) {
        const btnHeart = $$('.content_body-heart')
        var songNode = e.target.closest('.content_body-song:not(.active)')
        if(songNode || e.target.closest('.content_body-heart')) {
          if(songNode) {
            $('.content_body-song.active').classList.remove('active')
              var dataIndex = songNode.dataset.index
              app.isIndex = dataIndex 
              var data = app.dataSong[app.isIndex]
              app.loadCurrentSong(data)
              audio.play()
              songNode.classList.add('active')
          }

          if(e.target.closest('.content_body-heart')) {
            for(let btn of btnHeart) {
              btn.onclick = function(e) {
                  if(!app.isHeart) {
                     app.isHeart = true
                     e.target.style.color = 'red'
                  } else {
                    app.isHeart = false
                    e.target.style.color  = 'black'
                  }
              }
            }
          }
        }
      }

      btnFlow.onclick = function() {
        if(!app.isFlow) {
          app.isFlow = true
          btnFlow.innerText = 'Đang theo dõi'
        } else {
          app.isFlow = false
          btnFlow.innerText = 'Theo dõi'
        }
      }
      
      showMoreBtn.onclick = function(e) {
        app.toggleHiddenItems()
        if(e.target.textContent === 'xem thêm') {
            e.target.textContent = 'ẩn bớt'
        } else {
          e.target.textContent = 'xem thêm'
        }
      }

      
    },

    toggleHiddenItems() {
      const songList = $$('.content_body-song')
      for(let i = 3; i < songList.length; i++) {
         songList[i].classList.toggle('hidden')
      }
    },

    RandomSong() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * app.dataSong.length)
      } while(app.isIndex === newIndex)
      app.isRandom = newIndex
      data = app.dataSong[app.isRandom]
      app.loadCurrentSong(data)
    },

    loadCurrentSong(data) {
        imgSong.src = data.img
        nameSong.innerText = data.song
        single.innerText = data.single
        audio.src = data.audio
    },


    start() {
      this.render()

      this.HandleSong()

      this.getSongFirst()
    }
}

app.start()