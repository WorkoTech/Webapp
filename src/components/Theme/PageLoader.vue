<template>
    <div v-if="pageLoader" id="pageLoader">
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            pageLoader() {
                return this.$store.getters.pageLoader;
            }
        }
    }
</script>

<style lang="scss">
    #pageLoader {
        position: absolute;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background: lightgrey;
        opacity: 0.7;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1080; // 10 more than any boostrap value
    }

    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid #dfc;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
        }
    }

</style>
