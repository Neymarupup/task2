import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
export const SIGNUP = 'SIGNUP';
export const IS_SIGNUPED = 'IS_SIGNUPED';
export const SIGNUP_HAS_ERROR = 'SIGNUP_HAS_ERROR';
export const SIGNUP_IS_LOADING = 'SIGNUP_IS_LOADING';
export const SIGNUP_DATA = 'SIGNUP_DATA';


const isSignuped = (bool) => {
    return {
        type: ActionTypes.IS_SIGNUPED,
        isSignuped: bool
    }
};

const signupHasError = (message) => {
    return {
        type: ActionTypes.SIGNUP_HAS_ERROR,
        hasError: message
    }
};

const signupHasSuccess = (message) => {
    return {
        type: ActionTypes.SIGNUP_HAS_SUCCESS,
        hasSuccess: message
    }
};

const signupIsLoading = (bool) => {
    return {
        type: ActionTypes.SIGNUP_IS_LOADING,
        isLoading: bool
    }
};
const signupData = (data) => {
    console.log(data)
    return {
        type: ActionTypes.SIGNUP_DATA,
        signupData: data
    }
};

const signupAPI = ( email, password) => {  
console.log(email, password)
    return (dispatch) => {
        console.log(email,password)
      
        fetch('http://jokingfriend.com/kutz/index.php/Api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "role"                : "1",
                "email"     		  : email,
                "password"      	  : password,
                "device_type"         : "android",
                "device_token"        : "ffwefwefwefwehjjjjjjjjjjjj"
            })
        }).then((res) => res.json())
        .then(res => {
            console.log(res)
            if(res.result === true || res.result === "true" ){
                console.log("done")
                Actions.Login()
                dispatch(signupHasSuccess(res.msg));
                dispatch(isSignuped(true));
                dispatch(signupData(res.data));
             
            } else {
                
            }
        })
        .catch((e) => {
            console.log(e)
        });
    }
};

export default {
    isSignuped,
    signupHasError,
    signupIsLoading,
    signupAPI,
    signupData
}
