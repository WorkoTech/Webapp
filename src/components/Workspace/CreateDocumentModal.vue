<template>
    <b-modal
        id="create-document-modal"
        title="Create document"
        ok-variant="success"
        cancel-variant="danger"
        @ok="onOk"
        centered
    >
        <b-form>
            <b-form-group
            id="input-group-title"
            label="Enter document title:"
            label-for="input-title">
                <b-form-input
                id="input-title"
                v-model="form.title"
                :state="nameValidation"
                placeholder="My document"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">
                    Document title must be 4 characters length at least.
                </b-form-invalid-feedback>
            </b-form-group>
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
    export default {
        props: {
            workspace: Object
        },
        data() {
            return {
                form: {
                  title: '',
                }
            }
        },
        methods: {
            onOk(event) {
                if (!this.nameValidation) {
                    event.preventDefault();
                }
                // dispatch API action
                this.$store.dispatch('CREATE_DOCUMENT', {
                    document: this.form,
                    workspace: this.workspace
                });
                this.form = {
                    title: '',
                };
            }
        },
        computed: {
            nameValidation() {
                return this.form.title.length >= 4;
            }
        }
    }
</script>

<style>

</style>
