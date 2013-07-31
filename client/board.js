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
  pierres: function() {
    return Session.get('Pierre');
  },
  feuilles: function() {
    return Session.get('Feuille');
  },
  ciseaux: function() {
    return Session.get('Ciseaux');
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
    return Session.get('Pierre');
  },
  scoreFeuilles: function() {
    return Session.get('Feuille');
  },
  scoreCiseaux: function() {
    return Session.get('Ciseaux');
  },
  startstop: function() {
    return Session.get('gameRun') ? 'STOP' : 'JOUER';
  },

});