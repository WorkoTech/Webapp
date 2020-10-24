<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Sign up</small>
                    </div>
                    <form role="form">
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="email">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="password">
                        </base-input>

                        <base-input class="input-group-alternative"
                            placeholder="Confirm Password"
                            type="password"
                            addon-left-icon="ni ni-lock-circle-open"
                            v-model="confirmation">
                        </base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="register">Create account</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 text-center">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'register',
        data() {
            return {
                email: '',
                password: '',
                confirmation: ''
            }
        },
        methods: {
            register() {
                if (this.password === this.confirmation) {
                    this.$store.dispatch('REGISTER', {
                        email: this.email,
                        password: this.password
                    }).then(x => {
                        console.log('AFTER REGISTER')
                        this.$router.push({ path: 'plans' });
                    })
                }
            }
        }
    }
</script>
<style>
</style>
