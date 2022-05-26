// Display the Current Date
var currentDate = function(){
    $("#currentDay").text(moment().format("dddd MMMM Do, YYYY"));
};

// Past, Present, Future Event Color Coding
var colorCodedEvent = function(){
    $(".eventArea").removeClass("past present future");
    $(".hour").each(function(){
        var time = moment($(this).text(),"LT");
        if(moment().isSame(time, 'hour')){
            $(this).parent().find(".eventArea").addClass("present");
        }
        else if(moment().isAfter(time)){
            $(this).parent().find(".eventArea").addClass("past");
        }
        else{
            $(this).parent().find(".eventArea").addClass("future");
        }
    });
};


var events = [];

// Load Events from Loacl Storage and Display on Page
var loadSchedule = function (){
    events = JSON.parse(localStorage.getItem("events"));
    if(!events){
        events = [];
    }

    $.each(events,function(index,value){
        $(".time-block").eq(index).find("p").text(value);
    });
};


// Event Area Clicked
$(".eventArea").on("click",function(){
    
    var text = $(this).find("p").text().trim();
    var textArea = $("<textarea>").addClass("form-control").val(text);
    $(this).find("p").replaceWith(textArea);
    textArea.trigger("focus");
});

// Click outside of Event Area
$(".eventArea").on("blur","textarea",function(){

    var textArea = $(this).val().trim();
    var text = $("<p>").text(textArea);
    $(this).replaceWith(text);
});


// Save Button --> Add to Local Storage
$(".saveBtn").on("click",function(){
    var text = $(this)
    .parent()
    .find("p")
    .text();
    var index = $(this)
        .closest(".time-block")
        .index();
    events[index] = text;

    localStorage.setItem("events", JSON.stringify(events));

    // Alert confirming save
    $.alert({
        title: 'Event Saved!',
        content: ' ',
    });


});


// On Page Load
currentDate();
loadSchedule();
colorCodedEvent();