SMC.App = new GollumJS.Class ({
	
	entityManager: null,
	httpServer: null,
	templator: null,
	
	Static: {
		
		instance: null,
		
		start: function () {
			this.instance = new this();
		}
		
	},
	
	initialize: function () {
		this.entityManager = new SMC.ORM.EntityManager(this);
		this.httpServer = new SMC.HTTP.HTTPServer(this);
		this.templator  = new SMC.Template.Templator(this);
	}
	
});

