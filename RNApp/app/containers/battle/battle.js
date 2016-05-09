
// 1.TEST Backend Functionality:
// TBD: do we create a compositeSurscribe per component? - https://atmospherejs.com/reywood/publish-composite
// TBD: rethink collection helpers (model behaviours) maybe components will correlate to model and implement behaviour themselves. - (try with player component below:)
// TBD: create temporary wand component (spell dropdown), and checkboxes on players to select target for cast.
// TBD: should we getSpells in battle compoenent or in wand compoenent ?
// TBD: try and remove meteor method calls and do everything on client
// 2. R & D on wand component (casting / spell identification)
// 3. R & D on player component (visualizing spell being cast / active effects on player etc ..)


import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorComplexListView } from 'react-native-meteor';
import Participant from './participant';
import Wand from './wand';
import Button from '../../components/button';
import Router from '../../router';


@connectMeteor
class Battle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPlayerIds: [],
      ticks:0
    };
  }

  componentDidMount(){
    this.clock = setInterval(() => {
      //console.log('inc tick:'+this.state.ticks);
      this.setState({selectedPlayerIds:this.state.selectedPlayerIds,ticks:(this.state.ticks+1)});
    }, 1000);
  }

  componentWillUnmount(){
    clearTimeout(this.clock);
    console.log('clearing clock interval');
  }

  getMeteorData() {
    const itemsHandle = Meteor.subscribe('players',this.props.battleId);
    const spellInstancesHandle = Meteor.subscribe('spellInstances',this.props.battleId);

    return {
      playersReady: itemsHandle.ready(),
      spellInstancesready:spellInstancesHandle.ready()
    };
  }

  onPlayerSelectionChanged(event,playerId,selected){
    console.log('onPlayerSelected:');
    if(selected){
      // add:
      this.setState({ selectedPlayerIds: [...this.state.selectedPlayerIds, playerId]});
    }
    else{
      // remove:
      const indexToRemove = this.state.selectedPlayerIds.indexOf(playerId);
      if (indexToRemove > -1) {
        const newAr = (this.state.selectedPlayerIds.slice(0,indexToRemove)).concat(this.state.selectedPlayerIds.slice((indexToRemove+1),this.state.selectedPlayerIds.length));
        this.setState({ selectedPlayerIds: newAr});
      }
    }

    console.log(this.state.selectedPlayerIds.length);
  }

  renderRow(item) {
    return (
      <Participant dataItem={item} onSelectedChanged={this.onPlayerSelectionChanged.bind(this)}>
      </Participant>
    );
  }

  getPlayers(){
    const players = Meteor.collection('players').find({battleId:this.props.battleId});
    return players;
  }

  onCastStart(spellId){

    console.log('onCastStart: spellId:'+spellId);
    const currentPlayer = Meteor.collection('players').findOne({battleId:this.props.battleId,userId:Meteor.userId()});
    if(currentPlayer){
      Meteor.call('createSpellInstance',spellId,currentPlayer._id,this.state.selectedPlayerIds,function(error, newInstanceId){

        console.log('spellInstance was created. id: '+newInstanceId);
        // TBD: if currentCastEnded ,we can now call onCastEnd (protect against cases when wand moves faster than database :)
        //if(state.currentCast.Ended){
        //  this.onCastEnd(state.currentCast.potency);
        //}

      });

      return;
    }

    // error handlng:
    console.log('couldnt find current Player.');

  }

  onCastEnd(potency){

    console.log('onCastEnd: potency:'+potency);
    const currentPlayer = Meteor.collection('players').findOne({battleId:this.props.battleId,userId:Meteor.userId()});
    if(currentPlayer){
      Meteor.call('processSpellInstance',currentPlayer.instanceBeingCast,potency);
      return;
    }

    // error handlng:
    console.log('couldnt find current Player.');

  }

  start(){
    console.log('start battle.');
    // open Battle Detail:
    const { navigator } = this.props;
    navigator.push(Router["getGame"]());
  }

  join(){
    console.log('join battle.');
    const battleId = this.props.battleId;
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
// <Text>Ticks: {this.state.ticks}</Text>
    return (
      <View style={styles.container}>

        <MeteorComplexListView
          style={styles.container}
          elements={this.getPlayers.bind(this)}
          renderRow={this.renderRow.bind(this)}
        />

        <View style={styles.buttonContainer}>
          <Button text="Join" onPress={() => Meteor.call('joinBattle',this.props.battleId)} />
          <Button text="Start" onPress={() => this.start()} />
        </View>
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
