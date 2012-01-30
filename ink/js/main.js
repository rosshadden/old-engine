require(['jquery','engine/engine','entities/player','entities/ball'],function($,Engine,Player,Ball){
	var
		game = new Engine({
			screen:	$('#screen')[0],
			
			map:	'map1',
			
			init: function(){
				var self = this;

				self.world.createEntity(Player,{
					name:       'paddleOne',
					position:   self.world.toXY(1,6),
					velocity: {
						x:  0,
						y:  16
					}
				});
				self.world.createEntity(Player,{
					name:       'paddleTwo',
					position:   self.world.toXY(22,6)
				});
				self.world.createEntity(Ball,{
					name:		'ball',
					position:	self.world.toXY(10,6),
					interval:	4
				});
			},
			update: function(){
				var keys = this.input.keyboard.activeKeys();
				if(keys.length > 0){
					if(keys.indexOf('w') > -1 || keys.indexOf('comma') > -1){
						this.world.entities.paddleOne.move(-1);
					}
					if(keys.indexOf('s') > -1 || keys.indexOf('o') > -1){
						this.world.entities.paddleOne.move(1);
					}
					
					if(keys.indexOf('up') > -1){
						this.world.entities.paddleTwo.move(-1);
					}
					if(keys.indexOf('down') > -1){
						this.world.entities.paddleTwo.move(1);
					}
				}
			},
			paint: function(){}
		});
	
	game.bind.key('z',function(){
		game.world.entities.ball.stop();
		console.log('LOG:','ball animation stopped.');
	});
	
	game.bind.key('x',function(){
		game.world.entities.ball.play();
		console.log('LOG:','ball animation started.');
	});
	
	////////////////////////////////
	//	DEBUGGING
		game.bind.key('shift + graveaccent',function(){
			console.log(game.input.keyboard.activeKeys());
		});
		game.bind.key('shift + 1',function(){
			game.world.maps.load('empty');
		});
		game.bind.key('shift + 2',function(){
			game.world.maps.load('map1');
		});
	////////////////////////////////
	
	game.start();
});
