
(function() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQvZNPfQhdI-tbWGtM2ZJVf--LsyGiwWs",
    authDomain: "solardisplay-1479576622418.firebaseapp.com",
    databaseURL: "https://solardisplay-1479576622418.firebaseio.com",
    storageBucket: "solardisplay-1479576622418.appspot.com",
    messagingSenderId: "479231386655"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().once("value", function(snapshot) {

    // Get date from Firebase
    var inputTime = (snapshot.val().apidate);

    console.log('Time: ', inputTime);

    // This is our API Key
    var dsAPIKey = "08f926d9d006e2fa168e83287a7a5c95",
      crossOrg = "https://crossorigin.me/";

    // Time variables for table
    var startTime, endTime, unixTime;

    // String for table
    var buildString = '<caption>' + inputTime + '</caption><tr><th>Price</th><th>Time</th><th>Temp</th><th>Summary</th></tr>';

    startTime = parseInt((formatDate(inputTime) + '0000'));
    endTime = parseInt((formatDate(inputTime) + '2300'));
    unixTime = Date.parse(inputTime) / 1000;
    console.log(startTime, endTime, unixTime);

    var queryURL = crossOrg + "https://api.darksky.net/forecast/" + dsAPIKey + "/41.9362832,-87.647056," + unixTime;
    var queryURL2 = crossOrg + "https://hourlypricing.comed.com/api?type=5minutefeed&datestart=" + startTime + "&dateend=" + endTime;

    // Save ajax calls into variables
    var testCall = $.ajax({
      url: queryURL,
      method: 'GET',
      crossDomain: true
    });
    var testCall2 = $.ajax({
      url: queryURL2,
      method: 'GET',
      crossDomain: true
    });
    // Ajax calls
    $.when(testCall, testCall2)
      // We store all of the retrieved data inside of an objects called "response" and "response2"
    .done(function(response, response2) {
      var weatherHours = response[0].hourly.data;
      var energyIntervals = JSON.parse(response2[0]);
      // create function that will take unix time and return energy price of that time
      var priceForTime = function(time) {
        time = String(time); // time stored in energyInterval is a string type
        // get the first energyInterval that has the time provided:
        var interval = energyIntervals.filter(function(energyInterval) {
          return energyInterval.millisUTC === time;
        })[0];
        // interval's price to a Number, not as string
        if (interval) {
          return Number(interval.price);
        }
      };
      // create new data array with hour, weather, temperature, and price
      var data = weatherHours.map(function(weatherHour) {
        return {
          hour: new Date(weatherHour.time * 1000).getHours(),
          weather: weatherHour.summary,
          temperature: weatherHour.temperature,
          price: priceForTime(weatherHour.time * 1000),
        };
      });
      console.log(data);

      for (i = 0; i < data.length; i++) {
        if (data[i].price != null) {
          buildString += '<tr><td>' + data[i].price +'</td>';
          buildString += '<td>' + data[i].hour + ':00</td><td>' + data[i].temperature.toFixed(1);
          buildString +=  '</td><td>' + data[i].weather + '</td></tr>';
        }
        // if time is not available display N/A
        else {
          buildString += '<tr><td>N/A</td>';
          buildString += '<td>' + data[i].hour + ':00</td><td>' + data[i].temperature.toFixed(1);
          buildString +=  '</td><td>' + data[i].weather + '</td></tr>';
        }
      }
     
      $('#weather').append( buildString );

    });
  // 
  }, function (errorObject) {
    // If db fails
      console.log("The read failed: " + errorObject.code);

  });
  
})();

// Convert time for api requirements
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('');
}