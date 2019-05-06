import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/smartHubAction';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    username: '',
    email: '',
    password : '',
    serialNumber :''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onChangeName(value) {
    this.setState({ username: value});
  }

  onChangePassword(value) {
    this.setState({ password: value});
  }

  onChangeEmail(value) {
    this.setState({ email: value});
  }

  onChangeSerial(value) {
    this.setState({ serialNumber: value});
  }

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      serialNumber : this.state.serialNumber

    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
    window.location.reload();
  };

  render() {
    return (
      <div style={{textAlign : 'center'}}>
        
          <Button
            color='dark'
            style={{ marginBottom: '2rem', width: '400px', height: '150px', display: 'inline-block', fontSize :'35px' }}
            onClick={this.toggle}
          >
            Add a SmartHub
          </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To SmartHubs</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='SmartHub name'
                  onChange={(e) =>this.onChangeName(e.target.value)}
                  
                />
                <Input
                  type='text'
                  name='email'
                  id='item1'
                  placeholder='SmartHub email'
                  onChange={(e) =>this.onChangeEmail(e.target.value)}
                  
                />
                <Input
                  type='text'
                  name='password'
                  id='item2'
                  placeholder='SmartHub password'
                  onChange={(e) =>this.onChangePassword(e.target.value)}
                  
                />
                <Input
                  type='text'
                  name='serialNumber'
                  id='item3'
                  placeholder='SmartHub serial number'
                  onChange={(e) =>this.onChangeSerial(e.target.value)}
                  
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block> 
                  Add a SmartHub
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  email: state.email,
  password: state.password,
  serialNumber: state.serialNumber 
});



export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);