import React, {Component} from 'react-native';

class PlayerActions extends Component {

  userInfo(obj,usersCollection) {
    return usersCollection.findOne({_id: obj.userId});
  }
}
export default PlayerActions;
