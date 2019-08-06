let jogador1
let jogador2


const socket = io('http://localhost:3000')
socket.on('connect', function () {
    jogador1 = prompt(`Qual é o seu nome jogador 1?`)
    jogador2 = prompt(`QUal é o seu nome jogador 2?`)
})
socket.on('event', function (data) { })
socket.on('disconnect', function () { })

function sair() {
    alert(`Tem certeza? Todo o seu progresso irá ser perdido`)
}

let jogada = 0;
const box = document.querySelectorAll('.box')

const pop = document.querySelector('.pop_up')
let venc = document.querySelector('.vencedor')
let bloco = document.querySelector('.container')
let perdedor = document.querySelector('.velha')
let ganha = document.querySelector('.ganhador')
let imgGanha = document.querySelector('.trofeu')
let imgperde = document.querySelector('.velhaft')


function verificar() {

    const foto = event.target.querySelector('img');
    const div = foto.closest('.box')

    if (jogador1 == null && jogador2 == null) {
        jogador1 = prompt(`Favor informar o nome do jogador 1?`)
        jogador2 = prompt(`Favor informar o nome do jogador 2?`)
    } else {



        if (jogada > 8) {
            alert(`O jogo acabou!`)
        }
        if (div.classList.contains("clicado")) {
            alert(`PROIBIDO ROUBAR`)
        } else {
            jogada++;
            socket.emit('jogo_acao', `${jogador1} jogou`)
            console.log(`${jogador1} fez uma movimentação`)
            const imgName = (jogada % 2) ? 'ex' : 'ball';
            foto.setAttribute('src', '../imagens/' + imgName + '.png');
            div.classList.add("clicado")

            if (imgName == 'ex') {
                div.classList.add("xis")
            }
            else {
                div.classList.add("bolinha")
            }

        }

        if (
            box[0].classList.contains('xis') && box[1].classList.contains('xis') && box[2].classList.contains('xis')
            || box[3].classList.contains('xis') && box[4].classList.contains('xis') && box[5].classList.contains('xis')
            || box[6].classList.contains('xis') && box[7].classList.contains('xis') && box[8].classList.contains('xis')
            || box[0].classList.contains('xis') && box[3].classList.contains('xis') && box[6].classList.contains('xis')
            || box[1].classList.contains('xis') && box[4].classList.contains('xis') && box[7].classList.contains('xis')
            || box[2].classList.contains('xis') && box[5].classList.contains('xis') && box[8].classList.contains('xis')
            || box[0].classList.contains('xis') && box[4].classList.contains('xis') && box[8].classList.contains('xis')
            || box[2].classList.contains('xis') && box[4].classList.contains('xis') && box[6].classList.contains('xis')
        ) {
            venc.classList.add('X')
            ganhador()

        } else if (box[0].classList.contains('bolinha') && box[1].classList.contains('bolinha') && box[2].classList.contains('bolinha')
            || box[3].classList.contains('bolinha') && box[4].classList.contains('bolinha') && box[5].classList.contains('bolinha')
            || box[6].classList.contains('bolinha') && box[7].classList.contains('bolinha') && box[8].classList.contains('bolinha')
            || box[0].classList.contains('bolinha') && box[3].classList.contains('bolinha') && box[6].classList.contains('bolinha')
            || box[1].classList.contains('bolinha') && box[4].classList.contains('bolinha') && box[7].classList.contains('bolinha')
            || box[2].classList.contains('bolinha') && box[5].classList.contains('bolinha') && box[8].classList.contains('bolinha')
            || box[0].classList.contains('bolinha') && box[4].classList.contains('bolinha') && box[8].classList.contains('bolinha')
            || box[2].classList.contains('bolinha') && box[4].classList.contains('bolinha') && box[6].classList.contains('bolinha')) {
            venc.classList.add('O')
            ganhador()
        }
        else {
            if (box[0].classList.contains('clicado')
                && box[1].classList.contains('clicado')
                && box[2].classList.contains('clicado')
                && box[3].classList.contains('clicado')
                && box[4].classList.contains('clicado')
                && box[5].classList.contains('clicado')
                && box[6].classList.contains('clicado')
                && box[7].classList.contains('clicado')
                && box[8].classList.contains('clicado')
            ) {
                perdeu()
            }
        }
    }
}

function ganhador() {
    pop.style.display = 'block'
    bloco.style.display = 'none'
    imgperde.style.display = 'none'
    if (venc.classList.contains('X')) {
        venc.innerText = 'X'
    } else {
        venc.innerText = 'O'
    }
}

function perdeu() {
    pop.style.display = 'block'
    bloco.style.display = 'none'
    perdedor.style.display = 'block'
    ganha.style.display = 'none'
    imgGanha.style.display = 'none'
    imgperde.style.display = 'block'


}

for (c = 0; c <= 8; c++) {
    box[c].addEventListener('click', verificar)
}
