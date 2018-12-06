import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import * as moment from 'moment';
import AddTraining from './AddTraining';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';




class Trainings extends Component {
    constructor(params) {
        super(params);
        this.state = {trainings: [], trainingId: [], customer: {}, Snackbar: false, msg:'', showSnack: false};
        //console.log(this.state)
    }

    componentDidMount() {
         this.loadTraining();
       } 

     //Delete a customer
     deleteTraining = (link) => {
       console.log(link)
      fetch(link, {method: 'DELETE'})
      .then(response => {
          this.loadTraining();
          this.setState({showSnack:true, msg:'Training deleted'})
      })
   }
    


    saveTraining = (trainings) => {
      console.log(trainings)
      fetch('https://customerrest.herokuapp.com/api/trainings', 
      {method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(trainings)})
      .then(response =>{
       
        this.loadTraining();
        

      })
   }

   //UPDATE EXISTING CUSTOMER
   updateTraining = (trainings, link) =>{fetch(link, 
    {method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(trainings)})
    .then(response =>{
      this.setState({showSnack: true, msg:'Training saved'})
      this.loadTraining();
    })
    .catch(err => {
      console.error(err);
      this.setState({msg:"Error in saving"})
    })
    console.log(this.state.trainings)
}

   

 handleClose = () => {
  this.setState({ showSnack: false });
  };


loadTraining () {
  fetch('https://customerrest.herokuapp.com/api/trainings')
  .then(res => res.json())
  .then(resData => {
  this.setState({trainings: resData.content});
  console.log(resData)
  resData.content.forEach((row) => {
        console.log(row)
        this.setState({trainingId: [...this.state.trainingId, row.links[0].href.substr(49)]})
        // fetch again to the right data to get trainingId and customerId
        fetch (row.links[2].href)
        .then(res => {
          console.log(res)
          return res.json()})
        .then(resData => {
          const trainingId = row.links[0].href.substr(49)
          const customerId = resData.links[0].href.substr(49)
          //console.log(trainingId, customerId)
          this.setState({
            customer: {...this.state.customer, [trainingId]: customerId}
          })
          //console.log(this.state.customer)

        })
        .catch(err => this.setState({
          customer: {...this.state.customer, [row.links[0].href.substr(49)]: ''}
        }))
     
  });
})  

}

    

    render() {
      const columns = [
        {
          columns: [
            {
                Header: 'Id',
                accessor: (row) => {
                    return row.links[0].href.substr(49)
                },
                id: 'id' 
              }
            
          ]
        }
        
        
        ,{
          
            Header: 'Date',
      
           
            accessor: (row) => {
               return moment(row.date).format('YYYY-M-D')
            },
            
            id: 'date'
            
                
          }, {
            Header: 'Duration',
            accessor: 'duration',
            
            
          }, {
            Header: 'Activity',
            accessor: 'activity',
           
            
          }, {
            Header: 'Customer',
            accessor: (row) => {
              // get the trainingId first 
              const trainingId =  row.links[0].href.substr(49)
              // go inside cusomer object and through trainingId to get customerId
              return this.state.customer[trainingId]  
           
            },
           
            id: 'customer'
          },{
            Header: '',
            filterable: false,
            sortable: false,
            minWidth: 30,
            accessor: 'link[0].href',
          
          
            Cell: (value) => ( 
            <Tooltip title="Delete" placement="right"><IconButton color="secondary" size="small" onClick={() =>this.deleteTraining(value.row._original.links[0].href)} aria-label="Delete">
               <DeleteIcon />
            </IconButton></Tooltip>)
            
          }
          ]

        
        return (
            <div>
               <AddTraining saveTraining={this.saveTraining} />
              <ReactTable defaultPageSize={10} filterable={true} data={this.state.trainings} columns={columns} />
              <Snackbar message={this.state.msg} autoHideDuration={2000} open={this.state.showSnack} onClose={this.handleClose} /> 
             
            </div>
        );
    }
}

export default Trainings;