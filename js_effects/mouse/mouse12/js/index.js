
	
	try {

		/*create canvas's element then append to body */
		var __canvas_DOM = document.createElement('canvas'),
			__content = document.getElementsByTagName('body')[0];
		if (window.getComputedStyle(__content).getPropertyValue('position') != 'relative') {
			__content.style.position = 'relative';
		}
		__canvas_DOM.setAttribute("style", "position: fixed; top: 0; left: 0;");
		__content.appendChild(__canvas_DOM);

	} catch (e) {
		console.info("Exception occur: " + e);
	}

	/*canvas basic setting*/
	__canvas_DOM.width = window.innerWidth;
	__canvas_DOM.height = window.innerHeight;

	/*story starts here*/
	if (__canvas_DOM.getContext) {
		var c = __canvas_DOM.getContext('2d'),
			w = __canvas_DOM.width,
			h = __canvas_DOM.height;

		var centerPoint = {
			x: w / 2,
			y: h / 2
		}

		var mousePosition = {
			x: centerPoint.x,
			y: centerPoint.y
		}

		var flashlight_size = {
			center: h / 5,
			outside: h / 3
		}

		var gradient_color = {
			first: "rgba(0,0,0,0.8)",
			second: "rgba(0,0,0,0)"
		}

		var gradient;


		function draw() {
			c.save();
			c.clearRect(0, 0, w, h);
			/*flashlight color*/
			gradient = c.createRadialGradient(mousePosition.x, mousePosition.y, flashlight_size.center, mousePosition.x, mousePosition.y, flashlight_size.outside);
			gradient.addColorStop(0, gradient_color.first);
			gradient.addColorStop(1, gradient_color.second);

			c.fillStyle = '#000';
			c.fillRect(0, 0, w, h);


			c.globalCompositeOperation = 'destination-out';
			c.fillStyle = gradient
			c.arc(mousePosition.x, mousePosition.y, flashlight_size.outside, 0, Math.PI * 2, false);
			
			c.fill();
			c.restore();
		}

		draw();
    // timer
		// setInterval(draw, 80);
	}

	$('canvas').on('mousemove mouseleave', function(e) {
		if (e.type == 'mousemove') {
			mousePosition.x = e.offsetX;
			mousePosition.y = e.offsetY;
		}
    draw();
	});