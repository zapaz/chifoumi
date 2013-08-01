Meteor.startup(function() {
	Session.set('scoreTotal', 17);
	gameInit();
	gameStart();
});

var gameNumber = 0;

Deps.autorun(function() {
	if (Session.get('gamePlay')) {
		if (gameNumber === Session.get('gameNumber')) {
			console.log('Fin du Jeu n°' + gameNumber);
			var monScore = gameScore();
			var score2 = Session.get('scoreTotal');
			console.log('scoreTotal:' + score2 + ' + monScore:' + monScore);
			Session.set('scoreTotal', score2 + monScore);
		} else {
			gameNumber = Session.get('gameNumber');
			console.log('Nouveau Jeu n°' + gameNumber);

			Session.set('gameProgression', 0);
			Session.set('Choix', false);
			gameProgression();
		}
	}
});