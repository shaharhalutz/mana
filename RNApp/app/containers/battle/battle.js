
// 1.TEST Backend Functionality:
// TBD: do we create a compositeSurscribe per component? - https://atmospherejs.com/reywood/publish-composite
// TBD: rethink collection helpers (model behaviours) maybe components will correlate to model and implement behaviour themselves. - (try with player component below:)
// TBD: implement Player component to separate from battle compoenent
// TBD: create temporary wand component (spell dropdown), and checkboxes on players to select target for cast.

// 2. R & D on wand component (casting / spell identification)
// 3. R & D on player component (visualizing spell being cast / active effects on player etc ..)


import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorComplexListView } from 'react-native-meteor';
import Player from './player';

@connectMeteor
class Battle extends Component {

  getMeteorData() {
    const itemsHandle = Meteor.subscribe('players');
    return {
      playersReady: itemsHandle.ready()
    };
  }
  
  renderRow(item) {
    return (
      <Player dataItem={item}>
      </Player>
    );
  }

  getPlayers(){
    const players = Meteor.collection('players').find({battleId:this.props.battleId});
    return players;
  }
  render() {
    const { playersReady } = this.data;
    if (!playersReady) {
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
          renderRow={this.renderRow}        />
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
