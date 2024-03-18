async function getData (){
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=17734347de2045a883d131108240503&q=${city.value}`, {mode: 'cors'});
        const data = await response.json();
        const climate = {
            temp:`${data.current.temp_c}°C`,
            cond: data.current.condition.text,
            feelsLike:`Feels like ${data.current.feelslike_c}°C`,
            humidity:`Humidity ${data.current.humidity}%`,
            wind:`Wind ${data.current.wind_kph}km/h`,
            country:`${data.location.country}`,
            city:`${data.location.name},`,
            gif:undefined
        }
        let gif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=vuBvVssq0Vs6mfPw24qtTjT1aG1HOvgu&s=${climate.cond}`, {mode: 'cors'})
        let gifData = await gif.json()
        climate.gif = gifData.data.images.original.url;
        console.log(climate.gif);
        title.textContent = '';
        container.style.justifyContent = 'normal';
        logo.classList.add('show')
        weatherVisuals(climate);
    } catch (error) {
        alert(`${error}, Try again!`)
    }
    
}

function weatherVisuals (obj) {
    result.textContent = '';
    if (obj.cond === 'Partly cloudy' || obj.cond ==='Cloudy' || obj.cond ==='Overcast' || obj.cond ==='Rainy') {
        body.classList.remove('sunny');
        body.classList.add('cloudy');
    } else if ( obj.cond === 'Sunny' || obj.cond === 'Clear') {
        body.classList.remove('cloudy');
        body.classList.add('sunny')
    }
    // Decoration Line
    let line = document.createElement('div');
    line.classList.add('line');
    container.insertBefore(line, result)

    //Temperature and location
    let temp = document.createElement('div');
    temp.classList.add('temp');
    
    let city = document.createElement('h3');
    city.textContent = obj.city;
    temp.appendChild(city);

    let country = document.createElement('h3');
    country.textContent = obj.country;
    temp.appendChild(country);

    let tempNum = document.createElement('div');
    tempNum.classList.add('tempnum');
    tempNum.textContent = obj.temp;
    temp.appendChild(tempNum);

    let feelsLike = document.createElement('h4');
    feelsLike.classList.add('feelsLike');
    feelsLike.textContent = obj.feelsLike;
    temp.appendChild(feelsLike);
    
    result.appendChild(temp)


    // Decoration line 2
    let line2 = document.createElement('div');
    line2.classList.add('line2');
    result.appendChild(line2);

    //Condition and stats
    let stats = document.createElement('div');
    stats.classList.add('stats');

    let cond = document.createElement('h3');
    cond.classList.add('cond')
    cond.textContent = `${obj.cond}`
    stats.appendChild(cond);

    let condImg = document.createElement('div');
    condImg.classList.add('cond-img');
    stats.appendChild(condImg);

    let gif = document.createElement('img');
    gif.src = obj.gif;
    gif.alt = 'current condition';
    condImg.appendChild(gif);

    let substats = document.createElement('div');
    substats.classList.add('substats');
    stats.appendChild(substats);

    let humidity = document.createElement('h4');
    humidity.textContent = obj.humidity;
    substats.appendChild(humidity);

    let wind = document.createElement('h4');
    wind.textContent = obj.wind;
    substats.appendChild(wind);

    
    result.appendChild(stats);
}

const body = document.querySelector('body')
const title = document.querySelector('h1');
const logo = document.querySelector('h2');
const city = document.getElementById('city');
const search = document.getElementById('search');
const container = document.getElementsByClassName('container')[0];
const result = document.getElementsByClassName('result')[0];

search.addEventListener('click', ()=> {
    title.classList.add('hide');
    getData();
});