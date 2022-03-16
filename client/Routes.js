import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import AllProperties from './components/AllProperties/AllProperties';
import SingleProperty from './components/SingleProperty/SingleProperty';
import AllTenants from './components/AllTenants/AllTenants';
import AddNewProperty from './components/AddNewProperty/AddNewProperty';
import UserProfile from './components/UserProfile/UserProfile';

import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/properties' component={AllProperties} />
            <Route
              exact
              path='/properties/:propertyId'
              component={SingleProperty}
            />
            <Route exact path='/property/new' component={AddNewProperty} />
            <Route exact path='/tenants' component={AllTenants} />
            <Route exact path='/profile' component={UserProfile} />
            <Redirect to='/properties' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
