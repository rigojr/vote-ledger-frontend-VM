import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import ElectionsCard from '../../components/UI/vCards/ElectionsCard/ElectionsCard';
import styled from 'styled-components';

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
            elections: [
                { id: "1", description: "Electora Election 1", typeElection:"Consejo Universitario", org:"UCAB"},
                { id: "2", description: "Electora Election 2", typeElection:"Consejo de Facultad", org:"Facultad de Ingeniería"},
                { id: "3", description: "Electora Election 3", typeElection:"Consejo de Escuela", org:"Escuela de Ingeniería Informática"}
            ]
        };
    }

    voteRedirection = () => {
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
                    authenticationHandler={this.props.authenticationHandler}/>
                <ElectorInformation>
                    <div>
                        <p><b>Bienvenido</b> { this.props.userLogged.name }</p>
                        <p>Evento Electoral{this.props.installedElectoralEvent.id} - {this.props.installedElectoralEvent.eventName}</p>
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
                                                    voteButton={this.voteRedirection}/>
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

export default connect(mapStateToProps)(Elections);