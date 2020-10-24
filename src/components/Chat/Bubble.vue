<template>
    <div class="chat-bubble bubble main" @click="open">
        <div class="icon icon-shape big text-white rounded-circle shadow bg-gradient-info">
            <i class="ni ni-email-83"></i>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            open() {
                this.$store.commit('OPEN_CHAT');
            }
        }
    }
</script>

<style>
    .chat-bubble {
        position: fixed !important;
        bottom: 50px !important;
        left: -42px !important;
        right: unset !important;
        z-index: 100 !important;
        cursor: pointer;
    }
    .chat-bubble .icon-shape {
        padding: 42px;
    }
    .chat-bubble .icon-shape i {
        font-size: 3rem;
    }
</style>
