// provides id / address / siteimage...requires api key and id....
// unfortunately there is no way to get the id with only the api key
var solaredgeCallOne = function() {
    var siteID = "31596";
    var apiKey = "H7XOEZEP2D7TGM84OBM76SU75XIAPLTB";
    var parameter = "/details";
    var apiChain = "?";
    var queryURL = "https://monitoringapi.solaredge.com/site/" + siteID + parameter + apiChain + "api_key=" + apiKey;

    console.log("hello", queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET',
        crossDomain: true,
        dataType: 'json'
    }).done(function(response) {
        console.log("hello", response);
        var id = response.details.id
        console.log("hello", id);
        var address = response.details.location.address + ", " + response.details.location.city + ", " + response.details.location.state
        console.log("hello", address);
        var siteImage = "https://monitoringapi.solaredge.com/" + response.details.uris.SITE_IMAGE
        console.log("hello", siteImage);

    })
};

solaredgeCallOne();

// Returns array of values for a single day's hourly production in Wh. Needs transformation function.
var solaredgeCallTwo = function() {
    var searchTextInput = "Winchester"
    var siteID = "31596";
    var apiKey = "H7XOEZEP2D7TGM84OBM76SU75XIAPLTB";
    var parameter = "/energy?timeUnit=HOUR&";
    var endDate = "endDate=2016-11-24&"
    var startDate = "startDate=2016-11-24"
    var apiChain = "&";
    var queryURL = "https://monitoringapi.solaredge.com/site/" + siteID + parameter + endDate + startDate + apiChain + "api_key=" + apiKey;

    console.log("hello", queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET',
        crossDomain: true,
        dataType: 'json'
    }).done(function(response) {
        console.log("hello", response);
        // need array for hours and dates
        //output is response.energy.values: Array of 24 objects
        //in values array each object has date & value keys. "2016-11-24 00:00:00" & null or 13.221094 output

    })
};

solaredgeCallTwo();
