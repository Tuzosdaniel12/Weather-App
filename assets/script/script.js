//add auto fill to cities text box
const citiesEl = $('#cities');
const btnCities = $('#btn-search');
const cityListEL = $('#cities-list');
const cityInfoEl = $('#city-info');
const forecastEl = $('#forecast');

let lastCityDisplay;

citiesEl.autocomplete({
      source: citiesTags
});

//=================SEARCH CITY FUNCTION===============
 searchCity = e =>{
    e.preventDefault();
    //get the value of the city
    var city = citiesEl.val().toLowerCase();
    getWeather(city);
}

//=================WEATHER API FUNCTION===============
getWeather = (city) =>{
    const APIKey = "32cb77893648df67d6826f666fc7871c";
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        findUvIndex(response.city.coord.lat, response.city.coord.lon, response);
    });
}

//================= SET UV  INDEX============================
findUvIndex = (lat, lon, object) => {
    var APIKey = "32cb77893648df67d6826f666fc7871c";
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+lon +"&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var value = response.value;
        console.log("UVINDEX: "+value);
        firstResponse(object,value);
    });
    
}
//=================GET CITY RESPONSE AND SET DATA=====================
firstResponse = (object,value) =>{
    let cityName = object.city.name;
    let cityHum = [];
    let cityTemp = [];
    let cityIcon = [];
    let citySpeed = [];
    let cityDate = [];
    console.log(object)
    
    for(let i = 0; i < 5; i++){
        //console.log("hit");
        cityHum.push(object.list[i].main.humidity);
        cityTemp.push(toFahrenheit(object.list[i].main.temp));
        cityIcon.push("http://openweathermap.org/img/w/" + object.list[i].weather[0].icon + ".png");
        citySpeed.push(object.list[i].wind.speed);
        cityDate.push(date(i));
    }

    setToLocalStorage(cityName);

    lastCityDisplay = cityName;
    localStorage.setItem('lastCityDisplay', JSON.stringify(lastCityDisplay));

    displayCityList();
    displayCityInfo(cityName, cityHum, cityTemp, cityIcon, citySpeed,cityDate, value);
    displayForecast(cityHum, cityTemp, cityIcon, cityDate);

    lastCityDisplay = cityName;
    localStorage.setItem('lastCityDisplay', JSON.stringify(lastCityDisplay));
}

//==============DISPLAY CITY FUNCTION===============
displayCityList = () => {
    cityListEL.empty();

    let jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    for( let i = 0; i < jsonCitiesArray.length; i++){
        let cityTitle = $('<li>').addClass('list-group-item')
                                 .attr('data-city', jsonCitiesArray[i])
                                 .attr('data-index', i)
                                 .text(jsonCitiesArray[i]);
        cityListEL.prepend(cityTitle);
    } 
}
//=================DISPLAY HISTORY CITY===============
cityHistoryEvent = e =>{
    e.preventDefault();
    let city = $(e.target).data('city').toLowerCase()
    getWeather(city);
   
    lastCityDisplay = $(e.target).data('city');

    localStorage.setItem('lastCityDisplay', JSON.stringify(lastCityDisplay));
}

//=================DISPLAY CITY INFO===============
displayCityInfo = (cityName, cityHum, cityTemp, cityIcon, citySpeed,cityDate, uvIndex) =>{
    //console.log("hit");
        cityInfoEl.empty();
            const title = $("<h3>").text(cityName + " " +"(" +cityDate[0]+")");
            const temp = $("<p>").text("Temperature: "+cityTemp[0] + " F");
            const hum = $("<p>").text("Humidity: "+ cityHum[0] + "%");
            const windSpeed = $('<p>').text("Wind Speed: " + citySpeed[0] + " MPH");
            const icon = $('<img>').attr('src', cityIcon[0]);  
            const uv = $('<p>').text("UV Index: "+ uvIndex).addClass(checkUVIndexValue(uvIndex));        
        //title.append(icon);
            cityInfoEl.append(title,temp,hum, windSpeed, icon, uv);

}
//=================DISPLAY 5 Day FORECAST===============
displayForecast = (cityHum, cityTemp, cityIcon, cityDate) =>{
    forecastEl.empty();
    for( let j = 0; j < 5; j++){
        const forecastDiv = $('<div>').addClass('col-12 col-md-2  bg-primary rounded ml-3 mb-3');
        const dateEl = $('<h6>').text(cityDate[j]);
        const iconEl = $('<img>').attr('src',cityIcon[j]);
        const tempEl = $('<p>').text("Temp: "+cityTemp[j]+ "F");
        const humEl = $('<p>').text("Humidity: "+cityHum[j]+"%");

        forecastDiv.append(dateEl,iconEl,tempEl,humEl);
        forecastEl.append(forecastDiv);
        }


}

//=================SET DATA TO lOCAL STORAGE===============
function setToLocalStorage(cityName){
    let cities  = [];

    if(getDataFromLocalStorage() !== null){
        cities = getDataFromLocalStorage();
        console.log(cities);
    }
    if(checkDoubleSearchCity(cityName)){return};
    cities.push(cityName);

    localStorage.setItem('allTheCitiesSearchedFor', JSON.stringify(cities));
}

//=================TO FAHRENHEIT============================
toFahrenheit = temp => Math.round((parseInt(temp) - 273.15) * 1.8 + 32);

//=========================DATE============================
date = num => moment().add(num,'days').format("MM/DD/YYYY");

//=========================GET============================
getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('allTheCitiesSearchedFor'));

//===================CHECK DOUBLE SEARCHED CITIES=====================
checkDoubleSearchCity = city =>{
    let jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    if(jsonCitiesArray.includes(city)){
        return  true
    }
    else{
        return false;
    }
}



//=============================CHECK UV INDEX=======================
 checkUVIndexValue = index =>{
    index = parseInt(index);
    if(index < 3){
        return " styleUV-index green";
    }
    else if(index >=3 && index <= 5)
    {
        return "styleUV-index yellow";
    }
    else if(index >=6 && index <= 7)
    {
        return "styleUV-index orange";
    }
    else 
    {
        return "styleUV-index red";
    }
}
//add a click event to cities to get cities info and call a display function
//each display is going to have a button to be able to  change display from response   
//
//=============================DISPLAY LAST CITY IF NO GEOLOCATION=======================
displayLastCity = () =>{
    if (JSON.parse(localStorage.getItem('lastCityDisplay')) !== null){
    var get = getDataFromLocalStorage();
    lastCityDisplay = JSON.parse(localStorage.getItem('lastCityDisplay'));
    //console.log(lastCityDisplay);
    getWeather(lastCityDisplay.toLowerCase());
    }
}

displayCityList();
displayLastCity();


//==================EVENT LISTENERS====================

citiesEl.on('submit', searchCity);
btnCities.on('click', searchCity);
cityListEL.on('click', cityHistoryEvent);
