

//theme
var btnClose = $('.close--theme')
var overlayTheme = $('.overlay__theme')
var btnTheme = $('button.btn-theme');

btnClose.click(() => {
    overlayTheme.css("display", "none");
})

btnTheme.click(() => {
    overlayTheme.css("display", "block");


})
//change theme black
var toggleSwitchTheme = $('.option--accept');
var currentTheme = JSON.parse(localStorage.getItem('theme'));
var isBlack = false;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'black') {
        isBlack = true;
        console.log(isBlack)
    }
}
////////////////////////////////////////////////
//owl carousel
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        mouseDrag: false,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
        }
    })

});
//////////////////////////////////////////////////////
//body home
// animation của gallery item

///////////////////////////////////////////////////////////
//my music

//////////////////////////////////////////////////////////////
//libary song
//const getItemNavMenu = document.querySelectorAll('.pro_nav_menu_item');
var imgAnimate = document.getElementsByClassName('song-img-item');
var indexFirst = 0;
var prevFirst = -1;

var imgFirst = document.querySelector('.song-img-item.first');
getItemNavMenu.forEach((item, index) => {
    item.onclick = () => {
        document.querySelector('.pro_nav_menu_item.active').classList.remove('active')
        item.classList.add('active')
    }

})
////////////////////////////////////////////////////////
//music player
const CONFIG_STORAGE = 'MUSIC_PLAYER';
const arrowRetreat = document.querySelector('.arrow-retreat');
const arrowAdvance = document.querySelector('.arrow-advance');
const playlist = document.querySelector('.playlist');
const playBtn = document.querySelector('.btn-toggle-play');
const progress = document.querySelector('#progress');
const progressVolume = document.querySelector('#progress_volume');

