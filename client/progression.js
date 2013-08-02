Template.progression.helpers({
	gameProgression: function() {
		return Session.get('gameProgression');
	},
});

Template.navbar.helpers({
	gameNumber: function() {
		return Session.get('gameNumber');
	},
});