let output = "";
for (let i = 1; i < 11; i++){
    output += 
        `<div class="audio-item" onclick = "startAudio(${i})">
            Test - ${i}
        </div>`
}
console.log(output)
document.querySelector('.audio-list').innerHTML = output;
function startAudio(index){
    document.querySelector('.audio-player').setAttribute('src', `MP3/TEST ${index > 9 ? index : `0${index}`}.mp3`)  
    document.querySelector('.audio-player').play()
    document.querySelector('.title').textContent = `Đang phát : TEST - ${index}`
}