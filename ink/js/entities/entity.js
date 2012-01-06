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
	
	Entity.prototype.init = function(properties){
		console.log('init');
		for(var property in properties){
			Entity.prototype[property] = properties[property];
		}
	};
	
	return Entity;
});
