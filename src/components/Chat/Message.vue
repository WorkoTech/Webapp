<template>
    <div class="chat-messages" id="messages" v-if="chatroom" >
        <div
            class="chat-message"
            v-for="message in chatroom.messages"
        >
            <div class="chat-message-date">
                {{ formatDate(message.createdAt) }}
            </div>
            <div v-if="!isAuthor(message)" class="chat-message-message">
                <i class="ni ni-circle-08"></i>
                <div class="chat-message-box left">
                    <div class="chat-author">
                        {{ message.author.email }}
                    </div>
                    <div class="chat-message-content">
                        <span>{{ message.content }}</span>
                    </div>
                </div>
            </div>
            <div v-if="isAuthor(message)" class="chat-message-message right">
                <div class="chat-message-box right">
                    <div class="chat-author">
                        You
                    </div>
                    <div class="chat-message-content">
                        <span>{{ message.content }}</span>
                    </div>
                </div>
                <i class="ni ni-circle-08 right"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            chatroom() {
                let c = this.$store.getters.chatrooms.find(c => c.id === this.currentChatroomId);
                console.log('CHATROOM DISPLAYED : ', c);
                return c;
            },
            currentChatroomId() {
                return this.$store.getters.currentChatroomId;
            },
            myself() {
                return this.$store.getters.myself;
            }
        },
        methods: {
            formatDate(date) {
                const d = new Date(date);
                const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
                const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
                const hours = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d)
                const min = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d)

                return `${day}/${month} ${hours}:${min}`;
            },
            isAuthor(message) {
                if (message && this.myself) {
                    return message.author.id == this.myself.id;
                }
                return false;
            }
        },
        updated() {
            if (this.chatroom) {
                const el = document.getElementById("messages");
                if (el) {
                    el.scrollTop = el.scrollHeight;
                }
            }
        }
    }
</script>

<style>
    .chat-messages {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-y: scroll;
    }

    .chat-message {
        display: flex;
        flex-direction: column;
        margin: 8px 0;
        align-items: center;
    }

    .chat-message-message {
        width: 90%;
        display: flex;
        align-items: center;
        color: #2e313a;
        margin-top: 8px;
    }
    .chat-message-message.right {
        justify-content: flex-end;
    }

    .chat-message-message i {
        font-size: 32px;
        margin-right: 16px;
    }
    .chat-message-message i.right {
        font-size: 32px;
        margin-right: 0;
        margin-left: 16px;
        color: #bce689;
    }

    .chat-message-date {
        background-color: #dcdcdc;
        padding: 4px;
        color: #f0f0f0;
        font-weight: bold;
    }

    .chat-message-box {
        position: relative;
        background-color: white;
        flex-grow: 0.6;
        padding: 0 8px;
        border-radius: .4rem;
    }

    .chat-message-box.right {
        background-color: #bce689;
    }

    .chat-message-box.left:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-right-color: white;
        border-left: 0;
        margin-top: -8px;
        margin-left: -8px;
    }

    .chat-message-box.right:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-left-color: #bce689;
        border-right: 0;
        margin-top: -8px;
        margin-right: -8px;
    }

    .chat-author {
        margin-bottom: 4px;
        font-size: 14px;
        color: #acacac;
    }

</style>
