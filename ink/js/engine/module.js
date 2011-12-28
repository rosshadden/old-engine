var module = (function(){
	var moduleName,moduleDependencies,moduleDefinition,
		
		creation = function(module){
			moduleName = module || '';
			return methods;
		},
		requirements = function(modules){
			moduleDependencies = modules || [];
			return methods;
		},
		definition = function(method){
			moduleDefinition = method || function(){};
			define(moduleName,moduleDependencies,moduleDefinition);
		},
		
		methods = {
			create:	creation,
			require:requirements,
			define:	definition
		};
	
	return methods;
})();