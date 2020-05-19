import React from 'react';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import styles from '../vCards.module.css';

const InstallCard = ( props ) => (
    <Card className={`${styles.Card} ${styles.InstallCard}`}>
        <Container>
            <Row>
                {props.children}
            </Row>
        </Container>
    </Card>
);

export default InstallCard;