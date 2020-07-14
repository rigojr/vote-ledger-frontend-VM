import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import ElectionsCard from '../../components/UI/vCards/ElectionsCard/ElectionsCard';
import Container from 'react-bootstrap/Container';

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
        console.log("voteRedirection");
        this.props.history.push( '/candidates/' );
    }

    render() {
        let ElectionsComponent = this.props.isAuthed ?
            <Aux>
                <Header 
                    authenticationHandler={this.props.authenticationHandler}/>
            </Aux>:
            <Redirect to="/install"/>

        let redi = this.state.redirectCandidate ?
            <Redirect to="/candidates"/> : null

        return (
            <Aux>
                {ElectionsComponent}
                <Container>
                    <Row>
                        {
                            this.state.elections.map(
                                election => {
                                    
                                    return(
                                        <Col xs lg="4" key={election.id}>
                                            <ElectionsCard 
                                                typeOfElection={election.typeElection}
                                                orgElection={election.org}
                                                descElection={election.description}
                                                voteButton={this.voteRedirection}/>
                                        </Col>
                                    )
                                }                                    
                            )
                        }
                    </Row>
                </Container>
                {redi}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthed: state.auth.isAuthed
    }
}

export default connect(mapStateToProps)(Elections);