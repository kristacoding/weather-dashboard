# Weather Dashboard

## Overview 
This is a weather dashboard that runs in the browser using the Open Weather Map (https://openweathermap.org/), dynamically updated HTML, CSS, and JQuery. It provides you the current weather and a five-day forecast based on the cities you search for. Additionally, it saves your previous searches and allows you to click them to easily search again. 
 
## Description 
 
URL: https://kristacoding.github.io/weather-dashboard/ 
 
The first step to creating the weather dashboard was to build an HTML outline that matched the image given. The most important element was building the search bar, and having a variable be associated with the input. Using JQuery, I was able to capture that element, searchCity, and use it throughout the code. Second, I set up an initial element, in this code it was a <div>, to append the following code. 
 
After the basic HTML was set up, I added Bootstrap CSS to create a clear and user-friendly dashboard. My header is the jumbotron component and uses Moment.js, which was used in the Day Planner, to provide the exact date and time for the user. Next, I created two <div>s for the current weather and five-day forecast. Each element was then appended to the corresponding location to present the correct information. 
 
To gather the information needed to show on the dashboard, I created my own Open Weather Map API. Then reading and understanding the correct documentation for each element, I pulled the corresponding calls. Such as, to call the temperature of the city, I called response.main.temp. To call the same elements, but for the five-day forecast, I created a loop and had 'i' be the change for each day. There was a little difficultly because you have to call another Open Map Weather API that provides 5 day/3 hour updates. Because of this, I had set the time to '15:00:00' to get the information for 3 PM each day. Afterward, I followed the same format to call the elements as I did for the current day, but added [i] for day change. An example call was response.list[i].main.temp. 
 
To get the image of the weather to show next to the name, I had to take a few additional steps. Open Weather Map provides a variable of a string such as '01d'. This new variable then needs to be added to a URL to show it into the page. 
 
The final step to completing this project was adding Local Storage. The Local Storage is set up to grab all the cities that have been previously entered and have them appear each time you go to the page. I created a variable that holds all the cities in an array then pulls from that array each time the user goes to the page. Local Storage is used twice throughout the javascript, in the beginning, to set the item to the array and at the bottom to pull the items from the array. 


## Tools 
JQuery
HTML
CSS
Moment.JS
Open Weather Maps 
Bootstrap

## Picture

<img src="https://mdxe1g.dm.files.1drv.com/y4mcMZ9GydibzxcMV-_YQMq1sFFpaHFCsDNUc2E7c25conFm5Xaq30-SRhWiooZes6OxGolxwHpqKr2daWwx1dzZwBFQ220OIWOp7V0Eg7p0aKSOeYgRvpqKwb81-C0VgKbaqJF_Sny6ljOqhY11lNfjnU19Q_XJ0gwgTWxEb-5pa99FO_B4sZN_s0ixkTdce7Js45d5juS4a3PiVIP67wveQ?width=1266&height=866&cropmode=none">


