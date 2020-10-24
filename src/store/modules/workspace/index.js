import {
    fetchWorkspace,
    fetchWorkspaces,
    createWorkspace,
    updateWorkspace,
    inviteUserToWorkspace,
    deleteWorkspace,
    fetchPendingInvitations,
    acceptWorkspaceInvitation,
    declineWorkspaceInvitation
} from '@/api';

export default {
    state: {
        workspaces: [],
        invitations: []
    },
    mutations: {
        SET_WORKSPACES: (state, workspaces) => {
            state.workspaces = workspaces;
        },
        ADD_WORKSPACE: (state, workspace) => {
            if (state.workspaces.find(w => w.id === workspace.id)) {
                state.workspaces = state.workspaces.map(w => {
                    if (w.id == workspace.id)
                        return workspace;
                    return w;
                })
            } else {
                state.workspaces = [...state.workspaces, workspace];
            }
        },
        UPDATE_WORKSPACE: (state, { id, updatedFields }) => {
            state.workspaces = state.workspaces.map(workspace => {
                if (workspace.id === id) {
                    return {
                        ...workspace,
                        ...updatedFields
                    }
                }
                return workspace;
            })
        },
        REMOVE_WORKSPACE: (state, deletedWorkspace) => {
            state.workspaces = state.workspaces.filter(
                workspace => workspace.id !== deletedWorkspace.id
            );
        },
        ADD_INVITATION: (state, invitation) => {
            state.invitations = [
                ...state.invitations,
                invitation
            ]
        },
        SET_INVITATIONS: (state, invitations) => {
            state.invitations = invitations;
        },
        REMOVE_INVITATION: (state, deletedInvitations) => {
            state.invitations = state.invitations.filter(
                invitation => invitation.id !== deletedInvitations.id
            );
        }
    },
    actions: {
        FETCH_WORKSPACE: async (store, workspaceId) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchWorkspace(
                store,
                workspaceId
            ).then(
                workspace => {
                    store.commit('DISABLE_PAGE_LOADER');
                    store.commit('ADD_WORKSPACE', workspace);
                    return workspace;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                }
            )

        },
        CREATE_WORKSPACE: async (store, workspaceName) => {
            store.commit('ENABLE_PAGE_LOADER');
            return createWorkspace(
                 store,
                workspaceName
            ).then(
                workspace => {
                    store.commit('ADD_WORKSPACE', workspace);
                    store.dispatch('FETCH_CHATROOMS');
                    return workspace;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                }
            );
        },
        UPDATE_WORKSPACE: async (store, { id, workspace }) => {
            console.log('UPDATE_WORKSPACE ACTION : ', id, workspace)
            store.commit('ENABLE_PAGE_LOADER');
            return updateWorkspace(
                store,
                id,
                workspace
            ).then(
                updatedFields => {
                    store.commit('DISABLE_PAGE_LOADER');
                    store.commit('UPDATE_WORKSPACE', { id, updatedFields });
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                }
            )
        },
        DELETE_WORKSPACE: async (store, workspace) => {
            store.commit('ENABLE_PAGE_LOADER');
            return deleteWorkspace(store, workspace)
                .then(
                    () => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('REMOVE_WORKSPACE', workspace);
                        store.commit('REMOVE_CHATROOM', workspace.id);
                    }
                ).catch(
                    () => store.commit('DISABLE_PAGE_LOADER')
                );
        },
        FETCH_WORKSPACES: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchWorkspaces(store)
                .then(
                    workspaces => {
                        store.commit('SET_WORKSPACES', workspaces)
                        store.commit('DISABLE_PAGE_LOADER');
                        store.dispatch('JOIN_WORKSPACES_NOTIFICATION', workspaces.map(w => w.id))
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.log('error : ', error);
                    }
                );
        },
        INVITE_USER_TO_WORKSPACE: async (store, invitation) => {
            store.commit('ENABLE_PAGE_LOADER');
            return inviteUserToWorkspace(store, invitation)
                .then(
                    () => {
                        store.commit('DISABLE_PAGE_LOADER');
                    }
                ).catch(
                    () => {
                        store.commit('DISABLE_PAGE_LOADER');
                    }
                )
        },
        FETCH_INVITATIONS: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchPendingInvitations(store)
                .then(
                    invitations => {
                        store.commit('SET_INVITATIONS', invitations);
                        store.commit('DISABLE_PAGE_LOADER');
                    }
                ).catch(
                    () => store.commit('DISABLE_PAGE_LOADER')
                )
        },
        ACCEPT_WORKSPACE_INVITATION: async (store, invitation) => {
            store.commit('ENABLE_PAGE_LOADER');
            return acceptWorkspaceInvitation(store, invitation)
                .then(
                    () => {
                        store.dispatch('FETCH_WORKSPACES')
                        store.commit('REMOVE_INVITATION', invitation);
                        store.commit('DISABLE_PAGE_LOADER');
                    }
                ).catch(
                    () => store.commit('DISABLE_PAGE_LOADER')
                )
        },
        DECLINE_WORKSPACE_INVITATION: async (store, invitation) => {
            store.commit('ENABLE_PAGE_LOADER');
            return declineWorkspaceInvitation(store, invitation)
                .then(
                    () => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('REMOVE_INVITATION', invitation);

                    }
                ).catch(
                    () => store.commit('DISABLE_PAGE_LOADER')
                )
        }
    }
}
