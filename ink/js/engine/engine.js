define(['engine/world','engine/draw','engine/viewport','entities/entity','engine/input/input','engine/util',],function(world,draw,viewport,Entity,input,util){
	var Engine = function(options){
		var	self = this,
		    
            //  Need to somehow pass this to the drawing library.
			screen = options.screen || $('canvas')[0],
			
			execute = function(what){
				if(typeof options[what] === 'function'){
					options[what].call(self);
				}
			},
			
			init = (function(){
				draw.setDimensions(600,400);
                viewport.setDimensions(600,400);
                
				//	convenient shortcuts
				self.world = world;
				self.input = input;
				self.util = util;
                self.bind = {
					'event':util.listen(self),
					key:	input.keyboard.bind.key,
					axis:	input.keyboard.bind.axis
				};
				
				execute('init');
			})(),

			update = (function(){
				return function(){
					execute('update');
				};
			})(),


			paint = (function(){
				return function(){
					draw.backdrop(viewport.getDimensions().width,viewport.getDimensions().height);
					draw.cells(600,400,world.cell);
                    
            		for(var entity in world.entities){
        				world.entities[entity].draw();
        			}
					
					execute('paint');
				};
			})(),
			
			main = function(){
					window.webkitRequestAnimationFrame
					&&	webkitRequestAnimationFrame(main)
				||	window.mozRequestAnimationFrame
					&&	mozRequestAnimationFrame(main)
				||	window.requestAnimationFrame
					&&	requestAnimationFrame(main);
				
				update();
				paint();
			},
			
			start = function(){
				main();
			};
		
		return util.extend({
			world:	self.world,
			input:	self.input,
			util:	util,
			start:	start,
			bind: 	self.bind
		},options);
	};
	return Engine;
});
