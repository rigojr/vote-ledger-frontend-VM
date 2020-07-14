import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import InstallCard from '../../components/UI/vCards/InstallLoginCard/InstallLoginCard';
import InstallForm from '../../components/UI/vForms/InstallForm/InstallForm';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from 'react-bootstrap/Button';

class Install extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: { 
                pollingStationSelected: "Seleccione una de las opciones",
                email: "",
                password: ""
            }
         };
    }

    componentDidMount () {
        this.props.onPollingStationFetch();
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

    installHandler = () => this.props.onInstallPollingStation( this.state.form.pollingStationSelected );

    loginHanlder = () => this.props.onAuth( this.state.form.email, this.state.form.password, true);

    byPassHandler = () => {
        this.props.onByPassAuth();
        this.props.onByPassInstall(this.props.pollingStations[0]);
    }

    render(){

        let InstallComponent = <Spinner/>;

        if (!this.props.loadingPollingStations){
            InstallComponent = (
                <Aux>
                    <InstallCard>
                        <InstallForm
                            pollingStationsArray={this.props.pollingStations}
                            installHandler={this.installHandler}
                            setValue={this.setValue}
                            value={this.state.form}
                            loginHanlder={this.loginHanlder}
                            isAuthed={this.props.isAuthed}
                            loadingAuth={this.props.loadingAuth}
                            loadingPollingStations={this.props.loadingPollingStations}/>
                        <Button
                            variant="warning"
                            onClick={this.byPassHandler}
                            block>
                            By Pass Temporal
                        </Button>
                    </InstallCard>
                    
                </Aux>
            );
        }

        let errorMessage = null;

        if(this.props.errorInstalling){
            errorMessage = (
                <Aux>
                    Ocurrió un error en la recepción de los datos.
                </Aux>
            )
        }

        if(this.props.errorLogin){
            errorMessage = (
                <Aux>
                    Ocurrió un error en la autentificación
                </Aux>
            )
        }

        let redirectLogin = null;

        if( this.props.isInstalled )
            redirectLogin = <Redirect to="/login"/>

        return (
            <Aux>
                {InstallComponent}
                {errorMessage}
                {redirectLogin}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        pollingStations: state.install.pollingStations,
        errorInstalling: state.install.error,
        loadingPollingStations: state.install.loading,
        isAuthed: state.auth.isAuthed,
        errorLogin: state.auth.error,
        loadingAuth: state.auth.loading,
        isInstalled: state.install.isInstalled
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPollingStationFetch: () => dispatch( actions.fetchPollingStation() ),
        onAuth: ( email, password, isAdmin ) => dispatch( actions.auth( email, password, isAdmin ) ),
        onInstallPollingStation: ( selectedPollingStation ) => dispatch( actions.installPollingStation( selectedPollingStation ) ),
        onByPassInstall: ( selectedPollingStation ) => dispatch( actions.byPassInstall(selectedPollingStation) ),
        onByPassAuth: () => dispatch( actions.byPassAuth() )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Install);