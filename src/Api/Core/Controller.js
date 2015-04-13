Api.Core.Controller = new GollumJS.Class ({
	
	app: null,
	req: null,
	res: null,
	
	initialize: function (app, req, res) {
		
		this.app = app;
		this.req = req;
		this.res = res;
		
	}
	
});

