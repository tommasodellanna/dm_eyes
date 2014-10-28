
var mx, my;

var eye_b = "http://oi57.tinypic.com/14e1imq.jpg";
var eye_r = "http://oi59.tinypic.com/1j3r46.jpg";
var eye_p = "http://oi59.tinypic.com/2s1liis.jpg";

var all = [];

function Eye(x, y, ctx, canvas) {
	this._x = x;
	this._y = y;

	this._eye_b = new Image();
	this._eye_b.src = eye_b;
	this._eye_r = new Image();
	this._eye_r.src = eye_r;
	this._eye_p = new Image();
	this._eye_p.src = eye_p;

	this._ctx = ctx;
	this._canvas = canvas;

	all.push(this);
}

Eye.prototype.draw = function() {

	//clear
	this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

	//draw
	
	// base
	this._ctx.drawImage(this._eye_b, 0, 0, this._canvas.width, this._canvas.height);


	// pupil
	var rotation = this.transforms();
	this._ctx.save();
	this._ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
	this._ctx.rotate(rotation);		
	this._ctx.translate(-this._canvas.width / 2.5, -this._canvas.height / 2.5);
	this._ctx.drawImage(this._eye_p, 0, 0, this._canvas.width, this._canvas.height);
	this._ctx.restore();

	// reflection
	this._ctx.drawImage(this._eye_r, 0, 0, this._canvas.width, this._canvas.height);

}

Eye.prototype.transforms = function() {

	var rect = this._canvas.getBoundingClientRect();
	var cx = rect.left + (this._canvas.width / 2);
	var cy = rect.top + (this._canvas.height / 2);
	return Math.atan2(my - cy, mx - cx);

}

function draw() {
	for (var i = all.length - 1; i >= 0; i--) {
		all[i].draw();
	};
	requestAnimationFrame(draw);
}


window.onload = function() {

	// initialise eye 0
	var canvas0=document.getElementById("eye0_canvas");
	var ctx0=canvas0.getContext("2d");
	new Eye(0, 0, ctx0, canvas0);
	// make things graggable -- needs jquery and jquery ui
	$('#eye0').draggable();

	// initialise eye 1
	var canvas1=document.getElementById("eye1_canvas");
	var ctx1=canvas1.getContext("2d");
	new Eye(0, 0, ctx1, canvas1);
	// make things graggable -- needs jquery and jquery ui
	$('#eye1').draggable();

	// initialise eye 2
	var canvas2=document.getElementById("eye2_canvas");
	var ctx2=canvas2.getContext("2d");
	new Eye(0, 0, ctx2, canvas2);
	// make things graggable -- needs jquery and jquery ui
	$('#eye2').draggable();

	window.onmousemove = function(evt) { mx = evt.x; my = evt.y };	
	requestAnimationFrame(draw);
}
