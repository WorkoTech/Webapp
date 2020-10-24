import {
    register,
    login,
    getMyself
} from '@/api/'


const createCookie = (cookieName, cookieValue, daysToExpire) => {
    const date = new Date();
    date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}

const eraseCookie = (name) => {
    document.cookie = name + '=; Max-Age=0'
}

const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const allCookieArray = document.cookie.split(';');

    for(let i=0; i<allCookieArray.length; i++)
    {
        const temp = allCookieArray[i].trim();
        if (temp.indexOf(name)==0)
            return temp.substring(name.length,temp.length);
    }
    return null;
}

export default {
    state: {
        accessToken: null,
        loginError: null,
        myself: null
    },
    mutations: {
        SET_ACCESS_TOKEN: (state, accessToken) => state.accessToken = accessToken,
        SET_LOGIN_ERROR: (state, loginError) => state.loginError = loginError,
        SET_MYSELF: (state, myself) => state.myself = myself
    },
    actions: {
        LOGIN: async (store, { credentials, rememberMe } = {}) => {
            console.log('LOGIN');
            let storedToken;
            if (!credentials) {
                // CALLED WITHOUT CREDENTIALS AT WEBAPP STARTUP (rf App.vue)
                // CHECK IN COOKIE TO RETRIEVE TOKEN
                storedToken = getCookie('WORKO_TOKEN');
                console.log('storedToken : ', storedToken);
                if (!storedToken) {
                    throw "No credentials";
                }

                console.log('here');
                store.commit('ENABLE_PAGE_LOADER');
                return getMyself(store, storedToken)
                    .then(
                        user => {
                            console.log('after getMyself', user);
                            store.commit('SET_ACCESS_TOKEN', storedToken);
                            store.commit('DISABLE_PAGE_LOADER');
                            store.commit('SET_MYSELF', user);
                            store.dispatch('LOG_IN_CHAT', storedToken);
                            store.dispatch('START_NOTIFICATION_LISTENING');
                        }
                    ).catch(
                        error => {
                            store.commit('DISABLE_PAGE_LOADER');
                            store.commit('SET_LOGIN_ERROR', error);
                        }
                    )
            }
            store.commit('ENABLE_PAGE_LOADER');
            return await login(store, credentials.email, credentials.password)
                .then(payload => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('Login result, payload : ', payload);
                    console.log('SET ACCESS TOKEN');
                    store.commit('SET_ACCESS_TOKEN', payload.accessToken);
                    store.commit('SET_MYSELF', payload);
                    store.dispatch('LOG_IN_CHAT', payload.accessToken);

                    if (rememberMe) {
                        createCookie('WORKO_TOKEN', payload.accessToken, 7);
                    }
                })
                .catch(error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    store.commit('SET_LOGIN_ERROR', error);
                });
        },
        REGISTER: async (store, credentials) => {
            return register(store, credentials.email, credentials.password)
                .then(() => store.dispatch('LOGIN', {
                    credentials,
                    rememberMe: true
                }))
        },
        LOGOUT: async (store) => {
            store.commit('SET_ACCESS_TOKEN', null);
            store.dispatch('LOG_OUT_CHAT');
            eraseCookie('WORKO_TOKEN');
        }
    }
}
