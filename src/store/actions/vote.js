import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchCandidatesError = (error) => {
    return {
        type: actionTypes.FETCH_CANDIDATES_ERROR,
        error: error
    }
}

export const fetchCandidatesSuccess = ( candidates ) => {
    return {
        type: actionTypes.FETCH_CANDIDATES_SUCCESS,
        candidates: candidates
    }
}

export const fetchCandidatesStart = () => {
    return {
        type: actionTypes.FETCH_CANDIDATES_START
    }
}


export const fetchCandidates = () => {
    return dispatch => {
        dispatch( fetchCandidatesStart() );
        axios.get('/candidates.json')
        .then( response => {
            const fetch = [];
            for( let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    name: response.data[key].name,
                    faculty: response.data[key].faculty,
                    school: response.data[key].school,
                    email: response.data[key].email,
                    selected: false
                });
            }
            dispatch( fetchCandidatesSuccess(fetch) );
        })
        .catch( error => {
            dispatch( fetchCandidatesError(error) )
        });
    }
}

export const setElectionSelected = (electionSelected) => {
    return {
        type: actionTypes.SET_ELECTION_SELECTED,
        electionSelected: electionSelected
    }
}