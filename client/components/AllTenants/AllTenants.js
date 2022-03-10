import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllTenants } from '../../store/allTenants/allTenants';

class AllTenants extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      this.props.getAllTenants(this.props.user.id);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const tenants = this.props.tenants || [];

    return (
      <div>
        <div className='max-w-2xl mx-auto mt-12 mb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen'>
          <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
            ALL TENANTS
          </h1>
          <div className='flex flex-wrap'>
            {tenants.map((tenant) => {
              return (
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
                    {tenant.property.address}
                  </h4>
                  <h4>
                    <span className='font-bold'>Lease Price:</span>{' '}
                    {`$${tenant.price}`}
                  </h4>
                  <h4>
                    <span className='font-bold'>Start Date:</span>{' '}
                    {tenant.startDate}
                  </h4>
                  <div className='flex justify-between items-between'>
                    <h4>
                      <span className='font-bold'>End Date:</span>{' '}
                      {tenant.endDate}
                    </h4>
                    <Link exact to={`/properties/${tenant.property.id}`}>
                      <div className='mt-3 text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'>
                        Go To Property
                      </div>
                    </Link>
                  </div>

                  {/* <h4>
                    <span className='font-bold'>Size:</span> {tenant.endDate}
                  </h4>
                  <Link exact to={`/properties/${tenant.property.id}`}>
                    <div className='mt-3 text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2'>
                      Go To Property
                    </div>
                  </Link> */}
                </div>
              );
            })}
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
