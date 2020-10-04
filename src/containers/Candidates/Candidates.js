import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import CandidatesCard from '../../components/UI/vCards/CandidatesCard/CandidatesCard';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            candidates: [],
         };
    }

    componentDidMount() {

    }

    backbuttonHandler = () => {
        this.props.history.push( '/elections/' );
    }

    votebuttonHandler = () => {

        if( this.state.candidates.length === this.props.electionSelected.maximovotos)
            this.state.candidates.forEach( idCandidate => {
                axios.post('/event/vote',{
                    idEventoElectoral: this.props.installedElectoralEvent.id,
                    idEleccion: this.props.electionSelected.id,
                    idUsuario: idCandidate,
                })
            });
        else
            alert( `Error, es necesario seleccionar ${this.props.electionSelected.maximovotos} para poder votar` )

       
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

    render() {
           
        const CandidatesComponent = this.props.electionSelected.Candidatos ? ( 
            <Aux>
                <Header
                    backbuttonHandler={this.backbuttonHandler}
                    votebuttonHandler={this.votebuttonHandler}/>
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
        electionSelected: state.vote.electionSelected,
        installedElectoralEvent: state.install.installedElectoralEvent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCandidates: () => dispatch( actions.fetchCandidates() )
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);