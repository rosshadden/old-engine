define(['engine/world','engine/draw','engine/viewport','entities/entity','engine/input/input','engine/util',],function(world,draw,viewport,Entity,input,util){
	var Engine = function(options){
		var	self = this,
		    
            //  Need to pass this to the drawing library.
			screen = options.screen || $('canvas')[0],
			
			execute = function(what){
				if(typeof options[what] === 'function'){
					options[what].call(self);
				}
			},
			
			init = (function(){
				//	main.js needs to be able to configure these.
				//	I think I should make each module take initialization variables
				//		before becoming modules.
				//world.maps.setCurrent('map1');
				draw.setDimensions(600,400,world.cell);
				viewport.setDimensions(600,400);
				
				//	For temporary experimentation with browser console.
				window.viewport = viewport;
				
				if($('#engine-cache').length === 0){
					$('<div>',{
						id:	'engine-cache'
					}).appendTo('body');
				}
                
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
					var map = world.maps.get(world.maps.getCurrent());
					
					draw.backdrop(viewport.getDimensions().width,viewport.getDimensions().height);
					draw.cells();
					
					draw.layer(map.element,world.toXY(map.properties.dimensions));
                    
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
				world.maps.load('empty',main);
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
