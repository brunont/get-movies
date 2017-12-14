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
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CssColors.lightColor
  }
});

export default class Search extends Component {
  handlePress = () => {
    let textSearch = this.state.textSearch;
    let urlApiMovies = "https://jsonmock.hackerrank.com/api/movies/search/?Title=" + textSearch;

    return fetch(urlApiMovies)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.data),
        }, function() {
          Actions.searchResults({ data: ds.cloneWithRows(responseJson.data)});
        });
      })
		.catch((error) => {
			console.error(error);
		});
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>
          Sobre qual filme você quer saber mais?
        </Text>
        <TextInput
          style={styles.input}
          ref= {(el) => { this.textSearch = el; }}
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

