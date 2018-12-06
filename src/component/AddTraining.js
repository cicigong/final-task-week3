import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', date: '', duration: '', activity: '', customerId: ''};
        this.addModal = React.createRef();
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});

    } 

    saveTraining = () => {
        const trainings = {id: this.state.id, date: this.state.date, duration: this.state.duration, activity: this.state.activity, customerId: this.state.customerId};
        this.props.saveTraining(trainings);
        this.setState({id: '', date: '', duration: '', activity: '', customerId: ''})
        this.addModal.current.hide();
        //console.log(trainings);
    }

    render() {

        const addDialog = {
            
            width: '30%',
            height: '300px',
            marginLeft: '-35%',
            
          };
        return (
            <div>
             <Button style={{margin: 10}} variant="contained" color="primary" onClick={() =>this.addModal.current.show()}><AddIcon></AddIcon>New Training</Button>   
             <SkyLight dialogstyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Add training">
             <TextField placeholder= "Id" name="id" onChange={this.handleChange} value={this.state.id} /><br />
             <TextField placeholder= "Date" name="date" onChange={this.handleChange} value={this.state.date} /><br />
             <TextField placeholder= "Duration" name="duration" onChange={this.handleChange} value={this.state.duration} /><br />
             <TextField placeholder= "Activity" name="activity" onChange={this.handleChange} value={this.state.activity} /><br />
             <TextField placeholder= "CustomerId" name="customerId" onChange={this.handleChange} value={this.state.customerId} /><br />
             <Button style={{margin:15}} onClick={this.saveTraining} variant="contained" color="default"><SaveIcon></SaveIcon>save</Button>
             </SkyLight>   
                
            </div>
        );
    }
}

export default AddTraining;
