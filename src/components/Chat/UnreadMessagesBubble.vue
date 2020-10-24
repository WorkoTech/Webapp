<template>
    <div v-if="unreadMessagesCount > 0" class="chat-bubble-unread bubble main" @click="open">
        <div class="icon icon-shape big text-white rounded-circle shadow bg-gradient-red">
            <span>{{ unreadMessagesCount }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            unreadMessagesCount() {
                const count = this.$store.getters.unreadMessages.length;
                if (count > 9)
                    return "+";
                return count;
            }
        },
        methods: {
            open() {
                this.$store.commit('OPEN_CHAT');
            }
        }
    }
</script>

<style>
    .chat-bubble-unread {
        position: fixed !important;
        bottom: 105px !important;
        left: 20px !important;
        right: unset !important;
        z-index: 101 !important;
        cursor: pointer;
    }
    .chat-bubble-unread .icon-shape {
        padding: 4px;
    }
    .chat-bubble-unread .icon-shape span {
        font-size: 0.8rem;
        font-weight: bold;
    }

    .chat-bubble-unread .icon {
        width: 2rem;
        height: 2rem;
    }
</style>
