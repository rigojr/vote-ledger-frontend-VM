import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { parseRawData } from '../utility';

export const fetchPollingStationSuccess = ( fetch, events ) => {
    return {
        type: actionTypes.FETCH_POLLING_STATION_SUCCESS,
        events: events,
        fetch: fetch
    }
}

export const fetchPollingStationError = ( error ) => {
    return {
        type: actionTypes.FETCH_POLLING_STATION_ERROR,
        error: error
    }
}

export const fetchPollingStationStart = () => {
    return {
        type: actionTypes.FETCH_POLLING_STATION_START
    }
}

export const fetchPollingStation = () => {
    return dispatch => {
        dispatch(fetchPollingStationStart());

        axios.post( '/event/getall', {
            parameter :""
        })
        .then( response => {
            const fetch = [];
            const events = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){
                const data = parseRawData(jsonData[key].Record)
                fetch.push({...data.fetch})
                events.push({...data.event})
            }
            dispatch( fetchPollingStationSuccess( fetch, events ) );
        })
        .catch( error => dispatch(fetchPollingStationError(error)));
    }
}

export const installPollingStationSuccess = ( electoralEvent, pollingStation ) => {
    return {
        type: actionTypes.INSTALL_POLLING_STATION_SUCCESS,
        selectedPollingStation: pollingStation,
        selectedElectoralEvent: electoralEvent
    }
}

export const installPollingStationStart = () => {
    return {
        type: actionTypes.INSTALL_POLLING_STATION_START
    }
}

export const installPollingStation = ( electoralEvent, pollingStation ) => {
    return dispatch => {
        dispatch( installPollingStationStart() );   
        dispatch( installPollingStationSuccess( electoralEvent, pollingStation ) );
    }
}

export const byPassInstall = ( pollingStation ) => {
    return {
        type: actionTypes.BY_PASS_INSTALL,
        selectedPollingStation: pollingStation
    }
}