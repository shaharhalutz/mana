import React, { View, Text, Component, StyleSheet, TouchableOpacity } from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import DropDown, { Select, Option, OptionList } from 'react-native-selectme';



@connectMeteor
class Wand extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

    this.props.onCastSpell(this.state.selectedSpellId);
  }

  getMeteorData() {
    //const itemsHandle = Meteor.subscribe('spells');
    return {
      //spellsReady: itemsHandle.ready()
      spellsReady:true
    };
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
            <Option>Fireball</Option>
            <Option>Lightning</Option>
            <Option>Heal</Option>
            <Option>Yukon</Option>
          </Select>

          <Text>Selected Spell: {this.state.selectedSpellId}</Text>

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
