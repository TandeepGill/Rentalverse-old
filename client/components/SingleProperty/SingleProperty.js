import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchSingleProperty } from '../../store/singleProperty/singleProperty';

class SingleProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      startDate: '',
      endDate: '',
      rent: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getSingleProperty(this.props.match.params.propertyId);
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateLease({ ...this.state }, this.props.userId);
    this.setState({
      firstName: '',
      lastName: '',
      startDate: '',
      endDate: '',
    });
  }

  render() {
    const property = this.props.property || [];
    const sqftFormat = (sqft) => {
      if (sqft.length < 4) {
        return sqft;
      } else {
        let firstNum = sqft[0];
        return `${firstNum},${sqft.slice(1)}`;
      }
    };
    return (
      <div className='bg-gray-50'>
        <div className='max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <form className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
            <div>
              <div className='mt-10 border-t border-gray-200 pt-10'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Lease information
                </h2>

                <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='firstName'
                        onChange={handleChange}
                        value={firstName}
                        placeholder='First name'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Last name'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='startDate'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='date'
                        id='startDate'
                        name='startDate'
                        placeholder='First name'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Last name'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='company'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Company
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='company'
                        id='company'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Address
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='address'
                        id='address'
                        autoComplete='street-address'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='apartment'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='apartment'
                        id='apartment'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        autoComplete='address-level2'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
                    </label>
                    <div className='mt-1'>
                      <select
                        id='country'
                        name='country'
                        autoComplete='country-name'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium text-gray-700'
                    >
                      State / Province
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='region'
                        id='region'
                        autoComplete='address-level1'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Postal code
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        autoComplete='postal-code'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Phone
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='phone'
                        id='phone'
                        autoComplete='tel'
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className='mt-10 lg:mt-0'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Order summary
                </h2>

                <div className='mt-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
                  <h3 className='sr-only'>Items in your cart</h3>
                  <ul role='list' className='divide-y divide-gray-200'>
                    {property.map((property) => (
                      <li key={property.id} className='flex py-6 px-4 sm:px-6'>
                        <div className='flex-shrink-0'>
                          <img
                            src={property.imageSrc}
                            alt={property.imageAlt}
                            className='w-20 rounded-md'
                          />
                        </div>

                        <div className='ml-6 flex-1 flex flex-col'>
                          <div className='flex'>
                            <div className='min-w-0 flex-1'>
                              <h4 className='text-sm'>
                                <a
                                  href={property.href}
                                  className='font-medium text-gray-700 hover:text-gray-800'
                                >
                                  {property.title}
                                </a>
                              </h4>
                              <p className='mt-1 text-sm text-gray-500'>
                                {property.color}
                              </p>
                              <p className='mt-1 text-sm text-gray-500'>
                                {property.size}
                              </p>
                            </div>

                            <div className='ml-4 flex-shrink-0 flow-root'>
                              <button
                                type='button'
                                className='-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500'
                              >
                                <span className='sr-only'>Remove</span>
                                <TrashIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </div>

                          <div className='flex-1 pt-2 flex items-end justify-between'>
                            <p className='mt-1 text-sm font-medium text-gray-900'>
                              {property.price}
                            </p>

                            <div className='ml-4'>
                              <label htmlFor='quantity' className='sr-only'>
                                Quantity
                              </label>
                              <select
                                id='quantity'
                                name='quantity'
                                className='rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className='border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <dt className='text-sm'>Subtotal</dt>
                      <dd className='text-sm font-medium text-gray-900'>
                        $64.00
                      </dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-sm'>Shipping</dt>
                      <dd className='text-sm font-medium text-gray-900'>
                        $5.00
                      </dd>
                    </div>
                    <div className='flex items-center justify-between'>
                      <dt className='text-sm'>Taxes</dt>
                      <dd className='text-sm font-medium text-gray-900'>
                        $5.52
                      </dd>
                    </div>
                    <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                      <dt className='text-base font-medium'>Total</dt>
                      <dd className='text-base font-medium text-gray-900'>
                        $75.52
                      </dd>
                    </div>
                  </dl>

                  <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                    <button
                      type='submit'
                      className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  property: state.property,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProperty: (propertyId) => dispatch(fetchSingleProperty(propertyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProperty);
