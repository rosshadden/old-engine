define(['main'],function(engine){
    var _numEntities = 0;
    var _entities = {};

	return {
		cell: {
			width:  25,
			height:  25
		},
        add_entity: function(e) {
            _entities[_numEntities++] = e;
        },
        entities: _entities
	};
});
