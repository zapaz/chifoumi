Template.board.events({
    'click .pfc': function(e) {
        gameChoice(e);
    },
    'click .startstop': function(e) {
        gameStartStop(e);
    },
});

Template.board.helpers({
    message: function() {
        return ( Session.set('gameRunning') ?
          (Session.get('Choix') ? 'Votre choix: ' +  Session.get('Choix') : 'Faites votre choix') :
          'Attendez' );
    },
    btnChoix: function() {
        return Session.get('Choix') ? 'btn-info' : 'btn-success';
    },
    scoreTotal: function() {
        return getScoreTotal();
    },
    startstop: function() {
        return Session.get('gamePlay') ? 'STOP' : 'JOUER';
    },
});
