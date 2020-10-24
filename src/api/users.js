import axios from 'axios';
import { handleErrors } from './utils';


export const register = async (store, email, password) => {
    return axios.post(`${window.location.protocol}//${window.location.hostname}/register`,
        {
            email,
            password
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}

export const login = async (store, email, password) => {
    return axios.post(`${window.location.protocol}//${window.location.hostname}/login`,
        {
            email,
            password
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}

export const getUserByEmail = async (store, email) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/users/${email}`,
        {
            headers: {
                'Authorization': accessToken
            }
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}

export const getMyself = async (store, accessToken) => {
    console.log('here get myself');
     return axios.get(
        `${window.location.protocol}//${window.location.hostname}/user`,
        {
            headers: {
                'Authorization': accessToken
            }
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}
