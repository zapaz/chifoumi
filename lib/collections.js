Games = new Meteor.Collection("games");

getGame = function(gameId) {
    return Games.findOne(gameId);
}
