import Meteor from 'react-native-meteor';

export default function() {
    const url = 'http://192.168.1.36:3000/websocket';
    Meteor.connect(url);
}
