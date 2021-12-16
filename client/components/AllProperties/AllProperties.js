import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllProperties } from '../../store/allProperties/allProperties';

import { MailIcon, PhoneIcon } from '@heroicons/react/solid';

class AllProperties extends React.Component {
  componentDidMount() {
    try {
      this.props.getAllProperties(this.props.user.id);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const properties = this.props.properties || [];
    const sqftFormat = (sqft) => {
      if (sqft.length < 4) {
        return sqft;
      } else {
        let firstNum = sqft[0];
        return `${firstNum},${sqft.slice(1)}`;
      }
    };
    return (
      <div className='mx-28 my-6 place-content-center'>
        <ul
          role='list'
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
        >
          {' '}
          {properties.length > 0 ? (
            properties.map((property) => (
              <li
                key={property.id}
                className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
              >
                <div className='flex-1 flex flex-col p-8'>
                  <img
                    className='w-38 h-38 flex-shrink-0 mx-auto rounded-md'
                    src={property.imageURL}
                    alt=''
                  />
                  <h3 className='mt-6 text-gray-900 text-base font-medium'>
                    {property.address}
                  </h3>
                  <dl className='mt-1 flex-grow flex flex-col justify-between'>
                    <dd className='text-gray-500 text-base'>{property.type}</dd>
                    <dd className='mt-3'>
                      <span className='px-2 py-1 text-orange-600 text-base font-medium bg-orange-50 rounded-md'>
                        {sqftFormat(property.sqft)} sqft
                      </span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className='-mt-px flex divide-x divide-gray-200'>
                    <div className='w-0 flex-1 flex'>
                      <h3 className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-base text-orange-600 font-medium border border-transparent rounded-br-lg hover:text-orange-700'>
                        Bedrooms: {property.bedroom}
                      </h3>
                    </div>
                    <div className='-ml-px w-0 flex-1 flex'>
                      <h3 className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-base text-orange-600 font-medium border border-transparent rounded-br-lg hover:text-orange-700'>
                        Bathrooms: {property.bathroom}
                      </h3>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h1 className='text-xl'>'You have no properties to display!'</h1>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  properties: state.properties,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProperties: (userId) => dispatch(fetchAllProperties(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProperties);
