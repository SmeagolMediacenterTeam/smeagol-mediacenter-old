SMC.HTTP.HTTPServer = new GollumJS.Class ({
	
	app: null,
	express: null,
	controller: null,
	port: 8080,
	
	Static: {
		
		ACTION_SUFFIX: "Action"
		
	},
	
	initialize: function (app) {

		console.log("Initialize HTTP Server");
		
		var _this = this;
		this.app = app;
		
		var express = require('express');
		this.express = new express();
		
		this.express.get('/api/:controller/:action', function(req, res) {
			return _this.callApi (req, res);
		});
		this.express.get('/home', function(req, res) {
			return _this.callHome (req, res);
		});
		
		this.self.closeAllHttpServer ();
		this.start ();
	},

	close: function () {

		console.log("Close HTTP Server : "+this.port);

		this.express.close ();
	},

	start: function () {

		console.log("Start HTTP Server");

		this.express.listen(this.port);
	},
	
	callApi: function (req, res) {
		
		var controller = req.params.controller;
		var action     = req.params.action;
		controller = controller.substr(0, 1).toUpperCase () + controller.substr(1);
		
		console.info ("Call action api : Api.Controller."+controller+"."+action+"Action()");
		
		res.setHeader('Content-Type', 'application/json');
		
		if (
			typeof SMC.Api.Controller[controller] == 'function' &&
			typeof SMC.Api.Controller[controller].prototype == 'object' &&
			typeof SMC.Api.Controller[controller].prototype[action+this.self.ACTION_SUFFIX] == 'function'
		) {
			
			this.controller = new SMC.Api.Controller[controller] (this.app, req, res);
			
			var json = this.controller[action+this.self.ACTION_SUFFIX]();
			
			res.end(JSON.stringify(json));
		} else {
		
			console.log ("Page not found: Api.Controller."+controller+"."+action+"Action()");
		
	   		res.status(404).send('null');
	   		
   		}
	},
	
	callHome: function (req, res) {
		res.setHeader('Content-Type', 'text/html');
		var responseContent = this.app.templator.renderFile ('home.tmpl', {});
		res.end(responseContent);
	}
	
});

