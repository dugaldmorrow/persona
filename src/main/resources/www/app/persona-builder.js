define(function (svg) {
	var svg = require('svg');
	var $ = require('jquery');
	var width = 400;
	var height = 400;
	var centreX = width / 2;
	var centreY = height / 2;
	var faceWidth = width;
	var faceHeight = height;
	var eyeOffsetX = centreX / 3;
	var leftEyeCentreX = centreX - eyeOffsetX;
	var rightEyeCentreX = centreX + eyeOffsetX;
	
	var Emotion = function(active) {
		this.active = active;
	};
	
	Emotion.prototype.setSmile = function(active) {
		this.active = active;
	};
	
	// Eye...
	function Eye(active, eyeCentreX) {
		Emotion.call(this, active);
		this.eyeCentreX = eyeCentreX;
		this.wink = false;
	};
	Eye.prototype = Object.create(Emotion.prototype);
	Eye.prototype.constructor = Eye;
	Eye.prototype.setWink = function(wink) {
		this.wink = wink;
	};
	Eye.prototype.render = function(persona) {
		var eyeRadius = width / 5;
    	if (this.wink) {
        	var eyeHeightY = eyeRadius / 2;
        	persona.ellipse(eyeRadius, eyeHeightY).fill('#ffffff').stroke('#000000').move(this.eyeCentreX - eyeRadius / 2, centreY - eyeHeightY / 2);
        } else {
        	persona.circle(eyeRadius).fill('#ffffff').stroke('#000000').move(this.eyeCentreX - eyeRadius / 2, centreY - eyeRadius / 2);
        }
	};
	
	// Mouth...
	function Mouth(active) {
		Emotion.call(this, active);
		this.smile = false;
	};
	Mouth.prototype = Object.create(Emotion.prototype);
	Mouth.prototype.constructor = Mouth;
	Mouth.prototype.setSmile = function(smile) {
		this.smile = smile;
	};
	Mouth.prototype.render = function(persona) {
		var mouthWidth = width / 2;
		var mouthHeight = 20;
		var mouthCentreY = faceHeight * 3 / 4;
		var mouthLeftX = centreX - mouthWidth / 2;
		var mouthRightX = mouthLeftX + mouthWidth;
		if (this.smile) {
			var mouthBottomY = mouthCentreY + faceHeight / 10;
			var path = persona.path(
					'M ' + mouthLeftX + ' ' + mouthCentreY +
					' C ' + mouthLeftX + ' ' + mouthCentreY + ' ' + centreX + ' ' + mouthBottomY + ' ' + mouthRightX + ' ' + mouthCentreY);
			path.fill('none').stroke({
				width: 1
			});
		} else {
			var path = persona.path(
					'M ' + mouthLeftX + ' ' + mouthCentreY +
					' L ' + mouthRightX + ' ' + mouthCentreY);
			path.fill('none').stroke({
				width: 1
			});
		}
	};
	
	/*
	M = moveto
	L = lineto
	H = horizontal lineto
	V = vertical lineto
	C = curveto
	S = smooth curveto
	Q = quadratic Bézier curve
	T = smooth quadratic Bézier curveto
	A = elliptical Arc
	Z = closepath
		 */
		
	return {
		
		characteristics: {
			mouth: new Mouth(true),
			leftEye: new Eye(true, leftEyeCentreX),
			rightEye: new Eye(true, rightEyeCentreX),
			boundingSize: width
		},
		
		reset: function() {
			//this.characteristics.mouth.setSmile(false);
        	this.characteristics.leftEye.setWink(false);
        	this.characteristics.rightEye.setWink(false);
        	return this;
		},
        
        smile: function() {
        	this.characteristics.mouth.setSmile(true);
        	return this;
        },
        
        straightMouth: function() {
        	this.characteristics.mouth.setSmile(false);
        	return this;
        },
        
        winkLeft: function() {
        	this.characteristics.leftEye.setWink(true);
        	return this;
        },
        
        winkRight: function() {
        	this.characteristics.rightEye.setWink(true);
        	return this;
        },
        
        build: function(elementId) {
        	$("#" + elementId).empty();
        	var persona = SVG(elementId);
        	var centreX = this.characteristics.boundingSize / 2;
        	var centreY = this.characteristics.boundingSize / 2;
            var circle = persona.circle(this.characteristics.boundingSize).fill('#ffffff').stroke('#000000');
            var eyeOffsetX = centreX / 3;
            var eyeCentreY = centreY - centreY / 6;
            var leftEyeCentreX = centreX - eyeOffsetX;
            var rightEyeCentreX = centreX + eyeOffsetX;
            this.characteristics.rightEye.render(persona);
            this.characteristics.leftEye.render(persona);
            this.characteristics.mouth.render(persona);
        }
    };
});
