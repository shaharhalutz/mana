Battles = new Mongo.Collection('battles');

// attach Schema ?
/*
completed:
createdAt:
name:

UserStates.attachSchema(new SimpleSchema({
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
  productId: {
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
}));
*/
