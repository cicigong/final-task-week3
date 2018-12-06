import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import AddCustomer from './AddCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';




class Customerlist extends Component {
    constructor(params) {
        super(params);
        this.state = {customers: [], customerId: [], Snackbar:false, msg:'',showSnack: false};
    }


    componentDidMount() {
      this.loadCustomers();
     } 

      //Delete a customer
    deleteCustomer = (link) => {
      fetch(link, {method: 'DELETE'})
      .then(response => {
          this.loadCustomers();
          this.setState({showSnack:true, msg:'Customer deleted'})
      })
   }

     saveCustomer = (customers) => {
      fetch('https://customerrest.herokuapp.com/api/customers', 
      {method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(customers)})
      .then(response =>{
       
        this.loadCustomers();
        

      })
      

   }

    //UPDATE EXISTING CUSTOMER
    updateCustomer = (customers, link) =>{fetch(link, 
      {method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(customers)})
      .then(response =>{
        this.setState({showSnack: true, msg:'Customer saved'})
        this.loadCustomers();
      })
      .catch(err => {
        console.error(err);
        this.setState({msg:"Error in saving"})
      })
  }

  renderEditable = (cellInfo) =>{ 
    return (
        <div style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({Customers: data});
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id],

        }} />
          
        
    );
   }  

  handleClose = () => {
  this.setState({ showSnack: false });
  };

  

     loadCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(resData => {
        this.setState({customers: resData.content});
        resData.content.forEach((row) => 
              this.setState({customerId: [...this.state.customerId, row.links[0].href.substr(49)]})
            
        );
      })  

     }

     
    render() {
      const columns = [
        {
           Header: 'Id',
           accessor: (row) => {
           return row.links[0].href.substr(49)
                },
           id: 'id', 
        }
        ,{
          Header: 'Firstname',
          accessor: 'firstname', 
          Cell: this.renderEditable  
          
        }, {
          Header: 'Lastname',
          accessor: 'lastname',
          Cell: this.renderEditable  
          
        }, {
          Header: 'Streetaddress',
          accessor: 'streetaddress',
          Cell: this.renderEditable  
        }, {
          Header: 'Postcode',
          accessor: 'postcode',
          Cell: this.renderEditable  
        }, {
          Header: 'City',
          accessor: 'city',
          Cell: this.renderEditable  
        }, {
          Header: 'Email',
          accessor: 'email',
          Cell: this.renderEditable  
        }, {
          Header: 'Phone',
          accessor: 'phone',
          Cell: this.renderEditable  
        }, {
          Header: '',
          filterable: false,
          sortable: false,
          minWidth:30,
          accessor: 'links[0].href',
          
         
          Cell: ({row,value}) => ( 
          <IconButton size="small" color="default" onClick={()=>this.updateCustomer(row,value)}><SaveIcon /></IconButton>)
          
        },
         
          
        {
          Header: '',
          filterable: false,
          sortable: false,
          minWidth: 30,
          accessor: 'links[0].href',
          
        
          Cell: ({value}) => ( 
          <Tooltip title="Delete" placement="right"><IconButton color="secondary" size="small" onClick={() =>this.deleteCustomer(value)} aria-label="Delete">
             <DeleteIcon />
          </IconButton></Tooltip>)
          
        }
      ]

       
        return (
            <div>
             <AddCustomer saveCustomer={this.saveCustomer} />
              <ReactTable defaultPageSize={10} filterable={true} data={this.state.customers} columns={columns} />
              <Snackbar message={this.state.msg} autoHideDuration={2000} open={this.state.showSnack} onClose={this.handleClose} />            
            </div>
        );
    }
}

export default Customerlist;