import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { AppRegistry, Text, TextInput, View, Alert } from 'react-native';

export default class SearchMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 3, backgroundColor: '#141414', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 24, fontFamily: 'Gill Sans'}}>Sobre qual filme você quer saber mais?</Text>
          <TextInput
            style={{borderBottomColor: '#ffffff', borderBottomWidth: 2, height: 50, width: '75%'}}
          />
          <Button
            large
            raised
            icon={{name: 'search'}}
            title="SEARCH"
            backgroundColor="#FF5722"
            onPress={() => {
              Alert.alert('You tapped the button!');
            }}
          />
        </View>
      </View>
    );
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => PizzaTranslator); ')})}} } }
