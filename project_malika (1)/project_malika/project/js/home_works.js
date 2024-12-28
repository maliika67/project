//GMAIL BLOCK

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-z0-9._-]+@gmail\.com$/i

gmailButton.onclick = () =>{
    if(regExp.test(gmailInput.value)){
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    }else{
        gmailResult.innerHTML = "Invalid email address"
        gmailResult.style.color = "red"
    }
}

//MOVE BLOCK

const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

// Создаем элемент для траектории восьмерки
const trajectoryTop = document.createElement('div');
const trajectoryBottom = document.createElement('div');
trajectoryTop.classList.add('trajectory');
trajectoryBottom.classList.add('trajectory');
parentBlock.insertBefore(trajectoryTop, childBlock);
parentBlock.insertBefore(trajectoryBottom, childBlock);
trajectoryBottom.style.top = '275px';

let time = 0;
const centerX = 225;
const centerY = 225;
const radiusX = 150;
const radiusY = 100;

// Массив для хранения элементов следа
const trails = [];
const maxTrails = 20;

const createTrail = (x, y) => {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    parentBlock.appendChild(trail);
    trails.push({
        element: trail,
        createdAt: Date.now()
    });

    // Удаляем старые следы
    if (trails.length > maxTrails) {
        const oldestTrail = trails.shift();
        oldestTrail.element.remove();
    }
}

const moveBlock = () => {
    // Создаем фигуру в форме восьмерки
    const posX = centerX + radiusX * Math.sin(time);
    const posY = centerY + radiusY * Math.sin(time * 2);
    
    // Применяем новые координаты
    childBlock.style.left = posX + 'px';
    childBlock.style.top = posY + 'px';
    
    // Создаем след
    createTrail(posX + 20, posY + 20);
    
    // Обновляем прозрачность следов
    const now = Date.now();
    trails.forEach((trail, index) => {
        const age = now - trail.createdAt;
        const opacity = Math.max(0, 1 - age / 1000);
        trail.element.style.opacity = opacity;
        trail.element.style.transform = `scale(${1 + index/maxTrails})`;
    });
    
    time += 0.02;
    requestAnimationFrame(moveBlock);
}

moveBlock();

//TIMER
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')
const seconds = document.querySelector('#seconds')
let timerCounter = 0
let switcherTimer = true
start.onclick = () => {
    if (switcherTimer === true){
        const timerId = setInterval(() => {
            if (timerCounter <= 999){
                timerCounter++
                seconds.innerText = timerCounter
            }
        }, 100)
        stop.onclick = () => {
            clearInterval(timerId)
            switcherTimer = true
        }

        reset.onclick = () => {
            timerCounter =0
            seconds.innerText = 0
        }
        switcherTimer = false
    }


}



