(function () {
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(localStorageService, $http, $mdDialog, $state, $cookies) {
        var vm = this;
        vm.form = {
            email: null,
            password: null
        };
 
        if ($cookies.get("layoutStyle") != "verticalNavigation") {
            $cookies.put('layoutStyle', 'verticalNavigation');
            location.reload();
        }
 
        if (localStorageService.get("session_idUsuario") != null || localStorageService.get("session_idUsuario") == 0) {
 
            if (localStorageService.get("session_typeId") == 2) {                
                $state.go('app.inicio_supervisor');
            }

            if (localStorageService.get("session_typeId") == 1) {
                swal("Atención", "Usuario con perfil de comité en desarrollo", "error");
            }

            if (localStorageService.get("session_typeId") == 5) {
                $state.go('app.inicio_solicitante');
            }

            if (localStorageService.get("session_typeId") == 4) {
                $state.go('app.inicio_operador');
            }
        }
 

        vm.login = login;
        vm.mostrarCargando = mostrarCargando;
        vm.cerrarCargando = cerrarCargando;
        var alert;
        function mostrarCargando() {
            alert = $mdDialog.alert({
                templateUrl: 'app/main/cargando/modalCargando.html',
                parent: angular.element('body')
            });

            $mdDialog.show(alert).finally(function () {
                alert = undefined;
            });
        }

        function cerrarCargando() {
            $mdDialog.hide(alert, "finished");
            alert = undefined;
        }

        function login(login) {
             vm.mostrarCargando();
            AjaxCall("POST", URL_SERVIDOR + '/Logueo',
                login, function (response) {
                    if (response.Codigo === "401" || response.Codigo === "404") {
                        swal("Atención", response.mensaje, "error");
                    } else {
                        if (response.User !== undefined) {
                            
                            localStorageService.set("session_idUsuario", response.Person.id);
                            localStorageService.set("session_email", response.Person.email);
                            localStorageService.set("session_name", response.Person.name);
                            localStorageService.set("session_lastName", response.Person.lastName);
                            localStorageService.set("session_mLastName", response.Person.mLastName);
                            localStorageService.set("session_typeId", response.User.Type_Id);
                            
                            if (response.User.Type_Id == 2) {
                                $state.go('app.inicio_supervisor');
                            } else if (response.User.Type_Id == 3) {
                                $state.go('app.inicio_comite');
                            } else if (response.User.Type_Id == 5) {
                                $state.go('app.inicio_solicitante');
                            } else if (response.User.Type_Id == 4) {
                                $state.go('app.inicio_operador');
                            } else if (response.User.Type_Id == 6) {
                                $state.go('app.inicio_super');
                            }else if (response.User.Type_Id == 7) {
                                $state.go('app.inicio_super');
                            }else if (response.User.Type_Id == 8) {
                                $state.go('app.inicio_operador_vista');
                            }

                        }
                    }
                   
                }, function () {
                    vm.cerrarCargando();
                }, function(error){
                    
                    if(error.status === 500){
                        vm.cerrarCargando();
                        swal("Atención", "Ocurrió un error, intenta más tarde","error");
                    }

                    if(error.statusText =="timeout"){
                        vm.cerrarCargando();
                        swal("Atención", "Revisar conexión a internet, vuelve a intentar por favor","error");
                    }
                });

            
        };
    }
})();