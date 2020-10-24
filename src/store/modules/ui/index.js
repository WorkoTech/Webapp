export default {
    state: {
        pageLoader: false,
        router: null,
        pageTitle: null
    },
    mutations: {
        ENABLE_PAGE_LOADER: (state) => state.pageLoader = true,
        DISABLE_PAGE_LOADER: (state) => state.pageLoader = false,
        SET_ROUTER: (state, router) => state.router = router,
        SET_PAGE_TITLE: (state, title) => state.pageTitle = title
    },
    actions: {}
}
