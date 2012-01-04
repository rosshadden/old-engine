define(['./character','engine/world','engine/draw'],function(Character,world,draw){
	var Player = function(properties){
		var self = this;
		
		self.init = (function(){
			self.name = properties.name || 'Unnamed';
			
			self.dim = {
				width:	100,
				height:	100
			};
			
			self.position = {
				x:	properties.position && properties.position.x || 0,
				y:	properties.position && properties.position.y || 0
			};
			
			self.sprite = new Image();
			self.sprite.src = 'img/circle.png';
			self.spriteIndex = 0;
			
			self.frame = 0;
			self._numFrames = 4;
			self.numFrames = 4;
			self.interval = function(frame){
				return frame === 4;
			};
			
			self.animation = [{
				x:			0,
				y:			0,
				w:			100,
				h:			100
			},{
				x:			100,
				y:			0,
				w:			100,
				h:			100
			},{
				x:			200,
				y:			0,
				w:			100,
				h:			100
			},{
				x:			300,
				y:			0,
				w:			100,
				h:			100
			}];
			
			//	Let this accept arrays and strings ('loop', 'oscillate', etc)
			self.sequence = properties.sequence || [0,1,2,3];
		})();
		
		self.move = function(x,y){
			self.position.x += 4 * x;
			self.position.y += 4 * y;
		};
		
		self.play = function(){
			self.numFrames = self._numFrames;
		};
		
		self.stop = function(){
			self.numFrames = 1;
		};
		
		self.draw = function(){
			draw.image({
				src:		self.sprite,
				width:		self.dim.width,
				height:		self.dim.height,
				position:	self.position,
				sprite:		self.animation[self.sequence[self.spriteIndex]]
			});
			if(self.interval(self.frame)){
				self.spriteIndex = (self.spriteIndex + 1) % self.sequence.length;
				self.frame = 0;
			}
			self.frame++;
		};
		
		return {
			move:	self.move,
			draw:	self.draw,
			play:	self.play,
			stop:	self.stop
		};
	};
	return Player;
});