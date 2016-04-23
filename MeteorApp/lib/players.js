//Players = new Mongo.Collection('players');

PlayersSchema = new SimpleSchema({
  mp: {
    type: Number,
    defaultValue: 0
  },
  hp: {
    type: Number,
    defaultValue: 0
  },
  userId: {
    type: String
  },
  battleId: {
    type: String
  },
  activeSpellIds: {
    type: [String],
    defaultValue: [],
    minCount: 0
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else {
        this.unset();
      }
    }
  }
});

// Add behaviour as in (https://github.com/dburles/meteor-collection-helpers):

// create an object with the desired methods to use as prototype
var player = {
  userInfo: function () {
    return Meteor.users.findOne({_id: this.userId});
  }
};

Players = new Meteor.Collection("players", {
  transform: function (doc) {
    // create a new empty object with pomodoro as it's prototype
    var newInstance = Object.create(player);

    // copy the data from doc to newInstance and return newInstance
    return  _.extend(newInstance, doc);
  }
});
