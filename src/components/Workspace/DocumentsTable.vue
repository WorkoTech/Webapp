<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" v-b-modal.create-document-modal>Create a new document</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive" style="height: 500px;">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="items">
        <template slot="columns">
          <th>Document</th>
          <th>Creator</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="document-icon mr-2">
                <i class="ni ni-single-copy-04 text-orange"></i>
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td>
            <div class="avatar-group">
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
              </a>
            </div>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" @click="goToDocument(row)">Edit</a>
                <a class="dropdown-item" v-b-modal.delete-document-modal @click="showDeleteModal(row)">Delete</a>
                <a class="dropdown-item" href="#">Share</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :total=30></base-pagination>
    </div>
    <create-document-modal :workspace=workspace></create-document-modal>
    <b-modal id="delete-document-modal" title="Are you sure?" ok-variant="danger" ok-title="Yes, I've understand that all data will be losed" centered @ok="deleteDocument">
      <h3>Are you sure to delete this document? All the data will be deleted</h3>
    </b-modal>
  </div>
</template>
<script>
    import CreateDocumentModal from './CreateDocumentModal'

    export default {
        props: {
            type: String,
            items: Array,
            title: String,
            workspace: Object
        },
        components: {
            CreateDocumentModal
        },
        data() {
            return {
                deletingDocument: null
            }
        },
        methods: {
            showDeleteModal(document) {
                this.deletingDocument = document;
            },
            goToDocument(document) {
                this.$router.push({ name: 'editor', params: { id: document.id } });
            },
            deleteDocument() {
                this.$store.dispatch('DELETE_DOCUMENT', this.deletingDocument);
                this.deletingDocument = null;
            }
        }
    }
</script>

<style>
  .document-icon {
    font-size: 200%;


  }
</style>
