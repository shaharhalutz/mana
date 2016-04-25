import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {
  render() {
    let { text, onPress ,onPressIn} = this.props;
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} onPressIn={onPressIn}>
        <Text style={styles.buttonText}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  text: "Button Text",
  onPress: () => console.log('Button Pressed'),
  onPressIn: () => console.log('Button Pressed In')

};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center'
  }
});
