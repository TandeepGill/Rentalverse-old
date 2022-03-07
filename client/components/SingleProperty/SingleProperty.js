import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchSingleProperty } from '../../store/singleProperty/singleProperty';

class SingleProperty extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      this.props.getSingleProperty(this.props.match.params.propertyId);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const property = this.props.property.propertyDetails || {};
    const lease = this.props.property.leaseDetails || {};

    return (
      <div>
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
          <div className='flex'>
            <div className='flex gap-x-4'>
              <h3>
                <span className='font-bold'>Tenant Name:</span>{' '}
                {`${lease.firstName} ${lease.lastName}`}
              </h3>
              <h4>
                <span className='font-bold'>Price:</span> {`$${lease.price}`}
              </h4>
              <h4>
                <span className='font-bold'>Start Date:</span> {lease.startDate}
              </h4>
              <h4>
                <span className='font-bold'>End Date:</span> {lease.endDate}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  property: state.property,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProperty: (propertyId) => dispatch(fetchSingleProperty(propertyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProperty);
