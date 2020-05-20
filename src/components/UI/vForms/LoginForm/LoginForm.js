import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from '../vForms.module.css';

const LoginForm = (props) => (

    <Form className={`${styles.FormBase}`}>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                    type="email" />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password" />
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Button 
                    variant="primary" 
                    onClick={props.loginHanlder}>
                    Iniciar Sesión
                </Button>
            </Form.Group>
        </Row>
    </Form>
    
);

export default LoginForm;