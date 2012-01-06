define(['engine/world','engine/draw'],function(world,draw){
	var Entity = function(properties){
		var self = this;
		
		this.prototype.name = properties.name || 'Unnamed';
		
		self.draw = function(){
			draw.path(0,0,self.dim.width,self.dim.height);
		};
		
		return {
			draw:	self.draw
		};
	};
	
	Entity.prototype.isAnimated = false;
	
	Entity.prototype.dim = {
		width:	world.cell.width,
		height:	world.cell.height
	};
	
	Entity.prototype.position = {
		x:	0,
		y:	0
	};
	
	Entity.prototype.velocity = {
		x:  1,
		y:  1
	};
	
	Entity.prototype.sprite = new Image();
	Entity.prototype.sprite.src = 'img/error.png';
	Entity.prototype.spriteIndex = 0;
	
	Entity.prototype.animation = [{
		x:			0,
		y:			0,
		w:			300,
		h:			300
	}];
	Entity.prototype.frames = 1;
	
	Entity.prototype.frames = 0;
	Entity.prototype.actualFrame = 0;
	Entity.prototype.interval = 0;
	
	Entity.prototype.move = function(x,y){
		this.position.x += this.velocity.x * x;
		this.position.y += this.velocity.y * y;
	};
	
	Entity.prototype.play = function(){
		this.isAnimated = true;
	};
	
	Entity.prototype.stop = function(){
		this.isAnimated = false;
	};
	
	return Entity;
});
