//add auto fill to cities text box
var citiesEl = $('#cities');
var btnCities = $('#btn-search');
var cityListEL = $('#cities-list');
var cityInfoEl = $('#city-info');
var forecastEl = $('#forecast');

var cities  = [];
var lastCityDisplay;

citiesEl.autocomplete({
      source: citiesTags
});

//=================SEARCH CITY FUNCTION===============
function searchCity(e){
    e.preventDefault();
    //get the value of the city
    var city = citiesEl.val().toLowerCase();

    var APIKey = "32cb77893648df67d6826f666fc7871c";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var cityName = response.city.name;
        var cityHum = [];
        var cityTemp = [];
        var cityIcon = [];
        var citySpeed = [];
        var cityDate = [];
 
        

        if(checkDoubleSearchCity(cityName)){
            alert('You already picked this city');
            return};
        
        for(var i = 0; i < 5; i++){
            //console.log("hit");
            cityHum.push(response.list[i].main.humidity);
            cityTemp.push(toFahrenheit(response.list[i].main.temp));
            cityIcon.push("http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
            citySpeed.push(response.list[i].wind.speed);
            cityDate.push(date(i));
            //console.log(cityHum[i]);
            //console.log("hit");
        }

        

        setToLocalStorage(cityName, cityHum, cityTemp, cityIcon, citySpeed,cityDate);
        //console.log(cityName);
        displayCityList();
        displayCityInfo(cityName);
        displayForecast(cityName);
        
    });
}
//==============DISPLAY CITY FUNCTION===============
function displayCityList(){
    cityListEL.empty();

    var jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    for( var i = 0; i < jsonCitiesArray.length; i++){
        var cityTitle = $('<li>').addClass('list-group-item')
                                 .attr('data-city', jsonCitiesArray[i].cityName)
                                 .attr('data-index', i)
                                 .text(jsonCitiesArray[i].cityName);
        cityListEL.prepend(cityTitle);
    } 
}
//=================DISPLAY HISTORY CITY===============
function cityHistoryEvent(e){
    e.preventDefault();
    console.log("hit");
    console.log($(e.target).data('city'));
    displayCityInfo($(e.target).data('city'));
    displayForecast($(e.target).data('city'));
    lastCityDisplay = parseInt($(e.target).data('index'));

    localStorage.setItem('lastCityDisplay', JSON.stringify(lastCityDisplay));
    
    
}

//=================DISPLAY CITY INFO===============
function displayCityInfo(city){
    console.log("hit");
    cityInfoEl.empty();

    var jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    for( var i = 0; i < jsonCitiesArray.length; i++){
        if(jsonCitiesArray[i].cityName === city){
            var title = $("<h3>").text(jsonCitiesArray[i].cityName + " " +"(" +jsonCitiesArray[i].cityDate[0]+")");
            var temp = $("<p>").text("Temperature: "+ jsonCitiesArray[i].cityTemp[0] + " F");
            var hum = $("<p>").text("Humidity: "+ jsonCitiesArray[i].cityHum[0] + "%");
            var windSpeed = $('<p>').text("Wind Speed: " + jsonCitiesArray[i].citySpeed[0] + " MPH");
            var icon = $('<img>').attr('src', jsonCitiesArray[i].cityIcon[0]);
        }
        
        //title.append(icon);
        cityInfoEl.append(title,temp,hum, windSpeed, icon);
    }
}
//=================DISPLAY 5 Day FORECAST===============
function displayForecast(city){
    forecastEl.empty();
    var jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    for( var i = 0; i < jsonCitiesArray.length; i++){
        if(jsonCitiesArray[i].cityName === city){
            for( var j = 0; j < 5; j++){
                var forecastDiv = $('<div>').addClass('col-12 col-sm-12 col-lg bg-primary rounded ml-3 mb-3');
                var dateEl = $('<h4>').text(jsonCitiesArray[i].cityDate[j]);
                var iconEl = $('<img>').attr('src',jsonCitiesArray[i].cityIcon[j]);
                var tempEl = $('<p>').text("Temp: "+jsonCitiesArray[i].cityTemp[j]+ "F");
                var humEl = $('<p>').text("Humidity: "+jsonCitiesArray[i].cityHum[j]+"%");

                forecastDiv.append(dateEl,iconEl,tempEl,humEl);
                forecastEl.append(forecastDiv);
            }
        }
    }

}

//=================SET DATA TO lOCAL STORAGE===============
function setToLocalStorage(cityName, cityHum, cityTemp, cityIcon, citySpeed,cityDate){
    
    if(getDataFromLocalStorage() !== null){
        cities = getDataFromLocalStorage();
        console.log(cities);
    }
    cities.push({ cityName:cityName,
                  cityHum:cityHum,
                  cityTemp:cityTemp,
                  cityIcon: cityIcon,
                  citySpeed: citySpeed,
                  cityDate: cityDate,      
    });
    localStorage.setItem('allTheCitiesSearchedFor', JSON.stringify(cities));
}
//=================TO FAHRENHEIT============================
function toFahrenheit(temp){
    return Math.round((parseInt(temp) - 273.15) * 1.8 + 32);
}
//=========================DATE============================
function date(num){
    return moment().add(num,'days').format("MM/DD/YYYY");
}
//=========================GET============================
function getDataFromLocalStorage(){
    return JSON.parse(localStorage.getItem('allTheCitiesSearchedFor'));
}

//===================CHECK DOUBLE SEARCHED CITIES=====================
function checkDoubleSearchCity(city){
    var jsonCitiesArray = getDataFromLocalStorage();
    if(jsonCitiesArray == null){return};
    var count = 0;
    for( var i = 0; i < jsonCitiesArray.length; i++){
        if(jsonCitiesArray[i].cityName == city){
            count++;
        }
        
    }
    if(count === 0){
        return false;
    }
    else{
        return true;
    }
}

//add a click event to cities to get cities info and call a display function
//each display is going to have a button to be able to  change display from response   
//

displayCityList();

if (JSON.parse(localStorage.getItem('lastCityDisplay')) !== null){
var get = getDataFromLocalStorage();
lastCityDisplay = JSON.parse(localStorage.getItem('lastCityDisplay'));
displayCityInfo(get[lastCityDisplay].cityName);
displayForecast(get[lastCityDisplay].cityName);
}
//==================EVENT LISTENERS====================

citiesEl.on('submit', searchCity);
btnCities.on('click', searchCity);
cityListEL.on('click', cityHistoryEvent);
