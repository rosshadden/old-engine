define(function(){
	return {
		extend: function(source,target){
			var object = {};
			for(key in source){
				object[key] = source[key];
			}
			for(key in target){
				object[key] = target[key];
			}
			object.parent = source;
			return object;
		},
			
		listen: function(context){
			return function(){
				$(context).on.apply($(context),arguments);
			};
		}
	};
});