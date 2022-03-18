import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { addNewProperty } from '../../store/addNewProperty/addNewProperty';

class AddNewProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      type: '',
      addressLineOne: '',
      addressLineTwo: '',
      bedroom: '',
      bathroom: '',
      sqft: '',
      imageURL: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const propertyDetails = { ...this.state };

    //Removes all non-numeric characters from property bedroom, bathroom and sqft
    propertyDetails.bedroom = propertyDetails.bedroom.replace(/\D/g, '');
    propertyDetails.bathroom = propertyDetails.bathroom.replace(/\D/g, '');
    propertyDetails.sqft = propertyDetails.sqft.replace(/\D/g, '');

    const property = { ...propertyDetails };

    this.props.addNewProperty({ ...property }, this.props.user.id);
    this.setState({
      type: '',
      addressLineOne: '',
      addressLineTwo: '',
      bedroom: '',
      bathroom: '',
      sqft: '',
      imageURL: '',
    });
    this.props.history.push('/properties', { ...property });
  }

  render() {
    const {
      type,
      addressLineOne,
      addressLineTwo,
      bedroom,
      bathroom,
      sqft,
      imageURL,
    } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div className='w-11/12 lg:w-3/5 xl:w-2/5 mx-auto mt-12 mb-4 px-4 sm:px-6 lg:px-8 min-h-screen'>
        <div className='flex flex-col items-center mb-4 justify-center mx-auto w-full'>
          <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
            ADD A NEW PROPERTY
          </h1>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-start justify-center w-full'
          >
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label htmlFor='type' className='font-semibold my-2 mr-6 w-44'>
                Type:
              </label>
              <select
                name='type'
                onChange={handleChange}
                defaultValue='Select Your Option'
                className='border border-orange-300 rounded px-2 w-full h-7 p-0'
              >
                <option
                  value='Select Your Option'
                  disabled
                  className='text-slate-200'
                >
                  Select Your Option
                </option>
                <option value='Single-Family'>Single-Family</option>
                <option value='Townhouse'>Townhouse</option>
                <option value='Condo'>Condo</option>
              </select>
            </div>
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label
                htmlFor='addressLineOne'
                className='font-semibold my-2 mr-6 w-44'
              >
                Address Line 1:
              </label>
              <input
                name='addressLineOne'
                onChange={handleChange}
                value={addressLineOne}
                placeholder='Street Number and Name'
                className='border border-orange-300 rounded px-2 w-full h-7'
              />
            </div>
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label
                htmlFor='addressLineTwo'
                className='font-semibold my-2 mr-6 w-44'
              >
                Address Line 2:
              </label>
              <input
                name='addressLineTwo'
                onChange={handleChange}
                value={addressLineTwo}
                placeholder='City, State Zip'
                className='border border-orange-300 rounded px-2 w-full h-7'
              />
            </div>
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label htmlFor='bedroom' className='font-semibold my-2 mr-6 w-44'>
                Bedroom:
              </label>
              <input
                name='bedroom'
                onChange={handleChange}
                value={bedroom}
                placeholder='Bedroom Count'
                className='border border-orange-300 rounded px-2 w-full h-7'
              />
            </div>
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label
                htmlFor='bathroom'
                className='font-semibold my-2 mr-6 w-44'
              >
                Bathroom:
              </label>
              <input
                name='bathroom'
                onChange={handleChange}
                value={bathroom}
                placeholder='Bathroom Count'
                className='border border-orange-300 rounded px-2 w-full h-7'
              />
            </div>
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label htmlFor='sqft' className='font-semibold my-2 mr-6 w-44'>
                Sqft:
              </label>
              <input
                name='sqft'
                onChange={handleChange}
                value={sqft}
                placeholder='Property Sqft'
                className='border border-orange-300 rounded px-2 w-full h-7'
              />
            </div>
            <div className='flex flex-col lg:flex-row mb-4 w-full justify-between'>
              <label
                htmlFor='imageURL'
                className='font-semibold my-2 mr-6 w-44'
              >
                Image:
              </label>
              <input
                name='imageURL'
                onChange={handleChange}
                value={imageURL}
                placeholder='Image URL'
                className='border border-orange-300 rounded px-2 w-full h-7'
              />
            </div>
            <div className='flex justify-end my-2 lg:my-0 mb-4 w-full'>
              <button
                type='submit'
                className='text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2 text-center w-full lg:w-44'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  properties: state.properties,
});

const mapDispatchToProps = (dispatch) => ({
  addNewProperty: (property, userId) =>
    dispatch(addNewProperty(property, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProperty);
