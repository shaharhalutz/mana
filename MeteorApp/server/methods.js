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
    // first remove associated Players:
    Players.remove({battleId: _id});

    Battles.remove({_id: _id});
  },

  'joinBattle': function(_id) {
    // already joined this battle?
    const joinedAlready = Players.findOne({userId : Meteor.userId(),battleId:_id});
    if (!joinedAlready){
      const newPlayerId = Players.insert({
        userId:Meteor.userId(),
        battleId:_id,
        instanceBeingCast:null
      });

      // DEBUG:
      const newPlayer = Players.findOne({_id : newPlayerId});
      if(newPlayer){
        console.log('joinBattle:  done. Players joined: '+newPlayer.userInfo().profile.name);
      }
    }
  },

  'createSpellInstance': function(spellId,casterId,targetIds) {
    console.log('createSpellInstance: spellId: '+spellId);
    console.log('createSpellInstance: casterId: '+casterId);
    console.log('createSpellInstance: targetIds count: '+targetIds.length);

    const spellInstanceId = SpellInstances.insert({
      processed: false,
      createdAt: new Date(),
      spellId: spellId,
      casterId:casterId,
      targetIds:targetIds
    });
    Players.update({_id: casterId}, {$set: {instanceBeingCast: spellInstanceId}});
  },

  'processSpellInstance': function(spellInstanceId,potency) {
    console.log('processSpellInstance: spellInstanceId: '+spellInstanceId);
    console.log('processSpellInstance: potency: '+potency);

    const spellInstance = SpellInstances.findOne({_id : spellInstanceId});
    spellInstance.processSpell();
  }
});
