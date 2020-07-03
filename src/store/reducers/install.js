import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    pollingStations: [],
    error: null,
    loading: false,
    installedPollingStation: null,
    isInstalled: false
}

const fetchPollingStationSuccess = ( state, action ) => {
    return updateObject( state, {
        pollingStations: action.pollingStations,
        loading: false
    })
}

const fetchPollingStationError = ( state, action ) => {
    return updateObject( state, {
        error: {
            ...action.error,
            customMessage: 'Ocurrió un error obteniendo los datos del Blockchain'
        }
    })
}

const fetchPollingStationStart = ( state, action ) => {
    return updateObject( state, { loading: true });
}

const installPollingStationSuccess = ( state, action ) => {
    return updateObject( state, { 
        installedPollingStation: action.selectedPollingStation,
        isInstalled: true
    } )
}

const installPollingStationStart = ( state, action ) => {
    return updateObject( state, { loading: true });
}

const installPollingStationError = ( state, action ) => {
    return updateObject( state, { 
        error: {
            ...action.error,
            customMessage: "Ocurrió un error en la instalación"
        }
    })
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionsTypes.FETCH_POLLING_STATION_START: return fetchPollingStationStart( state, action );
        case actionsTypes.FETCH_POLLING_STATION_ERROR: return fetchPollingStationError( state, action );
        case actionsTypes.FETCH_POLLING_STATION_SUCCESS: return fetchPollingStationSuccess( state, action );
        case actionsTypes.INSTALL_POLLING_STATION_START: return installPollingStationStart( state, action);
        case actionsTypes.INSTALL_POLLING_STATION_ERROR: return installPollingStationError( state, action);
        case actionsTypes.INSTALL_POLLING_STATION_SUCCESS: return installPollingStationSuccess( state, action );
        default: return  state;
    }
}

export default reducer