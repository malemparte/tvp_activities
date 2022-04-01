import Axios from 'axios';
import QueryString from 'querystring';

let AuthService = {};

(function () {
    const endpoint = 'auth';


  this.log_in = function (username, password) {
    const url = `${process.env.VUE_APP_URL}/oauth2/token/`;
    const data = new FormData();
    data.append('client_id', `${process.env.VUE_APP_CLIENT_ID}`);
    data.append('client_secret', `${process.env.VUE_APP_CLIENT_SECRET}`);
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');

    return Axios.post(url, data)
  };


  this.refresh_access = function (token) {
    const url = `${process.env.VUE_APP_URL}/oauth2/token/`;
    const data = new FormData();
    data.append('client_id', `${process.env.VUE_APP_CLIENT_ID}`);
    data.append('client_secret', `${process.env.VUE_APP_CLIENT_SECRET}`);
    data.append('refresh_token', token);
    data.append('grant_type', 'refresh_token');
    return Axios.post(url, data)
  };

   this.getUserDetail = function (username, password) {
        return new Promise((resolve, reject) => {
            const LOGIN_URL = `${process.env.VUE_APP_API_CORE_URL}/${endpoint}`;
            const params = QueryString.stringify({
                username: username,
                password: password,
            });

            Axios.post(LOGIN_URL, params).then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error)
            });
        });
    };

    this.logOut = function () {
        return new Promise((resolve, reject) => {
            const LOGIN_URL = `${process.env.VUE_APP_API_CORE_URL}/${endpoint}`;
            Axios.get(LOGIN_URL).then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error)
            });
        });
    };
}).apply(AuthService);

export default AuthService;
