
var topics = ["Cirrus", "Stratus", "Cumulonimbus", "Cumulus", "Altocumulus"]

// $(document).ready(function() {
//     renderButtons() });

function renderButtons() {

    $("#buttons-view").empty(); 
    for (var i = 0; i < topics.length; i++) { 
        var a = $("<button>");
        a.addClass("topics");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }

}
    



    $("#buttons-view").on("click", ".topics", function() {
        console.log("am i dumb")
        var name = $(this).attr("data-name")
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=vaD1cqdqNhGGKSCFheKiwGCarDjniic3&q=${name}&limit=10&offset=0&rating=PG&lang=en`;

        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function(response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class=gifs>");
                    var rating = results[i].rating
                    var p = $("<p>").text("Rating: " + rating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-state", "still");
                    gifDiv.addClass("gif");
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    console.log(gifImage)
                    console.log("sup");

                    gifDiv.append(gifImage);
                    gifDiv.append(p);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
        });


        

          


    });

    $("#gifs-appear-here").on("click", ".gif", function(){
        console.log("hey");
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
    

    $("#add-gif").on("click", function(event) {
        event.preventDefault()  
        var gifAdd = $("#gif-input").val().trim();
        topics.push(gifAdd)
        renderButtons();
        console.log(gifAdd);


    });

    renderButtons();


        



