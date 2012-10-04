var app = app || {};

$(function() {

	app.PersonView = Backbone.View.extend({

		tagName:  'li',
		template: _.template( $('#item-template').html() ),

		events: {
			"click .editBtn": "startEdit",
			"click .saveBtn": "saveChange",
			"click .cancelBtn": "endEdit"
		},

		initialize: function() {
			this.model.on( 'change', this.render, this );
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			this.input = this.$('.editInput');
			return this;
		},

		startEdit: function() {
			this.$el.addClass('editing');
			this.input.focus();
		},
		
		endEdit: function() {
		  this.$el.removeClass('editing');
		},

		saveChange: function() {
			var value = this.input.val().trim();

			if ( value ) {
				this.model.save({ mood: value });
			} else {
				this.clear();
			}

			this.endEdit();
		},
	});
  
  
  
  
  /*This is our main app*/
	app.AppView = Backbone.View.extend({

		el: '#mood_app',

		events: {
			'keypress #new-person': 'createOnEnter'
		},

		initialize: function() {
			this.input = this.$('#new-person');
			this.$main = this.$('#main');

			window.app.Persons.on( 'add', this.addOne, this );
			window.app.Persons.on( 'reset', this.addAll, this );
			window.app.Persons.on( 'all', this.render, this );

			app.Persons.fetch();
		},

		render: function() {
			if ( app.Persons.length ) {
				this.$main.show();
			} else {
				this.$main.hide();
			}
		},

		addOne: function( person ) {
			var view = new app.PersonView({ model: person });
			$('#person-list').append( view.render().el );
		},

		addAll: function() {
			this.$('#person-list').html('');
			app.Persons.each(this.addOne, this);
		},

		newAttributes: function() {
			return {
				name: this.input.val().trim(),
				mood: "unset"
			};
		},

		createOnEnter: function( e ) {
			if ( e.which !== ENTER_KEY || !this.input.val().trim() ) {
				return;
			}

			app.Persons.create( this.newAttributes() );
			this.input.val('');
		}
		
	});
	
	

});
