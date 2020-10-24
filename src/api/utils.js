export const handleErrors = (store, error) => {
    if (error.response && error.response.status === 401) {
        store.dispatch('LOGOUT');
        store.getters.router.push({ path: '/login' });
        return ;
    }
    throw error;
}
