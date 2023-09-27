import { makeRequest } from "../axios";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    logoutSuccess,
    updateSuccess,
} from "./userRedux";
import { toggleTheme } from "./darkModeRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await makeRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data));
        document.cookie = `session=${JSON.stringify(res.data)}; path=/;`;
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const updateUser = async (dispatch, user) => {
    try {
        const res = await makeRequest.put("users", user, {
            withCredentials: true,
        });

        dispatch(updateSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (dispatch) => {
    dispatch(logoutSuccess());
};

export const toggle = async (dispatch) => {
    dispatch(toggleTheme());
};