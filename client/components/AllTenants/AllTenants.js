import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllTenants } from '../../store/allTenants/allTenants';

import ReactLoading from 'react-loading';

class AllTenants extends React.Component {
  constructor() {
    super();
    this.state = {
      dropDown: 'all',
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getAllTenants(this.props.user.id);
      this.setState({
        ...this.state,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(evt) {
    this.setState({
      dropDown: evt.target.value,
    });
  }

  render() {
    const allTenants = this.props.tenants || [];
    const currentTenants = allTenants.filter(
      (tenant) => tenant.isCurrentTenant === true
    );
    const previousTenants = allTenants.filter(
      (tenant) => tenant.isCurrentTenant === false
    );

    const { handleChange } = this;

    //Formats a number to a string with commas
    const numFormat = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    //Formats address by splitting into two parts
    const addressFormat = (address) => {
      const splitAddress = address.split('\n');
      const addressLineOne = splitAddress[0];
      const addressLineTwo = splitAddress[1];
      return { addressLineOne, addressLineTwo };
    };

    const tenantLayout = (tenant) => (
      <div
        key={tenant.id}
        className='flex flex-col w-96 sm:w-72 lg:w-1/3 border-2 p-2 m-auto lg:m-2 mb-6 border-orange-300 rounded-md items-start justify-center'
      >
        <h3>
          <span className='font-bold'>Name:</span>{' '}
          {`${tenant.firstName} ${tenant.lastName}`}
        </h3>
        <h4>
          <span className='font-bold'>Address:</span>{' '}
          {`${addressFormat(tenant.property.address).addressLineOne}, ${
            addressFormat(tenant.property.address).addressLineTwo
          }`}
        </h4>
        <h4>
          <span className='font-bold'>Lease Price:</span>{' '}
          {`$${numFormat(tenant.price)}`}
        </h4>
        <h4>
          <span className='font-bold'>Start Date:</span> {tenant.startDate}
        </h4>
        <div className='flex flex-col lg:flex-row justify-between items-between'>
          <h4>
            <span className='font-bold'>End Date:</span> {tenant.endDate}
          </h4>
        </div>
        <div className='w-full lg:ml-auto lg:w-fit xl:w-5/12 lg:text-right'>
          <Link to={`/properties/${tenant.property.id}`}>
            <div className='w-full mt-3 text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'>
              Go To Property
            </div>
          </Link>
        </div>
      </div>
    );

    return (
      <div>
        <div className='w-full mx-auto mt-12 mb-4 px-4 sm:px-6 lg:px-8 min-h-screen'>
          <div className='flex flex-col lg:flex-row items-center mb-4 justify-center'>
            <h1 className='text-2xl font-bold underline text-orange-600 mb-4 lg:mb-0'>
              {this.state.dropDown === 'all' && 'ALL TENANTS'}
              {this.state.dropDown === 'current' && 'CURRENT TENANTS'}
              {this.state.dropDown === 'previous' && 'PREVIOUS TENANTS'}
            </h1>
            <div className='flex mb-4 lg:mb-0 lg:ml-8 justify-center items-center'>
              <label htmlFor='properties'>Filter Tenants:</label>
              <select
                name='tenants'
                onChange={handleChange}
                className='w-36 h-7 ml-3 p-0 pl-2'
              >
                <option value='all' className=''>
                  All
                </option>
                <option value='current' className=''>
                  Current
                </option>
                <option value='previous' className=''>
                  Previous
                </option>
              </select>
            </div>
          </div>
          <div className='flex flex-wrap justify-center w-full'>
            <div className='w-full flex flex-wrap justify-center lg:mx-40'>
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
              {this.state.dropDown === 'all' &&
                allTenants.length > 0 &&
                allTenants.map((tenant) => tenantLayout(tenant))}
              {this.state.dropDown === 'current' &&
                currentTenants.length > 0 &&
                currentTenants.map((tenant) => tenantLayout(tenant))}
              {this.state.dropDown === 'previous' &&
                previousTenants.length > 0 &&
                previousTenants.map((tenant) => tenantLayout(tenant))}
              {allTenants.length === 0 && !this.state.isLoading && (
                <div className='flex flex-col justify-center items-center min-w-full mt-10'>
                  <p>YOU HAVE NO TENANTS TO DISPLAY!</p>
                  <p>VISIT A PROPERTY'S DETAILS PAGE AND ADD A TENANT.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  tenants: state.tenants,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTenants: (userId) => dispatch(fetchAllTenants(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTenants);
