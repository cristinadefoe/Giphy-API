$(document).ready(function () {
    populateButtons(topics, "searchButton", "#gifButtons")
})

// Create topics variables
var topics = ["Forest", "Lava", "Northern Lights", "Ocean", "Snow",
    "Sunrise", "Sunset", "Waterfall", "Cave", "Rainbow"];

function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    // Loop over the array of topics
    for (var i = 0; i < topics.length; i++) {
        // Create a new button for each topic
        var a = $("<button>");
        // For each button, add a class, data attribute and text to display on the button
        a.addClass(classToAdd);
        a.attr("data-type", topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function () {
    $("#searches").empty();
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=7MwXAmIjAbFH45zYaHZxi2duP0l457ht&limit=10";

    // AJAX call to Giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        for (var i = 0; i < response.data.length; i++) {
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: ' + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").append(searchDiv);
        }
    })
})

$(document).on("click", ".searchImage", function () {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// Add new buttons from search
// jQuery selection contains all of the <addSearch> elements
// .on() method is used to handle all events and has two parameters
// First, the event that you want to respond to. In this case, click event.
// Second, code you want to run when event occurs. In this case, anonymous function.
$("#submitButton").on("click", function () {
    event.preventDefault();
    var newTopics = $("searchInput").eq(0).val();
    topics.push(newTopics);
    populateButtons(topics, "searchButton", "#gifButtons");
    return false;
})

populateButtons();







