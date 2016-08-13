UI.registerHelper('session', function(variable) {
    return Session.get(variable) || '';
});
UI.registerHelper('btnSelected', function(variable) {
    return Session.get('Choix') === variable ? 'btn-info' : '';
});
