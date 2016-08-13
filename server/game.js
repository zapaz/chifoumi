var gameDuree = 5000;
var gamePause = 5000;
var gameNumber = 0;
var gameProgression;
var gameStartTime;
var gameEndTime;
var gameId;

var pierre = 0;
var feuille = 0;
var ciseaux = 0;
var computerNumber = 9;

_setChoice = function(id, name, choice, time) {
    console.log('setChoice ' + id + ' ' + name + ' ' + choice);
    Votes.insert({
        game_id: id,
        name: name,
        choice: choice,
        time: time,
    })
}

_startSession = function() {
    console.log('startSession <= ');

    _startGame();
    Meteor.setInterval(function() { 
        _startGame()
    }, gameDuree + gamePause);
}

_startGame = function() {
    gameStartTime = new Date().getTime();
    gameEndTime = gameStartTime + gameDuree;
    Meteor.setTimeout(_endGame, gameDuree)

    gameNumber++;
    console.log('startGame ' + gameNumber);
    gameId = Games.insert({
        number: gameNumber,
        start_time: gameStartTime,
        end_time: gameEndTime,
        duree: gameDuree,
        pause: gamePause,
        status: 'running',
    });

    for (var i = 0; i < computerNumber; i++) {
        var choice = Random.choice(['Pierre', 'Feuille', 'Ciseaux']);
        _setChoice(gameId, 'computer' + i, choice, gameStartTime);
    };
}

_endGame = function() {
    console.log('endGame ' + gameNumber);

    Games.update(gameId, {
        $set: {
            status: 'ended',
        }
    });

    var votesPierres = Votes.find({
        game_id: gameId,
        choice: 'Pierre'
    }).count();
    var votesFeuilles = Votes.find({
        game_id: gameId,
        choice: 'Feuille'
    }).count();
    var votesCiseaux = Votes.find({
        game_id: gameId,
        choice: 'Ciseaux'
    }).count();

    var pointsPierres = votesCiseaux - votesFeuilles;
    var pointsFeuilles = votesPierres - votesCiseaux;
    var pointsCiseaux = votesFeuilles - votesPierres;

    Games.update(gameId, {
        $set: {
            votes_pierres: votesPierres,
            votes_feuilles: votesFeuilles,
            votes_ciseaux: votesCiseaux,
            points_pierres: pointsPierres,
            points_feuilles: pointsFeuilles,
            points_ciseaux: pointsCiseaux,
        }
    });
}
