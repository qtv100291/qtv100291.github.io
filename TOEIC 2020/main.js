let output = "";
for (let i = 1; i < 11; i++) {
  output += `<div class="audio-item" onclick = "startAudio(${i})">
            Test - ${i}
        </div>`;
}

if (!document.querySelector(".audio-player").getAttribute("src")) {
  document.querySelector(".access-button").disabled = true;
}
document.querySelector(".audio-list").innerHTML = output;
function startAudio(index) {
  document
    .querySelector(".audio-player")
    .setAttribute("src", `MP3/TEST ${index > 9 ? index : `0${index}`}.mp3`);
  document.querySelector(".audio-player").play();
  document.querySelector(".title").textContent = `Đang phát : TEST - ${index}`;
  if (document.querySelector(".audio-player").getAttribute("src")) {
    document.querySelector(".access-button").disabled = false;
  }
  document.querySelector("#minute").value = "";
  document.querySelector("#second").value = "";
}

document
  .querySelector(".access-button")
  .addEventListener("click", changeCurrentTime);
document
  .querySelector(".control-back")
  .addEventListener("click", minus10Seconds);
document
  .querySelector(".control-forward")
  .addEventListener("click", add10Seconds);
function changeCurrentTime() {
  const minutes = parseInt(document.querySelector("#minute").value);
  const seconds = parseInt(document.querySelector("#second").value);
  const currentTime = minutes * 60 + seconds;
  document.querySelector(".audio-player").currentTime = currentTime;
}
function add10Seconds() {
  document.querySelector(".audio-player").currentTime =
    document.querySelector(".audio-player").currentTime + 10;
}

function minus10Seconds() {
  document.querySelector(".audio-player").currentTime =
    document.querySelector(".audio-player").currentTime - 10;
}
