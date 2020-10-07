# Weather Dashboard

## Overview 
This is a weather dashboard that runs in the browser using the Open Weather Map (https://openweathermap.org/), dynamically updated HTML, CSS and JQuery. It provides you the current weather and a five day forecast based on the cities you search. Additionally, it saves your previous searches and allows you to click them to easily search again. 

## Description 

The first step to creating the weather dashboard was to build a HTML outline that matched the image given. The most important element was building the search bar, and having a variable be associated for the input. Using JQuery, I was able to capture that element, searchCity, and use it throughtout the code. Second, I set up an inital element, in this code it was a <div>, to append the following code. 

After the basic HTML was set up, I added Bootstrap CSS to create a clear and user friendly dashboard. My header is the jumbotron component and uses Moment.js, which was used in the Day Planner, to provide the exact date and time for the user. Next, I used two card components for the current weather and five day forecast. Each element was then appended to the corresponding element to create a card holding the correct information. 

To gather the information needed to show on the dashboard, I created my own Open Weather Map API. Then reading and understanding the correct documentation for each element, I pulled the corresponding calls. Such as, to call the temperature of the city, I called response.main.temp. To call the same elements, but for the five day forecast, I created a loop and had 'i' be the change in day. There was a little difficultly because you have to call another Open Map Weather API that provides 5 day/3 hour updates. Because of this, I had set the time to '15:00:00' to get the information for 3 PM each day. Afterwards, I followed the same format to call the elements as I did for the current day, but added [i] for day change. An example call was response.list[i].main.temp. 

To get the image of the weather to show next to the name, I had to take a few additioanl steps. Open Weather Map provides an element of a string such as '01d'. This element then needs to be added to a URL to show into the page. 

GIVEN a weather dashboard with form inputs

WHEN I search for a city (#searchCity)
THEN I am presented with current and future conditions for that city

When i press the search bar (onclick) i am presented iwth current and future conditions. 


and that city is added to the search history - local storage




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
