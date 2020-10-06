let output = "";
for (let i = 0; i < 16; i++){
    const test = Math.ceil((i+1)/4);
    const section = (i+1)%4 === 0 ? 4 : (i+1)%4; 
    output += `<div class="audio-element">
                    <div class="icon-audio" onclick="playAudio(${i+1})">
                        <p>Test - ${test} : Section ${section}</p>
                    </div>
                </div>`
} 
document.querySelector('.track-list').innerHTML = output;
function playAudio(index){
    const test = Math.ceil((index)/4);
    const section = (index)%4 === 0 ? 4 : (index)%4; 
    document.querySelector('.audio-source').setAttribute("src",`Audio/S${index}.mp3`)
    document.querySelector('.audio-source').play();
    document.querySelector('.title').textContent = `Đang phát : Test - ${test} : Section ${section}`;
}
