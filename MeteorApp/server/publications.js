Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('battles', function() {
  return Battles.find();
});

Meteor.publish('players', function() {
  return Players.find();
});
