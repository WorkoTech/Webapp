import {
    deleteDocument,

    fetchWorkspaceDocuments,
    createWorkspaceDocument
} from '@/api';

export default {
	state: {
		documents: []
	},
	mutations: {
		SET_DOCUMENTS: (state, documents) => {
            documents = documents.map(document => {
                document.type = "DOCUMENT";
                return document;
            });
            state.documents = documents
        },
        ADD_DOCUMENT: (state, document) => {
            document.type = "DOCUMENT";
            const documentExist = !!state.documents.find(doc => doc.id === document.id);
            if (!documentExist) {
                state.documents = [
                    ...state.documents,
                    document
                ]
            }
        },
        REMOVE_DOCUMENT: (state, deletedDocument) => {
            state.documents = state.documents.filter(
                document => document.id !== deletedDocument.id
            );
        }
	},
	actions: {
		CREATE_DOCUMENT: async (store, { document, workspace }) => {
            store.commit('ENABLE_PAGE_LOADER');
            return createWorkspaceDocument(store, document, workspace)
                .then(
                    document => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('ADD_DOCUMENT', document);
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.error('error : ', error);
                    }
                )
        },
        DELETE_DOCUMENT: async (store, document) => {
            store.commit('ENABLE_PAGE_LOADER');
            return deleteDocument(store, document)
                .then(
                    () => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('REMOVE_DOCUMENT', document);
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.error('error : ', error);
                    }
                )
        },
        FETCH_WORKSPACE_DOCUMENTS: async (store, workspace) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchWorkspaceDocuments(store, workspace)
                .then(
                    documents => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('SET_DOCUMENTS', documents)
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.error('error : ', error);
                    }
                )
        }
	}
}
