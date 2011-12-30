require(['jquery','engine/engine','engine/entities/player'],function($,Engine,Player){
	var paddleOne = new Player();
	
	var game = new Engine({
		screen:	$('#screen')[0],
		init: function(){
			this.bind.key('q',function(){
				console.log('input.key:','q');
			});
			this.bind.axis('w','s','a','d',function(axis){
				console.log('input.axis:',axis);
			});
		},
		update: function(){},
		paint: function(){
			paddleOne.draw();
		}
	});
	
	game.bind.key('e',function(){
		console.log('input.key:','e');
	});
	
	game.start();
});