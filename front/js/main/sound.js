let confettiAudio = new Audio("../../ressources/confettihorn.wav")
let nanAudio = new Audio("../../ressources/nan.mp3")
let explodeAudio = new Audio("../../ressources/rare_attack.wav")

confettiAudio.volume = 0.3
nanAudio.volume = 0.2
explodeAudio.volume = 0.4;

function confettiPlay(){
    confettiAudio.play();
}
function nanPlay(){
    nanAudio.play();
}
function explodePlay(){
    explodeAudio.play();
}