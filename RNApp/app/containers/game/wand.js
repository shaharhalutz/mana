import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import DropDown, { Select, Option, OptionList } from 'react-native-selectme';
import Button from '../../components/button';



@connectMeteor
class Wand extends Component {

  constructor(props) {
    super(props);
    this.state = {
      potency:100,
      selectedSpellId: ''
    };
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }


  _onSpellSelected(spellId) {
    console.log('onSpellSelected, spellId:'+spellId);

    this.setState({
      ...this.state,
      selectedSpellId: spellId
    });
  }

  getMeteorData() {

    const itemsHandle = Meteor.subscribe('spells');
    return {
      spellsReady: itemsHandle.ready()
    };
  }

  // TBD: use user convenience method to encapsulate user implementation
  getUserSpellIds(){
    return Meteor.user().profile.spellIds;
  }

  renderSpellOptions(){
    const spells = Meteor.collection('spells').find({_id: {$in: this.getUserSpellIds() }});

    return(
      spells.map(function(spell) {
        return <Option value={spell._id} key={spell._id} >{spell.name}</Option>;
      })
    );
  }

  render() {
    const { spellsReady } = this.data;
    if (!spellsReady) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Spell"
            onSelect={this._onSpellSelected.bind(this)}>

              {this.renderSpellOptions()}

          </Select>

          <View style={styles.buttonContainer}>
            <Button text="Cast" onPress={() => this.props.onCastEnd(this.state.potency)}
                                onPressIn={() => this.props.onCastStart(this.state.selectedSpellId)} />
          </View>
          <OptionList ref="OPTIONLIST"/>
      </View>
    );
  }
}

export default Wand;

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
  }
});
