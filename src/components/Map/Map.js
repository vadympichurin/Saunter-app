import React, { Component } from 'react';

class Map extends Component {

	state = {
    	setDistance: this.props.setDistance,
	};


	handleClick(lat, lng, map){
		if(this.props.handleClickMap){
			this.props.handleClickMap(lat, lng);
			let marker = new window.google.maps.Marker({
				position: {lat, lng},
				map: map,
				title: 'Hello World!'
			});
		}
	}

	googleChecker = () => {
		// check for maps in case you're using other google api
		if (!window.google) {
			setTimeout(this.googleChecker, 100);
		} else {
			// the google maps api is ready to use, render the map
			this.renderMap();
		}
	};

	renderMap = () => {
		const {lat, lng} = this.props;
		const coords = { lat, lng };
		
		// create map instance
		let map = new window.google.maps.Map(this.refs.mapContainer, {
			zoom: 14,
			center: {
				lat: coords.lat,
				lng: coords.lng
			}
		});

		map.addListener('click', e => {
			let lat = e.latLng.lat();
			let lng = e.latLng.lng();
			
			this.handleClick(lat, lng, map)
		});

		let directionsService = new window.google.maps.DirectionsService;
		let directionsDisplay = new window.google.maps.DirectionsRenderer;
		directionsDisplay.setOptions({suppressMarkers: true});
		
		directionsDisplay.setMap(map);

		let waypts = this.props.pathPoints.map(point => {
			return (
				{location: {
					lat: point.lat,
					lng: point.lng
				},
					stopover: true}
			)
		});
		

		let request = {
			origin: new window.google.maps.LatLng(this.props.pathPoints[0]), //точка старта
			destination: new window.google.maps.LatLng(this.props.pathPoints[this.props.pathPoints.length-1]), //точка финиша
			waypoints: waypts, 
			optimizeWaypoints: false, 
			travelMode: window.google.maps.DirectionsTravelMode.WALKING //режим прокладки маршрута
		};
		directionsService.route(request,(response, status)=>{
			if (status === window.google.maps.DirectionsStatus.OK){
				directionsDisplay.setDirections(response);
				if(response.routes){
					let legs = response.routes[0].legs;
					let distanceFull = legs.reduce((sum, current) => {
						return sum + current.distance.value;
					  }, 0);
					  
					if(this.state.setDistance)
						this.state.setDistance(distanceFull)
				}
			}
		});
		directionsDisplay.setMap(map);	
	};

	componentDidMount() {
		this.googleChecker();
	}

	render() {
		return (
			<div id='app' className="card map-holder">
				<div id='map' className="card-block" ref="mapContainer" />
			</div>
		);
	}
}

export default Map;