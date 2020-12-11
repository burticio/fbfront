(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController($scope, localStorageService)
    {
        var vm = this;
        vm.form={};

        $scope.validateUser = function () {
           AjaxCall("POST", URL_SERVIDOR + "/sendMail", vm.form, function(response){
                if(response.estatus === true){
                    localStorageService.set("forgot_correo", vm.form);
                    StateMessage("Revisa tu correo","envíamos una liga para reestablecer tu contraseña","success");
                }else if(response.estatus === false){
                    StateMessage("Revisa tu correo","No encontramos tu correo","error");
                }
            });
        };

    }
})();