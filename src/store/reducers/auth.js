import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    isAuthed: false,
    isAdmin: false,
    message: "",
    error: null,
    fetch: [],
    users: [],
    userInstalled: {},
    userLogged: {}
}

const authStart = (state, action) => {
    return updateObject( state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    if(action.isAdmin)
        return updateObject( state, {
            userInstalled: action.userInfo,
            error: null,
            loading: false,
            isAuthed: true,
        });
    return updateObject( state, {
        userLogged: action.userInfo,
        error: null,
        loading: false,
        isAuthed: true,
    });
}

const authFail = ( state, action ) => {
    return updateObject( state , { error: action.error, loading: false } );
}

const byPassAuth = ( state, action ) => {
    return updateObject( state, {
        token: "1",
        userId: "2",
        error: null,
        loading: false,
        isAuthed: true,
        isAdmin: false
    });
}

const fetchUserStart = ( state, action ) => {
    return updateObject( state,{
        isLoading: true
    })
}

const fetchUserError = ( state, action ) => {
    return updateObject( state,{
        isLoading: false,
        error: {
            ...action.error,
            customMessage: "Error al obtener los usuarios"
        }})
}

const fetchUserSuccess = ( state, action ) => {
    return updateObject( state,{
        isLoading: false,
        users: action.users,
        fetch: action.fetch
    })
}

const logOutElector = ( state, action ) => {
    return updateObject( state, {
        userLogged: {}
    })
}

const reducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START: return authStart( state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess( state, action );
        case actionTypes.AUTH_FAIL: return authFail( state, action );
        case actionTypes.BY_PASS_AUTH: return byPassAuth( state, action );
        case actionTypes.FETCH_USERS_START: return fetchUserStart( state, action )
        case actionTypes.FETCH_USERS_ERROR: return fetchUserError( state, action )
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUserSuccess( state, action )
        case actionTypes.LOGOUT_ELECTOR: return logOutElector( state, action )
        default: return state;
    }
}

export default reducer;