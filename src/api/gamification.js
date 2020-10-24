import axios from 'axios';
import { handleErrors } from './utils.js';

export const getMyProfile = async (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/profile`,
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

export const getProfileAvatar = async (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/profile/avatar`,
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

export const getProfileTitle = async (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/profile/title`,
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

export const getProfileLevel = async (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/level`,
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

export const getProfileActions = async (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/profile/actions`,
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

export const editAvatar = async (store, avatar) => {
	const accessToken = store.getters.accessToken;

    return axios.put(
		`${window.location.protocol}//${window.location.hostname}/profile/avatar=${avatar}`,
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

export const editProfile = async (store, profile) => {
	const accessToken = store.getters.accessToken;

    return axios.put(
        `${window.location.protocol}//${window.location.hostname}/profile`,
        profile,
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
