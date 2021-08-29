document.getElementById('input-button').addEventListener('click', function () {
    const inputDisplayText = document.getElementById('input-display');
    let inputDisplay = inputDisplayText.value;
    inputDisplayText.value = '';
    //check condition input box value 
    if (inputDisplay == '') {
        errorDisplay();
    }
    //call api
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputDisplay}&appid=9918380ff1947e429635ead63fd04518`)
            .then(res => res.json())
            .then(data => getWeather(data));
    }
})

// error message in case no nothe write in the input 
const errorDisplay = () => {
    console.log('hello');
    const displayWeather = document.getElementById('display-weather');
    displayWeather.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <h4 class="text-danger">Please Write a city name</h4>
        `
    displayWeather.appendChild(div);

}

const getWeather = (data) => {
    const displayWeather = document.getElementById('display-weather');
    displayWeather.textContent = '';
    // error message in case invalid input
    if (data.cod == "404") {
        const div = document.createElement('div');
        div.innerHTML = `
        <h4 class="text-danger">input a valid city name</h4>
        `
        displayWeather.appendChild(div);
    }
    else {
        const div = document.createElement('div');
        div.innerHTML = `
        <h1>${data.name}</h1>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        <h2>${data.weather[0].main}</h2>
        <h2>${getTemp(data.main.temp)} °C</h2>
        `
        displayWeather.appendChild(div);
    }
}
//convert the value from kelvin to celcius
const getTemp = (temp) => (temp - 273.15).toFixed(2);