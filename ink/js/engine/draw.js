define(function(){
	var	self = this,
		
		Sprite = function(properties){
			var sprite = {
				image:	new Image()
			};
			
			for(var property in properties){
				sprite[property] = properties[property];
			}
			
			sprite.image.src = properties.source;
			
			return sprite;
		},
		
		easel = {
			screen:		$('#screen')[0].getContext('2d'),
			element: {
				screen:		$('#screen')[0]
			}
		},
		setDimensions = function(width,height){
			easel.element.screen.width = width;
			easel.element.screen.height = height;
		},
		backdrop = function(width,height){
			easel.screen.fillStyle = 'rgba(200,200,200,1)';
			easel.screen.clearRect(0,0,width,height);
			easel.screen.fillRect(0,0,width,height);
		},
		path = function(x,y,x2,y2,options){
			var canvas,
				defaults = {
					canvas:		easel.screen,
					width:		1,
					color:		'rgba(0,0,0,1)',
					lineCap:	'round',
					lineJoin:	'round'
				};
			options = $.extend(defaults,options);
			canvas = options.canvas;
			
			canvas.beginPath();
			canvas.moveTo(x,y);
			canvas.lineTo(x2,y2);
			canvas.strokeStyle = options.color;
			canvas.lineWidth = options.width;
			canvas.lineJoin = options.lineJoin;
			canvas.lineCap = options.lineCap;
			canvas.stroke();
		},
		image = function(properties){
			easel.screen.drawImage(
				properties.src,
				properties.sprite.x,
				properties.sprite.y,
				properties.sprite.w,
				properties.sprite.h,
				properties.position && properties.position.x || 0,
				properties.position && properties.position.y || 0,
				properties.width,
				properties.height
			);
		},
		cells = function(width,height,cell){
			var x,y;
			for(x = cell.width; x < width; x += cell.width){
				path(x,0,x,height,{color:'rgba(0,0,0,.2)'});
			}
			for(y = cell.height; y < height; y += cell.height){
				path(0,y,width,y,{color:'rgba(0,0,0,.2)'});
			}
		};
	return {
		Sprite:			Sprite,
		easel:			easel,
		setDimensions:	setDimensions,
		backdrop:		backdrop,
		path:			path,
		image:			image,
		cells:			cells
	};
});