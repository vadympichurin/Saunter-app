import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import './RouteItem.css'


const RouteItem = ({point, favoritePath}) => {
	let inFavorite;
	{favoritePath ? inFavorite = favoritePath.find(item => item === point.id): inFavorite = false}

	return (

		<div className="routeItem-wrapper">

			<div className="routeItem-info">
				<Link to={`${point.id}`}><h4 className="routeItem-title">{point.title}</h4></Link>
                {inFavorite ? <i className="fas fa-star routeItem-icon"></i> : null}
				<p className="short-desription">{point.shortDescription}</p>
			</div>
			<p className="route-distance">{`${point.distance/1000}km`}</p>

		</div>

	);
};

function mapStateToProps(path) {
    return {
        favoritePath: path.favoritePath,
    }
}

export default connect(mapStateToProps)(RouteItem);

