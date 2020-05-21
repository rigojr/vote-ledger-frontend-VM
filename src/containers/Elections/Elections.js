import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';

class Elections extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        let ElectionsComponent = this.props.isAuthenticated ?
        
            <Aux>
                <Header 
                    authenticationHandler={this.props.authenticationHandler}/>
                <p>Soy Elections</p>
            </Aux>:
            <Redirect from="/elections" to="/install"/>

        return (
            <Aux>
                {ElectionsComponent}
            </Aux>
        );
    }
}

export default Elections;