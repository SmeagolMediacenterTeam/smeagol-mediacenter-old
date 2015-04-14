SMC.App = new GollumJS.Class ({
	
	entityManager: null,
	httpServer: null,
	templator: null,
	annotationsManager: null,
	
	Static: {
		
		instance: null,
		
		start: function () {
			this.instance = new this();
		}
		
	},
	
	initialize: function () {

		this.annotationsManager = new GollumJS.Annotation.Manager ();

		//this.entityManager      = new GollumJS.ORM.EntityManager(this);
		//this.httpServer         = new SMC.HTTP.HTTPServer(this);
		//this.templator          = new SMC.Template.Templator(this);
	}
	
});

