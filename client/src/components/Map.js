import React, { Component } from "react";
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import axios from 'axios';
import {getSmartCoord,getSmart } from '../actions/smartHubAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


 class Map extends Component {

    constructor(props) {
        super(props);
        this.state= {
            venues: [],
            smartHubs : []
        }
    }
      
     async  componentDidMount() {
            this.getVenues();
            const response = await fetch('http://localhost:5000/api/smarthub');
            const data=  await response.json();
            this.setState({ smartHubs : data }, function () {
              this.renderMap()

            });       
                }
                
      renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
        window.initMap = this.initMap
      }
    
      getVenues = () => {
        const endPoint = "https://api.foursquare.com/v2/venues/explore?"
        const parameters = {
          client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
          client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
          query: "food",
          near: "Sydney",
          v: "20182507"
        }
    
        axios.get(endPoint + new URLSearchParams(parameters))
          .then(response => {
            this.setState({
              venues: response.data.response.groups[0].items
            })
          })
          .catch(error => {
            console.log("ERROR!! " + error)
          })
    
      }
    
      initMap = () => {
    
        
        // Create A Map
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.8601, lng: 10.1934},
          zoom: 8
        })
    
        // Create An InfoWindow
        var infowindow = new window.google.maps.InfoWindow()
    
        // Display Dynamic Markers
        var smartHubs = this.state.smartHubs;
            smartHubs.map(smartHub => {
    
         var contentString = `${smartHub.serialNumber}`
            
          // Create A Marker
          
            
            
          var marker = new window.google.maps.Marker({
            position: {lat: Math.trunc(smartHub.lat) , lng: Math.trunc(smartHub.lon)},
            map: map,
            title: smartHub.serialNumber
          })
          // eslint-disable-next-line no-loop-func
          marker.addListener('click', function() {
    
                // Change the content
                infowindow.setContent("Serial number #"+contentString)
        
                // Open An InfoWindow
                infowindow.open(map, marker)
            })
        
    
          // Click on A Marker!
         
    
        })
    
        
    
      }
    
      render() {
        return (
            <div className="container-scroller">
            <NavBar />
            <div className="container-fluid page-body-wrapper">
                <Setting />
                <SideBar />
                <div className="main-panel">
                        <main>
                             <div id="map"></div>
                        </main>
                </div>
            </div>
        </div>
          
        )
      }
    }
    
    
    function loadScript(url) {
        var index  = window.document.getElementsByTagName("script")[0]
        var script = window.document.createElement("script")
        script.src = url
        script.async = true
        script.defer = true
        index.parentNode.insertBefore(script, index)
      }
    



  

export default Map;