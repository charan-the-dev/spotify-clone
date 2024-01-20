const start = document.querySelector('.button:first-child')
const stop = document.querySelector('.button:last-child')


let chunks = []


let count = 1


start.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream)

        window.stream = stream
        window.mediaRecorder = mediaRecorder

        mediaRecorder.start()

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
        }

        document.querySelector('.message').innerHTML = `Recording.... <div class="dot"></div>`
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/mpeg" })
            chunks = []

            const recordedMedia = document.createElement("audio")
            recordedMedia.controls = true

            const recordedMediaURL = URL.createObjectURL(blob)
            recordedMedia.src = recordedMediaURL

            const recording = document.createElement('div')
            recording.className = "recording"
            const link = document.createElement('a')
            link.href = recordedMediaURL
            link.download = "Recorded Text"
            link.innerText = "Download"
            link.onclick = () => {
                URL.revokeObjectURL(recordedMedia)
            }
            recording.appendChild(recordedMedia)
            recording.appendChild(link)

            document.querySelector('.audio-container').appendChild(recording);

        }
    })
})

stop.addEventListener('click', () => {
    window.mediaRecorder.stop()

    window.stream.getTracks().forEach(track => {
        track.stop()
    });

    document.querySelector('.message').innerHTML = "Recording Done...!"
})