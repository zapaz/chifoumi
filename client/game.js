//////////////////////////////////////////////////////////
// GAME.JS
//////////////////////////////////////////////////////////
Meteor.subscribe('allGames');

var choixLibelle = 'Votre choix ?';
var playLabel
var stop;
var nbProg = 0;

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
  nbProg++;
  // console.log('gameProgression nbProg:' + nbProg);

  var progression = 0;
  var game = Games.findOne({
    status: 'running',
    start_time: {
      $lt: currentTime
    },
    end_time: {
      $gt: currentTime
    },
  });

  if (game) {
    // console.log('gameProgression Game find ! <= ' + currentTime);
    Session.set('gameId', game._id);

    stime = game.start_time;
    etime = game.end_time;
    duree = etime - stime;
    if (duree) {
      progression = 100 * (currentTime - stime) / (duree);
    }
  }
  Session.set('gameProgression', progression);
  if (progression < 100) {
    Meteor.setTimeout(gameProgression, 10);
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