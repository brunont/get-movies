import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import ImageLoad from 'react-native-image-placeholder';
import { ActivityIndicator, ListView, Text, View, StyleSheet } from 'react-native';

export default class Movies extends Component {	
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.data),
        }, function() {
          // do something with new state
        });
      })
		.catch((error) => {
			console.error(error);
		});
  }

  render() {
		const styles = StyleSheet.create({
      image: {
        height: 150
      },
			text: {
				marginTop: 10
			},
			view: {
				paddingTop: 20,
				backgroundColor: '#f1f1f1'
			},
      viewLoading:{
        flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#f1f1f1'
      }
		});

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

    if (this.state.isLoading) {
      return (
        <View style={styles.viewLoading}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.view}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
        />
      </View>
    );
  }
}

