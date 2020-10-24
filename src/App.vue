<template>
    <div id="app" style="height: 100%;">
        <notifications></notifications>
        <router-view/>
    </div>
</template>

<script>
    export default {
        computed: {
            accessToken() {
                return this.$store.getters.accessToken
            },
            loginError() {
                return this.$store.getters.loginError
            }
        },
        watch: {
            accessToken(accessToken) {
                console.log('CURRENT ROUTE : ', this.$router.currentRoute)
                if (!accessToken)
                    this.$router.push({ path: '/login' });
                else {
                    if (
                        this.$router.currentRoute.path !== '/call' &&
                        this.$router.currentRoute.path !== '/plans' &&
                        this.$router.currentRoute.path !== '/register'
                    ) {
                        console.log('REDIRECT TO WORKSPACE')
                        this.$router.push({ path: '/workspace' })
                    }
                }
            },
            loginError(error) {
                if (error) {
                    this.$router.push({ path: '/login' });
                }
            },
            $route () {
                this.$store.commit('SET_PAGE_TITLE', null);
            }
        },
        mounted() {
            console.log('APP mounted')
            this.$store.dispatch('LOGIN')
                .catch(() => {
                    console.log('APP LOGIN FAILED');
                    this.$store.dispatch('LOGOUT');
                    this.$router.push({ path: '/login' });
                    console.log('ROUTER GO TO LOGIN');
                });
        }
    }
</script>
