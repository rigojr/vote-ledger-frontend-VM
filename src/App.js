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

  installHandler = () => {
    console.log("installHandler");
    this.setState( { installed: !this.state.installed });
  }

  saveIdPollingStation = (event) => {
    console.log("saveIdPollingStation");
    this.setState( { pollingStationInstalled: event.target.value } )
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
                    {...props} 
                    installHandler={this.installHandler} 
                    selectEvent={this.saveIdPollingStation}
                    selectedPollingStation={this.state.pollingStationInstalled}/>
              } 
            />
            <Route 
              path="/login"
              render={ 
                (props) => 
                  <Login 
                    {...props} 
                    loginHandler={this.authenticationHandler} 
                    isInstalled={this.state.installed}
                    selectedPollingStation={this.state.pollingStationInstalled}/>
                }
              />
            <Route 
              path="/elections"
              render= {
                (props) =>
                  <Elections 
                    {...props}
                    isAuthenticated={this.state.authenticated}
                    authenticationHandler={this.authenticationHandler}/>
              } 
            />
            <Route 
              path="/candidates"
              render={
                (props) =>
                <Candidates 
                  {...props}
                  isAuthenticated={this.state.authenticated}/>
              }
            />
            />
            <Redirect from="/" to="/install"/>
          </Switch>
      </Layout>
    );
  }
}

export default App;
