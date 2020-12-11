(function ()
{
    'use strict';

    angular
        .module('app.catalogos.usuarios')
        .controller('UsuariosController', UsuariosController);

    /** @ngInject */
    function UsuariosController($scope, $mdDialog,localStorageService,$state) {
        var vm = this;
        if (localStorageService.get("session_typeId") == null) {
            //console.log("NINGUN LOGIN");
            location.replace("/pages/auth/login");
        }else if (localStorageService.get("session_typeId") == 2) {//SUPERVISOR
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_supervisor');
        }else if (localStorageService.get("session_typeId") == 3) {//COMITE
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_comite');
        }else if (localStorageService.get("session_typeId") == 4) {//OPERADOR
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador');
        }else if (localStorageService.get("session_typeId") == 5) {//SOLICITANTE
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_solicitante');
        }else if (localStorageService.get("session_typeId") == 6) {//SUPERUSUARIO
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_super');
        }else if (localStorageService.get("session_typeId") == 7) {//SUPERVISTA
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_super');
        }else if (localStorageService.get("session_typeId") == 8) {//OPERADOR VISTA
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador_vista');
        }

        $scope.usuarios = [];
        $scope.uType = localStorageService.get("session_typeId");

        vm.dtOptions =  {
            pagingType: 'full_numbers',
            autoWidth: false,
            pageLength: 10,
            dom: 'Bfrtip',
            buttons: [
              'print',
              'csv'
            ],
            responsive: true,
            language: {
              processing: "Procesando...",
              search: "Buscar:",
              lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
              info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
              infoEmpty: "Mostrando ningún elemento.",
              infoFiltered: "(filtrado _MAX_ elementos total)",
              infoPostFix: "",
              loadingRecords: "Cargando registros...",
              zeroRecords: "No se encontraron registros",
              emptyTable: "No hay datos disponibles en la tabla",
              paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
              },
              aria: {
                sortAscending: ": Activar para ordenar la tabla en orden ascendente",
                sortDescending: ": Activar para ordenar la tabla en orden descendente"
              }
            }
          };

        vm.init = init;
 
        vm.agregarUsuario = agregarUsuario;
        vm.editarUsuario = editarUsuario;
        vm.eliminarUsuario = eliminarUsuario;

        function eliminarUsuario(usuario){
            AjaxCall("POST", URL_SERVIDOR + "/User/delete/"+usuario.id,  null, function (response) {
                StateMessage("Atención","Usuario eliminado correctamentre","success");
                vm.init();
            });
        }

        function agregarUsuario(ev, data)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.data = formWizardData;
                     $scope.perfil={
                        modelo:null,
                        opciones:[]
                     };
                     $scope.editaPass= true;
                    AjaxCall("GET", URL_SERVIDOR + "/UserType",  null, function (response) {  
                        $scope.$apply(function(){
                            $scope.perfil.opciones = response.datos; 
                        });
                    }, function () {
                        $scope.perfil.modelo = 0; 
                    });
                    $scope.enviarInformacion= function ()
                    {  
                        // AjaxCall("POST",URL_SERVIDOR+ '/User',
                        //             $scope.data,function(response){
                        //            if(response.Codigo == "201"){
                        //                 StateMessage("Atención", response.mensaje, "success");
                        //                 $scope.closeDialog();
                        //                 vm.init(); 
                        //              }
                        //         });

                                ///setTimeout(function(){
                             
                            if($scope.data.password != $("#repeatPass").val()){
                                swal("Atención","Las contraseñas no coinciden","error");
                                return false;
                            }   

                            if( $scope.data.password === undefined){
                                $scope.data.password = null;
                            } 

                            var objData = {
                                "email": $scope.data.email,
                                "name": $scope.data.name,
                                "lastName": $scope.data.lastName,
                                "mLastName": $scope.data.mLastName,
                                "nationality": "mexicano",
                                "residenceCountry": "2",
                                "gender": "2",
                                "civilStatus": "3",
                                "phoneHome": "4774444444",
                                "phoneOffice": "4775555555",
                                "cellphone": "4779999999",
                                "birthdate": "1995-09-14",
                                "street": "Tuella",
                                "outdoorNumber": "123",
                                "indoorNumber": "2",
                                "neighborhood": "Agua Azul",
                                "state": "1",
                                "zipCode": "37297",
                                "facebook": " ",
                                "skype": " ",
                                "lastGrade": " ",
                                "lastSchool": " ",
                                "password":$scope.data.password,
                                "Type_Id": $scope.perfil.modelo
                                };

                                AjaxCall("POST", URL_SERVIDOR + "/Person",  objData, function (response) {  
                                if(response.Codigo == "201"){
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init(); 
                                    }else if(response.Codigo == "200"){
                                    StateMessage("Atención", response.mensaje, "info");                                          
                                    }
                                }, function () {
                                

                            });

                              //  },2000);
                             
                    };

                    $scope.closeDialog = function ()
                    {
                        
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/usuarios/html/formularioUsuario.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data
                },
                clickOutsideToClose: false
            });
        }

        function editarUsuario(ev, data)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                     
                    $scope.data = formWizardData;
                    // var ap = $scope.data.name.split(" ");
                    // $scope.data.name = ap[0];
                    // $scope.data.lastName = ap[1];
                    // $scope.data.mLastName = ap[2];
                    $scope.data.password ="";

                    $scope.perfil={
                        modelo:null,
                        opciones:[]
                     };
                    AjaxCall("GET", URL_SERVIDOR + "/UserType",  null, function (response) {  
                        $scope.$apply(function(){
                            $scope.perfil.opciones = response.datos; 
                        });
                    }, function () {
                        $scope.perfil.modelo = $scope.data.Type_Id; 
                    });
                    
                    $scope.enviarInformacion= function ()
                    {
                        if($scope.data.password != $("#repeatPass").val()){
                            swal("Atención","Las contraseñas no coinciden","error");
                            return false;
                        }  
                         
                        if($scope.data.name =="" ||
                        $scope.data.lastName =="" ||
                        $scope.data.mLastName =="" ||
                        $scope.data.email =="" ){
                            swal("Atención","Faltan campos por llenar","error");
                            return false;
                        }

                        if( $scope.data.password === undefined){
                            $scope.data.password = null;
                        } 

                        var actualiza = {
                            "name": $scope.data.name,
                            "lastName":$scope.data.lastName ,
                            "mLastName" :$scope.data.mLastName,
                            "email":$scope.data.email,
                            "Type_Id":$scope.perfil.modelo
                        }

                        if($scope.editaPass){

                            if($scope.data.password != $("#repeatPass").val()){
                                swal("Atención", "La contraseña no coincide", "error");
                                return false;
                            }

                            var actualizaPass ={
                                "email":$scope.data.email,
                                "password":$scope.data.password
                              };

                              AjaxCall("POST",URL_SERVIDOR+ '/User/changePassword',
                              actualizaPass,function(response){
                                   //if(response.Codigo == "201"){
                                       
                                   //  }
                                }); 
                        }

                        
                        //


                        AjaxCall("POST",URL_SERVIDOR+ '/User/update/'+$scope.data.id,
                                    actualiza,function(response){
                                   //if(response.Codigo == "201"){
                                        StateMessage("Atención", "Actualización exitosa", "success");
                                        $scope.closeDialog();
                                        vm.init(); 
                                   //  }
                                });
                    };

                    $scope.closeDialog = function ()
                    {
                        $scope.data.name += " " + $scope.data.lastName + " " + $scope.data.mLastName;
                         
                        init();
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/usuarios/html/formularioUsuario.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data
                },
                clickOutsideToClose: false
            });
        }


        function init(){
            vm.upload = false;
            AjaxCall("GET", URL_SERVIDOR + "/User",  null, function (response) {  
                $scope.$apply(function(){
                    $scope.usuarios = response.datos; 
                });
            }, function () {
                
            });
        }

        vm.init();

    }


})();
