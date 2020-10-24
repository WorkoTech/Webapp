<template>
    <div class="chat" :class="{ closed: !displayed }">
        <sidebar></sidebar>
        <div class="content" v-if="currentChatroom">
            <div class="chatroom-header">
                <h3>{{ currentChatroomName }}</h3>
                <fa-icon icon="phone" @click="openCall"></fa-icon>
            </div>
            <message></message>
            <div class="chat-input">
                <textarea placeholder="Type your message here" v-model="content"/>
                <button type="button" class="chat-submit" @click="send"
                >
                    <i class="ni ni-send"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar';
    import Message from './Message';

    export default {
        components: {
            Sidebar,
            Message
        },
        data() {
            return {
                content: null
            }
        },
        methods: {
            send() {
                this.$store.dispatch('SEND_MESSAGE', this.content);
            },
            openCall() {
                console.log('open call chatroom', this.currentChatroom);
                window.open(
                    `${window.location.origin}/#/call?chatroomId=${this.currentChatroom.id}`,
                    '',
                    'resizable=no, location=no, width=1000, height=1000, menubar=no, status=no, scrollbars=no, menubar=no'
                )
            }
        },
        computed: {
            displayed() {
                return this.$store.getters.chatDisplay;
            },
            currentChatroom() {
                const currentChatroomId = this.$store.getters.currentChatroomId;
                return this.$store.getters.chatrooms.find(
                    c => c.id === currentChatroomId
                );
            },
            currentChatroomName() {
                if (!this.currentChatroom)
                    return "Undefined";

                const workspaces = this.$store.getters.workspaces;
                if (!workspaces)
                    return "Undefined";

                const workspace = workspaces.find(
                    workspace => workspace.id == this.currentChatroom.workspaceId
                );

                if (workspace) {
                    return workspace.name
                }
                return "Undefined";
            }
        },
        mounted() {}
    }
</script>

<style>
    .chat {
        position: fixed;
        display: flex;
        height: 100%;
        width: 50%;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: #eeeeee;
        box-shadow: 10px 0px 20px 0px rgba(0,0,0,0.15);

        transition: all 0.1s ease;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .chat-input {
        background-color: white;
        display: flex;
    }

    .chat-input textarea {
        border: none;
        flex-grow: 1;
        outline: none;
        height: 100%;
        resize: none;
    }

    .chat-submit {
        color: #2e313a;
        border: none;
        outline: none;
        background-color: white;
        font-size: 42px;
    }

    .chat.closed {
        display: none;
    }

    .chatroom-header {
        display: flex;
        align-items: center;
        padding: 8px;
        justify-content: space-between;
        border-bottom: 1px solid #dcdcdc;
        color: #bce689;
    }

    .chatroom-header h3 {
        color: #aaa;
        font-weight: normal;
        font-size: 1.3rem;
    }

    .chatroom-header svg {
        cursor: pointer;
    }

    .content {
        background-color: #eee;
    }
</style>
