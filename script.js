const html= document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque= document.querySelector('.app__card-button--enfoque')
const botonLargo=document.querySelector('.app__card-button--largo')
const imagen=document.querySelector('.app__image')
const titulo=document.querySelector('.app__title')
const botones= document.querySelectorAll('.app__card-button')
const inputAudio= document.querySelector('#alternar-musica')
const musica= new Audio('./sonidos/luna-rise-part-one.mp3')
const botoniniciaPausa= document.querySelector('#start-pause')
const sonidoPlay= new Audio('./sonidos/play.wav')
const pausePlay= new Audio('./sonidos/pause.mp3')
const beepPlay= new Audio('./sonidos/beep.mp3')
const txtInitPause=document.querySelector('#start-pause span')
const playPauseIcon=document.querySelector('.app__card-primary-butto-icon')
const tiempoEnPantalla= document.querySelector('#timer')

let tiempoEnSeg = 1500
let idIntervalo= null

musica.loop=true

inputAudio.addEventListener('change',()=>{
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click',()=>{
    tiempoEnSeg=300
    cambiarContexto("descanso-corto")
    botonCorto.classList.add('active')
   
})


botonEnfoque.addEventListener('click',()=>{
    tiempoEnSeg=1500
    cambiarContexto("enfoque")
    botonEnfoque.classList.add('active')
    
})

botonLargo.addEventListener('click',()=>{
    tiempoEnSeg='900'
    cambiarContexto("descanso-largo")
    botonLargo.classList.add('active')
    
})

function cambiarContexto(contexto){

    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove("active")
    })


    html.setAttribute('data-contexto',contexto)
    imagen.setAttribute('src',`/imagenes/${contexto}.png`)
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML=`Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML=`
            ¿Qué tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
                `
            break;
        case "descanso-largo":
            titulo.innerHTML=`
            Hora de volver a la superficie<br>
            <strong class="app__title-strong">Haz una pausa larga</strong>
            `
            break;
        default:
            break;
    }
}

const cuentaRegresiva= () =>{
    if(tiempoEnSeg<=0){
        beepPlay.play()
        alert('Tiempo')
        reiniciar()
        return
    }
    playPauseIcon.setAttribute('src','/imagenes/pause.png')
    txtInitPause.textContent="Pausar"
    tiempoEnSeg -=1;
    mostrarTiempo()
}

botoniniciaPausa.addEventListener('click',iniciarPausa)


function iniciarPausa(){
    if (idIntervalo) {
        pausePlay.play()
        reiniciar()
        return
    }
    sonidoPlay.play()
    idIntervalo=setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo)
    idIntervalo=null
    txtInitPause.textContent="Comenzar"
    playPauseIcon.setAttribute('src','/imagenes/play_arrow.png')
}

function mostrarTiempo(){
    const tiempo=new Date(tiempoEnSeg*1000)
    const tiempoFormateado=tiempo.toLocaleTimeString('es-PE',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML=`${tiempoFormateado}`
}
mostrarTiempo()