Template.board.events({
  'click .pfc': function(e) {
    gameChoice(e);
  },
  'click .startstop': function(e) {
    gameStartStop(e);
  },
});

Template.board.helpers({
  labelChoix: function() {
    return Session.get('Choix') ? 'Bon choix !' : 'Votre choix ?';
  },
    btnChoix: function() {
    return Session.get('Choix') ? 'btn-info' : 'btn-success';
  },
  votesPierres: function() {
    return Session.get('votesPierres');
  },
  votesFeuilles: function() {
    return Session.get('votesFeuilles');
  },
  votesCiseaux: function() {
    return Session.get('votesCiseaux');
  },
  btnPierre: function() {
    return Session.get('Choix') === 'Pierre' ? 'btn-info' : '';
  },
  btnFeuille: function() {
    return Session.get('Choix') === 'Feuille' ? 'btn-info' : '';
  },
  btnCiseaux: function() {
    return Session.get('Choix') === 'Ciseaux' ? 'btn-info' : '';
  },
  scorePierres: function() {
    return Session.get('scorePierres');
  },
  scoreFeuilles: function() {
    return Session.get('scoreFeuilles');
  },
  scoreCiseaux: function() {
    return Session.get('scoreCiseaux');
  },
  scoreTotal: function() {
    return Session.get('scoreTotal');
  },
  startstop: function() {
    return Session.get('gamePlay') ? 'STOP' : 'JOUER';
  },
});