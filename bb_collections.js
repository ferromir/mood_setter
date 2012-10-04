var app = app || {};

$(function() {

	var PersonList = Backbone.Collection.extend({
	
		model: app.Person,
		
		localStorage: new Store('persons-backbone')	
		
	});

	app.Persons = new PersonList();
  
});
