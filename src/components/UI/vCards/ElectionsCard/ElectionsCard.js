import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import styles from '../vCards.module.css';
import Aux from '../../../../hoc/Aux';

const ElectionsCard = ( props ) => (
    <Aux>
        <Card className={`${styles.Card} ${styles.electionCard}`}>
            <Container>
                <Row>
                    <p className={`${styles.titleElectionCard}`}>{ props.typeOfElection }</p>                    
                </Row>
                <Row>
                    <p>{ props.orgElection }</p>                    
                </Row>
                <Row>
                    <p>{ props.descElection }</p>
                </Row>
                <Row>
                    <Button
                        variant="primary"
                        onClick={props.voteButton}
                        block>
                        Votar
                    </Button>
                </Row>
            </Container>
        </Card>
    </Aux>
);

export default ElectionsCard;