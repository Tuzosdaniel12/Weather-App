# Weather-App

- [Task](#Task)
- [User Expectation](#User-Expectation)
- [User Story](#User-Story)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Process](#Process)
- [Work Examples](#Work-Examples)
- [Links](#Links)

## Task

- Create a Weather app that can fetch data from weather api and render data back to the user, Temperature, Humidity, Wind speed ,UV Index, City Name and five day forecast.

## User-Expectation

![weather dashboard demo](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/06-server-side-apis-homework-demo.png)

## User-Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## Process

- Started with simple index html and added style to page by using bootstrap framework
- Continue by adding appropriate id so I can target html elements on my script file
- focus on the search button event lister, and added to auto fill feature so it can help user search cities
- after user enter city, the city name was used a key to retrieve initial data.
- used lon and lat of the city to then get another call to get the uv index out.
- When I got all data saved in a variable I then pasted in to local storage to be stored
- continue by calling the display functions to render data back to user
- Added click event to history list on left to fetch the data and render back
- Added geolocation feature to app as well

## Work-Examples
![weather-code](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/work-01.png)
![weather-code](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/work-02.png)
![weather-code](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/work-03.png)
![weather-code](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/work-04.png)
![weather-code](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/work-05.png)
![weather-code](https://github.com/Tuzosdaniel12/Weather-App/blob/main/assets/images/work-06.png)

## Links

- Live Website
  https://tuzosdaniel12.github.io/Weather-App

- Repo
  https://github.com/Tuzosdaniel12/Weather-App
