import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { fetchSingleProperty } from '../../store/singleProperty/singleProperty';

class SingleProperty extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      this.props.getSingleProperty(this.props.match.params.propertyId);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const property = this.props.property || {};
    return (
      <div className='bg-gray-50'>
        <div className='max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h1>Property</h1>
          <h3>{property.type}</h3>
          <h4>{property.address}</h4>
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
