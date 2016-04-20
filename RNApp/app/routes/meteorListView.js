import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import Button from '../components/button';
import Router from '../router';


@connectMeteor
class MeteorListViewComponent extends Component {
  getMeteorData() {
    const itemsHandle = Meteor.subscribe('battles');
    return {
      itemsReady: itemsHandle.ready()
    };
  }

  handleJoinBattle(item) {
    //const { battle } = {item};
    Meteor.call('joinBattle',item._id);
    console.dir(item);
    console.dir(this.props);

    // open Battle Detail:
    const { navigator } = this.props;
    navigator.push(Router["getBattleDetail"]());
  }

  renderRow(item) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{item.name}</Text>
        <View style={styles.buttonContainer}>
          <Button text="Join" onPress={() => this.handleJoinBattle(item)} />
        </View>
        <TouchableOpacity onPress={() => Meteor.call('removeBattle', item._id)}>
          <Text style={[styles.rowText, styles.deleteText]}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { itemsReady } = this.data;
    if (!itemsReady) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button text="Create Battle" onPress={() => Meteor.call('createBattle')} />
        </View>

        <MeteorListView
          collection="battles"
          style={styles.container}
          // selector={{}}
          options={{sort: {createdAt: -1}}}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

export default MeteorListViewComponent;

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
