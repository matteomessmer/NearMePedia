import React, { Component } from 'react';
import POIsContainer from '../Unstated/POIsContainer';
import { Subscribe } from 'unstated';
import { CoordinatesContainer  } from 'unstated';
import { Text, ListView, View, StyleSheet, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Constants from 'expo-constants';
import ArticlesList from './ArticlesList';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import styles from '../Style';




function Separator() {
  return <View style={styles.separator} />;
}


export default class ScreenC extends Component {


  render() {
    return (
		<SafeAreaView style={styles.container}>

			<Text style={styles.background}>Here's a list of locations around your selected position</Text>
			<Subscribe to={[POIsContainer]}>
				{
					(pois) => {
						return (
							<ArticlesList data={pois.state.savedLocations} />
						);
					}
				}
			</Subscribe>
		</SafeAreaView>
    );
  }
}

ScreenC.navigationOptions = ({ navigation }) => ({
  title: "Reading list",
})

