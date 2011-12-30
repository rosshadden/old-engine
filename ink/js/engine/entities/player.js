define(['./character','engine/world','engine/draw'],function(Character,world,draw){
	var Player = function(options){
		var self = this;
		
		self.dim = {
			width:	world.cell.width,
			height:	world.cell.height
		};
		
		self.position = {
			x:	0,
			y:	0
		};
		
		self.sprite = new Image();
		self.sprite.src = 'img/wall.jpg';
		self.spriteIndex = 0;
		
		self.frames = 1;
		self.actualFrame = 0;
		self.interval = 0;
		
		self.move = function(y){
			self.position.y += world.cell.height;
		};
		
		self.draw = function(){
			draw.image({
				src:	self.sprite,
				width:	self.dim.width,
				height:	self.dim.height,
				x:		0,
				y:		0,
				w:		100,
				h:		100
			});
		};
		
		return {
			draw:	self.draw
		};
	};
	return Player;
});