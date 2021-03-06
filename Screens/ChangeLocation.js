import React, { Component } from 'react';
import ArticlesContainer from '../Unstated/ArticlesContainer';
import PositionContainer from '../Unstated/PositionContainer';
import { Subscribe } from 'unstated';
import { Text, View, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import LocationItem from '../Components/LocationItem';
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
					<View style={styles.rowContainer}>
						<View style={styles.fillColumn}>
							<Subscribe to={[PositionContainer, ArticlesContainer]}>
								{
									(position, articles) => {
										return (
											<TouchableOpacity onPress={() => {
																								position.setGeolocationAsPosition();
																								articles.clear();
																								this.props.navigation.navigate("Home");
																							}
																						}>
												<View style={styles.primaryButton}>
													<Text style={styles.buttonText}>Current Position</Text>
												</View>
											</TouchableOpacity>
										);
									}
								}
							</Subscribe>
						</View>
						<View style={styles.fillColumn}>
							<TouchableOpacity onPress={() => this.props.navigation.navigate("AddLocation")}>
								<View style={styles.primaryButton}>
									<Text style={styles.buttonText}>Add Location</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					
					<View>
						<Separator />
						<Text style={styles.title}>Saved Locations</Text>
					</View>

					<Subscribe to={[LocationsContainer]}>
						{
							locations => {
								if(locations.state.savedLocations.length === 0) {
									return (
										<View>									
											<Text style={styles.subtitle}>Add some locations to select them here</Text>
										</View>
									);
								} else {							
									if (!locations.state.loaded) {
										locations.reverseGeocodeLocations();
										return null;
									} else {
										return (
											<FlatList style={styles.plainList}
												data={locations.state.savedLocations}
												renderItem={({ item }) => <LocationItem location={item} navigation={this.props.navigation} />}
												keyExtractor={item => item.city}
											/>
										);
									}
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
