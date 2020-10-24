import { fetchOffers, createPortalSession, fetchSubscription } from '@/api'

export default {
    state: {
        offers: [],
        publishableKey: null,
        subscription: null
    },
    mutations: {
        SET_OFFERS: (state, offers) => {
            state.offers = offers;
        },
        SET_PUBLISHABLE_KEY: (state, publishableKey) => {
            state.publishableKey = publishableKey;
        },
        SET_SUBSCRIPTION: (state, subscription) => {
            state.subscription = subscription;
        }
    },
    actions: {
        FETCH_OFFERS: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchOffers(
                store
            ).then(
                response => {
                    store.commit('DISABLE_PAGE_LOADER');
                    store.commit('SET_OFFERS', response.offers);
                    store.commit('SET_PUBLISHABLE_KEY', response.publishableKey)
                    return offers;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                }
            )
        },
        CREATE_PORTAL_SESSION: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return createPortalSession(
                store
            ).then(
                response => {
                    store.commit('DISABLE_PAGE_LOADER');
                    return response;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                }
            )
        },
        FETCH_SUBSCRIPTION: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return fetchSubscription(
                store
            ).then(
                response => {
                    store.commit('DISABLE_PAGE_LOADER');
                    store.commit('SET_SUBSCRIPTION', response);
                    return response
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                }
            )
        },
    }
}
