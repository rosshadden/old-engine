define(['main'],function(engine){
    console.log(engine);
	var self = this,
	
		x = 0,
		y = 0,
		dim = {
			width:	0,
			height:	0
		},
		
		setDimensions = function(){
			dim.width = ~~(window.innerWidth / engine.info.cell.width / 2) * engine.info.cell.width * 2 - 1e2;
			dim.height = ~~(window.innerHeight / engine.info.cell.height / 2) * engine.info.cell.height * 2 - 1e2;
		},
		getDimensions = function(){
			return {
				width:	dim.width,
				height:	dim.height
			};
		},
		getPosition = function(){
			return {
				x:	x,
				y:	y
			};
		},
		move = function(newX,newY){
			x = (typeof newX === 'number') ? newX : x;
			y = (typeof newY === 'number') ? newY : y;
		},
		moveBy = function(newX,newY){
			move(x + newX,y + newY);
		},
		center = function(dontMove){
			var x = 200,
				y = 300;
			if(!dontMove){
				move(~~(x - viewport.getDimensions().width / 2),~~(y - viewport.getDimensions().height / 2));
			}
			return {
				x:	~~(viewport.getDimensions().width / 2),
				y:	~~(viewport.getDimensions().height / 2)
			};
		};
		
	return {
		setDimensions:	setDimensions,
		getDimensions:	getDimensions,
		get:			getPosition,
		move:			move,
		moveBy:			moveBy,
		center:			center
	};
});