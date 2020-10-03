import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import LoginCard from "../../components/UI/vCards/InstallLoginCard/InstallLoginCard";
import LoginFrom from '../../components/UI/vForms/LoginForm/LoginForm';
import stylesCards from '../../components/UI/vCards/vCards.module.css';
import * as actions from '../../store/actions/index';
import { isAdmin } from '../../store/utility'
import { sha256 } from 'js-sha256'
import Spinner from '../../components/UI/Spinner/Spinner';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            form: {
                id: '',
                password: ''
            },
            fakeLoading: false
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
        const isUserAdmin = isAdmin( this.state.form.id, this.props.users)
        const userInfo = this.props.users.find( user => user.id === this.state.form.id )
        if( userInfo ){
            const shaPassword = sha256(this.state.form.password)
            if( shaPassword === userInfo.password ){
                if( !isUserAdmin ){
                    this.props.onAuth( this.state.form.id, sha256(this.state.form.password), isUserAdmin, userInfo)
                    this.setState( prevState => ({ ...prevState, fakeLoading: true }))
                    setTimeout( () => this.props.history.push('/elections/'), 1000)
                }
                else
                    alert("Error, el usuario debe ser de tipo elector para poder votar")
            } else {
                alert("Error, la contraseña es incorrecta")
            }
        } else {
            alert("Error, el usuario no existe")
        }
    }

    render() {

        let loginComponent = this.props.isInstalled ? 
            <LoginCard>
                <LoginFrom
                    loginHanlder = {this.loginRedirect}
                    inputValues = {this.state.form}
                    setValue = {this.setValue}
                    loading = {this.state.fakeLoading}
                    error = {this.props.error}/>
            </LoginCard>:
            <Redirect to="/install"/>;

        const footerInfo = this.props.installedElectoralEvent || this.props.installedPollingStation ?
        (
            <div className={stylesCards.logoContainer}>
                <p className={stylesCards.subtitleLogo}> <b>Evento Electoral</b> {this.props.installedElectoralEvent.id} - {this.props.installedElectoralEvent.eventName}</p>
                <p className={stylesCards.subtitleLogo}> <b>Mesa Electoral</b> {this.props.installedPollingStation.id} - {this.props.installedPollingStation.escuela}</p>
            </div>
        ) : <Redirect to="/install"/>

        return (
            <Aux>
                {loginComponent}
                {
                    this.state.fakeLoading ? <Spinner/> : null
                }
                {footerInfo}
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
        installedElectoralEvent: state.install.installedElectoralEvent,
        isAuthed: state.auth.isAuthed,
        isAdmin: state.auth.isAdmin,
        users: state.auth.fetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isAdmin, userInfo) => dispatch(actions.auth(email, password, isAdmin, userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);