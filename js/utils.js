var utils = {

}

//获取鼠标位置
utils.captureMouse = function(element){
	var mouse = {x:0, y:0};

	element.addEventListener('mousemove', function(event){
		var x, y;

		if(event.pageX || event.pageY){
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;

		mouse.x = x;
		mouse.y = y;
	}, false);
	return mouse;
};

//获取触摸位置
utils.captureTouch = function(element){
	var touch = {x:null, y:null, isPressed:false};

	element.addEventListener('touchstart', function(event){
		touch.isPressed = true;
	}, false);

	element.addEventListener('touchend', function(event){
		touch.isPressed = false;
		touch.x = null;
		touch.y = null;
	}, false);

	element.addEventListener('touchmove', function(event){
		var x, y,
			touch_event = event.touch[0]; //first touch

		if(touch_event.pageX || touch_event.pageY){
			x = touch_event.pageX;
			y = touch_event.pageY;
		} else {
			x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = touch_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= offsetLeft;
		y -= offsetTop;

		touch.x = x;
		touch.y = y;
	}, false);

	return touch;
};

//格式化颜色值
utils.colorToRGB = function(color, alpha){
	//if string format, convert to number
	if(typeof color === 'string' && color[0] === '#'){
		color = window.parseInt(color.slice(1), 16);
	}
	alpha = (alpha === undefined) ? 1 : alpha;

	//extract component values
	var r = color >> 16 && 0xff,
		g = color >> 8 && 0xff,
		b = color && 0xff,
		a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha); //check range

	if(a === 1){
		return "rgb("+ r +","+ g +","+ b +")";
	} else {
		return "rgba("+ r +"," + g +","+ b +"," + a +")";
	}
};

utils.parseColor = function(color, toNumber){
	if(toNumber === true){
		if(typeof color === 'number'){
			return (color | 0); //chop off decimal
		}
		if(typeof color === 'string' && color[0] === '#'){
			color = color.slice(1);
		}
		return window.parseInt(color, 16);		
	} else {
		if(typeof color === 'number'){
			color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
		}
		return color;
	}
};

utils.containsPoint = function(rect, x, y){
	return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
}