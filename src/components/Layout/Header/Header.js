import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import styles from './Header.module.css'
import Aux from '../../../hoc/Aux';

const Header = ( props ) => (

    <header>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand>
                <Link to="/dashboard" className={styles.purpleColor}>VoteLedger</Link>
            </Navbar.Brand>
            <Nav className="ml-auto">

                {
                    props.authenticationHandler ?
                    <Link 
                        to="/login" 
                        className={styles.NavLink}>
                        <Button 
                            variant="primary"
                            onClick={props.authenticationHandler}>
                            Cerrar Sesión
                        </Button>
                    </Link>: null
                }

                {
                    props.backbuttonHandler ?
                    <Aux>
                        <Button 
                            variant="primary"
                            onClick={props.backbuttonHandler}
                            className={`${styles.btnCandidates}`}>
                            Volver
                        </Button>
                        <Button 
                            variant="success"
                            onClick={() => props.votebuttonHandler()}
                            className={`${styles.btnCandidates}`}>
                            Votar
                        </Button>
                    </Aux>
                        : null
                }

            </Nav>
        </Navbar>
    </header>
    
);

export default Header;