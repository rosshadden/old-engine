define(['engine/util','engine/input'],function(util,input){
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
				self.bind = util.bind(self);
				
				$(window).on({
					'keydown': function(v){
						var key = input.keys[v.which];
						$(self).trigger('key:' + key);
					}
				});
				
				execute('init');
			})(),
			
			update = (function(){
				return function(){
					execute('update');
				};
			})(),
			
			draw = (function(){
				return function(){
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
			bind:	util.bind(self),
			start:	start
		},options);
	};
	return Engine;
});