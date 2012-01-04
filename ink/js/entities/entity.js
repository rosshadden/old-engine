define(['engine/world','engine/draw'],function(world,draw){
	var Entity = function(properties){
		var self = this;
		
		self.test = 'testing';
		
		self.draw = function(){
			draw.path(0,0,self.dim.width,self.dim.height);
		};
		
		return {
			draw:	self.draw
		};
	};
	return Entity;
});
