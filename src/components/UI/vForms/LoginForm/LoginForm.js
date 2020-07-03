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
                    type="email"
                    value={props.inputValues.email}
                    onChange={props.setValue}
                    name="email"/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    value={props.inputValues.password}
                    onChange={props.setValue}
                    name="password"/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Button 
                    variant="primary" 
                    onClick={props.loginHanlder}
                    block>
                    {
                        props.loading ?
                        <span>Espere un momento, instalando...</span>:
                        <span>Iniciar Sesión</span>
                    }
                </Button>
            </Form.Group>
        </Row>
    </Form>
    
);

export default LoginForm;