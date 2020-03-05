import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

const isLogged = (bool) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool
    }
};

const loginHasError = (bool) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: bool
    }
};

const loginIsLoading = (bool) => {
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};

const loginAPI = (email, password) => {
    console.log(email, password)
    return (dispatch) => {

        fetch('http://jokingfriend.com/kutz/index.php/Api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "device_type": "android",
                "device_token": "safdsdcsdcscscdcd"
            })
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                dispatch(loginIsLoading(false));
                dispatch(loginHasError(false));
                dispatch(isLogged(true));
                if (res.result === true || res.result === "true") {
                    console.log("done")
                    dispatch(loginIsLoading(false));
                    dispatch(loginHasError(false));
                    dispatch(isLogged(true));
                    // Actions.Search()
                } else {

                }
            })
            .catch((e) => {
                dispatch(loginHasError(true));
            });
    }
};

const logout = () => {
    AsyncStorage.removeItem('token');
    Actions.Login();
    return {
        type: ActionTypes.LOGOUT
    }
};

export default {
    isLogged,
    loginHasError,
    loginIsLoading,
    loginAPI,
    logout
}
