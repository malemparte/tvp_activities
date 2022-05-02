import Axios from 'axios'

let UploadFileService = {};
(function () {
    var endpointdoctemp = 'upload-file-destination';

    this.uploadfile = function (data) {
        return new Promise((resolve, reject) => {
            Axios.post(`${process.env.VUE_APP_API_CORE_URL}/${endpointdoctemp}`, data).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error.response)
            })
        })
    };

}).apply(UploadFileService);
export default UploadFileService;