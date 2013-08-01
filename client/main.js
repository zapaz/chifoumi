Meteor.startup(function() {
	gameInit();
	gameStart();
});

var gameNumber = 0;

Deps.autorun(function() {
	if (Session.get('gamePlay')) {
		if (gameNumber === Session.get('gameNumber')) {
			console.log('Fin du Jeu n°' + gameNumber);
			gameScore();
		} else {
			gameNumber = Session.get('gameNumber');
			console.log('Nouveau Jeu n°' + gameNumber);

			Session.set('gameProgression', 0);
			Session.set('Choix', false);
			gameProgression();
		}
	}
});