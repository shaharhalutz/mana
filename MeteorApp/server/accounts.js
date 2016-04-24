Accounts.onCreateUser(function(options, user) {
  // username:
  var email = user.emails[0].address;
  var username = email.substring(0, email.indexOf('@'));

  // initial spells:
  // set users basic spells:
  var initialSpells = Spells.find({name:'Magic Arrow'}).fetch();

  // manuel override:
  if(username == 'shahar.halutz'){
      initialSpells =  Spells.find({}).fetch();
  }

  var spellIds = _.pluck(initialSpells,"_id");

  // user profile:
  user.profile = {  name:username,
                    mp:100,
                    hp:100,
                    spellIds:spellIds
  };

  return user;
});
