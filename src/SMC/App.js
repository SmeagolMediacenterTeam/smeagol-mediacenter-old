SMC.App = new GollumJS.Class ({
	
	httpServer: null,
	templator: null,
	
	Static: {
		
		instance: null,
		
		start: function () {
			this.instance = new this();
		}
		
	},
	
	initialize: function () {
		this.httpServer = new SMC.HTTP.HTTPServer(this);
		this.templator  = new SMC.Template.Templator(this);
	}
	
});

