import React from 'react';

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import styles from '../vCards.module.css';
import Aux from '../../../../hoc/Aux';

const InstallCard = ( props ) => (
    <Aux>
        <div className={styles.logoContainer}>
            <p className={styles.titleLogo}>VoteLedger</p>
            <p className={styles.subtitleLogo}>Aplicación Electoral</p>
        </div>
        <Card className={`${styles.Card} ${styles.InstallCard}`}>
            <Container>
                <Row>
                    {props.children}
                </Row>
            </Container>
        </Card>
    </Aux>
);

export default InstallCard;