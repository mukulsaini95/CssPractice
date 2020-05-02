/**
 *
 * ManageUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as SELECTORS from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as ACTIONS from './actions'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Modal from 'react-modal'


const defaultButton = props => (
  <button type="button" {...props} >
    {props.children}
  </button>
)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '30%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
const columns = [
  {
    Header: 'Name',
    accessor: 'firstName',
    filterable: true,
    style: { textAlign: "center" }
  },
  {
    Header: 'Email',
    accessor: 'email',
    filterable: true,
    style: { textAlign: "center" }
  },
  {
    Header: 'Phone No',
    accessor: 'phoneNumbers',
    filterable: false,
    style: { textAlign: "center" },
  },
  {
    Header: 'Address',
    accessor: 'userAddresses',
    filterable: false,
    style: { textAlign: "center" },
  },
  {
    Header: 'Create At',
    accessor: 'createdAt',
    filterable: false,
    style: { textAlign: "center" },
  }
];

let payload = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumbers: [],
  addresses: [],
  roleId: '',
}

export class ManageUsers extends React.Component {
  state = {
    usersData: [],
    rolesData: [],
    modal: false,
    payload: payload
  }

  componentDidMount() {
    this.props.getAllUser();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.usersData !== nextProps.usersList) {
      this.setState({ usersData: nextProps.usersList })
    }
    if (this.state.rolesList !== nextProps.rolesList) {
      this.setState({ rolesData: nextProps.rolesList })
    }
    if (typeof nextProps.createUser !== "undefined" && nextProps.createUser.code === 200) {
      this.props.getAllUser();
      $('#myModal').css({ display: "none" })
    }
  }

  onChangeHandler = event => {
    let payload = { ...this.state.payload }
    payload[event.currentTarget.id] = event.currentTarget.value;
    this.setState({ payload })
  }

  addUserClickHandler = event => {
    this.props.getAllRoles();
    $('#myModal').css({ display: "block" })
    this.setState({ modal: true, payload })
  }

  saveUser = event => {
    event.preventDefault();
    console.log("payload of create user", this.state.payload)
    this.props.saveUser(this.state.payload);
  }

  render() {

    return (
      <React.Fragment >
        <div className="contentHeader">
          <div className="row">
            <div className="col-8">

              <p><span>Manage Users</span></p>
            </div>
            <div className="col-4">
              <button className="addButton"
                onClick={this.addUserClickHandler}> <span>&#43;</span>
              </button>
            </div>
          </div>

        </div>
        <div className="contentContainer">
          <ReactTable
            data={this.state.usersData}
            columns={columns}
            defaultPageSize={10}
            noDataText={"No Data Found"}
            className="customReactTable"
            PreviousComponent={defaultButton}
            NextComponent={defaultButton}
          />
        </div>

        <div id="myModal" className="modal">
          <form onSubmit={this.saveUser}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="close mr-r-10" onClick={() => $('#myModal').css({ display: "none" })}>&times;</span>
                <button className="close">&#10003;</button>
                <p>Add User</p>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label for="firstName">First Name :</label>
                  <input type="text" id="firstName" autoComplete="off" value={this.state.payload.firstName} className="form-control" placeholder="First Name" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label for="lastName">Last Name :</label>
                  <input type="text" id="lastName" autoComplete="off" value={this.state.payload.lastName} className="form-control" placeholder="First Name" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label for="email">Email :</label>
                  <input type="email" id="email" autoComplete="off" value={this.state.payload.email} className="form-control" placeholder="Email" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label for="password">Password :</label>
                  <input type="password" id="password" autoComplete="off" value={this.state.payload.password} className="form-control" placeholder="Password" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label for="phoneNumbers">Phone Numbers:</label>
                  <input type="text" id="phoneNumbers" autoComplete="off" value={this.state.payload.phoneNumbers} className="form-control" placeholder="Phone Numbers" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label for="addresses">Address :</label>
                  <textarea type="text" id="addresses" value={this.state.payload.addresses} autoComplete="off" className="form-control" placeholder="Address" required onChange={this.onChangeHandler} />
                </div>
                <div className="form-group">
                  <label> Roles : </label>
                  <select className="form-control" value={this.state.payload.roleId} name="roles" id="roles" required onChange={this.onChangeHandler}>
                    <option value=""> select</option>
                    {this.state.rolesData.map((type, index) => {
                      return (<option key={index} value={type.id}>{type.name}</option>)
                    })
                    }
                  </select>
                </div>
              </div>
            </div>
          </form>

        </div>
      </React.Fragment>
    );
  }
}

ManageUsers.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usersList: SELECTORS.getUsersList(),
  rolesList: SELECTORS.getRolesLIst(),
  createUser: SELECTORS.createUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllRoles: () => dispatch(ACTIONS.getAllRoles()),
    getAllUser: () => dispatch(ACTIONS.getAllUsers()),
    saveUser: payload => dispatch(ACTIONS.createUser(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageUsers', reducer });
const withSaga = injectSaga({ key: 'manageUsers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUsers);
