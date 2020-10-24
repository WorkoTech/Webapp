<template>
    <div></div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('LOGOUT');
        }
    }
</script>
