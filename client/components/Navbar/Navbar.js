import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store';
import { useState } from 'react';

import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';

const Navbar = (props) => {
  const [closeIconVisible, setCloseIconVisible] = useState(false);
  const { handleClick, isLoggedIn, user } = props;

  const mobileNavClickHandler = () => {
    setCloseIconVisible(false);
  };

  const navItems = (
    <ul
      className='mx-auto flex flex-col items-center lg:flex-row'
      onClick={mobileNavClickHandler}
    >
      <li className='mb-8 lg:mb-auto'>
        <NavLink
          to='/properties'
          className='text-xl lg:text-base font-medium hover:text-orange-600 py-1 lg:mx-4'
          activeClassName='border-b-2 border-orange-600 text-orange-600'
        >
          Properties
        </NavLink>
      </li>
      <li className='mb-8 lg:mb-auto'>
        <NavLink
          to='/tenants'
          className='text-xl lg:text-base font-medium hover:text-orange-600 py-1 lg:mx-4'
          activeClassName='border-b-2 border-orange-600 text-orange-600'
        >
          Tenants
        </NavLink>
      </li>
      <li className='mb-8 lg:mb-auto'>
        <NavLink
          to='/property/new'
          className='text-xl lg:text-base font-medium hover:text-orange-600 py-1 lg:mx-4'
          activeClassName='border-b-2 border-orange-600 text-orange-600'
        >
          Add Property
        </NavLink>
      </li>
      <li className='mb-8 lg:mb-auto'>
        <NavLink
          to='/profile'
          className='text-xl lg:text-base font-medium hover:text-orange-600 py-1 lg:mx-4'
          activeClassName='border-b-2 border-orange-600 text-orange-600'
        >
          My Profile
        </NavLink>
      </li>
    </ul>
  );

  const signedInNavRight = (
    <>
      <Link
        to='/profile'
        className='text-base font-medium hover:text-orange-600'
        onClick={mobileNavClickHandler}
      >
        <img
          className='mb-8 lg:mb-auto h-16 w-16 lg:h-10 lg:w-10 rounded-full'
          src={user.imageURL}
          alt='Profile Picture'
        />
      </Link>
      <a
        href='#'
        onClick={handleClick}
        className='text-xl lg:text-base mb-8 lg:mb-auto lg:ml-8 px-4 py-2 border border-transparent rounded-md font-medium text-white bg-orange-600 hover:bg-orange-700'
      >
        Sign out
      </a>
    </>
  );

  const signedOutNavRight = (
    <div className='flex items-center mr-4'>
      <Link to='/signin' className='text-base hover:text-orange-600'>
        Sign in
      </Link>
      <Link
        to='/signup'
        className='ml-4 lg:ml-8 px-4 py-2 border border-transparent rounded-md font-medium text-white bg-orange-600 hover:bg-orange-700'
      >
        Sign up
      </Link>
    </div>
  );

  return (
    <>
      <header className='sticky top-0 left-0 w-full h-16 bg-orange-100 flex items-center justify-between'>
        <div className='ml-4'>
          <Link to='/properties'>
            <h1 className='text-xl font-bold text-orange-600'>
              RENTAL
              <span className='font-normal text-slate-700'>VERSE</span>
            </h1>
          </Link>
        </div>

        {!closeIconVisible && isLoggedIn && (
          <nav className='hidden h-full items-center justify-center lg:flex'>
            {navItems}
          </nav>
        )}

        {!closeIconVisible && isLoggedIn && (
          <div className='visible lg:hidden'>
            <FiMenu
              className='hover:text-aqua sticky z-30 mr-5 h-full justify-end text-3xl hover:cursor-pointer lg:hidden'
              onClick={() => setCloseIconVisible(true)}
            />
          </div>
        )}

        {closeIconVisible && isLoggedIn && (
          <div className='visible lg:hidden'>
            <CgClose
              className='hover:text-aqua sticky z-30 mr-5 h-full justify-end text-3xl hover:cursor-pointer lg:hidden'
              onClick={() => setCloseIconVisible(false)}
            />
          </div>
        )}

        {isLoggedIn && (
          <div className='hidden lg:flex items-center mr-4'>
            {signedInNavRight}
          </div>
        )}

        {!isLoggedIn && signedOutNavRight}
      </header>

      {closeIconVisible && isLoggedIn && (
        <div className='fixed z-30 flex h-screen w-full flex-col items-center justify-center bg-orange-100 py-2 lg:hidden lg:static lg:h-full'>
          <div className='flex h-full w-full flex-1 mt-10 flex-col items-center justify-start bg-orange-100 px-20 text-center'>
            <div
              className='flex flex-col justify-center items-center'
              onClick={mobileNavClickHandler}
            >
              {signedInNavRight}
            </div>
            {navItems}
          </div>
        </div>
      )}
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
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
