import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Grid } from 'semantic-ui-react';
import Map from "../Map/Map";


export default class ConmfirmModal extends Component {
	
	handelConfirm = () => {
		this.props.addPathConmfirm();
	};

	handleClose = () => {
		this.props.closeConmfirmModal();
	};

	render() {
        console.log('distance',this.props.distance);
        console.log(this.props);
        // console.log(this.props.pathPoints);
        // console.log(this.props.setDistance);



		return (

			<Modal
				open={this.props.conmfirmModalOpen}
				onClose={this.handleClose}
				basic
				size='small'
			>
				<Header icon='map' content={this.props.title} />

					<Grid divided='vertically'>
						<Grid.Row columns={2}>
							<Grid.Column mobile={16} computer={8}>
								<Modal.Content
									style ={{padding: 10}}
								>
									<h4>{this.props.shortDescription}</h4>
									<p>{this.props.description}</p>
									<h5>{`Расстояние: ${this.props.distance/1000}км`}</h5>
								</Modal.Content>
							</Grid.Column>
							<Grid.Column mobile={16} computer={8}>
								<Map
									lat={50.442565}
									lng={30.513310}
									pathPoints = {this.props.pathPoints}
									setDistance = {this.props.setDistance}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>

				<Modal.Actions>
					<Button
						color='red'
						inverted
						onClick={this.handleClose}
						>
						<Icon name='remove' /> Отмена
					</Button>
					<Button color='green' onClick={this.handelConfirm} inverted>
						<Icon name='checkmark' /> Подтвердить
          	</Button>
				</Modal.Actions>
			</Modal>

		)
	}
}
