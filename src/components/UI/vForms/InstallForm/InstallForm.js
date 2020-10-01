import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components'

import styles from '../vForms.module.css';

const ErrorMessage = styled.p`
    text-align: center;
    color: red;
    padding-top: 20px;
`

const InstallForm = ( props ) => (
    <Form className={`${styles.FormBase}`}>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    onChange={props.setValue}
                    value={props.value.email}
                    disabled={props.isAuthed}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={props.setValue}
                        value={props.value.password}
                        disabled={props.isAuthed}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Button 
                    variant="primary" 
                    onClick={props.loginHanlder}
                    disabled={props.isAuthed}
                    block>
                    {
                        props.loadingAuth ?
                        <span>Espere un momento, ingresando...</span>:
                        <span>Iniciar Sesión</span>
                    }
                </Button>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Mesa Electoral</Form.Label>
                <Form.Control   
                    as="select"
                    onChange={props.setValue}
                    value={props.value.pollingStationSelected}
                    name="pollingStationSelected"
                    disabled={!props.isAuthed}>
                        <option disabled>Seleccione una de las opciones</option>
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
                    onClick={props.installHandler}
                    disabled={!props.isAuthed}
                    block>
                    {
                        props.loadingPollingStations ?
                        <span>Espere un momento, instalando...</span>:
                        <span>Instalar Mesa Electoral</span>
                    }
                </Button>
            </Form.Group>
        </Row>
        {
            props.loginError ?
            <ErrorMessage>
                Ocurrió un error en la autentificación
            </ErrorMessage> : null
        }
        {
            props.installError ? 
            <ErrorMessage>
                Ocurrió un error en la recepción de los datos.
            </ErrorMessage> : null
        }
        
    </Form>
);

export default InstallForm;