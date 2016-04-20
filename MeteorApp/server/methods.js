Meteor.methods({
  //items:
  'addItem': function() {
    const i = Items.find().count();
    Items.insert({
      completed: false,
      createdAt: new Date(),
      name: `Item #${i}`
    });
  },

  'removeItem': function(_id) {
    Items.remove({_id: _id});
  },

  // battles:
  'createBattle': function() {
    const i = Battles.find().count();
    Battles.insert({
      completed: false,
      createdAt: new Date(),
      name: `Battle #${i}`
    });
  },

  'removeBattle': function(_id) {
    Battles.remove({_id: _id});
  },

  'joinBattle': function(_id) {
    Players.insert({
      userId:Meteor.userId(),
      battleId:_id
    });

    console.log('joinBattle:  done. Players count: '+Players.find().count());
  }
});
