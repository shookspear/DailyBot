// Display the Current Date
var currentDate = function(){
    $("#currentDay").text(moment().format("dddd MMMM Do, YYYY"));
};




// On Page Load
currentDate();