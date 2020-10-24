<template>
    <div>
        <div class="bubble main">
            <div class="icon icon-shape big text-white rounded-circle shadow bg-warning">
                <i class="ni ni-fat-add"></i>
            </div>

            <div class="sub-bubble first">
                <div class="icon icon-shape text-white rounded-circle shadow bg-primary" v-b-modal.create-document-modal>
                    <i class="ni ni-single-copy-04"></i>
                </div>
                <span class="text">Document</span>
            </div>

            <div class="sub-bubble second">
                <div class="icon icon-shape text-white rounded-circle shadow bg-danger" v-b-modal.upload-file-modal>
                    <i class="ni ni-paper-diploma"></i>
                </div>
                <span class="text">File</span>
            </div>
        </div>
        <create-document-modal :workspace=workspace ></create-document-modal>
        <upload-file-modal :workspace=workspace ></upload-file-modal>
    </div>
</template>

<script>
    import CreateDocumentModal from './CreateDocumentModal'
    import UploadFileModal from './UploadFileModal'

    export default {
        props: {
            workspace: {
                type: Object,
                required: true
            }
        },
        components: {
            CreateDocumentModal,
            UploadFileModal
        },
    }
</script>

<style>
    .bubble {
        position: absolute;
        z-index: 1000;

        transition: all 0.1s ease;

        display: flex;
        align-items: center;
        flex-direction: column-reverse;
    }

    .bubble .big {
        width: 4rem;
        height: 4rem;
    }

    .sub-bubble {
        display: none;

        flex-direction: column;
        align-items: center;
    }

    .bubble.main {
        bottom: 2rem;
        right: 5rem;
    }

    .icon:hover {
        cursor: pointer;
    }

    .bubble.main:hover .first {
        display: flex;

        margin-bottom: 1rem;
    }

    .bubble.main:hover .second {
        display: flex;

        margin-bottom: 1rem;
    }

    .bubble.main:hover > .icon-shape i {
        font-size: 30px;
    }

</style>
