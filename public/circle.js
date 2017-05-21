$( document ).ready(function() {
    $("#post-btn").on('click', function() {
        var video = document.getElementById("myVideo");
        canvas = drawableCanvas(video);
        ctx = canvas.getContext('2d');
        video.pause();
        video.controls = false;
        $('#video-canvas').css('z-index', 1);
    })

    $("#submit-post-btn, #cancel-post-btn").on('click', function() {
        var canvas = document.getElementById("video-canvas");
        var video = document.getElementById("myVideo");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.onmousedown = null;
        canvas.onmouseup = null;
        canvas.onmousemove = null;
        $('#video-canvas').css('z-index', -1);
        video.controls = true;
    })
})



function drawableCanvas(video) {
    var canvas = document.getElementById("video-canvas");
    ctx = canvas.getContext('2d');
    canvas.width = $("#myVideo").width();
    canvas.height = $("#myVideo").height();
    w = canvas.width;
    h = canvas.height;
    var x1, y1;                 /// start points
    var x2, y2;
    isDown = false;     /// if mouse button is down

	/// handle mouse down    
	canvas.onmousedown = function(e) {

    	/// get corrected mouse position and store as first point
    	var rect = canvas.getBoundingClientRect();
    	x1 = e.clientX - rect.left;
    	y1 = e.clientY - rect.top;
    	isDown = true;
        cx1 = x1 * 300 / w;
        cy1 = y1 * 150 / h;
	}

	/// clear isDown flag to stop drawing
	canvas.onmouseup = function() {
    	isDown = false;
        cx2 = x2 * 300 / w;
        cy2 = y2 * 150 / h;
	}

	/// draw ellipse from start point
	canvas.onmousemove = function(e) {

    	if (!isDown) return;

    	var rect = canvas.getBoundingClientRect();
    	    x2 = e.clientX - rect.left;
    	    y2 = e.clientY - rect.top;

    	/// clear canvas
    	ctx.clearRect(0, 0, w, h);

    	/// draw ellipse
    	drawEllipse(ctx, x1, y1, x2, y2);
	}

    return canvas;
}

function drawEllipse(ctx, x1, y1, x2, y2) {

    var radiusX = (x2 - x1) * 0.5;   /// radius for x based on input
        radiusY = (y2 - y1) * 0.5;   /// radius for y based on input
        centerX = x1 + radiusX;      /// calc center
        centerY = y1 + radiusY;
        step = 0.01;                 /// resolution of ellipse
        a = step;                    /// counter
        pi2 = Math.PI * 2 - step;    /// end angle

    /// start a new path
    ctx.beginPath();

    /// set start point at angle 0
    ctx.moveTo(centerX + radiusX * Math.cos(0),
               centerY + radiusY * Math.sin(0));

    /// create the ellipse    
    for(; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
                   centerY + radiusY * Math.sin(a));
    }

    /// close it and stroke it for demo
    ctx.closePath();
    ctx.strokeStyle = '#F00';
    ctx.lineWidth = 5;
    ctx.stroke();
}