import React from 'react';
import { Link } from "react-router-dom";
import fire from "../../fire";
import Map from "../Map/Map";
import * as pathActions from '../../actions/path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';
import './RouteCard.css'





const RouteCard = props => {
	const {
		path,
		match,
		favoritePath,
	} = props;

	let book,
		inFavorite;
	path ? book = path.find(point => point.id === +match.params.id) : book = null;

	(favoritePath && book)? inFavorite = favoritePath.find(item => item === book.id) : inFavorite = false;
	return(
		book ?

			<div className="routeCard-wrapper">

				<div className="routeCard-header">
					<Link to='/' className='PageLink'>
					<i className="fas fa-arrow-circle-left routeCard-icon-back"></i>
					</Link>
                    {inFavorite ? <i className="fas fa-star routeCard-icon-delFavorite" title='remove from favorite' onClick = {() =>{props.removeFromFavorite(book.id)}}></i> : <i className="far fa-star routeCard-icon-addFavorite" title='add to favorite' onClick = {() => {props.addToFavorite(book.id)}}></i>}
				</div>

				<div className="routeCard-info">
					<h3 className="routeCard-title">{book.title}</h3>
					<p className="routeCard-distance">Length: {book.distance/1000}km.</p>
				</div>
					<p className="routeCard-fullDscr">{book.description}</p>


				<div className="routeCard-map-box">
					<Map
						lat={50.442565}
						lng={30.513310}
						pathPoints = {book.pathPoints}
					/>
				</div>

				<a className="routeCard-delBtn" href='/' onClick = {() => {
                        props.removeFromFavorite(book.id);
                        fire.database().ref('path/' + book.key).remove();
                    }}>Delete</a>

			</div>

		:
			<Loader type="Plane" active inline='centered' />
	);
};

function mapStateToProps({path}) {
	return {
        favoritePath: path.favoritePath,
        path: path.path,
	}
}

function mapDispatchToProps(dispatch) {
	return {
        ...bindActionCreators(pathActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCard);