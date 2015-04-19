define(function (svg) {
	var svg = require('svg');
	var $ = require('jquery');
	var width = 400;
	var height = 400;
//	var width = 16;
//	var height = 16;
	var centreX = width / 2;
	var centreY = height / 2;
	var faceWidth = width;
	var faceHeight = height;
	var eyeOffsetX = centreX / 3;
	var leftEyeCentreX = centreX - eyeOffsetX;
	var rightEyeCentreX = centreX + eyeOffsetX;
	var cheekOffsetX = centreX / 2;
	var leftCheekCentreX = centreX - cheekOffsetX;
	var rightCheekCentreX = centreX + cheekOffsetX;
	
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
		this.eyeCentreY = 9 * centreY / 10;
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
        	persona.ellipse(eyeRadius, eyeHeightY).fill('#ffffff').stroke('#000000').move(this.eyeCentreX - eyeRadius / 2, this.eyeCentreY - eyeHeightY / 2);
        } else {
        	persona.circle(eyeRadius).fill('#ffffff').stroke('#000000').move(this.eyeCentreX - eyeRadius / 2, this.eyeCentreY - eyeRadius / 2);
        }
	};
	
	// Cheek...
	function Cheek(active, cheekCentreX) {
		Emotion.call(this, active);
		this.EMBARRASSED_COLOR = '#de929d';
		this.cheekCentreX = cheekCentreX;
		this.cheekCentreY = 25 * centreY / 20;
		this.blushed = false;
	};
	Cheek.prototype = Object.create(Emotion.prototype);
	Cheek.prototype.constructor = Cheek;
	Cheek.prototype.reset = function() {
		this.blushed = false;
	};
	Cheek.prototype.blush = function() {
		this.blushed = true;
	};
	Cheek.prototype.render = function(persona) {
		var cheekWidth = width / 10;
		var cheekHeight = width / 8;
    	if (this.blushed) {
        	persona.ellipse(cheekWidth, cheekHeight).fill(this.EMBARRASSED_COLOR).stroke(this.EMBARRASSED_COLOR).move(this.cheekCentreX - cheekWidth / 2, this.cheekCentreY - cheekHeight / 2);
        } else {
        }
	};
	
	// Mouth...
	function Mouth(active) {
		Emotion.call(this, active);
		this.STRAIGHT_STYLE = 'straight';
		this.FROWN_STYLE = 'frown';
		this.SMILE_STYLE = 'smile';
		this.CONFUSED_STYLE = 'confused';
	};
	Mouth.prototype = Object.create(Emotion.prototype);
	Mouth.prototype.constructor = Mouth;
	Mouth.prototype.straight = function() {
		this.style = this.STRAIGHT_STYLE;
	};
	Mouth.prototype.frown = function() {
		this.style = this.FROWN_STYLE;
	};
	Mouth.prototype.smile = function() {
		this.style = this.SMILE_STYLE;
	};
	Mouth.prototype.confused = function() {
		this.style = this.CONFUSED_STYLE;
	};
	Mouth.prototype.render = function(persona) {
		var mouthWidth = width / 2;
		var mouthHeight = 20;
		var mouthCentreY = faceHeight * 3 / 4;
		var mouthLeftX = centreX - mouthWidth / 2;
		var mouthRightX = mouthLeftX + mouthWidth;
		if (this.style == this.FROWN_STYLE) {
			var mouthBottomY = mouthCentreY - faceHeight / 10;
			var path = persona.path(
					'M ' + mouthLeftX + ' ' + mouthCentreY +
					' C ' + mouthLeftX + ' ' + mouthCentreY + ' ' + centreX + ' ' + mouthBottomY + ' ' + mouthRightX + ' ' + mouthCentreY);
			path.fill('none').stroke({
				width: 1
			});
		} else if (this.style == this.SMILE_STYLE) {
			var mouthBottomY = mouthCentreY + faceHeight / 10;
			var path = persona.path(
					'M ' + mouthLeftX + ' ' + mouthCentreY +
					' C ' + mouthLeftX + ' ' + mouthCentreY + ' ' + centreX + ' ' + mouthBottomY + ' ' + mouthRightX + ' ' + mouthCentreY);
			path.fill('none').stroke({
				width: 1
			});
		} else if (this.style == this.CONFUSED_STYLE) {
			var mouthTopY = mouthCentreY - faceHeight / 10;
			var mouthBottomY = mouthCentreY + faceHeight / 10;
			var quarterWidth = mouthWidth / 4;
			var path = persona.path(
					'M ' + mouthLeftX + ' ' + mouthCentreY +
					' C ' + mouthLeftX + ' ' + mouthCentreY + ' ' + (centreX - quarterWidth) + ' ' + mouthTopY + ' ' + centreX + ' ' + mouthCentreY +
					' C ' + centreX + ' ' + mouthCentreY + ' ' + (centreX + quarterWidth) + ' ' + mouthBottomY + ' ' + mouthRightX + ' ' + mouthCentreY);
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
			leftCheek: new Cheek(true, leftCheekCentreX),
			rightCheek: new Cheek(true, rightCheekCentreX),
			boundingSize: width
		},
		
		reset: function() {
			//this.characteristics.mouth.setSmile(false);
        	this.characteristics.leftEye.setWink(false);
        	this.characteristics.rightEye.setWink(false);
        	this.characteristics.leftCheek.reset();
        	this.characteristics.rightCheek.reset();
        	return this;
		},
		
		// Actions...
        smile: function() {
        	this.characteristics.mouth.smile();
        	return this;
        },
        straightMouth: function() {
        	this.characteristics.mouth.straight();
        	return this;
        },
        frown: function() {
        	this.characteristics.mouth.frown();
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
        
        // Emotions...
        confused: function() {
        	this.characteristics.mouth.confused();
        	return this;
        },
        embarrassed: function() {
        	this.characteristics.leftCheek.blush();
        	this.characteristics.rightCheek.blush();
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
            this.characteristics.leftEye.render(persona);
            this.characteristics.rightEye.render(persona);
            this.characteristics.leftCheek.render(persona);
            this.characteristics.rightCheek.render(persona);
            this.characteristics.mouth.render(persona);
        }
    };
});
