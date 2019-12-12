import React, { Component } from 'react';
import POIsContainer from '../Unstated/POIsContainer';
import PositionContainer from '../Unstated/PositionContainer';
import { Subscribe } from 'unstated';
import { Text, FlatList, View, SafeAreaView, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import ArticlesList from './ArticlesList';
import { getUnavailabilityReason } from 'expo/build/AR';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';
import styles from '../Style';


export default class ScreenA extends Component {


  render() {
    return (
      <SafeAreaView style={styles.container}>

        <Text style={styles.background}>Here's a list of locations around your selected position</Text>
			<Subscribe to={[POIsContainer, PositionContainer]}>
				{
					(pois, position) => {
						const { nearLocations, error, loading } = pois.state;

						if (!nearLocations && !error && !loading) {
							pois.getPOIsFromApiAsync(position.state.lat, position.state.lon);
						}
							
							
						return (
							<ArticlesList data={pois.state.nearLocations} />
						);
					}
				}
			</Subscribe>
      </SafeAreaView>
    );
  }
}

ScreenA.navigationOptions = ({navigation}) => ({
  title: "Articles",
  headerRight:  <Button 
  title="Change location" 
  onPress={() => navigation.navigate("ScreenB")}/>
})