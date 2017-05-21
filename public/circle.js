$( document ).ready(function() {
    $("#post-btn").on('click', function() {
        var video = document.getElementById("myVideo");
        thecanvas = drawableCanvas(video);
        ctx = thecanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);   
        $("#testposition").append(thecanvas);
    })
})



function drawableCanvas(video) {
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext('2d');
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
    	console.log(x1, y1);
	}

	/// clear isDown flag to stop drawing
	canvas.onmouseup = function() {
    	isDown = false;
    	console.log(x2, y2);
	}

	/// draw ellipse from start point
	canvas.onmousemove = function(e) {

    	if (!isDown) return;

    	var rect = canvas.getBoundingClientRect();
    	    x2 = e.clientX - rect.left;
    	    y2 = e.clientY - rect.top;

    	/// clear canvas
    	ctx.drawImage(video, 0, 0, w, h);

    	/// draw ellipse
    	drawEllipse(x1, y1, x2, y2);
	}

    return canvas;
}

function drawEllipse(x1, y1, x2, y2) {

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
    ctx.strokeStyle = '#000';
    ctx.stroke();
}