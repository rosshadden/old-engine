define(function(){
    var	_numEntities = 0,
		entities = {},
		
		cell = {
			width:	25,
			height:	25
		},
		
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
		createEntity:	createEntity,
		toGrid:			toGrid,
		toXY:			toXY
	};
});
