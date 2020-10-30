import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import styled from 'styled-components';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import CandidatesCard from '../../components/UI/vCards/CandidatesCard/CandidatesCard';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
import AllModal from '../../components/UI/Modal/AllModal';
import { parseRawData } from '../../store/utility'

const StyledH1 = styled.h1`
    font-size: 1.5rem;
    color: #434099;
    text-align: center;
    padding: 2rem 0rem;
`

const ElectorInformation = styled.div`
    div {
        width: 30%;
        margin: auto;
        margin-top: 20px;
        text-align: center;
    }
    p {
        color: #434099;
        font-size: 16px;
    }
`

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            candidates: [],
            isModal: false,
            modalTitle: "Confirmación de Selección de Candidatos",
            specialMessage: null
         };
    }

    componentDidMount() {

    }

    backbuttonHandler = () => {
        this.props.history.push( '/elections/' );
    }

    voteHandler = () => {

            this.state.candidates.forEach( idCandidate => {
                const response = axios.post('/vote/newvote',{
                    idEventoElectoral: this.props.installedElectoralEvent.id,
                    idEleccion: this.props.electionSelected.id,
                    idUsuario: idCandidate,
                    idMesa: this.props.installedPollingStation.id
                })
            });

            const userTempRecord = this.props.userInfo.voteRercord

                const tempHistorialVotos = {
                    ...userTempRecord,
                    [this.props.installedElectoralEvent.id]: 
                        `${
                            userTempRecord[this.props.installedElectoralEvent.id] ? `${userTempRecord[this.props.installedElectoralEvent.id]}` : ''
                        }${this.props.electionSelected.id},`
                }
                
                const user = {
                    id: this.props.userInfo.id,
                    nombre: this.props.userInfo.name,
                    facultad: this.props.userInfo.faculty,
                    escuela: this.props.userInfo.school,
                    email: this.props.userInfo.email,
                    password: this.props.userInfo.password,
                    HistorialVotos: tempHistorialVotos,
                    type: this.props.userInfo.type,
                    status: this.props.userInfo.status
                }
                this.setState({ specialMessage: "Emisión del voto en proceso..." })
                setTimeout( () =>
                axios.post('/user/save', {
                    parameter: JSON.stringify(user)
                })
                .then( response => {
                    this.props.onUpdateLocalUser(user.HistorialVotos)
                    this.setState({ specialMessage: "Proceso de votación culminado con éxito. Pronto serás redirigido." })
                    setTimeout( () => this.props.history.push( '/elections/' ), 3000 ) ;
                })
                .catch( error => {
                    this.setState({ specialMessage: "Error en el proceso de votación, solicite asistencia." })
                }) , 1000 )
                
    }

    addCandidate = ( idCandidate ) => {
        const tempCadidates = this.state.candidates
        tempCadidates.push(idCandidate)
        this.setState( prevState => ({
            ...prevState,
            candidates: tempCadidates
        }) )
    }

    deleteCandidate = ( idCandidate ) => {
        const tempCadidates = this.state.candidates.filter( id => id !== idCandidate)
        this.setState( prevState => ({
            ...prevState,
            candidates: tempCadidates
        }) )
    }

    votebuttonHandler = () => {
        if( this.state.candidates.length === this.props.electionSelected.maximovotos){
            axios.post( '/event/getall', {
                parameter :""
            })
            .then( response => {
                const fetch = [];
                const events = [];
                const jsonData = JSON.parse(response.data.mensaje);
                for( let key in jsonData){
                    const data = parseRawData(jsonData[key].Record)
                    fetch.push({...data.fetch})
                    events.push({...data.event})
                }
                const RefreshElectoralEvent = fetch.find( electoralEvent => electoralEvent.id === this.props.installedElectoralEvent.id)
                const RefreshPollingStation = RefreshElectoralEvent.record.pollingStations[this.props.installedPollingStation.id]
                if(RefreshPollingStation.habilitada === "1")
                    this.setState({ isModal: true})
                else {
                    this.props.onLogout()
                    this.props.history.push( '/login/' );
                    alert("Error, la mesa electoral ha sido inhabilitada, solicite asistencia.")
                }
            })
            .catch( err => {alert( `Error en la comunicación con el Blockchain.` )} );
        } else {
            alert( `Error, es necesario seleccionar ${this.props.electionSelected.maximovotos} candidatos para poder votar` )
        }       
    }

    handlerModal = () => {
        this.setState({
            isModal: !this.state.isModal,
            specialMessage: null
        })
    }

    render() {
           
        const CandidatesComponent = this.props.electionSelected.Candidatos ? ( 
            <Aux>
                <Header
                    backbuttonHandler={this.backbuttonHandler}
                    votebuttonHandler={this.votebuttonHandler}/>
                <ElectorInformation>
                    <div>
                        <p><b>Elección</b> {this.props.electionSelected.id} - {this.props.electionSelected.nombre}</p>
                        <p><b>{this.props.electionSelected.tipoeleccion}</b></p>
                    </div>
                </ElectorInformation>
                <Container>
                <Row>
                {
                    this.props.electionSelected.Candidatos.map(
                        candidate => {

                            const userInfo = this.props.users.find( user => user.id === candidate.idusuario)

                            return(
                                    <CandidatesCard 
                                        candidateValue={userInfo}
                                        addCandidate={this.addCandidate}
                                        deleteCandidate={this.deleteCandidate}
                                        key={userInfo.id}
                                        disable={this.state.candidates.includes(userInfo.id)}/>
                            )
                        }
                    )
                }
                </Row>
                </Container>
            </Aux>
        ) : null;

        let RedirectComponent = !this.props.electionSelected.Candidatos ? <Redirect to="/install"/> : null;

        return (
            <Aux>
                {CandidatesComponent}
                {RedirectComponent}
                <AllModal
                    showModal={() => this.handlerModal()}
                    modalBoolean={this.state.isModal}
                    modalTitle={this.state.modalTitle}>
                    <Modal.Body>
                        {
                            this.state.candidates.map( id => {
                                const userInfo = this.props.users.find( user => user.id === id)
                            return <StyledH1 key={userInfo.id}><b>{userInfo.name}</b> - {userInfo.faculty} - {userInfo.school}</StyledH1>
                            })
                        }
                        {
                            this.state.specialMessage ?
                            <StyledH1><b>{this.state.specialMessage}</b></StyledH1> :
                            <StyledH1><b>¿Desea Continuar?</b></StyledH1> 
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="success" 
                            onClick={ () => this.voteHandler()}>
                            Confirmar y Votar
                        </Button>
                    </Modal.Footer>
                </AllModal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        candidates: state.vote.candidates,
        isLoading: state.vote.loading,
        electionSelected: state.vote.electionSelected,
        users: state.auth.fetch,
        installedElectoralEvent: state.install.installedElectoralEvent,
        userInfo: state.auth.userLogged,
        installedPollingStation: state.install.installedPollingStation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCandidates : () => dispatch( actions.fetchCandidates() ),
        onUpdateLocalUser : (HistorialVotos) => dispatch(actions.updateLocalUser(HistorialVotos)),
        onLogout : () => dispatch(actions.logOutElector()),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);