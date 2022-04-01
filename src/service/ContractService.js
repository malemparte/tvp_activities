import axios from "axios";

export default {
    
    getVariableByContractCode(id, code) {
        const url = `${process.env.VUE_APP_API_CORE_URL}/contracts`;
        let data = {operation: 'get-variable-contract-code', contract_id: id, code: code}
        return axios.post(url, data)
    },

	getIndicatorByContract(id) {
        const url = `${process.env.VUE_APP_API_CORE_URL}/contracts`;
        let data = {operation: 'get-indicator-by-contract', contract_id: id}
        return axios.post(url, data)
    },

    getLocationsByContract(id){
        const url = `${process.env.VUE_APP_API_CORE_URL}/contracts`;
        let data = {operation: 'get-locations-by-contract', contract_id: id}
        return axios.post(url, data)
    },

    getByEmployee(id) {
        const url = `${process.env.VUE_APP_API_CORE_URL}/contracts`;
        let data = {operation: 'get-contract-by-employee', employee_id: id}
        return axios.post(url, data)
    },

    getAllContract(){
        const url = `${process.env.VUE_APP_API_CORE_URL}/contracts`;
        let data = {operation: 'get-all'}
        return axios.post(url, data)
    },

    getById(id){
        const url = `${process.env.VUE_APP_API_CORE_URL}/contracts`;
        let data = {operation: 'get-by-id', contract_id: id}
        return axios.post(url, data)
    },

}
