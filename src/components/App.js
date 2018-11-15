import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Header from "./Header/Header";
import Modal from "./Modal/Modal";
import fire from "../fire";
import RouteList from '../components/RouteList/RouteList';
import RouteCard from '../components/RouteCard/RouteCard';

class App extends Component {

	state = {
        selectItem: {},
	};

	componentWillMount(){
		let path = fire.database().ref('path');
		let pathArr = [];
		path.on('value', snapshot => {
			let items = snapshot.val();
			for(let item in items){
				pathArr.push({
					id: items[item].id,
					title: items[item].title,
					shortDescription: items[item].shortDescription,
					description: items[item].description,
					distance: items[item].distance,
					pathPoints: items[item].pathPoints,
					key: item,
				});
			}
			this.props.setPath(pathArr);
		});
	}

	selectPath = (path) => {
		this.setState({selectItem: path})
	};
	
	render() {
		let {
			modalOpen,
			toggleModal,
			addPath,
			path,
		} = this.props;
		
		return (
			<Router>
				<Fragment>
					<Modal 
						open={modalOpen} 
						toggleModal={toggleModal}
						addPath={addPath}
					/>
					<Header  />
					<Container>

						<Route exact path='/' render = {props => (
							<RouteList
								toggleModal={toggleModal}
								path = {path}
								selectPath = {this.selectPath}
							/>	
						)} />
						<Route path='/:id' render = { props => (
							<RouteCard path={this.props.path} {...props}/>
						)
						} />

					</Container>

				</Fragment>
			</Router>
		);
	}
}



export default App;
