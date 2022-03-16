import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchAllProperties } from '../../store/allProperties/allProperties';
import { fetchAllTenants } from '../../store/allTenants/allTenants';

class UserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      this.props.getAllProperties(this.props.user.id);
      this.props.getAllTenants(this.props.user.id);
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

    const previousTenantCount = (tenants) => {
      const previousTenants = tenants.filter((tenant) => {
        return tenant.isCurrentTenant === false;
      });
      return previousTenants.length;
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
      <div>
        <div className='max-w-2xl mx-auto mt-12 mb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen'>
          <div className='flex items-center mb-4'>
            <h1 className='text-2xl font-bold underline text-orange-600'>
              USER PROFILE
            </h1>
          </div>
          <div className='flex flex-col flex-wrap'>
            <div className='flex mb-6 items-center bg-orange-100 border-2 border-orange-600 rounded-md w-2/5'>
              <img
                src={user.imageURL}
                alt='Profile picture.'
                className='w-48 rounded-md m-3'
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
                  <span className='font-semibold'>Member Since:</span>{' '}
                  {dateFormat(user.createdAt)}
                </h2>
              </div>
            </div>

            <div className='flex justify-center items-center'>
              <div className='w-2/5 h-60 bg-orange-600 text-white font-semibold rounded-md p-4 mr-5'>
                <h2 className='text-3xl text-center mb-5'>TOTAL PROPERTIES</h2>
                <p className='text-9xl text-center'>
                  {propertyCount(properties)}
                </p>
              </div>
              <div className='w-2/5 h-60 bg-orange-600 text-white font-semibold rounded-md p-4 mx-8'>
                <h2 className='text-3xl text-center mb-5'>CURRENT TENANTS</h2>
                <p className='text-9xl text-center'>
                  {currentTenantCount(tenants)}
                </p>
              </div>
              <div className='w-2/5 h-60 bg-orange-600 text-white font-semibold rounded-md p-4 ml-5'>
                <h2 className='text-3xl text-center mb-5'>PREVIOUS TENANTS</h2>
                <p className='text-9xl text-center'>
                  {previousTenantCount(tenants)}
                </p>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
