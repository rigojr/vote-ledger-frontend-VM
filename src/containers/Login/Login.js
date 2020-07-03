import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import LoginCard from "../../components/UI/vCards/InstallLoginCard/InstallLoginCard";
import LoginFrom from '../../components/UI/vForms/LoginForm/LoginForm';
import stylesCards from '../../components/UI/vCards/vCards.module.css';
import * as actions from '../../store/actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            form: {
                email: '',
                password: ''
            }
         };
    }

    setValue = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            ...prevState,
            form: {
                ...prevState.form,
                [name]: value 
            }
         }));
    }

    loginRedirect = () => {
        console.log("loginRedirect");
        console.log(this.state.form);
        this.props.onAuth(this.state.form.email,this.state.form.password, false);
        //this.props.loginHandler();
        //this.props.history.push('/elections/');
    }

    render() {

        let loginComponent = this.props.isInstalled ? 
            <LoginCard>
                <LoginFrom
                    loginHanlder = {this.loginRedirect}
                    inputValues = {this.state.form}
                    setValue = {this.setValue}
                    loading = {this.props.loading}
                    error = {this.props.error}/>
            </LoginCard>:
            <Redirect to="/install"/>;

        let redirectElections = null;

        if (this.props.isAuthed && !this.props.isAdmin)
            redirectElections = <Redirect to="/elections"/>

        return (
            <Aux>
                {loginComponent}
                <div className={stylesCards.logoContainer}>
                    <p className={stylesCards.subtitleLogo}> Mesa Electoral {this.props.installedPollingStation}</p>
                </div>
                {redirectElections}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isInstalled: state.install.isInstalled,
        installedPollingStation: state.install.installedPollingStation,
        isAuthed: state.auth.isAuthed,
        isAdmin: state.auth.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isAdmin) => dispatch(actions.auth(email, password, isAdmin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);