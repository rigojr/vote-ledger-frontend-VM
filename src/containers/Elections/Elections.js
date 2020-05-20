import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';

class Elections extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {

        let ElectionsComponent = this.props.isAuthenticated ?
            <Aux>
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