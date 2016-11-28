//current location widget using dark skies

//peak power widget

//image URL?

//Solar Endge, DarkSky, sky png photos

var APIKey = "544d5f13117d948633ac2e150d9197a1";

var queryURL = "https://api.darksky.net/forecast/544d5f13117d948633ac2e150d9197a1/37.8267,-122.4233" + APIKey;

$.ajax({url: queryURL, method: 'GET'})

.done(function(response){
      // Log the queryURL
    console.log(queryURL);

      // Log the resulting object
    console.log(response);	

      // Transfer content to HTML
    $('.city').html("<h1>Bujumbura Weather Details</h1>");
    $(".wind").html("Wind Speed: " + response.wind.speed);
    $(".humidity").html("Humidity: " + response.main.humidity);
    $(".temp").html("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    }); 




