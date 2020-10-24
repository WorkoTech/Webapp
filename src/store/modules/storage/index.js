import {
    fetchWorkspaceFiles,
    downloadFile,
    deleteFile,
    uploadFile
} from '@/api';
import { saveAs } from 'file-saver';


export default {
    state: {
        files: []
    },
    mutations: {
        SET_FILES: (state, files) => {
            files = files.map(file => {
                file.type = 'FILE';
                return file;
            })
            state.files = files;
        },
        ADD_FILE: (state, file) => {
            file.type = 'FILE';
            const fileExist = !!state.files.find(f => f.id === file.id);
            if (!fileExist) {
                state.files = [
                    ...state.files,
                    file
                ]
            }
        },
        DELETE_FILE: (state, file) => {
            state.files = state.files.filter(
                f => f.id !== file.id
            );
        }
    },
    actions: {
        FETCH_WORKSPACE_FILES: async (store, workspace) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchWorkspaceFiles(store, workspace)
                .then(
                    files => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('SET_FILES', files)
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.error('error : ', error);
                    }
                )
        },
        DOWNLOAD_FILE: async (store, file) => {
            store.commit('ENABLE_PAGE_LOADER');
            return downloadFile(store, file)
                .then(
                    fileData => {
                        store.commit('DISABLE_PAGE_LOADER');
                        const b = new Blob([fileData]);
                        saveAs(b, file.title);
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.error('error : ', error);
                    }
                )
        },
        UPLOAD_FILE: async (store, { workspace, title, file }) => {
            store.commit('ENABLE_PAGE_LOADER');

            return uploadFile(store, file, workspace.id, title)
                .then(
                   file => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('ADD_FILE', file);
                    }
                ).catch(
                    error => {
                        store.commit('DISABLE_PAGE_LOADER');
                        console.error('error : ', error);
                    }
                )
        },
        DELETE_FILE: async (store, file) => {
            store.commit('ENABLE_PAGE_LOADER');

            return deleteFile(store, file)
                .then(
                    () => {
                        store.commit('DISABLE_PAGE_LOADER');
                        store.commit('DELETE_FILE', file);
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
