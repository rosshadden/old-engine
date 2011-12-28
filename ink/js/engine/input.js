define(['lib/keyboard'],function(keyboard){
	var KEYS = {
			65:	'a',
			68:	'd',
			83:	's',
			87:	'w'
		},
		CODES = (function(){
			var codes = {};
			for(key in KEYS){
				codes[KEYS[key]] = key;
			}
			return codes;
		})();
	
	return {
		keyboard:	keyboard,
		keys:		KEYS,
		codes:		CODES
	};
});