
// 1.TEST Backend Functionality:
// TBD: test reactablility (join battles and see if players list is updated)
// TBD: do we create a compositeSurscribe per component? - https://atmospherejs.com/reywood/publish-composite
// TBD: rethink collection helpers (model behaviours) maybe components will correlate to model and implement behaviour themselves. - (try with player component below:)
// TBD: implement Player component to separate from battle compoenent
// TBD: create temporary wand component (spell dropdown), and checkboxes on players to select target for cast.

// 2. R & D on wand component (casting / spell identification)
// 3. R & D on player component (visualizing spell being cast / active effects on player etc ..)


import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorComplexListView } from 'react-native-meteor';
import Button from '../components/button';
import Router from '../router';
import PlayerActions from '../model/player'


@connectMeteor
class Battle extends Component {
  constructor() {
    super();
    this.playerActions = new PlayerActions()
  }

  getMeteorData() {
    const itemsHandle = Meteor.subscribe('players');
    const usersHandle = Meteor.subscribe('users');
    return {
      itemsReady: itemsHandle.ready(),
      usersReady: usersHandle.ready()
    };
  }

  // TBD: move to separate Player(View) Component.name():
  getPlayerName(player){
    return this.playerActions.userInfo(player,Meteor.collection('users')).emails[0].address;
  }

  renderRow(item) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{ this.getPlayerName(item)} ({item.hp}/{item.mp})</Text>
      </View>
    );
  }

  getPlayers(){
    const players = Meteor.collection('players').find({battleId:this.props.battleId});
    return players;
  }

  render() {
    const { itemsReady ,usersReady} = this.data;
    if (!itemsReady || !usersReady) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <MeteorComplexListView
          style={styles.container}
          elements={this.getPlayers.bind(this)}
          renderRow={this.renderRow.bind(this)}        />
      </View>
    );
  }
}

export default Battle;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC'
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
  },
  deleteText: {
    color: 'red',
    fontWeight: '700'
  }
});
