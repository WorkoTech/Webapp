import axios from 'axios';
import { handleErrors } from './utils.js';


export const fetchChatrooms = (store ) => {
    const accessToken = store.getters.accessToken;

    return axios.get(`${window.location.protocol}//${window.location.hostname}/chatroom`,
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
