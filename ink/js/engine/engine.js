define(['engine/draw','engine/viewport','engine/input','engine/util',],function(draw,viewport,input,util){
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
			
			draw = (function(){
				return function(){
					draw.terrain();
					
					execute('draw');
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
				draw();
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