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
import {getNotif ,getUncheked,getSuccsess,getInfo} from '../actions/notifActions';
import 'react-redux-datatable/dist/styles.css';
import PropTypes, { array } from 'prop-types';
import {subscribePush,unsubscribePush} from './main.js'
import { MDBDataTable } from 'mdbreact';
class InfoModel extends Component {



        state = {
          modal: false,
          name: '',
          type :''
        };
        toggle = () => {
            this.setState({
              modal: !this.state.modal
            });
          };


onChange = (e)=>{

}

onSubmit = e =>{
    e.preventDefault();
  
this.toggle();

}

componentDidMount() {
      this.props.getInfo();

    }
List = (t) => {
  let tab = [];

  for (var i = 0; i < t.length; i++) {
    let test = { name: "", type: "",date:"" };

    test.name = t[i].name;
    test.type = t[i].type;
    test.date = t[i].date;

    tab.push(test);
  }
  return tab;
}
render(){
  const { NotificationsInfo } = this.props.notifStatus;
console.log(NotificationsInfo);
if (this.props.user != null){
console.log(this.props.user._id)}
  let test2 = this.List(NotificationsInfo) ;
  const data = {
    columns: [
      {
        label: 'Content',
        field: 'Content',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Type',
        field: 'Type',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Date',
        field: 'Date',
        sort: 'asc',
        width: 200
      }
      
    ],
    rows: test2}
return(

<div>
<Button Component="dark"  className="alert-dark"
onClick ={this.toggle}  >
Show Danger </Button>

<Modal  className ="my-modal"
isOpen={this.state.modal}
toggle ={this.toggle}>
<ModalHeader toggle={this.toggle}>
</ModalHeader>
<ModalBody>
<MDBDataTable  
      striped
      bordered
      hover
      data={data}
    />    




</ModalBody>
</Modal>


</div>


)

}

}


InfoModel.propTypes = {
  getInfo: PropTypes.func.isRequired,
  notifStatus: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired

}
const mapStateToProps = (state) => ({

  notifStatus: state.notifStatus,
user :state.auth.user

});


export default connect(mapStateToProps, { getNotif,getInfo })(InfoModel);