const divPontuacao = document.querySelector(".score")
const start = document.querySelector(".botaoStart")
const reset = document.querySelector(".botaoReiniciar")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const body = document.querySelector("body")

start.addEventListener("click", ev => {
    inicio()
    body.classList.remove("perdu")
})

reset.addEventListener("click", ev => {
    inicio()
    body.classList.remove("perdu")
})  

let animatingColors = false
let currentColorPosition = 0

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }else{
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        body.classList.add("perdu")
        inicio()
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 3000)
    }}
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        cnt--
        if(cnt <= 0) {
            divPontuacao.innerHTML = sequencia.length 
            turno()
            clearInterval(idx)
        }

        let timer = setInterval(()=>{
            body.classList.remove("espere") 
            clearInterval(timer)},300)

        body.classList.add("espere")
    }, 900)
}

function turno() {
    divPontuacao.innerHTML = sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    console.log(sequencia.length)
    playAnimationColors()
}