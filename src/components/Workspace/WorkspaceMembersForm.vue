<template>
    <div>
        <i id="workspace-members-settings" class="ni ni-settings-gear-65 text-black" style="font-size: 24px"></i>
        <b-popover
            target="workspace-members-settings"
            placement="bottomright"
        >
            <template v-slot:title>
                <div class="text-center">
                    Members
                </div>
            </template>
            <b-form-group
                id="input-group-1"
                label="Members emails :"
                label-for="input-1"
                description="Invite friends or coworkers to allow them to work into this workspace with you."
            >
                <b-input-group>
                    <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        :state="emailValidation"
                        @keyup.enter="invite"
                        trim
                        placeholder="example@worko.com"
                    />
                    <b-input-group-append>
                        <b-button size="sm" @click="invite">
                            <i class="ni ni-check-bold text-green"></i>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-form-invalid-feedback id="input-1-live-feedback">
                    You need to enter a valid address email.
                </b-form-invalid-feedback>
            </b-form-group>

            <ul>
                <li v-for="(user, index) in users" :key="index">
                    <div class="workspace-user">
                        <span>{{ user.email }}</span>
                        <i class="ni ni-fat-remove text-black remove-user" @click="deleteUser(user)"></i>
                    </div>
                </li>
            </ul>
        </b-popover>
    </div>
</template>

<script>
    import { getUserByEmail } from '@/api';

    export default {
        props: {
            workspace: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                form: {
                    email: ''
                }
            }
        },
        computed: {
            users() {
                return this.workspace.users
            },
            emailValidation() {
                if (!this.form.email.length)
                    return;
                // eslint-disable-next-line
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.form.email)
            }
        },
        methods: {
            invite() {
                if (!this.emailValidation) {
                    return;
                }

                getUserByEmail(this.$store, this.form.email)
                    .then(user => {
                        if (!user) {
                            return ;
                        }
                        this.$store.dispatch('INVITE_USER_TO_WORKSPACE', {
                            workspace: this.workspace.id,
                            email: this.form.email
                        });
                        this.form.email = ''
                    }).catch(console.error);
            },
            deleteUser(user) {
                console.log('delete user ', user)
                const users = this.workspace.users.filter(
                    workspace_user => workspace_user.id !== user.id
                ).map(user => user.id);

                this.$store.dispatch('UPDATE_WORKSPACE', {
                    id: this.workspace.id,
                    workspace: {
                        ...this.workspace,
                        users
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .workspace-user {
        display: flex;
        align-items: center;

        > i {
            cursor: pointer;
        }
    }
    .remove-user {
        font-size: 24px;
    }
</style>
