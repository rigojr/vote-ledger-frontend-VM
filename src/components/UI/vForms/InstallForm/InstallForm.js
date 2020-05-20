import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from '../vForms.module.css';

const InstallForm = ( props ) => (
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
                <Form.Label>Mesa Electoral</Form.Label>
                <Form.Control 
                    as="select">
                    {
                        props.pollingStationsArray.map(
                            pollingStation => (
                                <option key={pollingStation.id}>{pollingStation.id}-{pollingStation.school}</option>
                            )
                        )
                    }
                </Form.Control>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Button 
                    variant="primary" 
                    onClick={props.installHandler}>
                    Instalar Mesa Electoral
                </Button>
            </Form.Group>
        </Row>
    </Form>
);

export default InstallForm;