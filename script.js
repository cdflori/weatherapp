let cities = [];
let currentDate = moment().format('MM/DD/YYYY');


// Create an on click event to place the user search city input in local storage

$("#button-addon2").on("click", function (event) {
    let citySearch = $("#citySearch").val().trim();
    localStorage.setItem("city", citySearch);
    cities.push(citySearch);

    currentWeather();

    // Have entered cities be displayed on page. Creating a card holder for them

    let cityDisplay = $("<div>")
    cityDisplay.text(citySearch);
    cityDisplay.addClass("card card-body");
    $("#cities").prepend(cityDisplay);

});

// call for initial function of code
renderWeather();

// calling functions to display info lying in local storage

function renderWeather() {
    currentWeather();
    weeklyWeather();
};

function currentWeather() {

    let apiKey = "484a76af3afbc1a80eea350315a814e7";
    // grabbing city input from local storage
    let city = localStorage.getItem("city");

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // ajax call for current city weather
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            //converting the pulled temp to fahrenheit
            let temp = (response.main.temp - 273.15) * 1.80 + 32;

            $("#city").html("<h4>" + response.name + " " + currentDate + '</h4>');

            console.log(queryURL)
            console.log(response)

            $("#temp").text("Temperature (F) | " + temp.toFixed(2));
            $("#humidity").text("Humidity | " + response.main.humidity + " % ");
            $("#wind").text("Humidity | " + response.wind.speed + " mph ");

            // created variable to grab the longitude and latitude of city location
            let long = response.coord.lon;
            let lat = response.coord.lat;

            let uvIndexQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + long;

            // ajax call for UV index
            $.ajax({

                url: uvIndexQuery,
                method: "GET"

            })
                // created an if else function to display UV levels and assigned color containers for uv values
                .then(function (uv) {

                    if (uv.value < 3) {
                        $("#uv").html("UV Index: " + "<span id='low'>" + uv.value + "<span>");
                    }
                    if (uv.value < 5) {
                        $("#uv").html("UV Index: " + "<span id='moderate'>" + uv.value + "<span>");
                    }
                    if (uv.value < 7) {
                        $("#uv").html("UV Index: " + "<span id='high'>" + uv.value + "<span>");
                    }
                    if (uv.value < 10) {
                        $("#uv").html("UV Index: " + "<span id='very-high'>" + uv.value + "<span>");
                    }
                    else {
                        $("#uv").html("UV Index: " + "<span id='extreme'>" + uv.value + "<span>");
                    }
                })

            console.log(uv)
            console.log(uv.value)

        });


};

// This portion was working above until I started the portion below. I am not exactly sure what went on?


// Creating a function to display the current Weather
function currentWeather() {

    // Listing out variable for the apiKey to simplify query search
    let apiKey = "484a76af3afbc1a80eea350315a814e7";
    let city = localStorage.getItem("city");

    let forecastQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // ajax call to grab forecast data
    $.ajax({
        url: forecastQuery,
        method: "GET"
    })

        .then(function (weekly) {
            console.log(weekly);

        })

    let list = weekly.list;
    console.log(list)
    $("#forecast").empty()

    // Creating a for loop to grab every 8th element of days and hours then appending them to forecast div

    for (let i = 0; i < list.length; i += 8) {

        let weeklyDate = list[i].dt_txt.split(" ")[0];
        let tempDiv = list[i].main.temp;
        let imgDiv = list[i].weather[0].icon;
        let humDiv = list[i].main.humidity;

        let divOne = $("<h5 class='card-title'>" + weeklyDate + '</h5>');
        $("#forecast").append(divOne)

        let divTwo = $("<img alt='weather icon' src='http://openweathermap.org/img/wn/'" + imgDiv + '@2x.png/' > + '</img>/');
        $("#forecast").append(divTwo)

        let divThree = $("<p class='card-text'> Temperature: " + tempDiv + "" + '&#176; F' + '</p>');
        $("#forecast").append(divThree)

        let divFour = $("<p class='card-text'> Humidity: " + humDiv + "" + '%' + '</p>');
        $("#forecast").append(divFour)


        console.log(forecastQuery)

    }
};






