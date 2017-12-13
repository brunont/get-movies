import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Image, StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

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
				width: 100,
				height: 100
			},
			separator: {
				flex: 1,
				backgroundColor: '#8E8E8E',
				height: StyleSheet.hairlineWidth
			},
			text: {
				fontSize: 16,
				color: '#FFFFFF',
				fontFamily: 'Gill Sans'
			},
			textTitle: {
				fontSize: 22,
				color: '#FFFFFF',
				fontFamily: 'Gill Sans'
			},
			view: {
				paddingTop: 20,
				backgroundColor: '#141414'
			}
		});

		const Row = (props) => (
			<View>
        <Grid>
          <Row size={25}>
            <Image source={{ uri: props.Poster}} style={styles.image} />
          </Row>
          <Row size={75}>
            <Text style={styles.textTitle}>
              {`${props.Title} - ${props.Year}`}
            </Text>
            <Text style={styles.text}>
              {`Type: ${props.Type}`}
            </Text>
            <Text style={styles.text}>
              {`IMDB: ${props.imdbID}`}
            </Text>
          </Row>
        </Grid>
			</View>
		);

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.view}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}

