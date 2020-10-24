import axios from 'axios';
import { handleErrors } from './utils.js';


export const getCheckoutSession = (store, price, offer) => {
    const accessToken = store.getters.accessToken;

    return axios.post(
        `${window.location.protocol}//${window.location.hostname}/create-checkout-session`,
        {
            price,
            offer
        },
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

export const fetchOffers = () => {
    return axios.get(`${window.location.protocol}//${window.location.hostname}/offer`)
    .then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}

export const createPortalSession = (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/create-portal-session`,
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

export const fetchSubscription = (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/subscription`,
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
