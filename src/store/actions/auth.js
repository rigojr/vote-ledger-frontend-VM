import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {parseRawDataUser} from '../utility';

export const fetchUserStart = () => {
    return ({
        type: actionTypes.FETCH_USERS_START    
    })
}

export const fetchUserError = ( error ) => {
    return ({
        type: actionTypes.FETCH_USERS_ERROR,
        error: error
    })
}

export const fetchUserSuccess = ( users, fetch ) => {
    return ({
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users,
        fetch: fetch
    })
}

export const fetchUser = ( ) => {
    return dispatch => {
        dispatch( fetchUserStart() );

        axios.post( `/user/getall`, { parameter: "" } )
        .then( response => {
            const fetch = [];
            const users = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){
                const data = parseRawDataUser(jsonData[key].Record);
                users.push({...data.user});
                fetch.push({...data.fetch})
            }
            dispatch( fetchUserSuccess(users, fetch) )
        })
        .catch( error => {dispatch( fetchUserError(error) )})
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( userInfo, isAdmin ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        isAdmin: isAdmin,
        userInfo: userInfo
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (ci, password, isAdmin, userInfo) => {
    return dispatch => {
        dispatch(authStart());
        axios.post( '/user/login', {
            idUsuario: ci,
            passwordHash: password
        })
        .then( response => {
            if( response.data.mensaje === "ValidLogin" )
                dispatch(authSuccess( userInfo, isAdmin ));
            else
                dispatch(authFail())
        })
        .catch( error => dispatch( dispatch(authFail(error)) ))

    };
};

export const byPassAuth = () => {
    return {
        type: actionTypes.BY_PASS_AUTH
    };
};

export const logOutElector = () => {
    return {
        type: actionTypes.LOGOUT_ELECTOR
    }
}

export const updateLocalUser = (HistorialVotos) => {
    return {
        type: actionTypes.UPDATE_LOCAL_USER,
        voteRecord: HistorialVotos
    }
}