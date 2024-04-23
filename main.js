const html = document.querySelector('html');
const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const inputSong = document.querySelector('#alternar-musica');
const song = new Audio('/sons/luna-rise-part-one.mp3');
const startPauseBtn = document.querySelector('#start-pause');
const spanStartPauseBtn = document.querySelector('#start-pause span');
const imgStartPauseBtn = document.querySelector('#start-pause img');
const screenTime = document.querySelector('#timer');
const playSong = new Audio('/sons/play.wav');
const pauseSong = new Audio('/sons/pause.mp3');
const finalySong = new Audio('/sons/beep.mp3');

let timeInSeconds = 1500;
let intervalId = null;

song.loop = true;


inputSong.addEventListener('change',  () => {
    if(song.paused){
        song.play();
    }else {
        song.pause();
    }
})

focusBtn.addEventListener('click', ()=> {
    timeInSeconds = 1500;
    changeContext('foco');
    focusBtn.classList.add('active');
    
})

shortBtn.addEventListener('click', ()=> {
    timeInSeconds = 300;
    changeContext('descanso-curto');
    shortBtn.classList.add('active')
})

longBtn.addEventListener('click', ()=> {
    timeInSeconds = 900;
    changeContext('descanso-longo');
    longBtn.classList.add('active');
})

function changeContext(context){
    showTime()
    buttons.forEach( (context)=> {
        context.classList.remove('active');
    })
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', `imagens/${context}.png` );

    switch(context){
        case 'foco':
            title.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        
        case 'descanso-curto':
            title.innerHTML = `
           Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        
        case 'descanso-longo':
            title.innerHTML = `
            Hora de voltar à superfície.<br>
             <strong class="app__title-strong">Faça uma pausa longa.</strong>
             `
             break;

        default:
            break;
    }
}

const countdown = () => {
    if(timeInSeconds <= 0){
        songFinaly();
        alert ('Tempo finalizado!');
        reset();

        return ;
    }
    timeInSeconds -= 1;
    showTime()
}

startPauseBtn.addEventListener('click', ()=> {

    startOrPause();
})

function startOrPause(){
    if(intervalId){
        songPause();
        reset();
        return
    }
    songPlay();
    intervalId = setInterval(countdown, 1000);
    imgStartPauseBtn.setAttribute('src', '/imagens/pause.png');
    spanStartPauseBtn.textContent = "Pausar";
    
}

function reset(){
    clearInterval(intervalId);
    imgStartPauseBtn.setAttribute('src', '/imagens/play_arrow.png');
    spanStartPauseBtn.textContent = "Começar";
    intervalId = null;
}

function songPause(){
    pauseSong.play();
}

function songPlay(){
    playSong.play();
}

function songFinaly(){
   finalySong.play();
   finalySong.currentTime = 5;
}

function showTime(){
    const time =  new Date(timeInSeconds * 1000);
    const formattedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second:'2-digit'})
    screenTime.innerHTML = `${formattedTime}`;
}
showTime()