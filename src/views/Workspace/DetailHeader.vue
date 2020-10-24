<template>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        <div class="row">
            <div class="col-xl-3 col-lg-6">
                <stats-card type="gradient-red"
                            :sub-title="membersCount"
                            icon="ni ni-single-02"
                            class="mb-4 mb-xl-0"
                >
                    <template slot="title">
                        <div class="d-flex">
                            <h5 class="card-title text-uppercase text-muted mb-0 mr-2">Members</h5>
                            <workspace-members-form :workspace="currentWorkspace" />
                        </div>
                    </template>
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Documents"
                            type="gradient-orange"
                            :sub-title="documentsCount"
                            icon="ni ni-single-copy-04"
                            class="mb-4 mb-xl-0"
                >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Files"
                            type="gradient-green"
                            :sub-title="filesCount"
                            icon="ni ni-paper-diploma"
                            class="mb-4 mb-xl-0"
                >
                </stats-card>

            </div>
            <div class="col-xl-3 col-lg-6">
                <stats-card title="Creation"
                            type="gradient-info"
                            :sub-title="creationDate"
                            icon="ni ni-atom"
                            class="mb-4 mb-xl-0"
                >
                </stats-card>
            </div>
        </div>
    </base-header>
</template>

<script>
    import WorkspaceMembersForm from '@/components/Workspace/WorkspaceMembersForm';

    export default {
        props: {
            workspaceId: {
                type: Number,
                required: true
            }
        },
        components: {
            WorkspaceMembersForm
        },
        computed: {
            currentWorkspace() {
                return this.$store.getters.workspaces.find(
                    workspace => workspace.id === this.workspaceId
                );
            },
            membersCount() {
                return String(this.currentWorkspace.users.length);
            },
            documentsCount() {
                return String(this.$store.getters.documents.length);
            },
            filesCount() {
                return String(this.$store.getters.files.length);
            },
            creationDate() {
                return this.currentWorkspace.created_at;
            }
        }
    };
</script>


<style>
</style>
