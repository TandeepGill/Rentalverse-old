// import React from 'react';
import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import { Popover } from '@headlessui/react';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <Link to='/home'>Home</Link>
        <a
          href='#'
          onClick={handleClick}
          className='no-underline inline-block m-1'
        >
          Logout
        </a>
      </div>
    ) : (
      <Popover className='relative bg-orange-50'>
        <div className='flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
          <div>
            <h1 className='text-xl tracking-wider font-semibold text-orange-600'>
              RENTAL<span className='font-normal text-slate-700'>VERSE</span>
            </h1>
          </div>
          <div className='md:flex-1 md:flex md:items-center md:justify-between'>
            <div as='nav' className='flex space-x-10'>
              <a
                href='#'
                className='text-base font-medium hover:text-orange-600'
              >
                Properties
              </a>
              <a
                href='#'
                className='text-base font-medium hover:text-orange-600'
              >
                Tenants
              </a>
            </div>
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
        </div>
      </Popover>
    )}
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

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>Rentalverse</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to='/home'>Home</Link>
//           <a
//             href='#'
//             onClick={handleClick}
//             className='no-underline inline-block m-1'
//           >
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to='/login'>Login</Link>
//           <Link to='/signup'>Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// );