const progressBar = document.querySelector('#progress-bar');
const progressBarVolume = document.querySelector('#progress-bar_volume');
const avt_song = document.querySelector('.avt-song');
const nameSong = document.querySelector('.name-song marquee');
const nameSinger = document.querySelector('.name-singer span');
const audio = document.querySelector('#audio');
const timeLeft = document.querySelector('.time-left-song');
const timeRight = document.querySelector('.time-right-song');
const btnPrevSong = document.querySelector('.btn-prev-song');
const btnNextSong = document.querySelector('.btn-next-song');
const btnRandomSong = document.querySelector('.btn-random');
const btnLoopSong = document.querySelector('.btn-repeat');
const optionAcceptBlack = document.querySelector('.option--accept--black');
const demoThemeBlack = document.querySelector('.option--demo--black')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isClickBack: false,
    isClickNext: true,
    isMute: false,
    theVolume: 0.5,

    config: JSON.parse(localStorage.getItem(CONFIG_STORAGE)) || {},


    songs: [

        {
            name: "Sóng",
            singer: "Dzàng Hoàng x Thúy Anh x Bảo Nguyên",
            path: "/song/song1.mp3",
            image: "/img/song1_img.jpg",
            timeSong: "05:05"
        },
        {
            name: "Đã Từng",
            singer: "Bùi Anh Tuấn x Dương Hoàng Yến",
            path: "/song/song2.mp3",
            image:
                "/img/song2_img.jpg",
            timeSong: "04:56"
        },
        {
            name: "Suýt Nữa Thì",
            singer: "Andiez",
            path:
                "/song/song3.mp3",
            image: "/img/song3_img.jpg",
            timeSong: "04:43"
        },
        {
            name: "Ngày Mai Em Đi (Touliver Mix)",
            singer: "Touliver,Lê Hiếu,SooBin",
            path:
                "/song/song4.mp3",
            image: "/img/song4_img.jpg",
            timeSong: "03:38"
        },
        {
            name: "Giả Vờ Nhưng Em Yêu Anh",
            singer: "Miu Lê",
            path:
                "/song/song5.mp3",
            image: "/img/song5_img.jpg",
            timeSong: "03:55"
        },
        {
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng M-TP",
            path:
                "/song/song6.mp3",
            image: "/img/song6_img.jpg",
            timeSong: "04:35"
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(CONFIG_STORAGE, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                        <div class="song ${index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <div class="name">
                                    <div class="title">${song.name}</div>
                                    <div class="author">${song.singer}</div>
                                </div>
                                <div class="timeSong">${song.timeSong}</div>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
        });

        playlist.innerHTML = htmls.join("");

    },
    formatTime: function (sec_num) {
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

        hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
    },
    getDuration: function (audio, app) {
        return new Promise(function (resolve) {
            audio.onloadedmetadata = function () {
                resolve(app.formatTime(audio.duration));
            }

        });
    },
    //hàm này để định nghĩa 1 property.. 
    //như là song tại CurrentIndex sẽ được gọi là CurrentSong
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            //getter : thì phải là hàm function(){}
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    scrollToView: function () {
        document.querySelector(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        })
    },
    //đã xóa cần sửa
    loadCurrentSong: function () {
        avt_song.style.backgroundImage = `url('${this.currentSong.image}')`
        nameSong.textContent = this.currentSong.name;
        nameSinger.textContent = this.currentSong.singer;
        audio.src = this.currentSong.path;
        //console.log(audio.duration);
        this.setConfig('indexStore', this.currentIndex);
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToView();
    },
    previousSong: function () {
        this.currentIndex--;

        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;

            this.loadCurrentSong();
        }
        this.loadCurrentSong();
        this.render();
        this.scrollToView();
    },
    randomSong: function () {
        var indexRandom;
        do {
            indexRandom = Math.floor(Math.random() * this.songs.length)

        }
        while (indexRandom === this.currentIndex)
        this.currentIndex = indexRandom;
        this.loadCurrentSong();
        this.render();
        this.scrollToView();
    },
    handleEvents: function () {
        const _this = this;
        // bug là nếu nhắn vào đang active thì nó vẫn đổi true thành false
        // nên nó sẽ đổi màu ngược lại
        arrowRetreat.onclick = (e) => {
            //e.preventDefault();
            _this.isClickBack = !_this.isClickBack
            _this.isClickNext = !_this.isClickNext

            arrowRetreat.classList.toggle('active-trans-page', _this.isClickBack)
            arrowAdvance.classList.toggle('active-trans-page', _this.isClickNext)
            _this.setConfig('isClickBack', _this.isClickBack);
            _this.setConfig('isClickNext', _this.isClickNext);




        }
        arrowAdvance.onclick = (e) => {
            //e.preventDefault();
            _this.isClickBack = !_this.isClickBack
            _this.isClickNext = !_this.isClickNext

            arrowRetreat.classList.toggle('active-trans-page', _this.isClickBack)
            arrowAdvance.classList.toggle('active-trans-page', _this.isClickNext)
            _this.setConfig('isClickBack', _this.isClickBack);
            _this.setConfig('isClickNext', _this.isClickNext);
        }

        //xử lí quay avatar
        const turnAroundAvt = avt_song.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        turnAroundAvt.pause();
        //Xử lí random hiện màu btn random
        btnRandomSong.onclick = () => {
            app.isRandom = !app.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            btnRandomSong.classList.toggle('active', app.isRandom);

        }
        // Xử Lí khi ấn vào Loop hiện màu
        btnLoopSong.onclick = () => {
            app.isRepeat = !app.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            btnLoopSong.classList.toggle('active', app.isRepeat);

        }

        //xử lí next song 
        btnNextSong.onclick = () => {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.nextSong();
            }

            audio.play();
            turnAroundAvt.play();
        };
        btnPrevSong.onclick = () => {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.previousSong();
            }

            audio.play();
            turnAroundAvt.play();
        }
        // Xử lý khi click play
        // Handle when click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
                turnAroundAvt.pause();

            } else {
                audio.play();
                turnAroundAvt.play();
                

            }
        };
        // xử lí khi play
        audio.onplay = () => {
            _this.isPlaying = true;
            playBtn.classList.add('playing');

        };
        // khi pause
        audio.onpause = () => {
            _this.isPlaying = false;
            playBtn.classList.remove('playing');

        };
        var onTua = false;
        // tua bài hát
        audio.ontimeupdate = () => {
            if (audio.duration) {
                if (!onTua) {
                    var percentSong = (audio.currentTime / audio.duration * 100);
                    //progress.value = percentSong;
                    progressBar.style.width = `${percentSong}%`
                    //console.log(audio.currentTime)


                }
            }

            timeLeft.innerHTML = `<span>${this.formatTime(audio.currentTime)}</span>`

            this.getDuration(audio, this).then(function (time) {
                timeRight.innerHTML = `<span>${time}</span>`
            })
            // xử lí khi click random và loop
            var timeRun = audio.currentTime;
            _this.setConfig('currentTime', timeRun);
            var endTime = audio.duration;
            if (timeRun === endTime) {
                if (app.isRandom && !app.isRepeat) {
                    app.randomSong();
                    audio.play();
                }
                else if (!app.isRandom && !app.isRepeat) {
                    app.nextSong();
                    audio.play();
                }
                else if (app.isRepeat && !app.isRandom) {
                    audio.play();
                }
                else {

                    audio.play();
                }


            }

        };
        // xử lí khi click vào bài hát
        playlist.onclick = (e) => {


            if (!e.target.closest('.song.active') || e.target.closest('.option')) {
                if (!e.target.closest('.song.active')) {
                    app.currentIndex = Number(e.target.closest('.song').dataset.index);
                    console.log(app.currentIndex)
                    app.render();
                    app.loadCurrentSong();
                    turnAroundAvt.play();
                    audio.play();


                }
            }
        }

        progress.onchange = (e) => {
            onTua = false;
            audio.currentTime = (audio.duration * e.target.value / 100);
            //console.log(audio.currentTime)
        };
        progress.oninput = (e) => {
            onTua = true;
            let percentSong = e.target.value;
            progressBar.style.width = `${percentSong}%`



        };
        //đã xóa cần sửa
        // volume ban đầu
        audio.volume = app.theVolume
        progressBarVolume.style.width = `50%`
        // volume sau khi click vào thay đổi
        progressVolume.oninput = (e) => {

            let percentVolume = e.target.value;

            progressBarVolume.style.width = `${percentVolume}%`
            audio.volume = percentVolume / 100
            _this.setConfig('theVolume', percentVolume / 100);
            if (progressBarVolume.style.width === '0%') {
                document.querySelector('.volumeIcon').classList.remove('fa-volume-down')
                document.querySelector('.volumeIcon').classList.add('fa-volume-mute')
            }
            else {
                document.querySelector('.volumeIcon').classList.add('fa-volume-down')
                document.querySelector('.volumeIcon').classList.remove('fa-volume-mute')
            }

        };
        // click vào mute volume
        document.querySelector('.volume-icon').onclick = (e) => {
            app.isMute = !app.isMute;

            if (app.isMute) {
                audio.volume = 0;
                progressBarVolume.style.width = `0%`
                document.querySelector('.volumeIcon').classList.remove('fa-volume-down')
                document.querySelector('.volumeIcon').classList.add('fa-volume-mute')

            }
            else {
                audio.volume = this.config.theVolume;
                progressBarVolume.style.width = `${this.config.theVolume * 100}%`
                document.querySelector('.volumeIcon').classList.add('fa-volume-down')
                document.querySelector('.volumeIcon').classList.remove('fa-volume-mute')

            }
        }
        //phát tất cả
        $('.option-play-all').click(function () {
            audio.play();
        })

    },
    //thay đổi giao diện
    changeTheme: function () {
        var isClickCloseTheme = false;
        optionAcceptBlack.onclick = () => {

            document.querySelector('.overlay__theme').style.display = 'none'
            // chưa lưu vô local storage
            document.documentElement.dataset.theme = 'blue'
            document.querySelector('.item__option--image_blue').classList.add('active')
            document.querySelector('.mucsicWeb').style.backgroundImage = 'url(\'https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/rose.jpg\')'

        }
        demoThemeBlack.onclick = () => {
            document.documentElement.dataset.theme = 'blue'
            isClickCloseTheme = true;
            document.querySelector('.close--theme').onclick = () => {
                if (isClickCloseTheme)
                    document.documentElement.dataset.theme = ''

            }
        }

    },
    loadConfig: function () {
        this.isClickBack = this.config.isClickBack;
        this.isClickNext = this.config.isClickNext;
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.currentIndex = this.config.indexStore;
        //đã xóa cần sửa
        audio.currentTime = this.config.currentTime;
        this.theVolume = this.config.theVolume;
    },
    start: function () {
        // tải lại những cái đã lưu trong local Storage
        this.loadConfig();
        // thay đổi giao diện
        this.changeTheme();
        //định nghĩa các thuộc tính
        this.defineProperties();
        //xử lí xử kiện cho music
        this.handleEvents();
        //
        this.loadCurrentSong();
        // time play
        //this.timePlay();
        //render lại danh sách bài hát
        this.render();
        btnRandomSong.classList.toggle('active', app.isRandom);
        btnLoopSong.classList.toggle('active', app.isRepeat);
        arrowRetreat.classList.toggle('active-trans-page', app.isClickBack)
        arrowAdvance.classList.toggle('active-trans-page', app.isClickNext)

        //volume
        progressBarVolume.style.width = `${app.theVolume * 100}%`
        
    }
}
app.start();