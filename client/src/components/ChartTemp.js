import React, { Component } from "react";
import NavBar from "./NavBar";
import Setting from "./Settings";
import SideBar from "./SideBar";
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

var TestComponent= createReactClass({
	render: function() {
		return (
			<div>Helloisqdqdsqdqiqdsqidsqkwj</div>
		);
	}
});
export default class ChartTemp extends Component {
	
	
    
	render() {
		return (
			<div className="container-scroller">
			<NavBar />
			<div className="container-fluid page-body-wrapper">
				<Setting />
				<SideBar />
				<div className="main-panel">
					<div>
						<TestComponent/>
					</div>
				</div>
			</div>
		</div>
        );
	}
	
	
}
 
