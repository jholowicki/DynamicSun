// provides id / address / siteimage...requires api key and id....
var address = null;
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
        var id = response.details.id
        address = response.details.location.address + ", " + response.details.location.city + ", " + response.details.location.state
            // $("#address-display").append("<p>SOLAR DISPLAY" + address + "</p>");

        var siteImage = "https://monitoringapi.solaredge.com/" + response.details.uris.SITE_IMAGE

    })
};

solaredgeCallOne();
var yesterdaysDate = moment().format('YYYY-MM-DD');
console.log('hello', yesterdaysDate);
// Returns array of values for a single day's hourly production in Wh.
var solaredgeCallTwo = function() {

    var searchTextInput = "Winchester"
    var siteID = "31596";
    var apiKey = "H7XOEZEP2D7TGM84OBM76SU75XIAPLTB";
    var parameter = "/energy?timeUnit=HOUR&";
    var endDate = "endDate=" + yesterdaysDate + "&";
    var startDate = "startDate=" + yesterdaysDate;
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
        var energyObjectArray = response.energy.values;
        //transform to exract energy values
        var result = energyObjectArray.map(function(a) {
            return a.value;
        });
        // need array for hours and dates
        //output is response.energy.values: Array of 24 objects
        //in values array each object has date & value keys. "2016-11-24 00:00:00" & null or 13.221094 output
        $(function() {
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Hourly Solar Output'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [
                        '12 am',
                        '1 am',
                        '2 am',
                        '3 am',
                        '4 am',
                        '5 am',
                        '6 am',
                        '7 am',
                        '8 am',
                        '9 am',
                        '10 am',
                        '11 am',
                        '12 pm',
                        '1 pm',
                        '2 pm',
                        '3 pm',
                        '4 pm',
                        '5 pm',
                        '6 pm',
                        '7 pm',
                        '8 pm',
                        '9 pm',
                        '10 pm',
                        '11 pm',
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Energy Produced (kWh)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: " ",
                    data: result


                }]
            });
        });
    })
};

solaredgeCallTwo();

$(function() {
    Highcharts.chart('average', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Chicago',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'Magnificent Mile',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});
