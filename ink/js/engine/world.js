define(function(){
    var	_numEntities = 0,
		entities = {},
		
		cell = {
			width:	25,
			height:	25
		},
		
		//	Possibly consider breaking this out into its own module,
		//	and probably still referring to it here:  maps = require('maps');
		maps = (function(){
			var cache = {},
				
				fetch = function(mapPath){
					var def = new $.Deferred;
					
					$.getJSON('/maps/' + mapPath,function(map){
						cache[mapPath] = map;
						def.resolve(map);
					});
					
					return def.promise();
				};
			
				get = function(mapPath){
					
				};
			return {
				get:	get
			};
		})(),
		
		createEntity = function(type,properties){
			_numEntities++;
			entities[properties.name] = new type(properties);
		},
		
		toGrid = function(x,y){
			if(typeof y === 'undefined'){
				if(typeof x === 'object'){
					y = x.y || x.top || null;
					x = x.x || x.left || null;
				}else{
					return Math.floor(x / cell.width);
				}
			}
			return {
				x:	Math.floor(x / cell.width),
				y:	Math.floor(y / cell.height)
			};
		},
		
		toXY = function(x,y){
			if(typeof y === 'undefined'){
				if(typeof x === 'object'){
					y = x.y;
					x = x.x;
				}else{
					return x * cell.width;
				}
			}
			return {
				x:	x * cell.width,
				y:	y * cell.height
			};
		};

	return {
        entities:		entities,
		cell:			cell,
		maps:			maps,
		createEntity:	createEntity,
		toGrid:			toGrid,
		toXY:			toXY
	};
});
