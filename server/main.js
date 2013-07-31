Meteor.startup(function() {
	_startSession();
});

Votes = new Meteor.Collection('votes');

Meteor.methods({
	setChoice: function(name, choice, time) {
		return _setChoice(name, choice, time)
	},
});

Meteor.publish('allGames', function() {
	console.log('Meteor publish all Games')
	return Games.find({});
});
