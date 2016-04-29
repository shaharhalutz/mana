Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('battles', function() {
  return Battles.find();
});

Meteor.publish('players', function(battleId) {
  return Players.find({battleId:battleId});
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('spells', function() {
  return Spells.find();
});

Meteor.publish('effects', function() {
  return Effects.find();
});

Meteor.publish('spellInstances', function(battleId) {
  return SpellInstances.find({battleId:battleId});
});
