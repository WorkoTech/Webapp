<template>
    <div class="page-content">
        <detail-header :workspaceId="workspace.id" ></detail-header>

        <div class="container-fluid mt--7 page-container">
            <!-- <div class="row flex-row"> -->
                <!-- <div class="col flex-col"> -->
                    <div class="card shadow fullpage-card">
                        <div class="card-body">
                            <detail-elements-list :workspace=workspace></detail-elements-list>
                        </div>
                    </div>
                <!-- </div> -->
            <!-- </div> -->
        </div>
        <add-element-bubble :workspace=workspace></add-element-bubble>
    </div>
</template>

<script>
    import DocumentsTable from '@/components/Workspace/DocumentsTable'
    import DetailHeader from '@/views/Workspace/DetailHeader'
    import DetailElementsList from '@/views/Workspace/DetailElementsList'
    import AddElementBubble from '@/components/Workspace/AddElementBubble'

    export default {
        components: {
            DocumentsTable,
            DetailHeader,
            DetailElementsList,
            AddElementBubble
        },
        computed: {
            workspace() {
                return this.$store.getters.workspaces.find((workspace) =>
                    workspace.id === this.currentWorkspaceId
                );
            },
            currentWorkspaceId() {
                return parseInt(this.$route.params.id)
            }
        },
        watch: {
            workspace() {
               this.$store.commit('SET_PAGE_TITLE', 'Workspace "' + this.workspace.name + '"')
            }
        },
        created() {
            this.$store.commit('SET_PAGE_TITLE', 'Workspace "' + this.workspace.name + '"')
        }
    };
</script>

<style></style>
