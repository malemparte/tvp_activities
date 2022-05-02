<template id="login">
        <div class="md-min-width card m-5">
            <div><img style="width: 80px !important;" alt="icono corporativo" src="@/assets/logo.svg"></div>
                <!--h5>Ingreso aplicacion de actividades</h5-->
                <div class="field mt-3">
                    <h5 for="username2">Nombre de usuario</h5>
                    <InputText id="username2" type="username" aria-describedby="username2-help" class="p-invalid" v-model="username"/>
                    <h6 id="username2-help" class="p-error">Usuario invalido.</h6>
                </div>
                <div class="field">
                    <h5 for="username2">Contraseña</h5>
                    <Password v-model="password" toggleMask/>
                </div>
                <buttonp class="w-8rem mt-5 p-button-warning" icon="pi pi-users" label="Ingresar" @click.prevent="logIn()"/>
        </div>
</template>


<script>
    import AuthService from '@/service/AuthService';

    let LoginPage = {};
    (function () {
        this.name = 'login-page';
        // let _self = null;

        this.created = function () {

        };

        this.mounted  = function () {

        };

        this.data = function () {
            return {
                username: '',
                password: ''
            }
        };
        this.methods = {
            logIn() {
                this.$store.dispatch('form/reset');
                this.$store.dispatch('form/submit', true)
                this.$store.dispatch('form/error', {
                    username: false,
                    password: false,
                    credentials: false
                });
                
                if (this.username === null || this.username.trim() === '') {
                    this.$store.dispatch('form/error', {username: true});
                }
                
                if (this.password === null || this.password.trim() === '') {
                    this.$store.dispatch('form/error', {password: true});
                }
            
                if (this.$store.getters['form/invalid-fields'].length > 0) {
                    this.$store.dispatch('form/submit', false)
                    return
                }
               
                this.$store.dispatch('auth/logout');
               
                AuthService.log_in(this.username, this.password)
                    .then(response => {
                        console.log(response.data.access_token);
                      this.$store.dispatch('auth/set-access-token', response.data.access_token);
                      this.$store.dispatch('auth/set-refresh-token', response.data.refresh_token);
                       AuthService.getUserDetail(this.username, this.password)
                            .then(response2 => {
                                this.$store.dispatch('auth/set-user', response2[1].employee_id);
                                this.$store.dispatch('auth/set-groups', response2[0]);
                                /*if(this.isInGroups('driver') === false) {
                                    let result = {isError: true, message: 'Accedo denegado'};
                                        this.$store.dispatch('form/result', result);
                                        this.$router.push({name: 'logout'});
                                }else{*/
                                   this.$router.replace({name: 'home'}); 
                                //}
                                this.$store.dispatch('form/submit', false);
                            }).catch((error) => {
                                // LoggerService.debug(error);
                                console.log(error);
                            });
                    })
                    .catch(err => {
                      // LoggerService.debug(err.response.data);
                      if (err.response.status === 400) {
                        this.$store.dispatch('form/error', {credentials: true});
                        this.$store.dispatch('form/submit', false);
                      }
                    });
                    
            }
        };
        this.computed = {

        };
        this.watch = {
            username(newValue){
                this.username = newValue.toLowerCase();
            }
        };
        this.props = [];
    }).apply(LoginPage);

    export default LoginPage
</script>
