<template>
    <div class="chat-sidebar">
        <div class="chat-list">
            <div v-if="chatrooms.length == 0" class="chat-chatroom">
                You don't have any workspaces yet.
            </div>
            <div
                v-for="chatroom in chatrooms"
                class="chat-chatroom"
                :class="{ selected: isChatroomSelected(chatroom) }"
                @click="openChatroom(chatroom)"
            >
                <div class="chat-chatroom-firstline">
                    <i class="ni ni-chat-round" aria-hidden="true"></i>
                    <span>{{ getChatroomName(chatroom) }}</span>
                    <b-badge
                        v-if="chatroomsUnreadMessages[chatroom.id]"
                        variant="danger"
                        class="unread-message-badge"
                    >
                        {{ chatroomsUnreadMessages[chatroom.id].length }}
                    </b-badge>
                </div>
                <div class="chat-chatroom-subline" v-if="isChatroomSelected(chatroom)">
                    <ul>
                        <li v-for="user in chatroom.users" class="chat-chatroom-subline-user">
                            <span class="chat-user-status" :class="{ online: user.online }">
                            </span>
                            <span>{{ user.email }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="chat-close" @click="close">
            <div class="chat-chatroom">
                <i class="ni ni-bold-left" aria-hidden="true"></i>
                Close
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                chatroomsUnreadMessages: {}
            }
        },
        computed: {
            chatrooms() {
                return this.$store.getters.chatrooms;
            },
            workspaces() {
                return this.$store.getters.workspaces;
            },
            currentChatroomId() {
                return this.$store.getters.currentChatroomId;
            },
            unreadMessages() {
                return this.$store.getters.unreadMessages;
            }
        },
        methods: {
            getChatroomName(chatroom) {
                if (!this.workspaces)
                    return "Undefined";

                const workspace = this.workspaces.find(workspace => workspace.id == chatroom.workspaceId);

                if (workspace) {
                    return workspace.name.length > 20 ? workspace.name.substring(0, 17) + "..." : workspace.name
                }
                return "Undefined";
            },
            isChatroomSelected(chatroom) {
                return this.currentChatroomId == chatroom.id;
            },
            openChatroom(chatroom) {
                this.$store.commit('OPEN_CHATROOM', chatroom.id);
            },
            close() {
                console.log('CLOSE');
                this.$store.commit('CLOSE_CHAT');
            }
        },
        watch: {
            unreadMessages(messages) {
                this.chatroomsUnreadMessages = {}
                messages.forEach(message => {
                    const chatroomId = message.ChatroomId;
                    const chatroomsUnreadMessages = this.chatroomsUnreadMessages[chatroomId];
                    if (
                        chatroomsUnreadMessages &&
                        !chatroomsUnreadMessages.find(msg => msg.id == message.id)
                    ) {
                        this.chatroomsUnreadMessages[chatroomId].push(message);
                    } else {
                        this.chatroomsUnreadMessages[chatroomId] = [message];
                    }
                })
            }
        }
    }
</script>

<style>
    .chat-chatroom-firstline {
        display: flex;
        align-items: center;
    }
    .chat-sidebar {
        display: flex;
        flex-direction: column;
        flex-grow: 0.1;
        background-color: #2e313a;
        box-sizing: border-box;
    }

    .chat-list {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        color: #aaa;
    }

    .chat-chatroom {
        align-items: center;
        display: flex;
        padding: 16px 16px;
        border-bottom: 1px solid #202229;
        cursor: pointer;

        flex-direction: column;
        align-items: end;
    }

    .chat-chatroom i {
        margin-right: 16px;
        font-size: 32px;
    }

    .chat-chatroom.selected {
        background-color: #43464f;
    }

    .chat-close {
        cursor: pointer;
    }

    .chat-chatroom-subline ul {
        margin: 0;
    }

    .chat-chatroom-subline ul li {
        display: flex;
        align-items: center;
        list-style: none;
    }

    .chat-user-status {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: red;
        margin-right: 8px;
    }
    .chat-user-status.online {
        background-color: #bce689;
    }
    .unread-message-badge {
        margin-left: 4px;
    }
</style>
