import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import CheckBox from 'react-native-checkbox';



@connectMeteor
class Player extends Component {

  constructor(props) {
    super(props);
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
    const itemsHandle = Meteor.subscribe('users');
    const itemsHandle2 = Meteor.subscribe('players');

    return {
      usersReady: itemsHandle.ready()
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
    console.log('player:');
    console.dir(this.props.dataItem);

    if (this.props.dataItem.instanceBeingCast) {
        return(
          <View>
            <Text>{this.props.dataItem.instanceBeingCast}</Text>
          </View>
        )
    }
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
