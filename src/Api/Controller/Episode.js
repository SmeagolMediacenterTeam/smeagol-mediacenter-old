Api.Controller.Episode = new GollumJS.Class ({
	
	Extends: Api.Core.Controller,
	
	getAction: function () {
		
		console.log ("Cool2");
		
		return {
			"test1":1,
			"test2":"2",
			"test3":1.5,
			"test4":false
		};
	}
	
});

