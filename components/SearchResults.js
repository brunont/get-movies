import React, { Component } from 'react';
import CssColors from './CssColors';
import { Card } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import ImageLoad from 'react-native-image-placeholder';
import { ListView, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: 150
  },
  text: {
    marginTop: 10,
    color: CssColors.darkColor
  },
  view: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: CssColors.lightColor
  }
});

export default class SearchResults extends Component {	
  render() {
    const movies = this.props.data;

		const Row = (props) => (
			<Card title={props.Title}>
        <ImageLoad style={styles.image} source={{ uri: props.Poster }} />
				<Text style={styles.text}>
					{`YEAR: ${props.Year}`}
				</Text>
				<Text style={styles.text}>
					{`TYPE: ${props.Type}`}
				</Text>
				<Text style={styles.text}>
					{`IMDB: ${props.imdbID}`}
				</Text>
			</Card>
		);

    return (
      <View style={styles.view}>
        <ListView
          dataSource={movies}
          renderRow={(data) => <Row {...data} />}
        />
      </View>
    );
  }
}

