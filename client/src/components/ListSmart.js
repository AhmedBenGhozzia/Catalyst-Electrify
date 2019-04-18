import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getSmart,deleteItem } from '../actions/smartHubAction';
import PropTypes from 'prop-types';
import ItemModal from './ItemModal';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class ListSmart extends Component {

  
    componentDidMount() {
        this.props.getSmart();
    }
    onDeleteClick = serialNumber => {
      confirmAlert({
        title: 'Confirm to delete the smarthHub #'+ serialNumber,
        message: 'Are you sure you want to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {alert('SmartHub deleted successfully !');
            this.props.deleteItem(serialNumber);
            }
          },
          {
            label: 'No',
            onClick: () => alert('Deletion cancelled !')
          }
        ]
      });
      
    };
    
    render() {
        
        const{smartHubs} = this.props.smartHub;
        return (
            <Container>
        <ListGroup>
          <TransitionGroup className='SmartHub-list'>
         
            {smartHubs.map(({ serialNumber, username}) => (
              <CSSTransition key={serialNumber} timeout={500} classNames='fade'>
                <ListGroupItem>

                  Smarthub #{serialNumber}: {username} <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, serialNumber)}
                    >
                      &times;
                    </Button>
                 
                </ListGroupItem>
              </CSSTransition>
            ))}
            <div className="content-wrapper">
                            <Router>
                                <Switch>
                                    <Route  component={ItemModal} />
                                </Switch>
                            </Router>
                        </div>
          </TransitionGroup>
        </ListGroup>
      </Container>
      
        );
        
    }
}

ListSmart.propTypes = {
        getSmart : PropTypes.func.isRequired,
        smartHub : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    smartHub: state.smartHub
});


export default connect(mapStateToProps, { getSmart,deleteItem }) (ListSmart);