import axios from "axios";

export default {
    
    getActivityDates(dates) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/dates`;
        let data = {dates: dates}
        return axios.post(url, data)
    },

    addActivityType(activityType) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/typeadd`;
        let data = {activity_type: activityType}
        return axios.post(url, data)
    },

    allActivitiesImplementationUser(){
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/allmmplementuser`;
        let data = {}
        return axios.post(url, data)
    },

    allActiImplCreator(){
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/allmmplementcreator`;
        return axios.get(url)
    },

    newActivityImplementation(act_imple, file) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/newactivityimplementation`;
        let data = {activity_implementation: act_imple, file:file}
        return axios.post(url, data)
    },

    getActivityTypeByEmployee(){
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/type/all`;
        let data = {};
        return axios.post(url, data)
    },

    getActivityByEmployee(){
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/getemployee`;
        let data = {};
        return axios.post(url, data)
    },

    addActivity(activity, file) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/add`;
        let data = {activity: activity, file: file}
        return axios.post(url, data)
    },

    doActivity(activity) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/do`;
        let data = {activity_imple: activity}
        return axios.post(url, data)    
    },

    getEmployeeByBusiness() {
        const url = `${process.env.VUE_APP_API_CORE_URL}/employees`;
        let data = {operation: 'get-by-business'}
        return axios.post(url, data)
    },

    getEmployeeNotDriver() {
        const url = `${process.env.VUE_APP_API_CORE_URL}/employees`;
        let data = {operation: 'get-all-not-driver'}
        return axios.post(url, data)
    },

    askCompliance(contract, month, year) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/complainreport`;
        let data = {contract: contract, month: month, year: year}
        return axios.post(url, data)
    },

    askMyCompliance(month, year) {
        const url = `${process.env.VUE_APP_API_ACTIVITY_URL}/mycomplainreport`;
        let data = {month: month, year: year}
        return axios.post(url, data)
    },



    getAllVehicle() {
        const url = `${process.env.VUE_APP_API_CORE_URL}/vehicles`;
        return axios.get(url)
    },

}
