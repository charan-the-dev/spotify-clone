


//* List of all the Songs and their details

const songsList = [
    { songName: "Maha Ganapathim", songPath: "songs/Maha Ganapathim.mp3", songImage: "images/ganesha.jpg" },
    { songName: "Abrars Entry", songPath: "songs/jamal kudu.mp3", songImage: "images/abrars entry.jpg" },
    { songName: "Agar Tum Saath Ho", songPath: "songs/Tum Saath Ho.mp3", songImage: "images/tum saath ho.png" },
    { songName: "College Papa", songPath: "songs/Kallajodu College Papa.mp3", songImage: "images/college papa.jpg" },
    { songName: "Shape Of You", songPath: "songs/Shape Of You.mp3", songImage: "images/shape of you.jpg" },
    { songName: "Tera Yaar Hooh Main", songPath: "songs/Tera Yaar Hoon Main.mp3", songImage: "images/tera yaar hooh main.jpg" }
]

//* Adjusting all the images and their details in the respective song container

const images = Array.from(document.querySelectorAll('.song .image'))
images.forEach((images, i) => {
    images.querySelector('img').src = songsList[i].songImage;
})

//* Adjusting the active song details

const songs = Array.from(document.querySelectorAll('.song'))
const activeSong = new Audio()
let index = -1
const progressBar = document.querySelector('.progress-bar .progress-bar-container input')


songs.forEach((song, i) => {
    song.addEventListener('click', () => {
        document.querySelector('.active-song').style.opacity = '1'
        progressBar.value = 0
        document.querySelector('.active-song .song-name').innerHTML = song.querySelector('.song-title').innerHTML
        document.querySelector('.active-song .song-banner img').src = song.querySelector('.image img').src
        document.querySelector('.active-song .background-img img').src = song.querySelector('.image img').src
        activeSong.src = songsList[i].songPath
        activeSong.play()
        index = i
        playPause.src = "images/pause.svg"
    })
})

//* Handling the onclick for play and pause buttons
const playPause = document.querySelector('.buttons img:nth-child(2)')

playPause.addEventListener('click', () => {
    if (activeSong.paused || activeSong.currentTime <= 0) {
        activeSong.play()
        playPause.src = "images/pause.svg"
    } else {
        playPause.src = "images/play.svg"
        activeSong.pause()
    }
})

//* Adjusting the song for Progress Bar

activeSong.addEventListener('timeupdate', () => {
    progressBar.value = parseInt((activeSong.currentTime / activeSong.duration) * 100)
})

progressBar.addEventListener('change', () => {
    activeSong.currentTime = progressBar.value * activeSong.duration / 100
})

//* Hadling the backward button
const prev = document.querySelector('.buttons img:first-child')
prev.addEventListener('click', () => {
    if (index < 0) {
        index = 0
    }
    index--;
    document.querySelector('.active-song .song-name').innerHTML = songsList[index].songName
    document.querySelector('.active-song .song-banner img').src = songsList[index].songImage
    document.querySelector('.active-song .background-img img').src = songsList[index].songImage
    activeSong.src = songsList[index].songPath
    activeSong.play()
})

//* Handling the forward button

const next = document.querySelector('.buttons img:last-child')
next.addEventListener('click', () => {
    if (index >= songsList.length) {
        index = songsList.length - 1
    }
    index++;
    document.querySelector('.active-song .song-name').innerHTML = songsList[index].songName
    document.querySelector('.active-song .song-banner img').src = songsList[index].songImage
    document.querySelector('.active-song .background-img img').src = songsList[index].songImage
    activeSong.src = songsList[index].songPath
    activeSong.play()
})