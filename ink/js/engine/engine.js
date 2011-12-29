define(['engine/draw','engine/viewport','engine/input/input','engine/util',],function(draw,viewport,input,util){
	var Engine = function(options){
		var self = this,
			
			info = {
			    cell: {
			        width:  25,
			        height:  25
			    }
			},
			
			screen = options.screen || $('canvas')[0],
			ctx = screen.getContext('2d'),
			
			execute = function(what){
				if(typeof options[what] === 'function'){
					options[what].call(self);
				}
			},
			
			init = (function(){
                viewport.setDimensions(400,200);
                
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
				paint();
			},
			
			start = function(){
				main();
			};
		
		return util.extend({
			info:	info,
			screen:	screen,
			input:	input,
			util:	util,
			start:	start,
			bind: 	self.bind
		},options);
	};
	return Engine;
});