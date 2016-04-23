import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';

@connectMeteor
class Player extends Component {

  getMeteorData() {
    const itemsHandle = Meteor.subscribe('users');
    return {
      usersReady: itemsHandle.ready()
    };
  }

  userInfo(){
    return Meteor.collection('users').findOne({_id: this.props.dataItem.userId});
  }

  // TBD: does this go in a utily method or a user component ?
  getUserName(){
    return this.userInfo().emails[0].address;
  }

  render() {
    const { usersReady } = this.data;
    if (!usersReady) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{ this.getUserName()} ({this.props.dataItem.hp}/{this.props.dataItem.mp})</Text>
      </View>
    );
  }
}

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowText: {
    fontSize: 16
  }
});
