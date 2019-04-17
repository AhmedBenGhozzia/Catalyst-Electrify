import React, {Component } from 'react'
import ToExcel from 'react-html-table-to-excel';


export default class DataTableSmart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="content-wrapper">
                <ToExcel
                id="dataTable-table-button"
                className="export"
                table="table-to-xls"
                filename="SmartHubsData"
                sheet="tablexls"
                buttonText="Export xls"
                />
                    <table hidden="true" id="table-to-xls">
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Country</th>
                                <th>Maintenance status</th>
                                <th>Last update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.smartHubs.map(smartHub => {
                                    return(
                                        <tr key={smartHub.serialNumber}>
                                            <td>{smartHub.serialNumber}</td>
                                            <td>{smartHub.country}</td>
                                            <td>{smartHub.maintenance_status}</td>
                                            <td>{smartHub.last_update}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                
            </div>
        )
    }


    
}