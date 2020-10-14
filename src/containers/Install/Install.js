import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import InstallCard from '../../components/UI/vCards/InstallLoginCard/InstallLoginCard';
import InstallForm from '../../components/UI/vForms/InstallForm/InstallForm';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { isAdmin } from '../../store/utility'
import { sha256 } from 'js-sha256'

class Install extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: { 
                pollingStationSelected: "Seleccione una de las opciones",
                id: "",
                password: ""
            }
         };
    }

    componentDidMount () {
        this.props.onPollingStationFetch();
        this.props.onFetchUsers();
    }

    setValue = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            form: {
                ...prevState.form,
                [name]: value 
            }
         }));
    }

    installHandler = () => {
        const stringArray = this.state.form.pollingStationSelected.split('-')
        const electoralEvent = this.props.electoralEvents.find( electoralEvent => electoralEvent.id === stringArray[0] )
        const pollingStation = electoralEvent.record.pollingStations[stringArray[1]]
        this.props.onInstallPollingStation( electoralEvent, pollingStation )
    }

    loginHanlder = () => {
        const isUserAdmin = isAdmin(this.state.form.id, this.props.users)
        const userInfo = this.props.users.find( user => user.id === this.state.form.id )
        if( userInfo ){
            if( userInfo.status === "1" ){
                const shaPassword = sha256(this.state.form.password)
                if( shaPassword === userInfo.password ){
                    if( isUserAdmin )
                        this.props.onAuth( this.state.form.id, sha256(this.state.form.password), isUserAdmin, userInfo);
                    else
                        alert("Error, el usuario debe ser de tipo administrador para poder instalar la mesa electoral")
                } else {
                    alert("Error, la contraseña es incorrecta")
                }
            } else {
                alert("Error, el administrador esta inhabilitado")
            }
        } else {
            alert("Error, el usuario no existe")
        }
        
    }

    byPassHandler = () => {
        this.props.onByPassAuth();
        this.props.onByPassInstall(this.props.pollingStations[0]);
    }

    render(){

        let InstallComponent = <Spinner/>


        const InstallFormComponent = this.props.electoralEvents ? 
            <InstallForm
                electoralEvents={this.props.electoralEvents}
                installHandler={this.installHandler}
                setValue={this.setValue}
                value={this.state.form}
                loginHanlder={this.loginHanlder}
                isAuthed={this.props.isAuthed}
                loadingAuth={this.props.loadingAuth}
                loadingPollingStations={this.props.loadingPollingStations}
                loginError={this.props.errorLogin}
                installError={this.props.errorInstalling}/>
            : <Spinner/>

        if (!this.props.loadingPollingStations){
            InstallComponent = (
                <Aux>
                    <InstallCard>
                        {InstallFormComponent}
                    </InstallCard>
                    
                </Aux>
            );
        }

        const redirectLogin = this.props.isInstalled ? <Redirect to="/login"/> : null

        return (
            <Aux>
                {InstallComponent}
                {redirectLogin}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        electoralEvents: state.install.fetch,
        errorInstalling: state.install.error,
        loadingPollingStations: state.install.loading,
        isAuthed: state.auth.isAuthed,
        errorLogin: state.auth.error,
        loadingAuth: state.auth.loading,
        isInstalled: state.install.isInstalled,
        users: state.auth.fetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPollingStationFetch: () => dispatch( actions.fetchPollingStation() ),
        onAuth: ( email, password, isAdmin, userInfo) => dispatch( actions.auth( email, password, isAdmin, userInfo) ),
        onInstallPollingStation: ( electoralEvent, pollingStation ) => dispatch( actions.installPollingStation( electoralEvent, pollingStation ) ),
        onByPassInstall: ( selectedPollingStation ) => dispatch( actions.byPassInstall(selectedPollingStation) ),
        onByPassAuth: () => dispatch( actions.byPassAuth() ),
        onFetchUsers: () => dispatch( actions.fetchUser() )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Install);