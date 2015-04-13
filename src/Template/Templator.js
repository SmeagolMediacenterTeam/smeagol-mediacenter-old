Template.Templator = new GollumJS.Class ({
	
	app: null,
	swig: null,
	rootPath: "../web/",
	
	
	initialize: function (app) {
		
		this.app = app;
		this. swig = require('swig');
	}, 
	
	renderFile: function (path, params) {
		return this.swig.renderFile (this.rootPath+path, params);
	}
	
});

