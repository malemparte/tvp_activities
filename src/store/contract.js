const state = () => ({
	contract: localStorage.getItem('contract'),
    contract_name: localStorage.getItem('contract_name')
});
 
const getters = {
	contract(state) {
		return state.contract
	},
	contract_name(state) {
		return state.contract_name
	}
};
 
const actions = {
	'remove-contract'(context) {
        context.commit('contract', null);
        localStorage.removeItem('contract');
    },
    'set-contract'(context, contract) {
        context.commit('contract', contract);
        localStorage.setItem('contract', contract);
    },
    'remove-contract-name'(context) {
        context.commit('contract_name', null);
        localStorage.removeItem('contract_name');
    },
    'set-contract-name'(context, contract_name) {
        context.commit('contract_name', contract_name);
        localStorage.setItem('contract_name', contract_name);
    }
};

const mutations = {
	contract(state, value) {
        state.contract = value
    },
    contract_name(state, value) {
        state.contract_name = value
    }
};
 
export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}