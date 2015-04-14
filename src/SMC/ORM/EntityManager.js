SMC.ORM.EntityManager = new GollumJS.Class ({
	
	app: null,
	orm: null,
	
	initialize: function (app) {
		
		this.app = app;
		this.orm = require('orm');

		this.orm.connect('sqlite://../sqlite/smc.db', function (err, db) {
			if (err) {
			      throw err;
			  }

			  var Subscriber = db.define('subscriber', {
			    "id":Number,
			    "bill":Number,
			    "fullname":String,
			    "houseno":String,
			    "flatno":Number,
			  });

			  Subscriber.create([
			    {

			        bill: 10,
			     	fullname: "Doe",
			     	houseno: "Doe",
			        flatno: 25,
			    },
			    {
			        bill: 10,
			     	fullname: "Liza",
			     	houseno: "Kollan",
			        flatno: 25,
			    }
			], function (err, items) {
			    // err - description of the error or null
			    // items - array of inserted items
			});
		});

	}
	
});

