define(['engine/world','engine/draw','engine/viewport','engine/entities/entity','engine/input/input','engine/util',],function(world,draw,viewport,Entity,input,util){
	var Engine = function(options){
		var self = this,
			
			screen = options.screen || $('canvas')[0],
			ctx = screen.getContext('2d'),
			
			execute = function(what){
				if(typeof options[what] === 'function'){
					options[what].call(self);
				}
			},
			
			init = (function(){
				draw.setDimensions(600,400);
                viewport.setDimensions(600,400);
                
				//	convenient shortcuts
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
			screen:	screen,
			input:	input,
			util:	util,
			start:	start,
			bind: 	self.bind
		},options);
	};
	return Engine;
});