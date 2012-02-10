define(['engine/class','engine/world','engine/draw','engine/util'],function(Base,world,draw,util){
	var Entity = Base.extend({
		init:	function(properties){
			var self = this;
			
			this.isAnimated = false;
			
			this.dim = {
				width:	world.cell.width,
				height:	world.cell.height
			};
			
			this.sprite = new Image();
			this.spriteIndex = 0;
			
			this.currentFrame = 0;
		}
	});
	
	return Entity;
});
