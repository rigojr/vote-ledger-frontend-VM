import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import styles from '../vCards.module.css';
import Aux from '../../../../hoc/Aux';

const CandidatesCard = ( props ) => (
    <Aux>
        <Col xs lg="4" key={props.candidateValue.id}>
            <Card className={`${styles.Card} ${styles.electionCard}`}>
                <Container>
                    <Row>
                        <p className={`${styles.titleElectionCard}`}>{ props.candidateValue.name }</p>                    
                    </Row>
                    <Row>
                        <p>{ props.candidateValue.faculty }</p>                    
                    </Row>
                    <Row>
                        <p>{ props.candidateValue.school }</p>
                    </Row>
                    <Row>
                        {
                            props.candidateValue.status === "1" ? 
                                !props.disable ? 
                                <Button
                                    variant="primary"
                                    onClick={ () => props.addCandidate(props.candidateValue.id)}
                                    block>
                                    Seleccionar
                                </Button> :
                                <Button
                                    variant="danger"
                                    onClick={ () => props.deleteCandidate(props.candidateValue.id)}
                                    block>
                                    Eliminar
                                </Button>
                            :
                                <Button
                                    variant="info"
                                    block
                                    disabled>
                                    Inhabilitado
                                </Button>
                            
                        }
                    </Row>
                </Container>
            </Card>
        </Col>
    </Aux>
);

export default CandidatesCard;