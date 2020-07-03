import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchPollingStationSuccess = ( pollingStations ) => {
    return {
        type: actionTypes.FETCH_POLLING_STATION_SUCCESS,
        pollingStations: pollingStations
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
        axios.get('/polling-station.json')
        .then( response => {
            const fetch = [];
            for (let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    enable: response.data[key].enable.toString(),
                    school: response.data[key].school
                })
            }
            dispatch(fetchPollingStationSuccess(fetch));
        })
        .catch( error => {
            dispatch(fetchPollingStationError(error));
        })
    }
}

export const installPollingStationSuccess = ( pollingStation ) => {
    return {
        type: actionTypes.INSTALL_POLLING_STATION_SUCCESS,
        selectedPollingStation: pollingStation
    }
}

export const installPollingStationStart = () => {
    return {
        type: actionTypes.INSTALL_POLLING_STATION_START
    }
}

export const installPollingStation = ( pollingStation ) => {
    return dispatch => {
        dispatch( installPollingStationStart() );
        // Async code for testing if the polling station
        // could be installed        
        dispatch( installPollingStationSuccess( pollingStation ) );
    }
}