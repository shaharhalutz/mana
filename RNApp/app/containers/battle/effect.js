// TBD: introduce clock to battle compoenent and trickle down ticks to players(mana) and effects(duration/rounds).
// TBD: remove interval from effects component and listen to process effect (somehow)
import React, { View, Text, Component, StyleSheet} from 'react-native';

class Effect extends Component {


  constructor(props) {
    super(props);

    this.state = {
      showBadge: false,
      previousDuration:0
    };
  }

  componentDidMount() {

     this.badgeTimeout = setInterval(() => {

       // check if duration changed:
       this.setState({showBadge : (this.state.previousDuration && (this.state.previousDuration !=  this.props.data.duration)),
                      previousDuration:this.props.data.duration});
     }, 1000);
  }


  componentWillUnmount() {
      clearTimeout( this.badgeTimeout);
  }

  renderBadge(){

    //if(this.state.showBadge){
    if(this.state.showBadge){
      return(
        <Text>{this.props.data.hp}</Text>
      );
    }
    return (<Text></Text>);
  }

  render() {

    console.log('rendering:'+this.props.data.name);

    return (
      <View>
        <Text>{this.props.data.name}</Text>
        {this.renderBadge()}
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
