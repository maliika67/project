const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if(regExp.test(phoneInput.value)){
        phoneInput.innerHTML = "OK"
        phoneResult.style.color = "green"
    }else{
        phoneResult.innerHTML = "Invalid phone number"
        phoneResult.style.color = "red"
    }
}



/// TAB SLIDER
const  tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentIndex = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.classList.remove('active')
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    requestAnimationFrame(() => {
        tabContentBlocks[index].classList.add('active')
    })
    tabs[index].classList.add('tab_content_item_active')
    currentIndex = index
}

const auto = () => {
    let timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabContentBlocks.length
        hideTabContent()
        showTabContent(currentIndex)
    }, 3000)

    // Останавливаем автопереключение при наведении мыши
    tabsParent.addEventListener('mouseenter', () => {
        clearInterval(timer)
    })

    // Возобновляем автопереключение когда мышь уходит
    tabsParent.addEventListener('mouseleave', () => {
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabContentBlocks.length
            hideTabContent()
            showTabContent(currentIndex)
        }, 3000)
    })
}

hideTabContent()
showTabContent()
auto()

tabsParent.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, index) => {
            if(event.target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

//CONVERTER
//kiss - keep it short and simple

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch("../data/converter.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const convert = async (elem, target, target2) => {
    elem.oninput = async () => {
        try {
            const response = await fetchData();

            target.forEach(e => {
                if (target2 === 'som') {
                    e.value = (elem.value / response[e.id]).toFixed(2);
                } else if (e === som) {
                    e.value = (elem.value * response[elem.id]).toFixed(2);
                } else {
                    e.value = ((elem.value * response[elem.id]) / response[e.id]).toFixed(2);
                }
            });

            if (elem.value === '') {
                target.forEach(e => e.value = '');
                elem.value === '' && (target.forEach(e => e.value = ''));
            }
        } catch (error) {
            console.error("Conversion error:", error);
        }
    };
};

convert(som, [usd, eur]);
convert(usd, [som, eur]);
convert(eur, [som, usd]);

//CARD SWITCHER

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let cardId = 1



const fetchDataAsyncCardSwitcher=async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
    const data = await response.json();
    cardBlock.innerHTML = `
        <span>${data.id}</span>
    `
}
btnNext.onclick = (event) => {
    if(cardId++ && cardId >= 201 ) {
        cardId =1
    }
    fetchDataAsyncCardSwitcher()

}
btnPrev.onclick = (event) => {
    if (cardId-- && cardId === 0) {
        cardId =200
    }
    fetchDataAsyncCardSwitcher()
}




fetchDataAsyncCardSwitcher()


const fetchTwo = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await response.json();
    console.log(data);
}

fetchTwo()

// // WEATHER



const inputSearch =  document.querySelector('.cityName');
const searchBtn = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const weatherBlock = document.querySelector('#weather_block')

const API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'appid=e417df62e04d3b1b111abeab19cea714'

searchBtn.onclick = () => {
    fetch(`${API}?${API_KEY}&q=${inputSearch.value}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            city.innerHTML = data.name || 'Город не найден...'
            temp.innerHTML = data.main?.temp?  Math.round(data.main?.temp) + '&deg;C' : '(●\'◡\'●)'
            weatherBlock.src = `http://api.openweathermap.org/img/wn/${data.weather[0].icon}.png`

        })
    inputSearch.value = ''
}

