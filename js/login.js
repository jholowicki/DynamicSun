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

//Values: 
var name, siteId, apiKey, apidate;

//Capture Button Click    
$(document).on("click", "#logIn", function() {

  name = $('#name').val().trim();
  siteId = $('#siteId').val().trim();
  apiKey  = $('#apiKey').val().trim();
  apidate = $('#apidate').val().trim();

  database.ref().set({
    name: name,
    siteId: siteId,
    apiKey: apiKey,
    apidate: apidate
  })

});