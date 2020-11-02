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

const ImgStyled = styled.img`
    max-width: 24px;
    max-height: 24px;
    margin-top: 35px;
`

const InstallForm = ( props ) =>  {

    const electoralEventsKeys = Object.keys(props.electoralEvents)

    return (
        <Form className={`${styles.FormBase}`}>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                    type="text"
                    name="id"
                    onChange={props.setValue}
                    value={props.value.id}
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
            <Form.Group as={Col} sm="10">
                <Form.Label>Mesa Electoral</Form.Label>
                <Form.Control   
                    as="select"
                    onChange={props.setValue}
                    value={props.value.pollingStationSelected}
                    name="pollingStationSelected"
                    disabled={!props.isAuthed}>
                        <option disabled>Seleccione una de las opciones</option>
                    {
                        electoralEventsKeys.map(
                            key => {
                                const rawPollingStations = props.electoralEvents[key].record.pollingStations
                                const rawElectoralEvent = props.electoralEvents[key]
                                const pollingStationsKeys = Object.keys(rawPollingStations)
                                if( rawElectoralEvent.state === 'Elección' ){
                                    return pollingStationsKeys.map( key => {
                                        if(rawPollingStations[key].habilitada === '1'){
                                            return (
                                                <option 
                                                    key={`${rawPollingStations[key].id}-${rawElectoralEvent.id}`}
                                                    value={`${rawElectoralEvent.id}***${rawPollingStations[key].id}`}>
                                                    {rawElectoralEvent.id}-{rawElectoralEvent.eventName}: {rawPollingStations[key].id} - {rawPollingStations[key].escuela}
                                                </option>
                                            )
                                        }
                                        return null
                                })
                                } 
                                return null
                                
                            }
                        )
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} sm="2">
                <ImgStyled 
                    src={process.env.PUBLIC_URL + 'refresh.png'}
                    onClick={ () => props.refresh() }
                    alt="Actualizar"
                    title="Actualizar"/> 
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
    )
}

export default InstallForm;