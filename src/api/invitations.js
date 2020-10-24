import axios from 'axios';
import { handleErrors } from './utils';

export const fetchPendingInvitations = (store) => {
    const accessToken = store.getters.accessToken;

    return axios.get(
        `${window.location.protocol}//${window.location.hostname}/invitation/status/PENDING`,
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

export const inviteUserToWorkspace = async (store, invitation) => {
    const accessToken = store.getters.accessToken;

    return axios.post(
        `${window.location.protocol}//${window.location.hostname}/invitation/`,
        {
            ...invitation
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

const updateInvitationStatus = async (store, invitation, status) => {
    const accessToken = store.getters.accessToken;

    return axios.put(
        `${window.location.protocol}//${window.location.hostname}/invitation/${invitation.id}/`,
        {
            status: status
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

export const acceptWorkspaceInvitation = async (store, invitation) => {
    return updateInvitationStatus(store, invitation, "ACCEPTED");
}

export const declineWorkspaceInvitation = async (store, invitation) => {
    return updateInvitationStatus(store, invitation, "DECLINED");

}
