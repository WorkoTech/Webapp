<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        :valid="loginError === null"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="credentials.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        :valid="loginError === null"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="credentials.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative" v-model="rememberMe">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="login">Sign in</base-button>
                            </div>
                            <div class="text-center text-danger" v-if="loginError !== null">
                                <span>{{ loginError.message }}</span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12 text-center">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                rememberMe: true,
                credentials: {
                    email: '',
                    password: ''
                }
            }
        },
        computed: {
            loginError() {
                return this.$store.getters.loginError
            }
        },
        methods: {
            login() {
                this.$store.dispatch('LOGIN', {
                    credentials: this.credentials,
                    rememberMe: this.rememberMe
                }).then(() => console.log('AFTER LOGIN'));
            }
        },
        mounted() {
            if (this.$store.getters.accessToken) {
                console.log('here');
                this.$router.push({ path: 'workspace' });
            }
        }
    }
</script>
<style>
</style>
