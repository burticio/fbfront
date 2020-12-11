(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.recover')
        .controller('RecoverController', RecoverController);

    /** @ngInject */
    function RecoverController($scope, localStorageService)
    {
        var vm = this;
        $scope.passwordConfirm ="";
        $scope.email = getUrlVars()["email"];
        $scope.password="";
        var Token_Reset = getUrlVars()["token"];
        vm.cambiarPassword = cambiarPassword;

        function cambiarPassword(){
           if($scope.password != $scope.passwordConfirm){
            swal("Atención","Deben de coincidir las contraseñas","error");
            return false;
           }

            var objData = {
                email:$scope.email,
                password: $scope.password,
                Token_Reset : Token_Reset
            };

           AjaxCall("POST", URL_SERVIDOR +"/Reset", objData, function(response){
            if(response.Codigo = "401"){
                swal("Atención",response.mensaje, "error");
            }else  if(response.Codigo = "201"){
                swal("Atención",response.mensaje, "success");
            }
           }, function(){

           });

        }

        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
            function(m,key,value) {
              vars[key] = value;
            });
            return vars;
          }
         
         
    }
})();