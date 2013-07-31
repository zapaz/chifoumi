//////////////////////////////////////////////////////////
// GAME.JS
//////////////////////////////////////////////////////////
Meteor.subscribe('allGames');

var choixLibelle = 'Votre choix ?';
var playLabel
var stop;


// boucle infinie
gameStart = function() {
  console.log('gameStart');
  Session.set('gameProgression', 0);
  Session.set('Choix', false);
  Session.set('gameRun', true);
  gameProgression();
};


// boucle finie pour la barre de progression
gameProgression = function() {
  currentTime = new Date().getTime();
  //console.log('gameProgression ' + currentTime);
  var progression = 0;
  var game = Games.findOne({
    status: 'running'
  });

  if (game) {
    Session.set('gameId', game._id);

    stime = game.start_time;
    etime = game.start_time;
    if (stime && etime) {
      duree = etime - stime;
      if (duree) {
        if (currentTime < stime) progression = 0;
        else if (currentTime > etime) progression = 100;
        else {
          progression = 100 * (currentTime - stime) / (duree);
        }
      }
    }
  }

  Session.set('gameProgression', progression);
  if (progression < 100) {
    setTimeout(gameProgression, 1000);
  }
};



// Stop le jeu
gameStop = function() {
  Session.set('gameRun', false);
  Session.set('Choix', false);
}

// choix 
gameChoice = function(e) {
  if (Session.get('gameRun') && !Session.get('Choix')) {
    var choix = $(e.target).text();

    console.log('Choix: ' + choix);
    Session.set('Choix', choix);
    Session.set(choix, Session.get(choix) + 1);

    var currentTime = new Date().getTime();
    Meteor.call('setChoice', 'al', choix, currentTime);
  }
};

gameStartStop = function(e) {
  var startstop = $(e.target).text();
  console.log(startstop);

  if (Session.get('gameRun')) {
    if (startstop === 'STOP') {
      gameStop();
    }
  } else if (startstop === 'JOUER') {
    gameStart();
  }
};