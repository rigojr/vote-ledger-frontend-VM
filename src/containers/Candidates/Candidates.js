import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Aux from '../../hoc/Aux';
import Header from '../../components/Layout/Header/Header';
import CandidatesCard from '../../components/UI/vCards/CandidatesCard/CandidatesCard';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }

    componentDidMount() {
        this.props.onFetchCandidates();
    }

    backbuttonHandler = () => {
        console.log("backbuttonHandler");
        this.props.history.push( '/elections/' );
    }

    votebuttonHandler = () =>{
        console.log("votebuttonHandler");
    }

    render() {

        let CandidatesComponent = <Spinner />
           
        if( !this.props.isLoading)
        {
            CandidatesComponent = ( 
                <Aux>
                    <Header
                        backbuttonHandler={this.backbuttonHandler}
                        votebuttonHandler={this.votebuttonHandler}/>
                    <Container>
                    <Row>
                    {
                        this.props.candidates.map(
                            candidate => {
                                return(
                                        <CandidatesCard 
                                            candidateValue={candidate}
                                            voteButton={this.voteRedirection}
                                            key={candidate.id}/>
                                )
                            }
                        )
                    }
                    </Row>
                    </Container>
                </Aux>
            );
        }

        let RedirectComponent = !this.props.isAuthed && <Redirect to="/login"/>;

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
        isLoading: state.vote.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCandidates: () => dispatch( actions.fetchCandidates() )
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);