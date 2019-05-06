import React, {Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getSmart, deleteItem } from '../actions/smartHubAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import del from './ListSmart';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemModal from './ItemModal';
import ToExcel from './ExportExcel';
import Battery from './Battery'
import ProgressBar from 'react-bootstrap/ProgressBar'
var request = require('request');



 export default class DataTableSmart extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            smartHubs : [],
            serialNumber : 0,
            now: 80
        }
    }

    async componentDidMount() {
      const response = await fetch('http://localhost:5000/api/smarthub');
      const data=  await response.json();
      this.setState({ smartHubs : data }, function () {
        console.log(this.state.smartHubs);
   });       
    }
    
    onDeleteClick = serialNumber => {
        confirmAlert({
          title: 'Confirm to delete the smarthHub #'+ serialNumber,
          message: 'Are you sure you want to do this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {alert('SmartHub deleted successfully !');
              request({
                url: "http://localhost:5000/api/smarthub/delete/"+serialNumber,
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10,
                json:true,
        });
              window.location.reload();
            }
            },
            {
              label: 'No',
              onClick: () => alert('Deletion cancelled !')
            }
          ]
        });
        
      };
      

    render () {
        
        const columns= [
            {
            Header: "SmartHub serial n°",
            accessor: "serialNumber",
            filterable: true,
            width: 150,
            maxWidth:150,
            style : {
                textAlign: 'center'
            }
            },
            {
            Header: "Country",
            accessor: "country",
            filterable: true,
            width: 180,
            maxWidth:180,
            style : {
                textAlign: 'center'
            }
            },
            {
            Header: "Maintenance status",
            accessor: "maintenance_status",
            filterable: true,
            width: 210,
            maxWidth:210,
            style : {
                color: 'green',
                textAlign: 'center'
            }
            },
            {
            Header: "Last update",
            accessor: "last_update",
            filterable: true,
            style : {
                textAlign: 'center'
            }
            },
            {
                Header: "Actions",
                style : {
                    textAlign: 'center'
                },
                width: 150,
                 maxWidth:150,
                Cell: props =>{
                    return(
                        <button style={{backgroundColor: 'red', color: '#fefefe'}}
                        onClick={ 
                           // console.log("Your serial number: ", props.original.serialNumber)
                            this.onDeleteClick.bind(this,props.original.serialNumber)
                        }
                        >Delete</button>
                    )
                }
            }
    ]

        return(

            <div className="container-scroller">
                <NavBar />
                <div className="container-fluid page-body-wrapper">
                    <Setting />
                    <SideBar />
                    <div className="main-panel">
                        <div>
                            <ReactTable
                            columns= {columns}
                            data={this.state.smartHubs}
                            defaultPageSize={5}
                            noDataText="Loading..."
                            >

                                {(state, filteredData , instance) => {
                                    this.reactTable = state.pageRows.map(smartHub => {
                                        
                                        return(smartHub._original)
                                        
                                    });
                                    return(
                                        <div>
                                            {filteredData()}
                                            <ToExcel smartHubs={this.reactTable}/>
                                        </div>
                                    )
                                }}

                            </ReactTable>
                        </div>
                        <div style={{backgroundColor :'#ffffff'}}>
                        <h3 style={{color:'blue',textAlign:'center'}}>SmartHub #1485555302
 average battery storage (Total capacity is 1 Kwatts)</h3>
                        
                        <div style={{textAlign:'center',backgroundColor :'#ffffff'}}>
                        <div style={{ width: '300px',height:'350px', display: 'inline-block' }}>
                        <Battery/>
                        </div>
                        </div>
                        </div>        
        
                        
                    </div>
                </div>
            </div>
            
        )
    }
}

    DataTableSmart.propTypes = {
        smartHub : PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => ({
        smartHub: state.smartHub
    });



    connect(mapStateToProps, { deleteItem }) (DataTableSmart); 