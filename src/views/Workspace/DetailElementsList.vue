<template>
    <div class="row">
        <!-- <div> -->
            <div v-for="(element, index) in elements" :key="'element-' + element.id" class="col-lg-4 col-md-6">
                <tile
                    v-if="element.type === 'DOCUMENT'"
                    :name="element.title"
                    :title="getDocumentTitle(element)"
                    :id="element"
                    backgroundColor="#e0edfb"
                    @click="onDocumentClick"
                    @delete="onDocumentDelete"
                    icon="ni-single-copy-04"
                    color="blue"
                    v-b-modal.delete-document-tile-modal
                ></tile>
                <tile
                    v-if="element.type === 'FILE'"
                    :name="element.title"
                    :title="getFileTitle(element)"
                    :id="element"
                    backgroundColor="#fbe0e0"
                    @click="onFileClick"
                    @delete="onFileDelete"
                    icon="ni-paper-diploma"
                    color="red"
                    v-b-modal.delete-file-tile-modal
                ></tile>
            </div>
        <!-- </div> -->
        <b-modal
            :show="deletingDocument != null"
            id="delete-document-tile-modal"
            title="Are you sure?"
            ok-variant="danger"
            ok-title="Yes, I've understand that all data will be losed"
            centered
            @ok="deleteDocument"
        >
          <h3>Are you sure to delete this document? All the data will be deleted</h3>
        </b-modal>

        <b-modal
            v-if="deletingFile != null"
            id="delete-file-tile-modal"
            title="Are you sure?"
            ok-variant="danger"
            ok-title="Yes, I've understand that all data will be losed"
            centered
            @ok="deleteFile"
        >
          <h3>Are you sure to delete this file? It couldn't be undone.</h3>
        </b-modal>
    </div>
</template>

<script>
    import Tile from "@/components/Theme/Tile"

    export default {
        components: {
            Tile
        },
        props: {
            workspace: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                deletingDocument: null,
                deletingFile: null
            }
        },
        computed: {
            elements() {
                return [
                    ...this.documents,
                    ...this.files
                ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            },
            documents() {
                console.log("DOCUMENTS : ", this.$store.getters.documents)
                return this.$store.getters.documents;
            },
            files() {
                return this.$store.getters.files;
            }
        },
        methods: {
            onDocumentClick(document) {
                this.$router.push({ name: 'editor', params: { id: document.id } });
            },
            onDocumentDelete(document) {
                console.log('on delete :', document)
                this.deletingDocument = document;
            },
            deleteDocument() {
                this.$store.dispatch('DELETE_DOCUMENT', this.deletingDocument);
                this.deletingDocument = null;
            },
            deleteFile() {
                this.$store.dispatch('DELETE_FILE', this.deletingFile);
                this.deletingFile = null;
            },
            onFileClick(file) {
                console.log('on click file', file);
                this.$store.dispatch('DOWNLOAD_FILE', file);
            },
            onFileDelete(file) {
                console.log('on delete file');
                this.deletingFile = file;
            },
            getDocumentTitle(document) {
                return 'Edit ' + document.title;
            },
            getFileTitle(file) {
                return 'Download ' + file.title;
            }
        },
        mounted() {
            this.$store.dispatch('FETCH_WORKSPACE_DOCUMENTS', this.workspace)
            this.$store.dispatch('FETCH_WORKSPACE_FILES', this.workspace)
        }
    }
</script>

<style>
    .document {
        position: relative;
        height: 100%;
    }

    .document-container {
        justify-content: center;
        flex-direction: column;
    }
</style>
