
  (function() {
    // This is our API Key
    var APIKey = "08f926d9d006e2fa168e83287a7a5c95",
      crossOrg = "https://crossorigin.me/",
      inputTime = 'Nov. 27, 2016';
    var startTime, endTime, unixTime;
    // Time conversions for APIS
    startTime = parseInt((formatDate(inputTime) + '0000'));
    endTime = parseInt((formatDate(inputTime) + '2300'));
    unixTime = Date.parse(inputTime) / 1000;
    console.log(startTime, endTime, unixTime);
    // Here we are building the URL we need to query the databases
    var queryURL = crossOrg + "https://api.darksky.net/forecast/" + APIKey + "/41.9362832,-87.647056," + unixTime;
    var queryURL2 = crossOrg + "https://hourlypricing.comed.com/api?type=5minutefeed&datestart=" + startTime + "&dateend=" + endTime;
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
          // ternary expression
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
        console.table(data);
      });
  })();
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
  }
