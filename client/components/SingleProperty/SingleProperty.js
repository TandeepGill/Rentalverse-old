import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllProperties } from '../../store/allProperties/allProperties';
import {
  fetchSingleProperty,
  resetSingleProperty,
  deleteSingleProperty,
} from '../../store/singleProperty/singleProperty';
import {
  fetchSingleLease,
  resetSingleLease,
  addNewLease,
  editCurrentLease,
  endCurrentLease,
} from '../../store/singleLease/singleLease';

import ReactLoading from 'react-loading';

class SingleProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      leaseDetails: {
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        price: '',
      },
      isEditLease: false,
      isLoading: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.deletePropertyHandler = this.deletePropertyHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.editLeaseHandler = this.editLeaseHandler.bind(this);
    this.endLeaseHandler = this.endLeaseHandler.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getSingleProperty(this.props.match.params.propertyId);
      this.props.getSingleLease(this.props.match.params.propertyId);
      this.setState({
        ...this.state,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    this.props.resetSingleProperty();
    this.props.resetSingleLease();
  }

  handleChange(evt) {
    const localLeaseState = { ...this.state };
    localLeaseState.leaseDetails[evt.target.name] = evt.target.value;
    this.setState({ localLeaseState });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const lease = this.state.leaseDetails;
    const propertyId = this.props.property.id;
    const userId = this.props.user.id;

    //Removes all non-numeric characters from price
    lease.price = lease.price.replace(/\D/g, '');

    this.props.addNewLease({ ...lease }, { propertyId, userId });
    this.setState({
      ...this.state,
      leaseDetails: {
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        price: '',
      },
      isEditLease: false,
    });
  }

  deletePropertyHandler() {
    const propertyId = this.props.property.id;
    this.props.deleteSingleProperty(propertyId);
    this.props.getAllProperties(this.props.user.id);

    this.props.history.push('/properties');
  }

  handleEditSubmit(evt) {
    evt.preventDefault();

    const leaseDetails = this.state.leaseDetails;

    //Removes all non-numeric characters from price
    leaseDetails.price = leaseDetails.price.toString().replace(/\D/g, '');

    const { firstName, lastName, startDate, endDate, price } = leaseDetails;

    const lease = {
      firstName,
      lastName,
      startDate,
      endDate,
      price,
    };
    const leaseId = this.props.lease.id;

    this.props.editCurrentLease(lease, leaseId);
    this.setState({
      ...this.state,
      leaseDetails: {
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        price: '',
      },
      isEditLease: false,
    });
  }

  editLeaseHandler() {
    const appState = { ...this.props.lease };
    const { firstName, lastName, startDate, endDate, price } = appState;

    this.setState({
      ...this.state,
      leaseDetails: {
        firstName: firstName,
        lastName: lastName,
        startDate: startDate,
        endDate: endDate,
        price: price,
      },
      isEditLease: true,
    });
  }

  endLeaseHandler() {
    const leaseId = this.props.lease.id;
    this.props.endCurrentLease(leaseId);
  }

  render() {
    const property = this.props.property || {};
    const lease = this.props.lease || {};

    const { firstName, lastName, startDate, endDate, price } =
      this.state.leaseDetails;

    const { isEditLease } = this.state;
    const {
      deletePropertyHandler,
      handleSubmit,
      handleEditSubmit,
      handleChange,
      editLeaseHandler,
      endLeaseHandler,
    } = this;

    //Fromats a number to a string with commas
    const numToStringFormat = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const newLeaseForm = (typeOfSubmit) => (
      <form
        onSubmit={typeOfSubmit}
        className='flex flex-col items-center justify-center w-full'
      >
        <div className='flex flex-col lg:flex-row mb-4 w-full lg:w-96 justify-between lg:items-center'>
          <label
            htmlFor='firstName'
            className='font-semibold mr-4 mb-2 lg:mb-0 px-1'
          >
            First Name:
          </label>
          <input
            name='firstName'
            onChange={handleChange}
            value={firstName}
            placeholder='First Name'
            className='border border-orange-300 rounded px-2 h-10 w-full lg:w-64'
          />
        </div>
        <div className='flex flex-col lg:flex-row mb-4 w-full lg:w-96 justify-between lg:items-center'>
          <label htmlFor='lastName' className='font-semibold mr-4 mb-2 lg:mb-0'>
            Last Name:
          </label>
          <input
            name='lastName'
            onChange={handleChange}
            value={lastName}
            placeholder='Last Name'
            className='border border-orange-300 rounded px-2 h-10 w-full lg:w-64'
          />
        </div>
        <div className='flex flex-col lg:flex-row mb-4 w-full lg:w-96 justify-between lg:items-center'>
          <label
            htmlFor='startDate'
            className='font-semibold mr-4 mb-2 lg:mb-0'
          >
            Start Date:
          </label>
          <input
            name='startDate'
            type='date'
            onChange={handleChange}
            value={startDate}
            placeholder='Start Date'
            className='border border-orange-300 rounded px-2 h-10 w-full lg:w-64'
          />
        </div>
        <div className='flex flex-col lg:flex-row mb-4 w-full lg:w-96 justify-between lg:items-center'>
          <label htmlFor='endDate' className='font-semibold mr-4 mb-2 lg:mb-0'>
            End Date:
          </label>
          <input
            name='endDate'
            type='date'
            onChange={handleChange}
            value={endDate}
            placeholder='End Date'
            className='border border-orange-300 rounded px-2 h-10 w-full lg:w-64'
          />
        </div>
        <div className='flex flex-col lg:flex-row mb-4 w-full lg:w-96 justify-between lg:items-center'>
          <label htmlFor='price' className='font-semibold mr-4 mb-2 lg:mb-0'>
            Price:
          </label>
          <input
            name='price'
            onChange={handleChange}
            value={price}
            placeholder='Lease Price'
            className='border border-orange-300 rounded px-2 h-10 w-full lg:w-64'
          />
        </div>
        <div className='flex justify-end my-2 w-full lg:w-96'>
          <button
            type='submit'
            className='text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer w-full lg:w-64'
          >
            Submit
          </button>
        </div>
      </form>
    );

    return (
      <div className='min-h-screen'>
        <div className='flex w-full mx-auto mt-12 mb-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex mx-auto flex-col items-center mb-4 justify-center'>
            <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
              PROPERTY DETAILS
            </h1>
            {this.state.isLoading && (
              <div className='flex justify-center items-center min-w-full'>
                <ReactLoading
                  type={'cylon'}
                  color={'#dd6b20'}
                  height={'25%'}
                  width={'25%'}
                />
              </div>
            )}
            {Object.keys(property).length > 0 && !this.state.isLoading && (
              <div className='flex flex-col lg:flex-row items-center w-full'>
                <img
                  className='h-60 rounded-md lg:mr-4'
                  src={property.imageURL}
                  alt='Exterior of property'
                />
                <div className='flex flex-col justify-center gap-y-3 mt-4 lg:mt-0'>
                  <h3>
                    <span className='font-bold'>Type:</span> {property.type}
                  </h3>
                  <h4>
                    <span className='font-bold'>Address:</span>{' '}
                    {property.address}
                  </h4>
                  <h4>
                    <span className='font-bold'>Bedrooms:</span>{' '}
                    {property.bedroom}
                  </h4>
                  <h4>
                    <span className='font-bold'>Bathrooms:</span>{' '}
                    {property.bathroom}
                  </h4>
                  <h4>
                    <span className='font-bold'>Size:</span>{' '}
                    {numToStringFormat(property.sqft)} sqft
                  </h4>
                  <div className='flex justify-start my-4 lg:w-80 w-full'>
                    <button
                      type='button'
                      onClick={deletePropertyHandler}
                      className='text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer w-full lg:w-fit'
                    >
                      Delete Property
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center mx-auto mt-12 mb-4 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
            LEASE DETAILS
          </h1>
          <div className='flex flex-col items-center mb-4 justify-center mt-2 w-full'>
            {this.state.isLoading && (
              <div className='flex justify-center items-center min-w-full'>
                <ReactLoading
                  type={'cylon'}
                  color={'#dd6b20'}
                  height={'25%'}
                  width={'25%'}
                />
              </div>
            )}

            {Object.keys(lease).length === 0 && !this.state.isLoading && (
              <div className='flex w-full'>{newLeaseForm(handleSubmit)}</div>
            )}

            {isEditLease && !this.state.isLoading && (
              <div className='flex w-full'>
                {newLeaseForm(handleEditSubmit)}
              </div>
            )}

            {!isEditLease &&
              Object.keys(lease).length > 1 &&
              !this.state.isLoading && (
                <div className='flex flex-col lg:flex-row items-center w-full justify-center'>
                  <div className='flex flex-col lg:flex-row gap-x-4 w-full lg:w-fit'>
                    <h3 className='my-2 lg:my-0'>
                      <span className='font-bold'>Tenant Name:</span>{' '}
                      {`${lease.firstName} ${lease.lastName}`}
                    </h3>
                    <h4 className='my-2 lg:my-0'>
                      <span className='font-bold'>Price:</span>{' '}
                      {`$${numToStringFormat(lease.price)}`}
                    </h4>
                    <h4 className='my-2 lg:my-0'>
                      <span className='font-bold'>Start Date:</span>{' '}
                      {lease.startDate}
                    </h4>
                    <h4 className='my-2 lg:my-0'>
                      <span className='font-bold'>End Date:</span>{' '}
                      {lease.endDate}
                    </h4>
                  </div>
                  <div className='flex flex-col lg:flex-row items-center justify-center my-2 lg:my-0 mx-6 w-full lg:w-80'>
                    <button
                      type='button'
                      onClick={editLeaseHandler}
                      className='text-white bg-yellow-500 hover:bg-yellow-600 font-medium mx-2 rounded-lg text-sm px-5 py-2 text-center my-3 lg:my-0 w-full lg:w-28 cursor-pointer'
                    >
                      Edit Lease
                    </button>
                    <button
                      type='button'
                      onClick={endLeaseHandler}
                      className='text-white bg-red-600 hover:bg-red-700 font-medium mx-2 rounded-lg text-sm px-5 py-2 text-center my-3 lg:my-0 w-full lg:w-28 cursor-pointer'
                    >
                      End Lease
                    </button>
                  </div>
                </div>
              )}
          </div>
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
  getAllProperties: (userId) => dispatch(fetchAllProperties(userId)),
  getSingleProperty: (propertyId) => dispatch(fetchSingleProperty(propertyId)),
  getSingleLease: (propertyId) => dispatch(fetchSingleLease(propertyId)),
  resetSingleProperty: () => dispatch(resetSingleProperty()),
  resetSingleLease: () => dispatch(resetSingleLease()),
  deleteSingleProperty: (propertyId) =>
    dispatch(deleteSingleProperty(propertyId)),
  addNewLease: (tenant, { propertyId, userId }) =>
    dispatch(addNewLease(tenant, { propertyId, userId })),
  editCurrentLease: (lease, leaseId) =>
    dispatch(editCurrentLease(lease, leaseId)),
  endCurrentLease: (leaseId) => dispatch(endCurrentLease(leaseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProperty);
