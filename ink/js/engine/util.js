define(function(){
	return {
        inherit: (function(){
            var Temp = function(){};
            return function(Child,Parent){
                Temp.prototype = Parent.prototype;
                Child.prototype = new Temp();
                Child.uber = Parent.prototype;
                Child.prototype.constructor = Child;
				return Child;
            };
        })(),
        
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