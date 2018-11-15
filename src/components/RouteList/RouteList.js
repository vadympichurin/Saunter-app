import React, {Component} from 'react';
import './RouteList.css';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as filterActions from '../../actions/filter';
import RouteItem from '../RouteItem/RouteItem';

class RouteList extends Component{
	constructor(props){
		super(props);
		this.state = {
			inputVal: '',
		}
	}

	selectItem(point){
		this.props.selectPath(point);
	}

	handleInputChange({target}){
		this.props.setSearchQuery(target.value);
		this.setState({
			inputVal: target.value,
		});
	}


	render(){
		
		return (
			<div className="routeList-wrapper">

				<div className="routeList-search-box">
				<form action="#" className="routeList-search">
					<input type="text" className="routeSearch" placeholder="Search..." value={this.state.inputVal} onChange={this.handleInputChange.bind(this)} />
					<i className="fas fa-search search-icon"></i>
				</form>

				<button className="routeList-add-new-btn" title="Add new route" onClick={this.props.toggleModal.bind(this)}>Add new</button>
				</div>

				<div className="route-list">
                    {this.props.path ? this.props.path.map(point => (
								<RouteItem point={point} key={point.id}/>)) : <p>List is empty</p>}
				</div>

			</div>

		)
	}
	
}

function mapStateToProps (filter) {
    return{
        searchQuery: filter.searchQuery,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        ...bindActionCreators(filterActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);