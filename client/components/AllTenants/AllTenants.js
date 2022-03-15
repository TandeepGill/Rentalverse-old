import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllTenants } from '../../store/allTenants/allTenants';

class AllTenants extends React.Component {
  constructor() {
    super();
    this.state = {
      dropDown: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getAllTenants(this.props.user.id);
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
        className='flex flex-col w-2/5 border-2 p-2 mr-6 mb-6 border-orange-300 rounded-md'
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
        <div className='flex justify-between items-between'>
          <h4>
            <span className='font-bold'>End Date:</span> {tenant.endDate}
          </h4>
          <Link to={`/properties/${tenant.property.id}`}>
            <div className='mt-3 text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'>
              Go To Property
            </div>
          </Link>
        </div>
      </div>
    );

    return (
      <div>
        <div className='max-w-2xl mx-auto mt-12 mb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen'>
          <div className='flex items-center mb-4'>
            <h1 className='text-2xl font-bold underline text-orange-600'>
              {this.state.dropDown === 'all' && 'ALL TENANTS'}
              {this.state.dropDown === 'current' && 'CURRENT TENANTS'}
              {this.state.dropDown === 'previous' && 'PREVIOUS TENANTS'}
            </h1>
            <div className='flex ml-8 justify-center items-center'>
              <label htmlFor='tenants'>Filter Tenants:</label>
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
          <div className='flex flex-wrap'>
            {this.state.dropDown === 'all' &&
              allTenants.length > 0 &&
              allTenants.map((tenant) => tenantLayout(tenant))}
            {this.state.dropDown === 'current' &&
              currentTenants.length > 0 &&
              currentTenants.map((tenant) => tenantLayout(tenant))}
            {this.state.dropDown === 'previous' &&
              previousTenants.length > 0 &&
              previousTenants.map((tenant) => tenantLayout(tenant))}
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
