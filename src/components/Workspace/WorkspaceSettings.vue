<template>
    <div>
        <i id="workspace-settings" class="ni ni-settings-gear-65 text-white" style="font-size: 24px"></i>
        <b-popover
            target="workspace-settings"
            placement="top"
        >
            <template v-slot:title>
                <div class="text-center">
                    Workspace Name
                </div>
            </template>
            <b-form-group>
                <b-form-input
                    id="input-settings-name"
                    v-model="name"
                    :state="nameValidation"
                    aria-describedby="input-feedback"
                    placeholder="My workspace"
                    trim
                />
                <b-form-invalid-feedback id="input-feedback">
                        Workspace name must be 4 characters length at least.
                </b-form-invalid-feedback>
            </b-form-group>
            <base-button
                type="primary"
                style="width: 100%"
                :disabled="!nameValidation"
                @click="save"
            >
                Save
            </base-button>
        </b-popover>
    </div>
</template>

<script>
    export default {
        props: {
            workspaceId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                name: ''
            }
        },
        methods: {
            save() {
                console.log('save' + this.workspaceId);
                this.$store.dispatch('UPDATE_WORKSPACE', {
                    id: this.workspaceId,
                    workspace: {
                        name: this.name
                    }
                }).then(x => {
                    console.log('THEN', x)
                })
            }
        },
        computed: {
            nameValidation() {
                return this.name.length >= 4;
            }
        }
    }
</script>

<style>

</style>
