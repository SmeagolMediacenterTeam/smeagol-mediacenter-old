SMC.Api.Controller.Serie = new GollumJS.Class ({
	
	Extends: SMC.Api.Core.Controller,
	
	getAction: function () {
		console.log ("Cool");
		
		return {
			"test1":1,
			"test2":"2",
			"test3":1.5,
			"test4":false
		};
	}
	
});

