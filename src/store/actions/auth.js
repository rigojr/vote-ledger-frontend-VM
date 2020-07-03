import * as actionTypes from './actionTypes';
import axios from '../../axios';

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