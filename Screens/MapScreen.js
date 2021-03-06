import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import ArticlesContainer from '../Unstated/ArticlesContainer';
import PositionContainer from '../Unstated/PositionContainer';
import { Subscribe } from 'unstated';
import styles from '../Style';

export default class MapScreen extends React.Component {
	render() {
		return (
			<Subscribe to={[ArticlesContainer, PositionContainer]}>
				{
					(articles, position) => {
						const markers = articles.state.savedArticles.map((article) => 
							<Marker 
								coordinate={{ latitude: article.lat, longitude: article.lon }}
								key={article.title}>
								<MapView.Callout onPress={() => articles.loadArticleInBrowser(article.pageid)}>
									<View>
										<Text style={styles.marker}>{article.title}</Text>
										<Text style={styles.subtitle}>Click to visit</Text>
									</View>
								</MapView.Callout>
							</Marker>);

						return (
							<MapView
								style={{ flex: 1 }}
								provider={PROVIDER_GOOGLE}
								showsUserLocation
								initialRegion={{
									latitude: position.state.latitude,
									longitude: position.state.longitude,
									latitudeDelta: 1,
									longitudeDelta: 1,
								}}>
								{
									markers
								}
							</MapView>
						);
					}
				}
			</Subscribe >
		);
	}
}

MapScreen.navigationOptions = ({ navigation }) => ({
	title: "Maps",
})