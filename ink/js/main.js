require(['lib/jquery','engine/engine'],function($,engine){
	console.log('main loaded.',engine);
	
	engine.init();
});