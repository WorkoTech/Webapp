import axios from 'axios';
import { handleErrors } from './utils.js';


export const fetchWorkspaceDocuments = (store, workspace) => {
    const accessToken = store.getters.accessToken;
    return axios.get(`${window.location.protocol}//${window.location.hostname}/document?workspace=${workspace.id}`,
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

export const createWorkspaceDocument = (store, document, workspace) => {
    const accessToken = store.getters.accessToken;
    return axios.post(
        `${window.location.protocol}//${window.location.hostname}/document`,
        {
            ...document,
            workspaceId: workspace.id
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


export const deleteDocument = (store, document) => {
    const accessToken = store.getters.accessToken;

    return axios.delete(
        `${window.location.protocol}//${window.location.hostname}/document/${document.id}`,
        {
            headers: {
                'Authorization': accessToken
            }
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    )
}
