import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import styled from 'styled-components';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import ElectionsCard from '../../components/UI/vCards/ElectionsCard/ElectionsCard';
import * as actions from '../../store/actions/index';

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

class Elections extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }

    setElection = (election) => {
        this.props.onSetElectionSelected(election)
        this.props.history.push( '/candidates/' );
    }

    render() {
        let redi = this.state.redirectCandidate ?
        <Redirect to="/candidates"/> : null

        const rawElections = this.props.installedElectoralEvent ? this.props.installedElectoralEvent.record.elections : null
        const electionsKeys = rawElections ? Object.keys(rawElections) : null

        let ElectionsComponent = this.props.isAuthed ?
            <Aux>
                <Header 
                    authenticationHandler={this.props.onLogout}/>
                <ElectorInformation>
                    <div>
                        <p><b>Bienvenido</b> { this.props.userLogged.name }</p>
                        <p>Evento Electoral {this.props.installedElectoralEvent.id} - {this.props.installedElectoralEvent.eventName}</p>
                        <p>Mesa Electoral {this.props.installedPollingStation.id} - {this.props.installedPollingStation.escuela}</p>
                    </div>
                </ElectorInformation>
                <Container>
                    <Row>
                        {
                            electionsKeys.map(
                                key => {
                                    
                                    const ElectoralOrg = rawElections[key].escuela

                                    if( 
                                        ElectoralOrg === "UCAB" || 
                                        ElectoralOrg === this.props.userLogged.faculty || 
                                        ElectoralOrg === this.props.userLogged.school 
                                        )
                                        return(
                                            <Col xs lg="4" key={`${rawElections[key].id}-${key}`}>
                                                <ElectionsCard 
                                                    typeOfElection={rawElections[key].tipoeleccion}
                                                    orgElection={rawElections[key].escuela}
                                                    descElection={rawElections[key].descripcion}
                                                    rawElection={rawElections[key]}
                                                    setElection={this.setElection}/>
                                            </Col>
                                        )
                                    else
                                        return null                                        
                                }                                    
                            )
                        }
                    </Row>
                </Container>
            </Aux>:
            <Redirect to="/install"/>

        

        return (
            <Aux>
                {ElectionsComponent}
                {redi}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed,
        userLogged: state.auth.userLogged,
        installedElectoralEvent: state.install.installedElectoralEvent,
        installedPollingStation: state.install.installedPollingStation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logOutElector()),
        onSetElectionSelected : (electionSelected) => dispatch(actions.setElectionSelected(electionSelected))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Elections);