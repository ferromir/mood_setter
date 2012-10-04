var app = app || {};

$(function() {

	app.Person = Backbone.Model.extend({
	
		defaults: {
			name: "",
			mood: "unset"
		}
		
	});

});
