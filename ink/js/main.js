require(['jquery','engine/engine'],function($,Engine){
	var
		game = new Engine({
			screen:	$('#screen')[0],
			
			map:	'map1',
			
			init: function(){
				var self = this;
			},
			update: function(){
				var keys = this.input.keyboard.activeKeys();
				if(keys.length > 0){
				}
			},
			paint: function(){}
		});
	
	////////////////////////////////
	//	DEBUGGING
		game.bind.key('shift + graveaccent',function(){
			console.log(game.input.keyboard.activeKeys());
		});
	////////////////////////////////
	
	game.start();
});
