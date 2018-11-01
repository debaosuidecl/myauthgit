import * as actionTypes from './actionType'
import axios from 'axios'
export const authStart = ()=> {
    return{
        type: actionTypes.AUTH_START
    }

};

export const signUpSuccess = (token)=> {
    return{
        type: actionTypes.SIGN_UP_SUCCESS,
        token: token
    }
};

export const signUpFail = (error)=> {
    return{
        type: actionTypes.SIGN_UP_FAIL,
        error: error
    }
};

export const authInit = (userDetails, isSignUp)=> {
    return dispatch=> {
        dispatch(authStart());
        let url = 'auth/signup';
        if(!isSignUp){
            url = 'auth/signin';
        }
        axios.post(url, userDetails)
            .then(res=> {
                console.log(res);
                if(!isSignUp){
                    dispatch(signInSuccess(res.data.token));
                    localStorage.setItem('generatedToken', res.data.token);
                    dispatch(authUser(res.data.token))
                } else{
                    dispatch(signUpSuccess(res.data.token));
                }
            })
            .catch(err=>{

                if(!isSignUp){
                    dispatch(signUpFail(err))
                    console.log(err, 'sign in fail')
                } else{
                    dispatch(signInFail(err))
                    console.log(err, 'sign up fail');
                }
            });

    }

};

export const retrieveUserData = (photo, email)=> {
    return {
        type: actionTypes.RETRIEVE_USER_DATA,
        photo: photo,
        email: email
    }
};

export const authUser = (token)=> {
    return dispatch => {
        axios.get('user', {
            headers: {
                Authorization: token
            }

        })
            .then(res=> {
                console.log(res);
                dispatch(retrieveUserData(res.data.user.photo, res.data.user.email));
                localStorage.setItem('photo', res.data.user.photo);
                localStorage.setItem('email', res.data.user.email);
                //localStorage.setItem('email', res.data.user.email);

            })
            .catch(err=> {
                console.log(err, ' the stupid error')

            })
    }
};

export const signInSuccess = (token)=> {
    return{
        type: actionTypes.SIGN_IN_SUCCESS,
        token: token
    }
};

export const signInFail = (error)=> {
    return{
        type: actionTypes.SIGN_IN_FAIL,
        error: error
    }
};

export const verifyLogin = () => {
    return dispatch=> {
        let photo = localStorage.getItem('photo');
        let email = localStorage.getItem('email');
        let token = localStorage.getItem('generatedToken');
        if(token && photo && email) {
            dispatch(signInSuccess(token));
            dispatch(retrieveUserData(photo, email));
        } else{
            return
        }


    }
};

export const authLogout = (logres)=> {
    return{
        type: actionTypes.AUTH_LOGOUT,
        logres: logres
    }
}

export const authLogoutInit = ()=> {
    return dispatch=>{
        localStorage.removeItem('generatedToken');
        localStorage.removeItem('photo');
        localStorage.removeItem('email');
        dispatch(authLogout());
        axios.get('logout')
            .then(res=>{
                console.log(res);
                dispatch(authLogout(res))
            })
            .catch(err=>{
                console.log(err)
            })
    }
};

export const clearSignUpToken = () => {
    return{
        type: actionTypes.CLEAR_SIGNUP_TOKEN
    }
}