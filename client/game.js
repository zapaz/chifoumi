//////////////////////////////////////////////////////////
// GAME.JS
//////////////////////////////////////////////////////////

var choixLibelle = 'Votre choix ?';
var duree = 3000;
var pause = 2000;
var delta = duree / 100;
var playLabel
var stop;

gameInit = function() {
  console.log('gameInit');
  Session.set('Pierre', 0);
  Session.set('Feuille', 0);
  Session.set('Ciseaux', 0);
};

// boucle infinie
gameStart = function() {
  console.log('gameStart');

  Session.set('gameRun', true);
  Session.set('gameProgression', 0);
  gameProgression();

  Session.set('Choix', false);
};

// Stop le jeu
gameStop = function() {
  Session.set('gameRun', false);
  Session.set('gameProgression', 0);
  Session.set('Choix', false);
}

// choix 
gameChoice = function(e) {
  if (Session.get('gameRun') && ! Session.get('Choix') ) {
    var choix = $(e.target).text();

    console.log('Choix: ' + choix);
    Session.set('Choix', choix);
    Session.set(choix, Session.get(choix) + 1);
  }
};

gameStartStop = function(e) {
  var startstop = $(e.target).text();
  console.log(startstop);

  if ( Session.get('gameRun') ) {
    if (startstop === 'STOP') {
      gameStop();
    }
  } else if (startstop === 'JOUER') {
    gameStart();
  }
};


// boucle finie pour la barre de progression
gameProgression = function() {
  var p = Session.get('gameProgression');
  // console.log('gameProgression p:' + p);

  // Répète jusqu'à 100 fois, ie 100%
  if (Session.get('gameRun')) {
    if (p < 100) {
      Session.set('gameProgression', p + 1);
      setTimeout(gameProgression, delta);
    } else {
      setTimeout(gameStart, pause);
    }
  }
};


Template.progression.helpers({
  gameProgression: function() {
    return Session.get('gameProgression');
  },
});