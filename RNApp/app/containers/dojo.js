import React, { View, Text, Component, StyleSheet, Dimensions } from 'react-native';
import Meteor, { connectMeteor } from 'react-native-meteor';
const { width } = Dimensions.get('window');

@connectMeteor
class Dojo extends Component {
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


  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

export default Dojo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16
  }
});
