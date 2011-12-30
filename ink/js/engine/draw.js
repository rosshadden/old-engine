define(function(){
	var	self = this,
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
		easel:			easel,
		setDimensions:	setDimensions,
		backdrop:		backdrop,
		cells:			cells
	};
});