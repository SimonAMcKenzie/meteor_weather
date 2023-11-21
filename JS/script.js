// Add your own API key between the ""
var APIKey = "cbc3f07c8da16c48fc5c1d34a8198cfa";
// Here we are building the URL we need to query the database
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


// Have a header with a H1 titles, and with a background color gradient of sky blue to dark blue
$('header').css({"background-color":"linear-gradient(to right, sky blue, dark blue, ...);"});
console.log('header')
// Searh will pull data from 

// We then created an Fetch call
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(data);
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    
    var celsius = (data.main.temp - 273.15).toFixed(2);
    console.log(celsius);
    // Create CODE HERE to transfer content to HTML
    // Hint: To convert from Kelvin to Celsius: C = K - 273.15
    // Create CODE HERE to dump the temperature content into HTML
    $(".temp").text(celsius);
    $(".city").text(data.name);
    $("wind").text(data.wind.speed);
    $(".humidity").text(data.main.humidity)
  });