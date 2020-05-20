import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Install from './containers/Install/Install';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      authenticated: false,
      installed: false
    };
  }

  authenticationHandler = () => {

    console.log("authenticationHandler")
    const auth = this.state.authenticated;
    const authUpdated = !auth;
    this.setState( { authenticated: authUpdated } );

  }

  installHandler = () => {
    console.log("installHandler");
    this.setState( { installed: !this.state.installed } );
  }

  render() {
    return (
      <Layout>
        <Switch>
            <Route 
              path="/install"
              render={ (props) => <Install {...props} installHandler={this.installHandler}/>}/>
            <Redirect from="/" to="/install"/>
          </Switch>
      </Layout>
    );
  }
}

export default App;
