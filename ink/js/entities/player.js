define(['./entity','engine/world','engine/draw','engine/util'],function(Entity,world,draw,util){
	var Player = util.inherit(function(properties){
		var self = this;
		
		self.init({
			dim:	{
				width:	world.cell.width,
				height:	world.cell.height
			},
			
			sprite:		new Image(),
			spriteIndex:0,
			
			animation:	[{
				x:			0,
				y:			0,
				w:			100,
				h:			100
			}],
			
			frames:		1,
			actualFrame:0,
			interval:	0
		});
		
		self.position = {
			x:	properties.position && properties.position.x || 0,
			y:	properties.position && properties.position.y || 0
		};
		
		self.velocity = properties.velocity || {
			x:  4,
			y:  4
		};
		
		self.sprite.src = 'img/wall.jpg';
		
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