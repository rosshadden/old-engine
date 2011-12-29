require(['jquery','engine/engine'],function($,Engine){
	var game = new Engine({
		screen:	$('#screen')[0],
		init: function(){
			this.bind.key('w',function(){
				console.log('input.key:','w');
			});
		},
		update: function(){},
		draw: function(){}
	});
	
	game.bind.key('s',function(){
		console.log('input.key:','s');
	});
	
	game.start();
});