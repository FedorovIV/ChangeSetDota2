const IlyaButton = document.getElementById("IlyaButton");

const AnaButton = document.getElementById("AnaButton");

var audioIlya = new Audio();
var audioAna = new Audio();

IlyaButton.addEventListener("click", ()=>{
  window.electronAPI.CopyIlyaSet()
})

AnaButton.addEventListener("click", ()=>{
  window.electronAPI.CopyAnaSet()
})

window.electronAPI.UpdateIlyaSet((event) => {
  document.body.style.backgroundImage = "url(images/io.jpeg)";
  audioAna.currentTime = 0;
  audioAna.pause(); 
  audioIlya.src = 'sounds/Vo_wisp_kill_arcana.mp3.mpeg';
  audioIlya.autoplay = true; 
})

window.electronAPI.UpdateAnaSet((event) => {
  document.body.style.backgroundImage = "url(images/nix.jpeg)";
  audioIlya.currentTime = 0;
  audioIlya.pause();
  audioAna.src = 'sounds/Nyx_nyx_08_ru.mp3.mpeg';
  audioAna.autoplay = true; 
})

