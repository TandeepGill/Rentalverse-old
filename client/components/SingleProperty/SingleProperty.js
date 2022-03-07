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
