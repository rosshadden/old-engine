var	io,
	express = require('express'),
	app = express.createServer(),
	Session = require('connect').middleware.session.Session,
	sessionStore = new express.session.MemoryStore(),
	parseCookie = require('connect').utils.parseCookie,
	parseURL = require('url').parse,
	
	auth = require('./auth'),
	
	ONLINE = true,
	
	players = {},
	
	init = function(){
		app.configure(function(){
			app.set('views',__dirname + '/views');
			app.set('view engine','jade');
			app.use(express.bodyParser());
			app.use(express.cookieParser());
			app.use(express.session({
				store:	sessionStore,
				secret:	'shhhItIsASecret',
				key:	'express.sid'
			}));
			if(process.argv[3] === 'offline'){
				ONLINE = false;
				console.log('::OFFLINE::');
			}
			app.use(require('./auth').configure(app));
			app.use(app.router);
			app.use(express.static(__dirname + '/ink'));
		});
		
		app.listen(+(process.argv[2] || process.env.PORT || 80));
		
		io = require('socket.io').listen(app);
		io.set('log level',1);
		
        console.log(app.address());
		console.log('http://localhost:%d | %s',app.address().port,app.settings.env);
	},
	serve = function(){
		init();
		
		app.get('/',function(request,response){
			response.render('index');
		});
		
		app.get('/GET',function(request,response){
			var data = '',
				url = parseURL(request.url,true);
			response.contentType('application/json');
			
			switch(url.query.on){
				case 'debug':
					data = 'debug';
					break;
				default:
					data = 'default';
			}
			
			response.end(JSON.stringify(data));
		});
		
		io.set('authorization',function(data,accept){
			if(data.headers.cookie){
				data.cookie = parseCookie(data.headers.cookie);
				data.sessionID = data.cookie['express.sid'];
				//	save the session store to the data object 
				//	(as required by the Session constructor)
				data.sessionStore = sessionStore;
				sessionStore.get(data.sessionID,function(err,session){
					if(err || !session){
						accept('Error',false);
					}else{
						//	create a session object, passing data as request and our
						//	newly acquired session data
						data.session = new Session(data,session);
						accept(null,true);
					}
				});
			}else{
			   return accept('No cookie transmitted.',false);
			}
		});
		io.sockets.on('connection',function(socket){
			console.log('Somebody just connected.');
		});
	};
exports.serve = serve;