import React, {Component} from 'react';
import Map from "../Map/Map";
import ConmfirmModal from '../ConfirmModal/ConfirmModal';
import fire from "../../fire";
import './Modal.css';

class ModalWindow extends Component {


    state = {
        title: '',
        shortDescription: '',
        description: '',
        pathPoints: [],
        distance: '',
        errors: '',
        titleError: false,
        shortDescriptionError: false,
        descriptionError: false,
        conmfirmModalOpen: false,
    };


	handleClose = () => {
		this.setState({
			title: '',
			shortDescription: '',
			description: '',
			pathPoints: [],
			distance: '',
			errors: '',
			titleError: false,
			shortDescriptionError: false,
			descriptionError: false,
			conmfirmModalOpen: false,
		});
		this.props.toggleModal()
	};

	closeConmfirmModal = () => {
		this.setState({conmfirmModalOpen: false});
	};

	handleClickMap = (lat, lng) => {
		this.setState({
			pathPoints: [{lat, lng}, ...this.state.pathPoints],
		})
	};

	handleAddPath = () => {
		let {title, shortDescription, description, pathPoints} = this.state;
		if(!title || !shortDescription || !description){
			this.setState({errors: 'Все поля должны быть заполнены'});
			if(!title) this.setState({titleError: true});
			if(!shortDescription) this.setState({shortDescriptionError: true});
			if(!description) this.setState({descriptionError: true});
		}else{
			if(shortDescription.length > 160) {
				this.setState({
					errors: 'Краткое описание должно быть меньше 160 символов',
					shortDescriptionError: true,
				});
			}else if(pathPoints.length < 2){
				this.setState({errors: 'Установите минимум 2 маркера на карте'})
			}else{
				this.setState({
					conmfirmModalOpen: true,
					errors: '',
					titleError: false,
					shortDescriptionError: false,
					descriptionError: false,
				});
			}
		}
		
	};

	setDistance = (distance) => {
        console.log('Modal',distance);
        this.setState({distance});
	};

	addPathConmfirm = () => {
		const {
			title,
			shortDescription,
			description,
			pathPoints,
			distance
		} = this.state;
		let newPath = {
			id: Date.now(),
			title,
			shortDescription,
			description,
			pathPoints,
			distance
		};
		this.setState({
			title: '',
			shortDescription: '',
			description: '',
			pathPoints: [],
			distance: '',
			errors: '',
			titleError: false,
			shortDescriptionError: false,
			descriptionError: false,
			conmfirmModalOpen: false,
		});

		fire.database().ref('path').push( newPath);
		this.props.toggleModal();
		
	};

	render(){
		
		return (

			<div className={`modal-wrapper ${this.props.open ? "modal-show" : "modal-hide"}`}>

				<div className="modal-header">
					<h3 className="modal-header-title">Add new path</h3>
                    <i className="far fa-times-circle modal-icon-close" onClick={this.handleClose}></i>
				</div>

				<div className="modal-main">


				<div className="modal-input-box">
                    <form action="#" className="modal-input-form">
                        <label>Title</label>
                        <input type="text" value={this.state.title} onChange={({target}) => this.setState({title: target.value})} placeholder='Title' required className="modal-input-title"/>

                        <label>Short description</label>
                        <textarea name="Short description" className="modal-input-short" cols="30" rows="5" maxLength="160"
                                  placeholder="Input text. Max 160 symbols" required onChange={({target}) => this.setState({shortDescription: target.value})} value={this.state.shortDescription}>
                        </textarea>

                        <label>Full description</label>
                        <textarea name="Description" className="modal-input-full" cols="30" rows="5" placeholder="Full description" required onChange={({target}) => this.setState({description: target.value})} value={this.state.description}>
                        </textarea>

                    </form>

                    <button className="modal-addBtn" onClick = {this.handleAddPath}>Add</button>
                </div>

                    <div className="modal-mapBox">
                        <Map
                            lat={50.442565}
                            lng={30.513310}
                            handleClickMap={this.handleClickMap}
                            pathPoints = {this.state.pathPoints}
                            setDistance = {this.setDistance}
                        />
                    </div>

                </div>

                <ConmfirmModal
                    conmfirmModalOpen = {this.state.conmfirmModalOpen}
                    title = {this.state.title}
                    shortDescription = {this.state.shortDescription}
                    description = {this.state.description}
                    closeConmfirmModal = {this.closeConmfirmModal}
                    pathPoints = {this.state.pathPoints}
                    addPathConmfirm = {this.addPathConmfirm}
                    setDistance = {this.setDistance}
                    distance = {this.state.distance}
                />

			</div>

		)}
}


export default ModalWindow;
