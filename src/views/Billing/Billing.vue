<template>
    <div class="page-content">
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>

        <div class="container-fluid mt--7 page-container">
            <div class="row flex-row">
                <div class="col flex-col">
                    <card shadow type="fullpage">
                        <div class="card-header">
                            <div class="bg-white border-0">
                                <div class="row align-items-center">
                                    <div class="col-8">
                                        <h3 class="mb-0">Billing information</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <h6 class="heading-small text-muted mb-4">
                                    Plan information
                                </h6>
                            </div>
                            <div class="row">
                                <span v-if="subscription">
                                    <span v-if="subscription.status == 'ACTIVE'">
                                        Your subscription is currently <span class="subscription-active">active</span>
                                    </span>
                                    <span v-if="subscription.status == 'INACTIVE'">
                                        Your subscription is currently <span class="subscription-inactive">inactive</span>
                                    </span>
                                </span>
                                <span v-if="!subscription">
                                    You don't have subscription yet.
                                </span>
                            </div>
                            <hr class="my-4" />
                            <div class="row">
                                <h6 class="heading-small text-muted mb-4">
                                    Access billing portal
                                </h6>
                            </div>
                            <div>
                                <a @click="goToPortal" class="btn btn-sm btn-primary">Go to portal</a>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'billing',
        computed: {
            subscription() {
                return this.$store.getters.subscription;
            }
        },
        methods: {
            goToPortal() {
                console.log('go to portal');
                this.$store.dispatch('CREATE_PORTAL_SESSION')
                    .then(session => {
                        window.location = session.url;
                    })
            }
        },
        mounted() {
            console.log('BILLING MOUNTED');
            this.$store.dispatch('FETCH_SUBSCRIPTION');
        }
    };
</script>
<style>
    .subscription-active {
        color: green;
    }

    .subscription-inactive {
        color: red;
    }

    .btn {
        cursor: pointer;
    }
</style>
