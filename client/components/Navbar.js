// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='relative bg-orange-50'>
    <div className='flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
      <Link to='/home'>
        <div>
          <h1 className='text-xl tracking-wider font-bold text-orange-600'>
            RENTAL<span className='font-normal text-slate-700'>VERSE</span>
          </h1>
        </div>
      </Link>
      {isLoggedIn ? (
        <div className='md:flex-1 md:flex md:items-center md:justify-between'>
          <div as='nav' className='flex space-x-10'>
            <a href='#' className='text-base font-medium hover:text-orange-600'>
              Properties
            </a>
            <a href='#' className='text-base font-medium hover:text-orange-600'>
              Tenants
            </a>
          </div>
          <div className='flex items-center md:ml-12'>
            <Link
              to='/profile'
              className='text-base font-medium hover:text-orange-600'
            >
              <img
                className='h-9 w-9 rounded-full'
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                alt=''
              />
            </Link>
            <a
              href='#'
              onClick={handleClick}
              className='ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700'
            >
              Sign out
            </a>
          </div>
        </div>
      ) : (
        <div className='md:flex-1 md:flex md:items-center md:justify-between'>
          <div as='nav' className='flex space-x-10'></div>
          <div className='flex items-center md:ml-12'>
            <Link
              to='/signin'
              className='text-base font-medium hover:text-orange-600'
            >
              Sign in
            </Link>
            <Link
              to='/signup'
              className='ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700'
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
