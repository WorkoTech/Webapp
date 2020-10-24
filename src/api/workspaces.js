import axios from 'axios';
import { handleErrors } from './utils';


export const fetchWorkspace = async(store, workspaceId) => {
    const accessToken = store.getters.accessToken;

    console.log('accesstoken : ', accessToken)

    return axios.get(`${window.location.protocol}//${window.location.hostname}/workspace/${workspaceId}/`,
        {
            headers: {
                'Authorization': accessToken
            }
        }
    ).then(result => result.map(workspace => {
            workspace.created_at = (new Date(workspace.created_at)).toLocaleDateString();
            return workspace;
        })
    ).catch(
        error => handleErrors(store, error)
    );
}

export const fetchWorkspaces = async (store) => {
    const accessToken = store.getters.accessToken;
    console.log('accesstoken : ', accessToken)
    return axios.get(`${window.location.protocol}//${window.location.hostname}/workspace/`,
        {
            headers: {
                'Authorization': accessToken
            }
        }
    ).then(result => result.data.map(workspace => {
            workspace.created_at = (new Date(workspace.created_at)).toLocaleDateString();
            return workspace;
        })
    ).catch(
        error => handleErrors(store, error)
    );
}

export const createWorkspace = async (store, name) => {
    const accessToken = store.getters.accessToken;

    return axios.post(
        `${window.location.protocol}//${window.location.hostname}/workspace/`,
        {
            name
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

export const deleteWorkspace = async (store, workspace) => {
    const accessToken = store.getters.accessToken;

    return axios.delete(
        `${window.location.protocol}//${window.location.hostname}/workspace/${workspace.id}/`,
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

export const updateWorkspace = async (store, workspaceId, workspace) => {
    const accessToken = store.getters.accessToken;

    return axios.put(
        `${window.location.protocol}//${window.location.hostname}/workspace/${workspaceId}/`,
        workspace,
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
