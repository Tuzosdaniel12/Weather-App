

function weatherByUSerLocation(){
    if (navigator.geolocation) {
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(findUserPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function findUserPosition(position){
    lat = position.coords.latitude;
    lon =position.coords.longitude;

    var APIKey = "32cb77893648df67d6826f666fc7871c";
    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+ APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var city = response.city.name.toLowerCase();
        getWeather(city);
    });

    
}
weatherByUSerLocation();


