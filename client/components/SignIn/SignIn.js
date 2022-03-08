import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../../store';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name;
    const username = event.target.username.value;
    const password = event.target.password.value;
    this.props.handleSignIn(username, password, name);
  }

  render() {
    const { handleSubmit } = this;
    const { name, displayName, error } = this.props;
    return (
      <>
        <div className='flex flex-col mt-20 sm:px-6 lg:px-8 min-h-screen'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-700'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or if you don't have an account{' '}
              <Link
                to='/signup'
                className='font-medium text-orange-600 hover:text-orange-700'
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-orange-50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <form className='space-y-6' onSubmit={handleSubmit} name={name}>
                <div>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Username
                  </label>
                  <div className='mt-1'>
                    <input
                      name='username'
                      type='text'
                      placeholder='Email address'
                      required
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      name='password'
                      type='password'
                      placeholder='Password'
                      required
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                  >
                    {displayName}
                  </button>
                  {error && error.response && (
                    <div className='text-slate-700 mt-3'>
                      {' '}
                      {error.response.data}{' '}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapSignIn = (state) => {
  return {
    name: 'signin',
    displayName: 'Sign in',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSignIn: (username, password, name) => {
      dispatch(authenticate(username, password, name));
    },
  };
};

export default connect(mapSignIn, mapDispatch)(SignIn);
