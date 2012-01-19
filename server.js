var	io,
	express = require('express'),
	app = express.createServer(),
	Session = require('connect').middleware.session.Session,
	sessionStore = new express.session.MemoryStore(),
	parseCookie = require('connect').utils.parseCookie,
	parseURL = require('url').parse,
	
	auth = require('./server/auth'),
	
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
			app.use(auth.configure(app));
			app.use(app.router);
			app.use(express.static(__dirname + '/ink'));
		});
		
		app.listen(+(process.argv[2] || process.env.PORT || 80));
		
		io = require('socket.io').listen(app);
		io.set('log level',1);
		
		console.log('http://%s:%d | %s',app.address().address,app.address().port,app.settings.env);
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
			
			switch(url.query.for){
				case 'debug':
					data = 'debug';
					break;
				default:
					data = 'default';
			}
			
			response.json(data);
		});
		
		app.get('/maps/:path',function(request,response){
			//	WHY DOES THIS ERROR OUT?!?!?
			//var map = require('./ink/maps/' + request.params.path + '.json');
			
			var temporaryMapBecauseOfTheAboveBug = {
				"properties":	{
					"name":			"home",
					"description":	"This is the house that Ross built?",
					"dimensions":	{
						"width":	24,
						"height":	16
					}
				},
				"background":	{
					"color":	"#996633"
				},
				"tiles":	[
					{
						"type":	"building",
						"src":	"pokemon.png",
						"destination": {
							"position": {
								"x":	1,
								"y":	1
							},
							"dimensions": {
								"w":	75,
								"h":	70
							}
						},
						"source": {
							"position": {
								"x":	0,
								"y":	0
							},
							"dimensions": {
								"w":	82,
								"h":	70
							}
						},
						"door": {
							"map": {
								"x":	1,
								"y":	1
							},
							"instance": {
								"x":	7,
								"y":	6
							},
							"at": {
								"x":	7,
								"y":	6
							},
							"to": {
								"x":	3,
								"y":	7
							}
						}
					},{
						"type":	"structure",
						"src":	"wall.jpg",
						"destination": {
							"position": {
								"x":	1,
								"y":	15
							},
							"dimensions": {
								"w":	25,
								"h":	25
							}
						},
						"source": {
							"position": {
								"x":	0,
								"y":	0
							},
							"dimensions": {
								"w":	154,
								"h":	154
							}
						},
						"repeatX":	23,
						"except": [{
							"x":	2,
							"y":	15
						},{
							"x":	3,
							"y":	15
						},{
							"x":	10,
							"y":	15
						},{
							"x":	11,
							"y":	15
						},{
							"x":	12,
							"y":	15
						},{
							"x":	13,
							"y":	15
						}]
					}
				]
			};
			
			response.contentType('application/json');
			
			response.json(temporaryMapBecauseOfTheAboveBug);
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