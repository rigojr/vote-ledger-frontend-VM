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

export const authSuccess = (token, userId , isAdmin) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        isAdmin: isAdmin
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isAdmin) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEp5ulwtutQr4fkQU6GJaXkIzDlEfsK2Q', authData)
        .then( response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId, isAdmin));
        })
        .catch( error => {
            console.log(error);
            dispatch(authFail(error));
        });
    };
};

export const byPassAuth = () => {
    return {
        type: actionTypes.BY_PASS_AUTH
    };
};