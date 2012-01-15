define(['./entity','engine/world','engine/draw','engine/util'],function(Entity,world,draw,util){
	var Ball = Entity.extend({
		init:	function(properties){
			this._super(properties);
			
			var self = this;
			
			this.isAnimated = true;
			this.isAnimating = true;
			
			this.dim = {
				width:	100,
				height:	100
			};
			
			this.position = {
				x:	properties.position && properties.position.x || 0,
				y:	properties.position && properties.position.y || 0
			};
			
			this.velocity = properties.velocity || {
				x:  4,
				y:  4
			};
			
			this.sprite.src = 'img/tiles/circle.png';
			this.spriteIndex = 0;
			
			this.animation = [{
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
			this.currentFrame = 0;
			this.interval = 0;
			
			this.interval = (function(interval){
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
			
			this.sequence = (function(sequence){
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
		},
		move:	function(x,y){
			this.position.x += this.velocity.x * x;
			this.position.y += this.velocity.y * y;
		},
		draw:	function(){
			draw.image({
				src:		this.sprite,
				width:		this.dim.width,
				height:		this.dim.height,
				position:	this.position,
				sprite:		this.animation[this.sequence[this.spriteIndex]]
			});
			if(this.isAnimating && this.interval(this.currentFrame)){
				this.spriteIndex = (this.spriteIndex + 1) % this.sequence.length;
				this.currentFrame = 0;
			}else if(!this.isAnimating){
				this.currentFrame = 0;
			}
			this.currentFrame++;
		},
		play:	function(){
			this.isAnimating = true;
		},
		stop:	function(){
			this.isAnimating = false;
		},
		debug:	function(){
			console.log(this.animation,this.sequence,this.spriteIndex);
		}
	});
	
	return Ball;
});