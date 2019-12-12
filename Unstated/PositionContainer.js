import React, { Component } from 'react';
import { Container } from "unstated";

export default class PositionContainer extends Container {
	
    state = {
		lat:null, 
		lon:null
    };

	geoLocate = async () => {	
		await navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ lat: position.coords.latitude, lon: position.coords.longitude });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}
	
	setCoordinates = async (coords) => {
		await this.setState({	lat:coords.lat, lon:coords.lon});
		//console.log(coords);
	}
	
	distance = (lat, lon) => {
		if ((lat == this.state.lat) && (lon== this.state.lon)) {
			return 0;
		}
		else {
			const radlat1 = Math.PI * lat/180;
			const radlat2 = Math.PI * this.state.lat/180;
			const theta = lon-this.state.lon;
			const radtheta = Math.PI * theta/180;
			let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;
			
			return dist;
		}
	}
}