import axios from 'axios';
import { handleErrors } from './utils.js';

export const fetchWorkspaceFiles = async (store, workspace) => {
    const accessToken = store.getters.accessToken;

    return axios.get(`${window.location.protocol}//${window.location.hostname}/file?workspaceId=${workspace.id}`,
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

export const uploadFile = async (store, file, workspaceId, title) => {
    const accessToken = store.getters.accessToken;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workspaceId', workspaceId);
    formData.append('fileSize', file.size);
    formData.append('title', title)

    return axios.post(`${window.location.protocol}//${window.location.hostname}/file`,
        formData,
        {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}

export const downloadFile = async (store, file) => {
    const accessToken = store.getters.accessToken;

    return axios.get(`${window.location.protocol}//${window.location.hostname}/file/${file.id}`,
        {
            headers: {
                'Authorization': accessToken
            },
            responseType: 'blob'
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}

export const deleteFile = async (store, file) => {
    const accessToken = store.getters.accessToken;

    return axios.delete(`${window.location.protocol}//${window.location.hostname}/file/${file.id}`,
        {
            headers: {
                'Authorization': accessToken
            },
            responseType: 'blob'
        }
    ).then(
        result => result.data
    ).catch(
        error => handleErrors(store, error)
    );
}
