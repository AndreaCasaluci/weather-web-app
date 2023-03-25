const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
let lastCountryISO;
search.addEventListener('click', ()=>{
    const APIKey='2a3e748a288959cde4f511b76fa790b0';
    const city=document.querySelector('.search-box input').value;
    if(flag.classList.length!=0){
        flag.classList.remove("fi");
        flag.classList.remove("fi-"+lastCountryISO.toLowerCase());
    }
    if(city === '')
        return;
    let country;
    let lat;
    let lon;
    let capitalizedCity=city.toUpperCase()[0]+city.slice(1);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${capitalizedCity}&limit=1&appid=${APIKey}`).then(response => response.json()).then(city => {
        if(city.length===0){
            container.style.height='400px';
            weatherBox.style.display='none';
            weatherDetails.style.display='none';
            error404.style.display='block';
            error404.classList.add('fadeIn');
            return;
        }
        lat=city[0].lat;
        lon=city[0].lon;
        countryISOcode=city[0].country;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`).then(response => response.json()).then(json => {
        if(json.cod === '404'){
            container.style.height='400px';
            weatherBox.style.display='none';
            weatherDetails.style.display='none';
            error404.style.display='block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display='none';
        error404.classList.remove('fadeIn');

        const image=document.querySelector('.weather-box img');
        const temperature=document.querySelector('.weather-box .temperature');
        const description=document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const wind=document.querySelector('.weather-details .wind span'); 
        const flag=document.getElementById("flag");
        switch(json.weather[0].main){
            case 'Clear':
                image.src='images/clear.png';
                break;
            case 'Rain':
                image.src='images/rain.png';
                break;
            case 'Snow':
                image.src='images/snow.png';
                break;
            case 'Clouds':
                image.src='images/cloud.png';
                break;
            case 'Mist':
                image.src='images/mist.png';
                break;
            default:
                image.src='';
        }
        celsiusTemp=json.main.temp-273,15;
        temperature.innerHTML=`<img class="temp-icon" src="temperature-icon.svg">${parseInt(celsiusTemp)}<span>°C</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
        flag.classList.add("fi");
        flag.classList.add("fi-"+countryISOcode.toLowerCase());
        weatherBox.style.display='';
        weatherDetails.style.display='';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height='590px';
        lastCountryISO=countryISOcode;
    })
    })
})