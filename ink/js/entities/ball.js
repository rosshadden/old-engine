define(['./character','engine/world','engine/draw'],function(Character,world,draw){
	var Player = function(properties){
		var self = this;
		
		self.init = (function(){
			self.name = properties.name || 'Unnamed';
			
			self.isAnimated = true;
			
			self.dim = {
				width:	100,
				height:	100
			};
			
			self.position = {
				x:	properties.position && properties.position.x || 0,
				y:	properties.position && properties.position.y || 0
			};
            
            self.velocity = properties.velocity || {
                x:  4,
                y:  4
            };
			
			self.sprite = new Image();
			self.sprite.src = 'img/circle.png';
			self.spriteIndex = 0;
			
			self.frame = 0;
			self.numFrames = 4;
			self.interval = (function(interval){
				var output;
				if(typeof interval === 'number'){
					output = function(frame){
						return frame === interval;
					};
				}else if(typeof interval === 'boolean'){
					output = function(){
						return interval;
					};
				}else if(typeof interval === 'function'){
					output = interval;
				}
				return output;
			})(properties.interval || 4);
			
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
			
			//	Accepts 'linear', 'oscillate', and arrays of animation indecies.
			self.sequence = (function(sequence){
				var output = [];
				if(typeof sequence === 'object' && sequence instanceof Array){
					output = sequence;
				}else{
					for(i in self.animation){
						output[i] = i;
						if(sequence === 'oscillate' && i !== '0'){
							output[2 * self.animation.length - i - 2] = i;
						}
					}
				}
				return output;
			})(properties.sequence || 'linear');
		})();
		
		self.move = function(x,y){
			self.position.x += self.velocity.x * x;
			self.position.y += self.velocity.y * y;
		};
		
		self.play = function(){
			self.isAnimated = true;
		};
		
		self.stop = function(){
			self.isAnimated = false;
		};
		
		self.draw = function(){
			draw.image({
				src:		self.sprite,
				width:		self.dim.width,
				height:		self.dim.height,
				position:	self.position,
				sprite:		self.animation[self.sequence[self.spriteIndex]]
			});
			if(self.isAnimated && self.interval(self.frame)){
				self.spriteIndex = (self.spriteIndex + 1) % self.sequence.length;
				self.frame = 0;
			}else if(!self.isAnimated){
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