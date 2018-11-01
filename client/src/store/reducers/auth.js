import * as actionTypes from '../actions/actionType';


const initialState = {
    token: null,
    loading: false,
    error: null,
    user: {
        photo: null,
        email: null
    },
    logout: null,
    newSignUp: null
};


const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true,
                error: null,
                logout: null,
                newSignUp: null,
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                loading: false,
                newSignUp: action.token !== null,
                error: null,
                logout: null

            };
        case actionTypes.SIGN_UP_FAIL:
            return{
                ...state,
                error: action.error,
                logout: null,
                newSignUp: null,
                loading: false

            };
        case actionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                loading: false,
                token: action.token,
                error: null,
                logout: null,
                newSignUp: null,

            };
        case actionTypes.SIGN_IN_FAIL:
            return{
                ...state,
                error: action.error,
                logout: null,
                newSignUp: null,
                loading: false

            };
        case actionTypes.RETRIEVE_USER_DATA:
            return{
                ...state,
                user: {
                    ...state.user,
                    photo: action.photo,
                    email: action.email
                },
                logout: null,
                newSignUp: null

            };
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
                user: {
                    ...state.user,
                    email: null,
                    photo: null
                },
                logout: action.logres,
                newSignUp: null

            };
        case actionTypes.CLEAR_SIGNUP_TOKEN:
            return{
                ...state,
                newSignUp: null
            };

        default:
            return state
    }
};

export default reducer