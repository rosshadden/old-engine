define(['jquery','engine/engine'],function($,Engine){
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
		draw: function(){}
	});
	
	game.bind.key('e',function(){
		console.log('input.key:','e');
	});
	
	game.start();
	
	return 5;
});