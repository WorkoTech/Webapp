import io from 'socket.io-client';
console.log('io : ', io);

export default {
    state: {
        socket: null
    },
    mutations: {
        SET_NOTIFICATION_SOCKET: (state, socket) => {
            state.socket = socket;
        }
    },
    actions: {
        START_NOTIFICATION_LISTENING: (store) => {
            const accessToken = store.getters.accessToken;
            if (!accessToken) {
                console.log('Trying to starting listening to notifications before logged in');
            }

            const socket = io({
                query: {
                    token: accessToken
                },
                transports: ['websocket']
            });

            socket.on('invitation recieved', ({ channel, data }) => {
                console.log('notification invitation recieved', data);
                store.commit('ADD_INVITATION', data);
            })

            socket.on('workspace updated', ({ channel, data }) => {
                console.log('notification workspace updated : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.commit('UPDATE_WORKSPACE', {
                    id: workspaceId,
                    updatedFields: data
                })
            })

            socket.on('workspace deleted', ({ channel, data }) => {
                console.log('notification workspace deleted : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.commit('REMOVE_WORKSPACE', {
                    id: workspaceId
                });
                const router = store.getters.router;
                if (router.currentPath = `/workspace/${workspaceId}`) {
                    console.log("Redirecting to workspace list cause workpace has been deleted");
                    router.push({ path: 'workspace' })
                }
            })

            socket.on('need refresh', ({ channel, data }) => {
                console.log('notification need refresh : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.dispatch('FETCH_WORKSPACE', workspaceId);
            })

            socket.on('filestorage created', ({ channel, data }) => {
                console.log('notification filestorage created : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.commit('ADD_FILE', data);
            })

            socket.on('filestorage deleted', ({ channel, data }) => {
                console.log('notification filestorage deleted : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.commit('DELETE_FILE', data);
            })

            socket.on('document created', ({ channel, data }) => {
                console.log('notification document created : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.commit('ADD_DOCUMENT', data);
            })

            socket.on('document deleted', ({ channel, data }) => {
                console.log('notification document deleted : ', data)
                const workspaceId = parseInt(channel.split(' ')[1])
                store.commit('REMOVE_DOCUMENT', data);
            })

            store.commit('SET_NOTIFICATION_SOCKET', socket);
            return socket;
        },

        JOIN_WORKSPACES_NOTIFICATION: async (store, workspaceIds) => {
            console.log('store : ', store)
            let socket = store.state.socket;
            if (!socket) {
                socket = await store.dispatch('START_NOTIFICATION_LISTENING');
            }

            workspaceIds.forEach(workspaceId => {
                socket.emit('join', `workspace ${workspaceId}`);
            })
        }
    }
}
