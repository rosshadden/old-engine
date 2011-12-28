require(['jquery','engine/engine'],function($,Engine){
	var game = new Engine({
		screen:	$('#screen')[0],
		init: function(){
			this.bind('key:a',function(){
				console.log('input.key:','a');
			});
		}
	});
	
	game.bind('key:w',function(){
		console.log('input.key:','w');
	});
	
	game.bind('key:s',function(){
		console.log('input.key:','s');
	});
	
	game.start();
});