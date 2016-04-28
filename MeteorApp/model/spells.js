//Spells = new Mongo.Collection('spells');

var spell = {

  targetEffects: function () {
    return  Effects.find( { _id:{"$all": this.spellTargetsEffectsIds } });

  },
  casterEffects: function () {

    return  Effects.find( { _id:{"$all": this.spellCasterEffectsIds } });

  }
}

Spells = new Meteor.Collection("spells", {
  transform: function (doc) {
    // create a new empty object with pomodoro as it's prototype
    var newInstance = Object.create(spell);

    // copy the data from doc to newInstance and return newInstance
    return  _.extend(newInstance, doc);
  }
});
