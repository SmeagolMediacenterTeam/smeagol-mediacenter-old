SMC = SMC | {};

require('express');

SMC.App = new GollumJs.Class ({
	
	serverHttp: null,
	
	Static: {
		
		instance: null,
		
		start: function () {
			this.instance = new this();
		}
		
	},
	
	initialize: function () {
		console.log("hello world");
	}
	
});

