Games = new Meteor.Collection("games");

getGame = function(gameId) {
	return Games.findOne(gameId);
}

getCurrentGame = function() {
	// console.log('getCurrentGame');
	var currentTime = new Date().getTime();
	var game = Games.findOne({
		status: 'running',
		start_time: {
			$lt: currentTime
		},
		end_time: {
			$gt: currentTime
		},
	});
	return game;
}

getCurrentGameProgression = function(game) {
	// console.log('getCurrentGameProgression');
	var progression = 0;
	var currentTime = new Date().getTime();
	if (game) {
		stime = game.start_time;
		etime = game.end_time;
		duree = etime - stime;
		if (duree) {
			progression = 100 * (currentTime - stime) / (duree);
		}
	}
	return progression;
}