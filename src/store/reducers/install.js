import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    pollingStations: [],
    error: null,
    loading: false,
    installedPollingStation: null,
    installedElectoralEvent: null,
    isInstalled: false,
    fetch: null,
    events: null,
}

const fetchPollingStationSuccess = ( state, action ) => {
    return updateObject( state, {
        fetch: action.fetch,
        events: action.events,
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
        installedElectoralEvent: action.selectedElectoralEvent,
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

const byPassInstall = ( state, action ) => {
    return updateObject( state, {
        installedPollingStation: "123-byPass",
        isInstalled: true
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
        case actionsTypes.BY_PASS_INSTALL: return byPassInstall( state, action );
        default: return  state;
    }
}

export default reducer