require(['jquery','engine/engine','entities/player'],function($,Engine,Player){
	var game = new Engine({
		screen:	$('#screen')[0],
		init: function(){
			var self = this;

			self.world.createEntity(Player,{
				name:	'paddleOne',
				position: self.world.toXY(1,6)
			});
			self.world.createEntity(Player,{
				name:	'paddleTwo',
				position: self.world.toXY(22,6)
			});
		},
		update: function(){
			var keys = this.input.keyboard.activeKeys();
			if(keys.length > 0){
				if(keys.indexOf('w') > -1){
					this.world.entities.paddleOne.move(-1);
				}
				if(keys.indexOf('s') > -1){
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
		paint: function(){
			for(entity in this.world.entities){
				this.world.entities[entity].draw();
			}
		}
	});
	
	game.bind.key('e',function(){
		console.log('input.key:','e');
	});
	
	game.start();
});