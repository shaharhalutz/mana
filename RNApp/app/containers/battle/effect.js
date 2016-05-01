import React, { View, Text, Component, StyleSheet} from 'react-native';
//import Meteor, { connectMeteor, MeteorListView,MeteorComplexListView } from 'react-native-meteor';

//@connectMeteor
class Effect extends Component {

  /*
  constructor(props) {
    super(props);

    this.state = {
      timeout: null
    };
  }
*/

  componentDidMount() {
    /*
    if(this.props.timerDuration){

      this.timer = setTimeout(() => {
        console.log('I do not leak!');
        this.props.onDurationExpired(this.props.data);
      }, 5000);
    }
    */
  }

  componentWillUnmount() {
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  render() {
    if(this.props.timerDuration){

      this.timer = setTimeout(() => {
        console.log('I do not leak!');
        this.props.onDurationExpired(this.props.data);
      }, 5000);
    }
      console.log('rendering:'+this.props.data.name);
      return (
        <View>
          <Text>{this.props.data.name}</Text>
        </View>
      )

  }
}

export default Effect;

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
