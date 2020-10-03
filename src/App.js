import React, { Component } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';

import Install from './containers/Install/Install';
import Login from './containers/Login/Login';
import Elections from './containers/Elections/Elections';
import Candidates from './containers/Candidates/Candidates';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      authenticated: false,
      installed: false,
      pollingStationInstalled: "Seleccione una de las opciones"
    };
  }

  authenticationHandler = () => {
    console.log("authenticationHandler")
    this.setState( { authenticated: !this.state.authenticated } );
  }

  render() {
    return (
      <Layout>
        <Switch>
            <Route 
              path="/install"
              render={ 
                (props) => 
                  <Install 
                    {...props} />
              } 
            />
            <Route 
              path="/login"
              render={ 
                (props) => 
                  <Login 
                    {...props} 
                    loginHandler={this.authenticationHandler}/>
                }
              />
            <Route 
              path="/elections"
              render= {
                (props) =>
                  <Elections 
                    {...props}/>
              } 
            />
            <Route 
              path="/candidates"
              render={
                (props) =>
                <Candidates 
                  {...props}/>
              }
            />
            <Redirect from="/" to="/install"/>
          </Switch>
      </Layout>
    );
  }
}

export default App;
