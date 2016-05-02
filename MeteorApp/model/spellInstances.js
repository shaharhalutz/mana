//SpellInstances = new Mongo.Collection('spellInstances');

// create an object with the desired methods to use as prototype
var spellInstance = {
  spell: function () {
    return Spells.findOne({_id: this.spellId});
  },
  caster: function () {
    return  Players.findOne( {    _id: this.casterId } );
  },
  targets: function () {
    return  Players.find( { _id:{"$all": this.targetIds } } );
  },

  // we set the effectInstances on the player.activeEffects on all targets. and activate timer according to duration
  // once the effect has been activated , it will effect according to Spellinstance potency.
  processSpell: function(potency) {

      var spellInstance = this;
      var spell = spellInstance.spell();


      // activate caster spell effects :
      var caster = spellInstance.caster()
      spell.casterEffects().forEach( function(effect) {
        // add effectInstance to caster active effects:
        console.log('add caster effect:' + effect.name);
      });

      // TBD: BUG when more than 1 target - doesnt work
      // activate targets spell effects :
      spellInstance.targets().forEach( function(target) {

        spell.targetEffects().forEach( function(effect) {
          // Players.update({_id: target._id}, {$addToSet: {'activeEffectIds': effect._id}});
          console.log('add target effect: ' + effect.name + ' on: '+ target.userInfo().profile.name);
          EffectInstances.insert({playerId:target._id,hp:effect.hp,name:effect.name,duration:3,processed:false});

        });

      });

      // mark as processed spell (TBD: set potency):
      SpellInstances.update({_id: this._id}, {$set: {processed: true,potency:potency}});
      Players.update({_id: this.casterId}, {$set: {instanceBeingCast: null}});
    }
};

SpellInstances = new Meteor.Collection("spellInstances", {
  transform: function (doc) {
    // create a new empty object with pomodoro as it's prototype
    var newInstance = Object.create(spellInstance);

    // copy the data from doc to newInstance and return newInstance
    return  _.extend(newInstance, doc);
  }
});
