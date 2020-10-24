import io from 'socket.io-client';

import {
    fetchChatrooms
} from '@/api';

export default {
    state: {
        chatrooms: [],
        currentChatroomId: null,
        chatDisplay: false,
        unreadMessages: [],
        socket: null
    },
    mutations: {
        SET_SOCKET: (state, socket) => {
            state.socket = socket;
        },
        CLOSE_CHAT: (state) => {
            state.chatDisplay = false;
        },
        OPEN_CHAT: (state) => {
            state.chatDisplay = true;
        },
        SET_CHATROOMS: (state, chatrooms) => {
            state.chatrooms = chatrooms
        },
        OPEN_CHATROOM: (state, chatroomId) => {
            state.currentChatroomId = chatroomId;
            state.unreadMessages = state.unreadMessages.filter(
                msg => msg.ChatroomId !== chatroomId
            )
        },
        ADD_MESSAGE: (state, message) => {
            const chatroomId = message.ChatroomId;

            state.chatrooms = state.chatrooms.map(chatroom => {
                if (chatroom.id === chatroomId) {
                    chatroom.messages.push(message);
                }
                return chatroom;
            });
        },
        ADD_UNREAD_MESSAGE: (state, message) => {
            state.unreadMessages = [...state.unreadMessages, message];
        },
        USER_LOGGED_OUT: (state, { id }) => {
            state.chatrooms = state.chatrooms.map(chatroom => {
                chatroom.users = chatroom.users.map(user => {
                    if (user.id == id) {
                        user.online = false;
                    }
                    return user;
                })
                return chatroom;
            });
        },
        USER_LOGGED_IN: (state, { id }) => {
            state.chatrooms = state.chatrooms.map(chatroom => {
                chatroom.users = chatroom.users.map(user => {
                    if (user.id == id) {
                        user.online = true;
                    }
                    return user;
                })
                return chatroom;
            });
        },
        REMOVE_CHATROOM: (state, workspaceId) => {
            state.chatrooms = state.chatrooms.filter(
                chatroom => chatroom.workspaceId !== workspaceId
            )
        }
    },
    actions: {
        FETCH_CHATROOMS: (store) => {
            console.log('FETCH_CHATROOMS');
            store.commit('ENABLE_PAGE_LOADER');
            return fetchChatrooms(store)
                .then(chatrooms => {
                    console.log('chatrooms', chatrooms);
                    store.commit('DISABLE_PAGE_LOADER');
                    store.commit('SET_CHATROOMS', chatrooms);
                    store.commit('OPEN_CHATROOM', chatrooms.length > 0 ? chatrooms[0].id : null);
                })
                .catch(error => {
                    store.commit('DISABLE_PAGE_LOADER');
                })
        },
        LOG_IN_CHAT: (state, token) => {
            console.log('LOG IN CHAT, token:', token);
            const url = `${window.location.origin}?token=${token}`;
            const socket = io(url, {
                path: '/chat'
            });
            console.log('state.socket : ', socket);

            socket.on('new message', (msg) => {
                state.commit('ADD_MESSAGE', msg);
                if (state.chatDisplay && state.currentChatroomId !== msg.ChatroomId) {
                    state.commit('ADD_UNREAD_MESSAGE', msg);
                }
            })

            socket.on('USER_LOGGED_OUT', user => {
                state.commit('USER_LOGGED_OUT', user);
            })
            socket.on('USER_LOGGED_IN', user => {
                state.commit('USER_LOGGED_IN', user);
            })

            state.dispatch('FETCH_CHATROOMS');
            state.commit('SET_SOCKET', socket);
        },
        LOG_OUT_CHAT: (store) => {
            if (store.state.socket) {
                store.state.socket.close();
            }
            store.commit('SET_SOCKET', null);
        },
        SEND_MESSAGE: (store, content) => {
            console.log('STATE : ', store);
            store.state.socket.emit('message', {
                ChatroomId: store.state.currentChatroomId,
                content
            });

        }
    }
}
