import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
  fetchSingleProperty,
  resetSingleProperty,
} from '../../store/singleProperty/singleProperty';
import {
  fetchSingleLease,
  resetSingleLease,
  addNewLease,
  endCurrentLease,
} from '../../store/singleLease/singleLease';

class SingleProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
      price: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editLeaseHandler = this.editLeaseHandler.bind(this);
    this.endLeaseHandler = this.endLeaseHandler.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getSingleProperty(this.props.match.params.propertyId);
      this.props.getSingleLease(this.props.match.params.propertyId);
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    this.props.resetSingleProperty();
    this.props.resetSingleLease();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const state = this.state;
    const propertyId = this.props.property.id;
    const userId = this.props.user.id;

    this.props.addNewLease({ ...state }, { propertyId, userId });
    this.setState({
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
      price: '',
    });
  }

  editLeaseHandler() {
    const appState = this.props.lease;
    this.setState({
      firstName: appState.firstName,
      lastName: appState.lastName,
      startDate: appState.startDate,
      endDate: appState.endDate,
      price: appState.price,
    });
    console.log('EDIT LEASE BUTTON PRESSED!');
  }

  endLeaseHandler() {
    const leaseId = this.props.lease.id;
    this.props.endCurrentLease(leaseId);
  }

  render() {
    const property = this.props.property || {};
    const lease = this.props.lease || {};

    const { firstName, lastName, startDate, endDate, price } = this.state;
    const { handleSubmit, handleChange, editLeaseHandler, endLeaseHandler } =
      this;

    const newLeaseForm = (
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-start justify-center'
      >
        <div className='flex mb-4 w-80 justify-between'>
          <label htmlFor='firstName' className='font-semibold mr-4'>
            First Name:
          </label>
          <input
            name='firstName'
            onChange={handleChange}
            value={firstName}
            placeholder='First Name'
            className='border border-orange-300 rounded px-2 w-52'
          />
        </div>
        <div className='flex mb-4 w-80 justify-between'>
          <label htmlFor='lastName' className='font-semibold mr-4'>
            Last Name:
          </label>
          <input
            name='lastName'
            onChange={handleChange}
            value={lastName}
            placeholder='Last Name'
            className='border border-orange-300 rounded px-2 w-52'
          />
        </div>
        <div className='flex mb-4 w-80 justify-between items-center'>
          <label htmlFor='startDate' className='font-semibold mr-4'>
            Start Date:
          </label>
          <input
            name='startDate'
            type='date'
            onChange={handleChange}
            value={startDate}
            placeholder='Start Date'
            className='border border-orange-300 rounded px-2 w-52'
          />
        </div>
        <div className='flex mb-4 w-80 justify-between items-center'>
          <label htmlFor='endDate' className='font-semibold mr-4'>
            End Date:
          </label>
          <input
            name='endDate'
            type='date'
            onChange={handleChange}
            value={endDate}
            placeholder='End Date'
            className='border border-orange-300 rounded px-2 w-52'
          />
        </div>
        <div className='flex mb-4 w-80 justify-between'>
          <label htmlFor='price' className='font-semibold mr-4'>
            Price:
          </label>
          <input
            name='price'
            onChange={handleChange}
            value={price}
            placeholder='0000'
            className='border border-orange-300 rounded px-2 w-52'
          />
        </div>
        <div className='flex justify-end mb-4 w-80'>
          <button
            type='submit'
            className='text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2 text-center'
          >
            Submit
          </button>
        </div>
      </form>
    );

    return (
      <div className='min-h-screen'>
        <div className='max-w-2xl mx-auto mt-12 mb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
            PROPERTY DETAILS
          </h1>
          <div className='flex'>
            <img
              className='h-60 rounded-md mr-4'
              src={property.imageURL}
              alt=''
            />
            <div className='flex flex-col justify-center gap-y-2'>
              <h3>
                <span className='font-bold'>Type:</span> {property.type}
              </h3>
              <h4>
                <span className='font-bold'>Address:</span> {property.address}
              </h4>
              <h4>
                <span className='font-bold'>Bedrooms:</span> {property.bedroom}
              </h4>
              <h4>
                <span className='font-bold'>Bathrooms:</span>{' '}
                {property.bathroom}
              </h4>
              <h4>
                <span className='font-bold'>Size:</span> {property.sqft} sqft
              </h4>
            </div>
          </div>
        </div>
        <div className='max-w-2xl mx-auto mt-12 mb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
            LEASE DETAILS
          </h1>
          {Object.keys(lease).length === 0 ? (
            <div className='flex'>{newLeaseForm}</div>
          ) : (
            <div className='flex items-center'>
              <div className='flex gap-x-4'>
                <h3>
                  <span className='font-bold'>Tenant Name:</span>{' '}
                  {`${lease.firstName} ${lease.lastName}`}
                </h3>
                <h4>
                  <span className='font-bold'>Price:</span> {`$${lease.price}`}
                </h4>
                <h4>
                  <span className='font-bold'>Start Date:</span>{' '}
                  {lease.startDate}
                </h4>
                <h4>
                  <span className='font-bold'>End Date:</span> {lease.endDate}
                </h4>
              </div>
              <div className='flex items-center mx-6 justify-between w-60'>
                <button
                  type='submit'
                  onClick={editLeaseHandler}
                  className='text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2 text-center w-28'
                >
                  Edit Lease
                </button>
                <button
                  type='submit'
                  onClick={endLeaseHandler}
                  className='text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2 text-center w-28'
                >
                  End Lease
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  property: state.property,
  lease: state.lease,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProperty: (propertyId) => dispatch(fetchSingleProperty(propertyId)),
  getSingleLease: (propertyId) => dispatch(fetchSingleLease(propertyId)),
  resetSingleProperty: () => dispatch(resetSingleProperty()),
  resetSingleLease: () => dispatch(resetSingleLease()),
  addNewLease: (tenant, { propertyId, userId }) =>
    dispatch(addNewLease(tenant, { propertyId, userId })),
  endCurrentLease: (leaseId) => dispatch(endCurrentLease(leaseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProperty);
