Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('battles', function() {
  return Battles.find();
});

Meteor.publish('players', function() {
  return Players.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('spells', function() {
  return Spells.find();
});
