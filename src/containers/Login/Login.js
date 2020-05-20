import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import LoginCard from "../../components/UI/vCards/InstallLoginCard/InstallLoginCard";
import LoginFrom from '../../components/UI/vForms/LoginForm/LoginForm';
import stylesCards from '../../components/UI/vCards/vCards.module.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }

    loginRedirect = () => {
        console.log("loginRedirect");
        this.props.loginHandler();
        this.props.history.push('/elections/');
    }

    render() {

        let installComponent = this.props.isInstalled ? 
            <LoginCard>
                <LoginFrom
                    loginHanlder = {this.loginRedirect}/>
            </LoginCard>:
            <Redirect from="/login" to="/install"/>;

        return (
            <Aux>
                {installComponent}
                <div className={stylesCards.logoContainer}>
                    <p className={stylesCards.subtitleLogo}> Mesa Electoral {this.props.selectedPollingStation}</p>
                </div>
            </Aux>
        );
    }
}

export default Login;