import {
    getMyProfile,
    getProfileTitle,
    getProfileAvatar,
    getProfileLevel,
	getProfileActions,
	editAvatar,
	editProfile,
} from '@/api/'

export default{
    state: {
        profile: null,
        avatar: null,
        title: null,
        level: null,
        profileActions: null,
    },
    mutations: {
        SET_PROFILE: (state, profile) => {
            state.profile = profile;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_TITLE: (state, title) => {
            state.title = title;
        },
        SET_LEVEL: (state, level) => {
            state.level = level;
        },
        SET_PROFILE_ACTIONS: (state, profileActions) => {
            state.profileActions = profileActions;
        }
    },
    actions: {
        PROFILE: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return getMyProfile(store)
            .then(
                profile => {
                    store.commit('SET_PROFILE', profile)
                    store.commit('DISABLE_PAGE_LOADER');
                    return profile;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
        },
        AVATAR: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return getProfileAvatar(store)
            .then(
                avatar => {
                    store.commit('SET_AVATAR', avatar);
                    store.commit('DISABLE_PAGE_LOADER');
                    return avatar;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
        },
        TITLE: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return getProfileTitle(store)
            .then(
                title => {
                    store.commit('SET_TITLE', title);
                    store.commit('DISABLE_PAGE_LOADER');
                    return title;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
        },
        LEVEL: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return getProfileLevel(store)
            .then(
                level => {
                    store.commit('SET_LEVEL', level);
                    store.commit('DISABLE_PAGE_LOADER');
                    return level;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
        },
        PROFILE_ACTIONS: async (store) => {
            store.commit('ENABLE_PAGE_LOADER');
            return getProfileActions(store)
            .then(
                profileActions => {
                    store.commit('SET_PROFILE_ACTIONS', profileActions);
                    store.commit('DISABLE_PAGE_LOADER');
                    return profileActions;
                }
            ).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
		},
		UPDATE_AVATAR: async (store, new_avatar = {}) => {
			store.commit('ENABLE_PAGE_LOADER');
			return editAvatar(store, new_avatar)
			.then(
				avatar => {
					store.commit('SET_AVATAR', avatar);
					store.commit('DISABLE_PAGE_LOADER');
					return avatar;
				}
			).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
		},
		UPDATE_PROFILE: async (store, new_profile = {}) => {
			store.commit('ENABLE_PAGE_LOADER');
			return editProfile(store, new_profile)
			.then(
				profile => {
					store.commit('SET_PROFILE', profile);
					store.commit('DISABLE_PAGE_LOADER');
					return profile;
				}
			).catch(
                error => {
                    store.commit('DISABLE_PAGE_LOADER');
                    console.log('error : ', error);
                }
            )
		},
    }
}