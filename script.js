import  key  from './config.js';


    
function showOnScreen(data){
    const city = document.querySelector('.city');
    let weatherIcon = document.querySelector('.weatherIcon');
    let temp = document.querySelector('.temp');
    let description = document.querySelector('.description');

    document.querySelector('.humidityText').innerHTML =`Umidade: ${data.main.humidity}%`
    city.innerHTML=`Tempo em ${data.name}`;
    temp.innerHTML= Math.floor(data.main.temp) + "°C";
    description.innerHTML = data.weather[0].description;
    
    if(data.weather[0].description === "algumas nuvens") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4814/4814293.png";
    } else if (data.weather[0].description === "nublado"){
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1779/1779751.png";
    } else if (data.weather[0].description === "nuvens dispersas"){
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/1779/1779754.png";
    } else if (data.weather[0].description === "céu limpo"){
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/5904/5904053.png";
    } else if (data.weather[0].description === "chuva leve"){
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/4735/4735072.png";
    } else {
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    }
    console.log(data)
}



async function searchCity(theCity){
    let data = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + theCity + "&appid=" + key + "&lang=pt_br" + "&units=metric").then(
        (answer => answer.json())
    )

    showOnScreen(data);
};

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

const timeOfDayStatus = document.querySelector('.timeOfDayStatus');
const dateInfo = document.querySelector('.dateInfo');

function updateDateTime() {
    const now = new Date();
    const datePart = now.toDateString(); 
    const timePart = now.toTimeString().split(' ')[0]; 

    const dateTime = `${datePart} ${timePart}`;
    dateInfo.innerHTML = dateTime;

    // Extrair a hora em formato numérico para comparação
    const hours = now.getHours();

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









   






