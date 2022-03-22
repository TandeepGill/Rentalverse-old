import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllProperties } from '../../store/allProperties/allProperties';
import { fetchAllTenants } from '../../store/allTenants/allTenants';

import ReactLoading from 'react-loading';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    try {
      this.props.getAllProperties(this.props.user.id);
      this.props.getAllTenants(this.props.user.id);
      this.setState({
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const properties = this.props.properties || [];
    const tenants = this.props.tenants || [];

    const user = this.props.user;

    const propertyCount = (properties) => properties.length;

    const currentTenantCount = (tenants) => {
      const currentTenants = tenants.filter((tenant) => {
        return tenant.isCurrentTenant === true;
      });
      return currentTenants.length;
    };

    //Extracts and formats date from created at property of user
    const dateFormat = (timestamp) => {
      const dateFromCreatedAt = timestamp.split('T');
      const dateToFormat = dateFromCreatedAt[0];
      const newDate = new Date(dateToFormat);
      const useableDate = newDate.toString().split(' ');

      const month = useableDate[1];
      const day = useableDate[2];
      const year = useableDate[3];

      const formattedDate = `${month} ${day}, ${year}`;

      return formattedDate;
    };

    return (
      <div className='min-h-screen w-full'>
        <div className='flex w-full mx-auto mt-12 mb-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col  mx-auto items-center mb-4 justify-center w-full'>
            <h1 className='text-2xl font-bold underline text-orange-600 mb-4'>
              MY PROFILE
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

            {!this.state.isLoading && (
              <>
                <div className='flex flex-col flex-wrap bg-orange-100 border-2 border-orange-600 rounded-md w-full md:w-2/5 lg:w-1/3'>
                  <div className='flex flex-col lg:flex-row items-center justify-center'>
                    <img
                      src={user.imageURL}
                      alt='Profile picture.'
                      className='w-52 rounded-md m-2'
                    />
                    <div className='m-4'>
                      <h2 className='py-2'>
                        <span className='font-semibold'>First Name:</span>{' '}
                        {user.firstName}
                      </h2>
                      <h2 className='py-2'>
                        {' '}
                        <span className='font-semibold'>Last Name:</span>{' '}
                        {user.lastName}
                      </h2>
                      <h2 className='py-2'>
                        {' '}
                        <span className='font-semibold'>Username:</span>{' '}
                        {user.username}
                      </h2>
                      <h2 className='py-2'>
                        {' '}
                        <span className='font-semibold'>
                          Member Since:
                        </span>{' '}
                        {dateFormat(user.createdAt)}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col lg:flex-row justify-center items-center w-full lg:w-2/3'>
                  <div className='flex flex-col justify-center items-center w-full md:w-2/3 lg:1/5 h-40 lg:h-60 bg-orange-300 text-white font-semibold rounded-md p-4 lg:mx-4 my-3'>
                    <h2 className='text-2xl lg:text-4xl text-center mb-5'>
                      PROPERTIES
                    </h2>
                    <p className='text-6xl lg:text-9xl text-center'>
                      {propertyCount(properties)}
                    </p>
                  </div>
                  <div className='flex flex-col justify-center items-center w-full md:w-2/3 lg:1/5 h-40 lg:h-60 bg-orange-300 text-white font-semibold rounded-md p-4 lg:mx-4 my-3'>
                    <h2 className='text-2xl lg:text-4xl text-center mb-5'>
                      OCCUPIED
                    </h2>
                    <p className='text-6xl lg:text-9xl text-center'>
                      {currentTenantCount(tenants)}
                    </p>
                  </div>
                  <div className='flex flex-col justify-center items-center w-full md:w-2/3 lg:1/5 h-40 lg:h-60 bg-orange-300 text-white font-semibold rounded-md p-4 lg:mx-4 my-3'>
                    <h2 className='text-2xl lg:text-4xl text-center mb-5'>
                      VACANT
                    </h2>
                    <p className='text-6xl lg:text-9xl text-center'>
                      {propertyCount(properties) - currentTenantCount(tenants)}
                    </p>
                  </div>
                </div>
              </>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
