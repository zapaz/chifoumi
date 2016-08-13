//////////////////////////////////////////////////////////
// GAME.JS
//////////////////////////////////////////////////////////
Meteor.subscribe('allGames');

var choixLibelle = 'Votre choix ?';
var playLabel
var stop;
var scoreTotal = 0;

getScoreTotal = function() {
  return scoreTotal;
}

gameInit = function(game) {
  Session.set('votesPierres', '?');
  Session.set('votesFeuilles', '?');
  Session.set('votesCiseaux', '?');
  Session.set('scorePierres', '?');
  Session.set('scoreFeuilles', '?');
  Session.set('scoreCiseaux', '?');
};

// boucle finie pour la barre de progression
gameProgression = function() {
  var progression = 0;
  var game = getCurrentGame();
  if (game) {
    if (game._id !== Session.get('gameId')) {
      Session.set('gameId', game._id);
      Session.set('gameNumber', game.number);
      Session.set('gameRunning', true);
      gameInit();
    }
    progression = getCurrentGameProgression(game);
  }
  Session.set('gameProgression', progression);
  if (progression < 100) {
    Meteor.setTimeout(gameProgression, 10);
  }
};


// Stop le jeu
gameStop = function() {
  Session.set('gamePlay', false);
  Session.set('Choix', false);
}

// Redémarre le jeu
gameStart = function() {
  Session.set('gamePlay', true);
};

// choix
gameScore = function() {
  console.log('gameScore');

  var monScore = 0;
  console.log('gameScore monScore:' + monScore);

  Session.set('gameRunning', false);
  game = getGame(Session.get('gameId'));

  if (game){
    Session.set('votesPierres', game.votes_pierres);
    Session.set('votesFeuilles', game.votes_feuilles);
    Session.set('votesCiseaux', game.votes_ciseaux);
    Session.set('scorePierres', game.points_pierres);
    Session.set('scoreFeuilles', game.points_feuilles);
    Session.set('scoreCiseaux', game.points_ciseaux);
    console.log('gameScore game:', game);    
  }

  var choix = Session.get('Choix');
  console.log('gameScore choix:' + choix);

  if (choix === 'Pierre') monScore = game.points_pierres;
  else if (choix === 'Feuille') monScore = game.points_feuilles;
  else if (choix === 'Ciseaux') monScore = game.points_ciseaux;

  if (monScore) scoreTotal += monScore;
  console.log('gameScore monScore:' + monScore);
  console.log('gameScore scoreTotal:' + scoreTotal);
}

// choix
gameChoice = function(e) {
  // gamePlay : en train de jeu
  // gameRunning : un jeu est démarré par le serveur
  // ! CHoix : le choix n'est pas encore fait
  if (Session.get('gamePlay') && Session.get('gameRunning') && !Session.get('Choix')) {
    var choix = $(e.target).text();

    console.log('Choix: ' + choix);
    Session.set('Choix', choix);
    Session.set(choix, Session.get(choix) + 1);
    if (choix == 'Pierre') Session.set('votesPierres', '+1');
    else if (choix == 'Feuille') Session.set('votesFeuilles', '+1');
    else if (choix == 'Ciseaux') Session.set('votesCiseaux', '+1');

    var currentTime = new Date().getTime();
    Meteor.call('setChoice', Session.get('gameId'), 'al', choix, currentTime);
  }
};

gameStartStop = function(e) {
  var startstop = $(e.target).text();
  console.log(startstop);

  if (Session.get('gamePlay')) {
    if (startstop === 'STOP') {
      gameStop();
    }
  } else if (startstop === 'JOUER') {
    gameStart();
  }
};

getCurrentGameProgression = function(game) {
    // console.log('getCurrentGameProgression');
    var progression = 0;
    var currentTime = new Date().getTime();
    if (game) {
        stime = game.start_time;
        etime = game.end_time;
        duree = etime - stime;
        progression = duree ? Math.ceil(100 * (currentTime - stime) / duree) : 100;
    }
    return progression;
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
