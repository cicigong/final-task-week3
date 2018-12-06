import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
        this.addModal = React.createRef();
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});

    } 

    saveCustomer = () => {
        const customers = {id: this.state.id, firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone};
        this.props.saveCustomer(customers);
        this.setState({id: '', firstname: ''})
        this.addModal.current.hide();
    }

    render() {
        const addDialog = {
            
            width: '30%',
            height: '300px',
            marginLeft: '-35%',
            
          };
        return (
            <div>
                      
        <Button style={{margin: 10}} variant="contained" color="primary" onClick={() =>this.addModal.current.show()}><AddIcon></AddIcon>New customer</Button>   
        <SkyLight dialogstyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Add customer">
         <TextField placeholder= "Id" name="id" onChange={this.handleChange} value={this.state.id} /><br />
         <TextField placeholder= "Firstname" name="firstname" onChange={this.handleChange} value={this.state.firstname} /><br />
         <TextField placeholder= "Lastname" name="lastname" onChange={this.handleChange} value={this.state.lastname} /><br />
         <TextField placeholder= "Streetaddress" name="streetaddress" onChange={this.handleChange} value={this.state.streetaddress} /><br />
         <TextField placeholder= "Postcode" name="postcode" onChange={this.handleChange} value={this.state.Postcode} /><br />
         <TextField placeholder= "City" name="city" onChange={this.handleChange} value={this.state.city} /><br />
         <TextField placeholder= "Email" name="email" onChange={this.handleChange} value={this.state.email} /><br />
         <TextField placeholder= "Phone" name="phone" onChange={this.handleChange} value={this.state.phone} /><br />
         <Button style={{margin:15}} onClick={this.saveCustomer} variant="contained" color="default"><SaveIcon></SaveIcon>save</Button>
        </SkyLight>   
            </div>
        );
    }
}

export default AddCustomer;