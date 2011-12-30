define(['engine/world','engine/draw'],function(world,draw){
	var Entity = function(options){
		var self = this;
		
        world.add_entity(this);
		
		self.dim = {
			width:	world.cell.width,
			height:	world.cell.height
		};
		
		self.sprite = new Image();
		self.sprite.src = 'img/characters.png';
		self.spriteIndex = 0;
		
		self.frames = 1;
		self.actualFrame = 0;
		self.interval = 0;
		
		self.draw = function(){
			draw.path(0,0,self.dim.width,self.dim.height);
		};
		
		return {
			draw:	self.draw
		};
	};
	return Entity;
});
