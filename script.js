

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (
                entry.isIntersecting &&
                !entry.target.classList.contains('show')
            ) {
                entry.target.classList.add("visibleTransition", "show");
            }
        });
    });

    const hTransitions = document.querySelectorAll('.hiddenTransition');
    hTransitions.forEach(hTransition => {
        observer.observe(hTransition);
    });
    
    function showOnScreen(data) {
        const city = document.querySelector('.city');
        let weatherIcon = document.querySelector('.weatherIcon');
        let temp = document.querySelector('.temp');
        let description = document.querySelector('.description');
    
        document.querySelector('.humidityText').innerHTML = `Umidade: ${data.main.humidity}%`;
        city.innerHTML = `Tempo em ${data.name}`;
        temp.innerHTML = Math.floor(data.main.temp) + "°C";
        description.innerHTML = data.weather[0].description;
    
        const now = new Date();
        const hours = now.getHours();
    
        if (data.weather[0].description === "algumas nuvens") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4814/4814293.png";
        } else if (data.weather[0].description === "nublado") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1779/1779751.png";
        } else if (data.weather[0].description === "nuvens dispersas") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1779/1779754.png";
        } else if (data.weather[0].description === "céu limpo") {
            if (hours >= 18 || hours < 4) {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4735/4735038.png";
            }
        } else if (data.weather[0].description === "céu limpo") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/5904/5904053.png";
        } else if (data.weather[0].description === "chuva leve") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4735/4735072.png";
        } else {
            weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        }
        console.log(data);
        console.log(hours);
    }
    
    const timeOfDayStatus = document.querySelector('.timeOfDayStatus');
    const dateInfo = document.querySelector('.dateInfo');
    
    
    function updateDateTime() {
        const now = new Date();
        const hours = now.getHours();
        const datePart = now.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timePart = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
        const dateTime = `${datePart} ${timePart}`;
        dateInfo.innerHTML = dateTime;
    
        if (hours >= 18) {
            timeOfDayStatus.innerHTML = `Boa Noite!`;
        } else if (hours >= 12) {
            timeOfDayStatus.innerHTML = `Boa Tarde!`;
        } else if (hours >= 3) {
            timeOfDayStatus.innerHTML = `Bom Dia!`;
        } else {
            timeOfDayStatus.innerHTML = `Boa Madrugada!`;
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    let key = "807b807190283b8bbf44326c1227677a";
    
    async function searchCity(theCity) {
        let data = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + theCity + "&appid=" + key + "&lang=pt_br" + "&units=metric").then(
            (answer => answer.json())
        )
    
        showOnScreen(data);
    }

const wholeLoader = document.querySelector('.wholeLoader');


document.querySelector('.searchIcon').addEventListener('click', function searched(){
    let cityInput = document.querySelector('.cityInput').value;
    wholeLoader.classList.remove('hidden');

    setTimeout (function(){
        searchCity(cityInput);
    }, 800)

    setTimeout(function(){
        wholeLoader.classList.add('hidden');
    }, 1000)
})

document.querySelectorAll('.noTranslate').forEach(noTranslates => {
    noTranslates.setAttribute("translate", "no")
});

const dkBtn = document.querySelector('.dkBtn');
const body = document.querySelector('body');
const mainContent = document.querySelector('.mainContent');

dkBtn.addEventListener('click', ()=> {
    dkBtn.classList.toggle('darkMode');
    body.classList.toggle('darkMode');
    mainContent.classList.toggle('darkMode');
})














   






