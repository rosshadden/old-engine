define(['./entity','engine/world','engine/draw','engine/util'],function(Entity,world,draw,util){
	var Player = util.inherit(function(properties){
		var self = this;
		
		self.isAnimated = true;
		
		self.position = {
			x:	properties.position && properties.position.x || 0,
			y:	properties.position && properties.position.y || 0
		};
		
		self.velocity = properties.velocity || {
			x:  4,
			y:  4
		};
		
		self.sprite = new Image();
		self.sprite.src = 'img/wall.jpg';
		
		self.animation = [{
			x:			0,
			y:			0,
			w:			100,
			h:			100
		}];
		self.frames = 1;
		
		self.move = function(dir){
			self.position.y += self.velocity.y * dir;
		};
		
		self.draw = function(){
			draw.image({
				src:		self.sprite,
				width:		self.dim.width,
				height:		self.dim.height,
				position:	self.position,
				sprite:		self.animation[self.spriteIndex]
			});
		};
		
		return {
			move:	self.move,
			draw:	self.draw
		};
	},Entity);
	
	return Player;
});