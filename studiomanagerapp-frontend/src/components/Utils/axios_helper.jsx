import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";


export const setUserData = (userData) => {
    if (userData) {
        window.localStorage.setItem("user_data", JSON.stringify(userData));
    } else {
        window.localStorage.removeItem("user_data");
    }
}

export const getUserData = () => {
    const userData = window.localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
}

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    setAuthToken(null);
                    setUserData(null);
                    navigate("/login", { replace: true });
                }
                return Promise.reject(error);
            }
        );


        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);
};

export const request = (method, url, data) => {
    let headers = {};

    const token = getAuthToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
        validateStatus: (status) => {
            return status >= 200 && status < 300 || status === 201;
        },
    });
};
