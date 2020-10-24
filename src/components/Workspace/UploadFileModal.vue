<template>
    <b-modal
        id="upload-file-modal"
        title="Upload file"
        ok-variant="success"
        cancel-variant="danger"
        @ok="onOk"
        centered
    >
        <b-form>
            <b-form-group
                label="Enter document title:"
                label-for="input-file-title"
            >
                <b-form-input
                    id="input-file-title"
                    v-model="form.title"
                    :state="nameValidation"
                    placeholder="My file"
                >
                </b-form-input>

                <b-form-invalid-feedback>
                    File title must be defined.
                </b-form-invalid-feedback>

                <b-form-file
                      v-model="form.file"
                      @input="onFileChange"
                      :state="Boolean(form.file)"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                >
                </b-form-file>
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
                  file: null
                }
            }
        },
        methods: {
            onOk(event) {
                if (!this.nameValidation) {
                    event.preventDefault();
                }
                // dispatch API action
                this.$store.dispatch('UPLOAD_FILE', {
                    ...this.form,
                    workspace: this.workspace
                });
                this.form = {
                    title: '',
                    file: null
                };
            },
            onFileChange(file) {
                if (this.form.title == '' && file && file.name) {
                    this.form.title = file.name;
                }
            }
        },
        computed: {
            nameValidation() {
                return this.form.title.length >= 1;
            }
        }
    }
</script>

<style>

</style>
