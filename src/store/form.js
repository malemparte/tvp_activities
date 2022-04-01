const state = () => ({
	step: null,
	isSubmiting: false,
	errorStates: {},
	result: {
		isError: false,
		message: null
	}
});
 
const getters = {
	'step'(state) {
		return state.step
	},
	'invalid-fields'(state) {
		return Object.keys(state.errorStates).filter((key) => state.errorStates[key])
	},
	'error-states'(state) {
		return state.errorStates
	},
	'result'(state) {
		return state.result
	},
	'is-submiting'(state) {
		return state.isSubmiting
	}
};
 
const actions = {
	submit(context, value) {
		context.commit('set-submiting', value)
	},
	step(context, value) {
		context.commit('set-step', value)
	},
	error(context, obj) {
		context.commit('add-error', obj)
	},
	result(context, value) {
		context.commit('set-result', value)
	},
	reset (context){
		context.commit('set-submiting', false)
		context.commit('clear-errors')
	}
};
 
const mutations = {
	'set-step'(state, value) {
		state.step = value
	},
	'set-submiting'(state, value) {
		state.isSubmiting = value
	},
	'add-error'(state, obj) {
		state.errorStates = Object.assign({}, state.errorStates, obj)
	},
	'set-result'(state, value) {
		state.result = value
	},
	'clear-errors' (state) {
		state.errorStates = {};
	}
};
 
export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}