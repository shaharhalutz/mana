Players = new Mongo.Collection('players');

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
