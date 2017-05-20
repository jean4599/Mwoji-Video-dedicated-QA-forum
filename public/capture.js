$( document ).ready(function() {
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
  reload_screenshots();
})

function reload_screenshots() {
  video_name = "video2";
  firebase.database().ref("videos/videoList/" + video_name + "/questions").on("value", function(snapshot) {
    data = snapshot.val();
    if(data) {
      screenshots = Object.keys(data).map(function(key) {return data[key]})
      capture_on_time(screenshots, screenshots.length - 1);
    }
  })
}

function post_question_click() {
  video_name = "video2";
  firebase.database().ref("videos/videoList/" + video_name + "/questions").push().set(document.getElementById("myVideo").currentTime);
}

function capture_on_time(times, i, canvas_id="myCanvas", width=200, height=150) {
  if (i < 0) {
    return;
  }
  var video = document.getElementById("myVideo");
  var cnvs;
  var curtime = video.currentTime;

  video.currentTime = times[i];
  video.onseeked = function() {
    var cnvs = document.createElement("canvas");
    var context = cnvs.getContext("2d");
    context.drawImage(video, 0, 0, 220, 150);
    cnvs.id = canvas_id
    cnvs.style.width = width;
    cnvs.style.height = height;

    // Append "cnvs" into the html (where you want)
    document.getElementById("testposition").appendChild(cnvs);

    video.currentTime = curtime;
    video.onseeked = null;
    capture_on_time(times, i-1)
  };
}