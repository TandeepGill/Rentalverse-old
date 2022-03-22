import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllProperties } from '../../store/allProperties/allProperties';
import { fetchAllTenants } from '../../store/allTenants/allTenants';

import ReactLoading from 'react-loading';

class AllProperties extends React.Component {
  constructor() {
    super();
    this.state = {
      dropDown: 'All',
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getAllProperties(this.props.user.id);
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
    const allProperties = this.props.properties || [];
    const singleFamily = allProperties.filter(
      (property) => property.type === 'Single-Family'
    );
    const townhouses = allProperties.filter(
      (property) => property.type === 'Townhouse'
    );
    const condos = allProperties.filter(
      (property) => property.type === 'Condo'
    );

    const { handleChange } = this;

    //Formats a number to a string with commas
    const numToStringFormat = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    //Formats an address to display on two lines
    const addressFormat = (address) => {
      const splitAddress = address.split('\n');
      const addressLineOne = splitAddress[0];
      const addressLineTwo = splitAddress[1];
      return { addressLineOne, addressLineTwo };
    };

    const newPropertyLayout = (property) => (
      <div
        key={property.id}
        className='flex flex-col w-96 sm:w-72 border-2 p-2 m-auto lg:m-2 mb-6 border-orange-300 rounded-md items-center'
      >
        <Link to={`/properties/${property.id}`}>
          <div className='m-0.5'>
            <img
              className='rounded-md mb-2 object-cover'
              src={property.imageURL}
              alt=''
            />
          </div>
          <h3 className='mt-6 text-gray-900 font-medium text-center mb-2'>
            {addressFormat(property.address).addressLineOne}
            <br />
            {addressFormat(property.address).addressLineTwo}
          </h3>
          <h4 className='text-gray-500 text-base mb-2 text-center'>
            {property.type}
          </h4>
          <h4 className='rounded-md mb-4 text-center'>
            <span className='text-orange-600 bg-orange-50 px-2 py-1 font-medium'>
              {numToStringFormat(property.sqft)} sqft
            </span>
          </h4>
          <div className='flex justify-center space-x-4 mb-2'>
            <h3>
              Bedrooms:{' '}
              <span className='text-orange-600 bg-orange-50 px-2 py-1 font-medium'>
                {property.bedroom}
              </span>
            </h3>
            <h3>
              Bathrooms:{' '}
              <span className='text-orange-600 bg-orange-50 px-2 py-1 font-medium'>
                {property.bathroom}
              </span>
            </h3>
          </div>
        </Link>
      </div>
    );

    return (
      <div>
        <div className='w-full mx-auto mt-12 mb-4 px-4 sm:px-6 lg:px-8 min-h-screen'>
          <div className='flex flex-col lg:flex-row items-center mb-4 justify-center'>
            <h1 className='text-2xl font-bold underline text-orange-600 mb-4 lg:mb-0'>
              {this.state.dropDown === 'All' && 'ALL PROPERTIES'}
              {this.state.dropDown === 'Single-Family' &&
                'SINGLE-FAMILY PROPERTIES'}
              {this.state.dropDown === 'Townhouse' && 'TOWNHOUSE PROPERTIES'}
              {this.state.dropDown === 'Condo' && 'CONDO PROPERTIES'}
            </h1>
            <div className='flex mb-4 lg:mb-0 lg:ml-8 justify-center items-center'>
              <label htmlFor='properties'>Filter Properties:</label>
              <select
                name='properties'
                onChange={handleChange}
                className='w-36 h-7 ml-3 p-0 pl-2'
              >
                <option value='All'>All</option>
                <option value='Single-Family'>Single-Family</option>
                <option value='Townhouse'>Townhouse</option>
                <option value='Condo'>Condo</option>
              </select>
            </div>
          </div>
          <div className='flex flex-wrap justify-center w-full'>
            <div className='w-full flex flex-wrap justify-start lg:mx-40'>
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
              {this.state.dropDown === 'All' &&
                allProperties.length > 0 &&
                allProperties.map((property) => newPropertyLayout(property))}
              {this.state.dropDown === 'Single-Family' &&
                singleFamily.length > 0 &&
                singleFamily.map((singleFamily) =>
                  newPropertyLayout(singleFamily)
                )}
              {this.state.dropDown === 'Townhouse' &&
                townhouses.length > 0 &&
                townhouses.map((townhouse) => newPropertyLayout(townhouse))}
              {this.state.dropDown === 'Condo' &&
                condos.length > 0 &&
                condos.map((condo) => newPropertyLayout(condo))}
              {allProperties.length === 0 && !this.state.isLoading && (
                <div className='flex flex-col justify-center items-center min-w-full mt-10'>
                  <p>YOU HAVE NO PROPERTIES TO DISPLAY!</p>
                  <p>
                    {
                      <Link
                        to='/property/new'
                        className='text-orange-600 font-bold hover:text-orange-800'
                      >
                        CLICK HERE,{' '}
                      </Link>
                    }
                    TO ADD A PROPERTY.
                  </p>
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
  properties: state.properties,
  tenants: state.tenants,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProperties: (userId) => dispatch(fetchAllProperties(userId)),
  getAllTenants: (userId) => dispatch(fetchAllTenants(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProperties);
