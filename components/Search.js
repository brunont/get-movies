import React, { Component } from 'react';
import CssColors from './CssColors';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import { Text, TextInput, ListView, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '75%',
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: CssColors.darkColor
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: CssColors.darkColor
  },
  textError: {
    color: CssColors.errorColor
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CssColors.lightColor
  }
});

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { showNotFound: false };
  }

  handlePress = () => {
    let textSearch = this.state.textSearch;
    let urlApiMovies = "https://jsonmock.hackerrank.com/api/movies/search/?Title=" + textSearch;

    return fetch(urlApiMovies)
      .then((response) => response.json())
      .then((responseJson) => {
        let data = responseJson.data;

        if (data.length > 0) { 
          this.setState({showNotFound: false});

          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

          Actions.searchResults({ data: ds.cloneWithRows(data) });
        } else {
          this.setState({showNotFound: true});
        }
      })
		.catch((error) => {
			console.error(error);
		});
  }

  render() {
    return (
      <View style={styles.view}>
        { this.state.showNotFound && 
          <Text style={styles.textError}>
            Nenhum filme encontrado :(
          </Text>
        }
        <Text style={styles.text}>
          Sobre qual filme você quer saber mais?
        </Text>
        <TextInput
          style={styles.input}
          ref={(el) => { this.textSearch = el; }}
          onChangeText={(textSearch) => this.setState({textSearch})}
        />
        <Button
          large
          raised
          title="BUSCAR"
          icon={{name: 'search'}}
          backgroundColor={CssColors.primaryColor} 
          onPress={() => this.handlePress()}
        />
      </View>
    );
  }
}

