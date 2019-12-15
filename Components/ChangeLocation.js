import React, { Component } from 'react';
import ArticlesContainer from '../Unstated/ArticlesContainer';
import PositionContainer from '../Unstated/PositionContainer';
import { Subscribe } from 'unstated';
import { Text, View, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import LocationItem from './LocationItem';
import LocationsContainer from '../Unstated/LocationsContainer';
import styles from '../Style';

function Separator() {
	return <View style={styles.separator} />;
}


export default class ChangeLocation extends Component {

	render() {

		return (

			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.containerb}>
						<Subscribe to={[PositionContainer, ArticlesContainer]}>
							{
								(position, articles) => {
									return (
										<TouchableOpacity onPress={() => {
											position.geoLocate(() => {
												articles.clear();
												this.props.navigation.navigate("Home");
											});
										}
										}>
											<View style={styles.button}>
												<Text style={{ color: 'black', textAlign: 'center', fontSize: 17 }}>Current Position</Text>
											</View>
										</TouchableOpacity>
									);
								}
							}
						</Subscribe>

						<TouchableOpacity onPress={() => this.props.navigation.navigate("AddLocation")}>
							<View style={styles.button}>
								<Text style={{ color: 'black', textAlign: 'center', fontSize: 19 }}>Add Location</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View>
						<Text style={styles.title}>Other locations you might like</Text>
						<Separator />
					</View>

					<Subscribe to={[LocationsContainer]}>
						{
							locations => {
								if (!locations.state.loaded) {
									locations.reverseGeocodeLocations();
									return null;
								} else {
									return (
										<FlatList
											data={locations.state.savedLocations}
											renderItem={({ item }) => <LocationItem location={item} navigation={this.props.navigation} />}
											keyExtractor={item => item.city}
										/>
									);
								}
							}
						}
					</Subscribe>
				</ScrollView>
			</SafeAreaView >
		);
	}
}

ChangeLocation.navigationOptions = ({ navigation }) => ({
	title: "Locations",

})