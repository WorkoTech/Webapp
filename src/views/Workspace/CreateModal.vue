<template>
    <b-modal id="create-modal" title="Create workspace" ok-variant="success" cancel-variant="danger" @ok="onOk" @show="resetModal" @hidden="resetModal">
        <b-form>
            <b-form-group
            id="input-group-name"
            label="Enter workspace name:"
            label-for="input-name">
                <b-form-input
                id="input-name"
                v-model="form.name"
                :state="nameValidation"
                placeholder="My workspace"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">
                    Workspace name must be 4 characters length at least.
                </b-form-invalid-feedback>
            </b-form-group>

            <hr>

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
                    @keyup.enter="addEmail"
                    trim
                    placeholder="example@worko.com"
                    />
                    <b-input-group-append>
                        <b-button size="sm" @click="addEmail">
                            <i class="ni ni-check-bold text-green"></i>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-form-invalid-feedback id="input-1-live-feedback">
                    You need to enter a valid address email.
                </b-form-invalid-feedback>
            </b-form-group>

            <ul>
                <li v-for="(email, index) in emails" :key="index">{{ email }}</li>
            </ul>
        </b-form>

        <template v-slot:modal-ok>
            Confirm
        </template>
        <template v-slot:modal-cancel>
            Cancel
        </template>
    </b-modal>
</template>

<script>
    import { getUserByEmail } from '@/api';

    export default {
        data() {
            return {
                form: {
                  email: '',
                  name: '',
                },
                emails: [],
                validEmail: false
            }
        },
        methods: {
            addEmail() {
                if (this.emailValidation) {
                    this.emails.push(this.form.email);
                    this.form.email = '';
                }
            },
            resetModal() {
                this.form = {
                    name: '',
                    email: ''
                }
            },
            onOk(event) {
                if (!this.nameValidation) {
                    event.preventDefault();
                }
                // dispatch API action

                Promise.all(
                    this.emails.map(
                        email => getUserByEmail(
                            this.$store,
                            email
                        ).then(
                            user => user.id
                        ).catch(
                            () => null
                        )
                    )
                ).then(userIds => {
                    console.log('userIds : ', userIds);
                    console.log('emails : ', this.emails);
                    const validIds = this.emails.map(
                        (email, i) => {
                            console.log('check validity for ', email, ' n°', i);
                            console.log('userIds[', i, '] : ', userIds[i])
                            if (userIds[i]) {
                                return email;
                            }
                            return null;
                        }
                    ).filter(e => e !== null);

                    console.log('validIds : ', validIds);

                    if (validIds.length == this.emails.length) {
                        this.$store.dispatch('CREATE_WORKSPACE', this.form.name).then(
                            workspace => {
                                this.emails.forEach(email => {
                                    this.$store.dispatch('INVITE_USER_TO_WORKSPACE', {
                                        workspace: workspace.id,
                                        email
                                    });
                                })
                            }
                        )
                    }
                }).then(() => {
                    this.resetModal()
                }).catch(() => {
                    this.resetModal()
                })
            }
        },
        computed: {
            emailValidation() {
                if (!this.form.email.length)
                    return;
                // eslint-disable-next-line
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.form.email)
            },
            nameValidation() {
                if (this.form.name === '')
                    return null
                return this.form.name.length >= 4;
            }
        }
    }
</script>

<style>

</style>
