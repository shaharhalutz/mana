import React, { View, Text, Component, StyleSheet, Dimensions } from 'react-native';
import Meteor, { connectMeteor } from 'react-native-meteor';
import Wand from './wand';

const { width } = Dimensions.get('window');

@connectMeteor
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  getMeteorData() {
    //Meteor.subscribe('battles');
    return {
      //item: Meteor.collection('items').findOne()
    }
  }

  onCastStart(spellId){

    console.log('onCastStart');

  }

  onCastEnd(){

    console.log('onCastEnd: ');


  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello </Text>
        <Wand onCastStart={this.onCastStart.bind(this)}
              onCastEnd={this.onCastEnd.bind(this)}>
        </Wand>
      </View>
    )
  }
}

export default Game;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16
  }
});
