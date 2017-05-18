$( document ).ready(function() {
  var vid = document.getElementById("myVideo");

  // Assign an ontimeupdate event to the video element, and execute a function if the current playback position has changed
  vid.ontimeupdate = function() {myFunction()};

  document.getElementById("")

  function myFunction() {
  // Display the current position of the video in a p element with id="demo"
  document.getElementById("demo").innerHTML = vid.currentTime;
  }
/*
  function favorite_click() {
    var favorite_button = document.getElementById("favorite_button");

    if (favorite_button.src.indexOf("assets/Favorite_before.png") != -1) {
      favorite_button.src="assets/Favorite_after.png";
      alert("Added to your favorite list");
    }
    else {
      favorite_button.src="assets/Favorite_before.png";
      alert("Removed from your favorite list")
    }
  }
*/
  function post_question_click() {
    var screenshot;
    capture_screenshot();
  }

  function capture_screenshot() {
    // Capture current screen of current video and save it as image file. Return the address of the images
    var video = document.getElementById("myVideo");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 400;

    draw(this, context, 600, 400);

    alert("clicked");
            
    //var data = canvas.toDataURL('image/png');
    //document.write('<img src="'+data+'"/>');
  }

  function draw(v, c, w, h) {
    c.drawImage(v, 0, 0, w, ,h);
  }
}