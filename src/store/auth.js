const state = () => ({
	user: localStorage.getItem('username'),
    groups: localStorage.getItem('groups'),
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token')
});

const getters = {
	check(state) {
        return state.user != null && state.access_token != null && state.refresh_token != null
    },
    user(state) {
        return state.user
    },
    groups(state) {
        return state.groups
    },
    refresh_token(state) {
        return state.refresh_token
    },
    access_token(state) {
        return state.access_token
    }	
};
 
const actions = {
	logout(context) {
        context.commit('user', null);
        context.commit('groups', null);
        localStorage.removeItem('username');
        localStorage.removeItem('groups');
        context.commit('access_token', null);
        localStorage.removeItem('access_token');
        context.commit('refresh_token', null);
        localStorage.removeItem('refresh_token');
        
    },
    'set-user'(context, user) {
        context.commit('user', user);
        localStorage.setItem('username', user);
    },
    'set-groups'(context, groups) {
        context.commit('groups', groups);
        localStorage.setItem('groups', groups);
    },
    'set-access-token'(context, access_token) {
        context.commit('access_token', access_token);
        localStorage.setItem('access_token', access_token);
    },
    'set-refresh-token'(context, refresh_token) {
        context.commit('refresh_token', refresh_token);
        localStorage.setItem('refresh_token', refresh_token);
    }
};
 
const mutations = {
	user(state, value) {
		state.user = value
	},
	groups(state, value) {
		state.groups = value
	},
	access_token(state, value) {
		state.access_token = value
	},
	refresh_token(state, value) {
		state.refresh_token = value
	}
};
 
export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}