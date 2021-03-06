Meteor.startup(function () {
  if (Items.find().count() === 0) {
    let i = 0;
    let timestamp = (new Date()).getTime();
    while (i < 10) {
      Items.insert({
        name: `Item #${i}`,
        createdAt: new Date(timestamp),
        complete: false
      });
      timestamp += 1; // ensure unique timestamp
      i += 1;
    }
  }


  /*
  // set up interval to simulate rounds for battle spells (if there are spells in the DB):
  Meteor.setInterval(function(){

    // mana recuperation:
    UserStates.find({}).forEach( function(userState) {
        if(userState.mp < userState.author().profile.mp){
                UserStates.update({_id: userState._id}, {$inc: {mp: 1}});
        }
    });

    // process active duration spells on target:
    Comments.find({ duration: { $gt: 0 } }).forEach( function(spellInstance) {
        console.log('spell has duration - activating:'+spellInstance.spell().name);
        spellInstance.activateTargetEffects();

        if(spellInstance.duration === 1){

          // remove from acitve spells: (we can assuume that active spells have only one target )
          var targetStates =  spellInstance.targetsUserStates().fetch();
          if(targetStates.length){
              UserStates.update({_id: targetStates[0]._id}, {$pull: {'activeSpellIds': spellInstance._id}});
          }
        }

        Comments.update({_id: spellInstance._id}, {$inc: {duration:-1}});

    });

  }, 6000);
  */

  var spells = [
  {
    name: 'Fireball',
    description: 'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. A target takes 8d6 fire damage.',
    command: 'enflame',
    durationMod: 0,
    learningDifficultyMod: 2,
    castingTimeMod: 2,
    resourcesMod: 2,
    casterEffects: [
                      {
                        mp:-10,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        hp:-20,
                        name: 'health'
                      }
    ]
  },
  {
    name: 'Magic Arrow',
    description: 'A magical arrow  springs from your hand and speeds to its target.',
    command: 'loose',
    durationMod: 0,
    learningDifficultyMod: 1,
    castingTimeMod: 1,
    resourcesMod: 1,
    casterEffects: [
                      {
                        mp:-5,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        hp:-10,
                        name: 'health'
                      }
    ]
  },
  {
    name: 'Heal',
    description: 'A magical healing energy spreads from your hands towards the target.',
    command: 'heal',
    durationMod: 0,
    learningDifficultyMod: 1,
    castingTimeMod: 1,
    resourcesMod: 1,
    casterEffects: [
                      {
                        mp:-5,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        hp:10,
                        name: 'health'
                      }
    ]
  },
  {
    name: 'Shield',
    description: 'A magical protective shield spreads from your finger and forms a globe of light around the target.\nDuration: until dispeled by any damage.',
    command: 'shield',
    durationMod: -1,
    learningDifficultyMod: 2,
    castingTimeMod: 2,
    resourcesMod: 2,
    casterEffects: [
                      {
                        mp:-10,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        hp:10,
                        name: 'protection'
                      }
    ]
  },
  {
    name: 'Meteor storm',
    description: 'A small cloud forms over the target and sends small lighting bolts every few seconds.\nDuration: a few seconds.',
    command: 'loose',
    durationMod: 3,
    learningDifficultyMod: 3,
    castingTimeMod: 3,
    resourcesMod: 3,
    casterEffects: [
                      {
                        mp:-15,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        hp:-5,
                        name: 'health'
                      }
    ]
  },
  {
    name: 'Protective Sphere',
    description: 'A protective Sphere forms over the target.\nDuration: a few rounds.',
    command: 'sphera',
    durationMod: 3,
    learningDifficultyMod: 3,
    castingTimeMod: 3,
    resourcesMod: 3,
    casterEffects: [
                      {
                        mp:-15,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        hp:5,
                        name: 'protection'
                      }
    ]
  },
  {
    name: 'Haste',
    description: 'reduces casting time',
    command: 'haste',
    durationMod: 3,
    learningDifficultyMod: 3,
    castingTimeMod: 3,
    resourcesMod: 3,
    casterEffects: [
                      {
                        mp:-15,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        castingTimeMod:-5,
                        name: 'castingTime'
                      }
    ]
  },
  {
    name: 'Prolong',
    description: 'prolongs duration of all spells cast by the target, as long as prolong is in effect, duration : a few rounds.',
    command: 'prolong',
    durationMod: 3,
    learningDifficultyMod: 3,
    castingTimeMod: 3,
    resourcesMod: 3,
    casterEffects: [
                      {
                        mp:-15,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        castingDurationMod:5,
                        name: 'castingDuration'
                      }
    ]
  },
  {
    name: 'Linger',
    description: 'prolongs ,by a few rounds, the duration of all active spells which exist on the target.',
    command: 'linger',
    durationMod: 0,
    learningDifficultyMod: 3,
    castingTimeMod: 3,
    resourcesMod: 3,
    casterEffects: [
                      {
                        mp:-15,
                        name: 'mana'
                      }
    ],
    targetEffects: [
                      {
                        activeDurationMod:5,
                        name: 'activeDuration'
                      }
    ]
  }
  ];


  if (Spells.find({}).count() === 0) {
    _(spells).each(function (spell) {

      var spellCasterEffectsIds = [];
      _(spell.casterEffects).each(function (spellEffect) {
          spellCasterEffectsIds.push(Effects.insert(spellEffect));
      });

      var spellTargetsEffectsIds = [];
      _(spell.targetEffects).each(function (spellEffect) {
          spellTargetsEffectsIds.push(Effects.insert(spellEffect));
      });

      Spells.insert({
        name: spell.name,
        description: spell.description,
        command: spell.command,
        durationMod: spell.durationMod,
        learningDifficultyMod: spell.learningDifficultyMod,
        castingTimeMod: spell.castingTimeMod,
        resourcesMod: spell.resourcesMod,
        spellCasterEffectsIds:spellCasterEffectsIds,
        spellTargetsEffectsIds: spellTargetsEffectsIds
      });
    });

  }
  console.log(Spells.find({}).count());
  console.log(Effects.find({}).count());


});
