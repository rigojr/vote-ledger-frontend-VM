import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    backbuttonHandler = () => {
        console.log("backbuttonHandler");
        this.props.history.push( '/elections/' );
    }

    votebuttonHandler = () =>{
        console.log("votebuttonHandler");
    }

    render() {

        let CandidatesComponent = this.props.isAuthenticated ?
            <Aux>
                <Header
                    backbuttonHandler={this.backbuttonHandler}
                    votebuttonHandler={this.votebuttonHandler}/>
            </Aux>:
            <Redirect from="/candidates" to="/login"/>;

        return (
            <Aux>
                {CandidatesComponent}
            </Aux>
        );
    }
}

export default Candidates;