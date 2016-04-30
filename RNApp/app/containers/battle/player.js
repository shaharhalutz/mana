import React, { View, Text, Component, StyleSheet, TouchableOpacity ,ListView} from 'react-native';
import Meteor, { connectMeteor, MeteorListView,MeteorComplexListView } from 'react-native-meteor';
import CheckBox from 'react-native-checkbox';

// TBD: instead of using ListView try using complexListView from the example and getElements, should adjust its elements according to
//      the spellInstance which was cast. (should be reactive out of the box.)

@connectMeteor
class Player extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      selected: false
    };
  }
  onSelectedChanged(event) {
    console.log('onSelectedChanged:');
    this.setState({ selected: !this.state.selected });
    console.log(this.state.selected);
    this.props.onSelectedChanged(event,this.props.dataItem._id,this.state.selected);
  }

  getMeteorData() {
    const usersHandle = Meteor.subscribe('users');
    const effectInstancesHandle = Meteor.subscribe('effectInstances');

    return {
      usersReady: usersHandle.ready(),
      effectInstancesReady: effectInstancesHandle.ready()
    };
  }

  userInfo(){
    return Meteor.collection('users').findOne({_id: this.props.dataItem.userId});
  }

  // TBD: does this go in a utily method or a user component ?
  getUserName(){
    return this.userInfo().profile.name;
  }

  getUserMP(){
    return this.userInfo().profile.mp;
  }

  getUserHP(){
    return this.userInfo().profile.hp;
  }

  renderCurrentlyCasting(){
    if (this.props.dataItem.instanceBeingCast) {
        return(
          <View>
            <Text>{this.props.dataItem.instanceBeingCast}</Text>
          </View>
        )
    }
  }

  getActiveEffects(){

    const effects = Meteor.collection('effectInstances').find({playerId:this.props.dataItem._id});
    return effects;

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
        <Text style={styles.rowText}>{ this.getUserName()} HP: {this.props.dataItem.hp}/{this.getUserHP()}  MP: {this.props.dataItem.mp}/{this.getUserMP()}</Text>
        <CheckBox label=''
                  checked={this.state.selected}
                  onChange={  this.onSelectedChanged.bind(this)}
        />
        {this.renderCurrentlyCasting()}

        <MeteorComplexListView
          style={styles.container}
          elements={this.getActiveEffects.bind(this)}
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
        />

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
