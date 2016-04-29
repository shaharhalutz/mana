import React, { View, Text, Component, StyleSheet, TouchableOpacity ,ListView} from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import CheckBox from 'react-native-checkbox';



@connectMeteor
class Player extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      selected: false,
      activeEffects:ds.cloneWithRows([{name:'effect 1'}, {name:'effect 2'}])
    };
  }



  componentWillMount(){
      const   onSpellCast = function(objectChanged) {

          // on spell Instance processed:
          if(objectChanged.collection === 'spellInstances'){
            const spellInstance = objectChanged;

            if(spellInstance.fields && spellInstance.fields.processed ){
              console.log('spell was cast: (instanceId: '+ spellInstance.id + ')');
              const currentSpellInstance = Meteor.collection('spellInstances').findOne( { _id: spellInstance.id});

              // was I targeted ? :
              if(currentSpellInstance && currentSpellInstance.targetIds && currentSpellInstance.targetIds.indexOf(this.props.dataItem._id) != -1){
                console.dir(currentSpellInstance.targetEffects);

                // show spell effects on targeted players:
                var spellTargetEffects = Meteor.collection('effects').find( { _id:{$in: currentSpellInstance.targetEffects } });
                // TBD: this.state is null:
                console.dir(spellTargetEffects);
                const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState ( {selected:this.state.selected,activeEffects:ds2.cloneWithRows(spellTargetEffects)});
              }
            }
          }
        }
        // follow spell instances that were cast and check if I was targeted:
        Meteor.ddp.on('changed',onSpellCast.bind(this));
  }

  componentWillUnmount() {
  }


  onSelectedChanged(event) {
    console.log('onSelectedChanged:');
    this.setState({ selected: !this.state.selected });
    console.log(this.state.selected);
    this.props.onSelectedChanged(event,this.props.dataItem._id,this.state.selected);
  }

  getMeteorData() {
    const itemsHandle = Meteor.subscribe('users');
    const itemsHandle2 = Meteor.subscribe('spellInstances');
    const itemsHandle3 = Meteor.subscribe('effects');


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
    //console.log('player:');
    //console.dir(this.props.dataItem);

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
        <ListView dataSource={this.state.activeEffects}
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
