import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { addNewProperty } from '../../store/addNewProperty/addNewProperty';

class AddNewProperty extends React.Component {
  constructor() {
    super();
    this.state = {
      type: '',
      address: '',
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
    this.props.addNewProperty({ ...this.state }, this.props.user.id);
    this.setState({
      type: '',
      address: '',
      bedroom: '',
      bathroom: '',
      sqft: '',
      imageURL: '',
    });
    this.props.history.push('/properties', this.state);
  }

  render() {
    const { type, address, bedroom, bathroom, sqft, imageURL } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div
        div
        className='max-w-2xl mx-auto mt-12 mb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8 min-h-screen'
      >
        <h1 className='text-2xl font-bold underline mb-4 text-orange-600'>
          ADD A NEW PROPERTY
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start justify-center'
        >
          <div className='flex mb-4 w-80 justify-between'>
            <label htmlFor='type' className='font-semibold mr-4'>
              Type:
            </label>
            <input
              name='type'
              onChange={handleChange}
              value={type}
              placeholder='Property Type'
              className='border border-orange-300 rounded px-2'
            />
          </div>
          <div className='flex mb-4 w-80 justify-between'>
            <label htmlFor='address' className='font-semibold mr-4'>
              Address:
            </label>
            <input
              name='address'
              onChange={handleChange}
              value={address}
              placeholder='Street, City, State, Zip'
              className='border border-orange-300 rounded px-2'
            />
          </div>
          <div className='flex mb-4 w-80 justify-between'>
            <label htmlFor='bedroom' className='font-semibold mr-4'>
              Bedroom:
            </label>
            <input
              name='bedroom'
              onChange={handleChange}
              value={bedroom}
              placeholder='Bedroom Count'
              className='border border-orange-300 rounded px-2'
            />
          </div>
          <div className='flex mb-4 w-80 justify-between'>
            <label htmlFor='bathroom' className='font-semibold mr-4'>
              Bathroom:
            </label>
            <input
              name='bathroom'
              onChange={handleChange}
              value={bathroom}
              placeholder='Bathroom Count'
              className='border border-orange-300 rounded px-2'
            />
          </div>
          <div className='flex mb-4 w-80 justify-between'>
            <label htmlFor='sqft' className='font-semibold mr-4'>
              Sqft:
            </label>
            <input
              name='sqft'
              onChange={handleChange}
              value={sqft}
              placeholder='Property Sqft'
              className='border border-orange-300 rounded px-2'
            />
          </div>
          <div className='flex mb-4 w-80 justify-between'>
            <label htmlFor='imageURL' className='font-semibold mr-4'>
              Image:
            </label>
            <input
              name='imageURL'
              onChange={handleChange}
              value={imageURL}
              placeholder='Image URL'
              className='border border-orange-300 rounded px-2'
            />
          </div>
          <div className='flex justify-end mb-4 w-80'>
            <button
              type='submit'
              className='text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-lg text-sm px-5 py-2 text-center'
            >
              Submit
            </button>
          </div>
        </form>
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
