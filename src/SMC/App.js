SMC.App = new GollumJS.Class ({
	
	httpServer: null,
	
	Static: {
		
		instance: null,
		templator: null,
		
		start: function () {
			this.instance = new this();
		}
		
	},
	
	initialize: function () {
		console.log("Start SMC App");
		
		this.httpServer = new HTTP.HTTPServer(this);
		this.templator  = new Template.Templator(this);
	}
	
});

