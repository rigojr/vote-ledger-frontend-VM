import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    candidates: [],
    loading: false,
    error: null
}

const fetchCandidatesStart = ( state, action ) => {
    return updateObject( state, {
        loading: true
    })
}

const fetchCandidatesError = ( state, action ) => {
    return updateObject( state, {
        error: {
            ...action.error,
            customMessage: 'Ocurrió un error obteniedo los datos del Blockchain'
        }
    })
}

const fetchCandidatesSuccess = ( state, action ) => {
    return updateObject( state, {
        candidates: action.candidates,
        loading: false
    })
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_CANDIDATES_START: return fetchCandidatesStart ( state, action );
        case actionTypes.FETCH_CANDIDATES_ERROR: return fetchCandidatesError( state, action );
        case actionTypes.FETCH_CANDIDATES_SUCCESS: return fetchCandidatesSuccess( state, action );
        default: return state;
    }
}

export default reducer;