require(['jquery','engine/engine','engine/entities/entity'],function($,Engine,Entity){
	var game = new Engine({
		screen:	$('#screen')[0],
		init: function(){
			this.bind.key('q',function(){
				console.log('input.key:','q');
			});
			this.bind.axis('w','s','a','d',function(axis){
				console.log('input.axis:',axis);
			});
            var paddle_one = new Entity();
		},
		update: function(){},
		draw: function(){}
	});
	
	game.bind.key('e',function(){
		console.log('input.key:','e');
	});
	
	game.start();
});
