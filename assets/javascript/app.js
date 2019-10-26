var GIFs = ["Corgi", "Shiba Inu", "Samoyed", "Australian Shepherd"];

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < GIFs.length; i++) {
    var a = $("<button>");
    a.addClass("GIF");
    // Added a data-attribute
    a.attr("data-name", GIFs[i]);
    a.addClass("gifbutton", GIFs[i]);

    // Provided the initial button text
    a.text(GIFs[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

$("#add-GIF").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var GIF = $("#GIF-input")
    .val()
    .trim();

  // The GIF from the textbox is then added to our array
  GIFs.push(GIF);

  // Calling renderButtons which handles the processing of our GIF array
  renderButtons();
});

renderButtons();

$(document).on("click", ".GIF", function() {
  $("#gifs-appear-here").empty();
  var GifFinder = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    GifFinder +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  //   console.log(response);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#GIF-view").empty();
    // $("#GIF-view").append("<div>" + response.Title + "</div>");
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var GIFDiv = $("<div>");
      var p = $("<p>");
      $(p).text("Rating: " + results[i].rating);
      var GIFImage = $("<img>");
      $(GIFImage).attr("src", results[i].images.fixed_height_still.url);
      $(GIFImage).addClass("gif");
      $(GIFDiv).append(GIFImage);
      $(GIFDiv).append(p);
      $("#gifs-appear-here").prepend(GIFDiv);
    }
  });
});

$(document).on("click", ".gif", function() {
  var src = $(this).attr("src");
  if ($(this).hasClass("playing")) {
    //stop
    $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
    $(this).removeClass("playing");
  } else {
    //play
    $(this).addClass("playing");
    $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
  }
});
