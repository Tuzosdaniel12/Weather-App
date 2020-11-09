//add auto fill to cities text box
var cities = $('#cities');
var btnCities = $('#btn-search');

var state = "washington"

///===================AUTO TAGS=======================
var citiesTags = [
      
];

cities.autocomplete({
      source: citiesTags
});
//=================SEARCH CITY FUNCTION===============
function searchCity(e){
    e.preventDefault();
    //get the value of the city
    var city = cities.val().toLowerCase();

    console.log("HIT");
    var APIKey = "32cb77893648df67d6826f666fc7871c";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}




//add a click event to cities to get cities info and call a display function
//each display is going to have a button to be able to  change display from response   
//
//==================EVENT LISTENERS====================

cities.on('submit', searchCity);
btnCities.on('click', searchCity);