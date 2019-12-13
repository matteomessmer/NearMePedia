import React, { Component } from 'react';
import PositionContainer from '../Unstated/PositionContainer';
import { Subscribe } from 'unstated';
import { Text, FlatList, View, SafeAreaView, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import Article from './Article';
import { getUnavailabilityReason } from 'expo/build/AR';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import styles from '../Style';

export default class ArticlesList extends Component {
	render() {
		return (
			<Subscribe to={[PositionContainer]}>
				{
					(position) => {
						return (
							<FlatList style={styles.background}
										data={this.props.data}
										renderItem={
											({ item }) => 
												<Article article={item} distance={position.distance(item.lat, item.lon)} />
											}
										keyExtractor={item => item.title}
										/>
						);
					}
				}
			</Subscribe>
		);
	}
}