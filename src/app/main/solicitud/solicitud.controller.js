(function () {
    'use strict';

    angular
        .module('app.solicitud')
        .controller('SolicitudController', SolicitudController);

    /** @ngInject */
    function SolicitudController($scope, $mdDialog, $cookies, localStorageService, $state) {
        var vm = this;
        $scope.programaSeleccionado = localStorageService.get("detallePrograma");
        $scope.datosIniciales = localStorageService.get("datosIniciales");
        $scope.disabledComoTeEnteraste = true;
        
        $scope.programaSegundaOpcion = {
            modelo: null,
            opciones: []
        }

        $scope.datos = {
            email: "",
            name: "",
            lastName: "",
            mLastName: "",
            nationality: "",
            residenceCountry: "",
            gender: "",
            civilStatus: "",
            phoneHome: "",
            phoneOffice: "",
            cellphone: "",
            birthdate: "",
            street: "",
            outdoorNumber: "0",
            indoorNumber: "0",
            neighborhood: "",
            state: "",
            zipCode: "",
            facebook: "",
            skype: "",
            lastGrade: "",
            lastSchool: "",
            Password: "",
            Type_Id: 5,
            birth_country: "",
            birth_state: "",
            city: "",
            referrer:localStorageService.get("referrer"),
            Classification_Id: $scope.programaSeleccionado.Classification_Id,
            Program1_Id: $scope.programaSeleccionado.id,
            Program2_Id: $scope.programaSegundaOpcion.modelo ? $scope.programaSegundaOpcion.modelo : $scope.programaSeleccionado.id,
            How_Did_You_Find: " ",
            Other_How_Did_You_Find: "",
            status: 0,
            lead_id:$scope.programaSeleccionado.lead_id,
            leads:$scope.programaSeleccionado.leads
        };

        $scope.universidad = [];
        
        $scope.paises = {
            modelo: null,
            opciones: []
        };

        $scope.paisesnacimiento = {
            modelo: null,
            opciones: []
        };

        $scope.genero = {
            modelo: null,
            opciones: [{
                id: 1,
                name: "Masculino"
            },
            {
                id: 2,
                name: "Femenino"
            }]
        };

        $scope.edoCivil = {
            modelo: null,
            opciones: [{
                id: 1,
                name: "Soltero(a)"
            },
            {
                id: 2,
                name: "Casado(a)"
            },
            {
                id: 3,
                name: "Divorciado(a)"
            },
            {
                id: 4,
                name: "Viudo(a)"
            }]
        };

        $scope.programa = {
            modelo: null,
            opciones: []
        };

        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: false,
            responsive: true
        };

        vm.otros = otros;
 
        function otros(band) {
            $scope.disabledComoTeEnteraste = band;
        }

        vm.init = init;
        vm.buscaPrograma = buscaPrograma;

        $scope.estados = {
            modelo: null,
            opciones: []
        }

        $scope.estadosnacimiento = {
            modelo: null,
            opciones: []
        }

        vm.terminarSolicitud = terminarSolicitud;

        function terminarSolicitud(ev, data) {

            if ($scope.datos.email === undefined || $scope.datos.email == "") {
                swal("Atención", "Es importante que nos proporciones tu correo electrónico", "error");
                return false;
            }

            var objData = {
                "email": $scope.datos.email
            }

            var existe;
            $scope.saveResponse = {};
            var urlModal = "";
            $scope.programaSel = localStorageService.get("detallePrograma");

            AjaxCall("POST", URL_SERVIDOR + "/User/exists", objData, function (response) {
                $scope.saveResponse = response;
                
            }, function () {
                if ($scope.saveResponse.Codigo === "404") {
                    $mdDialog.show({
                        controller: function ($scope, $mdDialog, formWizardData) {

                            $scope.data = formWizardData;
                            $scope.ocultar = false;
                            $scope.acepta = false;
                            $scope.mensaje_envio="";

                            $scope.enviarInformacion = function (data) {

                                if ($scope.data.password === undefined) {
                                    swal("Atención", "Ingresa tu contraseña", "info");
                                    $scope.mensaje_envio="";
                                    return false;
                                }


                                if ($scope.data.repeatPass === undefined) {
                                    swal("Atención", "Repite la contraseña por favor", "info");
                                    $scope.mensaje_envio="";
                                    return false;
                                }



                                if ($scope.data.password != $scope.data.repeatPass) {
                                    swal("Atención", "Las contraseñas deben coincidir", "info");
                                    $scope.mensaje_envio="";
                                    return false;
                                }

                                // var date = new Date(data.birthdate);
                                // var nfecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();
                                // data.birthdate = nfecha;
                                if(data.birthdate === undefined || data.birthdate === ""){
                                    data.birthdate = moment(new Date("1900/01/01")).format('YYYY-MM-DD');
                                }else{
                                    data.birthdate = moment(new Date(data.birthdate)).format('YYYY-MM-DD');
                                }
                                $scope.mensaje_envio="Enviando la solicitud...";
                                
                                $scope.data.Password = $scope.data.password;
                                //$scope.closeDialog();
                                AjaxCall("POST", URL_SERVIDOR + '/Application',
                                    data, function (response) {
                                        
                                        if (response.Codigo == "201") {
                                            $scope.ocultar = true;


                                            
                                            /*CODIGO PARA MANDAR LEADS A APLICACIONES DE UNIVERSIDADES*/

                                            if(!(data.leads=="" || data.leads==null)){
                                                console.log("Si hay leads");
                                                if (data.leads=="ENYD"){
                                                    console.log("Si hay leads de ENYD" + data.lead_id);
                                                    var formData = {
                                                        //'authtoken': 'b37783f924bf68abf4b210119893268b',
                                                        //'scope': 'creatorapi',
                                                        'emailap': data.email,
                                                        //'dominio': 'FundacionBeca',
                                                        'nameAp': data.name,
                                                        'lastnameAp': data.lastName + ' ' + data.mLastName,
                                                        'phoneHomeAp': data.phoneHome,
                                                        'codi': data.lead_id
                                                    };

                                                    AjaxCall("POST", 'http://burticio.com/labs/FB/fundacionbecaback/public/index.php/Reports/leadsEnyd', formData, 
                                                        function (response) {
                                                            StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                                            setTimeout(function () {
                                                            location.href = ("pages/auth/login");
                                                                //$state.go('app.pages_auth_login');
                                                            }, 5000);//alert("EXITO");
                                                        },
                                                        function(response){
                                                            console.log("Segunda Funcion");
                                                            StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                                            setTimeout(function () {
                                                            location.href = ("pages/auth/login");
                                                                //$state.go('app.pages_auth_login');
                                                            }, 5000);//alert("EXITO");
                                                        },
                                                        function(jqXHR, exception){
                                                            var msg = '';
                                                            if (jqXHR.status === 0) {
                                                                msg = 'ERROR EN LA CONEXIÓN.';
                                                            } else if (jqXHR.status == 404) {
                                                                msg = 'Requested page not found. [404]';
                                                            } else if (jqXHR.status == 500) {
                                                                msg = 'ERROR DE RESPUESTA EN SERVIDOR [500]';
                                                            } else if (exception === 'parsererror') {
                                                                msg = 'Requested JSON parse failed.';
                                                            } else if (exception === 'timeout') {
                                                                msg = 'Time out error.';
                                                            } else if (exception === 'abort') {
                                                                msg = 'Ajax request aborted.';
                                                            } else {
                                                                msg = 'Error desconocido.\n' + jqXHR.responseText;
                                                            }
                                                            //StateMessage("Error", msg, "error");
                                                            console.log(msg + ":  " + jqXHR);
                                                            StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                                            setTimeout(function () {
                                                                location.href = ("pages/auth/login");
                                                                //$state.go('app.pages_auth_login');
                                                            }, 5000);//alert("EXITO");
                                                        });
                                                }//FIN DE CODIGO ENYD
                                            }else{
                                            /*FIN CODIGO PARA MANDAR LEADS A APLICACIONES DE UNIVERSIDADES*/

                                            StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                            setTimeout(function () {
                                                location.href = ("pages/auth/login");
                                                //$state.go('app.pages_auth_login');
                                                }, 5000);
                                            //$state.go('app.pages_auth_login');
                                            }   
                                        } else if (response.Codigo == "422") {
                                            StateMessage("Atención", response.mensaje, "info");
                                        }
                                    },function(response){
                                        console.log("Segunda Funcion");
                                        StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                        setTimeout(function () {
                                        location.href = ("pages/auth/login");
                                            //$state.go('app.pages_auth_login');
                                        }, 5000);//alert("EXITO");
                                    },function(jqXHR, exception){
                                        var msg = '';
                                        if (jqXHR.status === 0) {
                                            msg = 'ERROR EN LA CONEXIÓN.';
                                        } else if (jqXHR.status == 404) {
                                            msg = 'Requested page not found. [404]';
                                        } else if (jqXHR.status == 500) {
                                            msg = 'ERROR DE RESPUESTA EN SERVIDOR [500]';
                                        } else if (exception === 'parsererror') {
                                            msg = 'Requested JSON parse failed.';
                                        } else if (exception === 'timeout') {
                                            msg = 'Time out error.';
                                        } else if (exception === 'abort') {
                                            msg = 'Ajax request aborted.';
                                        } else {
                                            msg = 'Error desconocido.\n' + jqXHR.responseText;
                                        }
                                        //StateMessage("Error", msg, "error");
                                        console.log(msg + ":  " + jqXHR);
                                        StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                        setTimeout(function () {
                                            location.href = ("pages/auth/login");
                                            //$state.go('app.pages_auth_login');
                                        }, 5000);//alert("EXITO");
                                    });
                            };

                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            };
                        },
                        templateUrl: 'app/main/solicitud/html/formularioRegistro.html',
                        parent: angular.element('body'),
                        targetEvent: ev,
                        locals: {
                            formWizardData: data
                        },
                        clickOutsideToClose: true
                    });
                } else if ($scope.saveResponse.Codigo === "200") {

                    $mdDialog.show({
                        controller: function ($scope, $mdDialog, formWizardData) {
                            $scope.data = formWizardData;
                            $scope.mensaje_envio="";
                            $scope.enviarInformacion = function (data) {
                                // var date = new Date(data.birthdate);
                                // var nfecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();
                                // data.birthdate = nfecha;
                               // data.birthdate = nfecha;
                               $scope.mensaje_envio="Eviando la solicitud...";
                                if(data.birthdate === undefined || data.birthdate === ""){
                                    data.birthdate = moment(new Date("1900/01/01")).format('YYYY-MM-DD');
                                }else{
                                    data.birthdate = moment(new Date(data.birthdate)).format('YYYY-MM-DD');
                                }

                                AjaxCall("POST", URL_SERVIDOR + '/Application',
                                    data, function (response) {
                                        
                                        if (response.Codigo == "201") {

                                            
                                            StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                            setTimeout(function () {
                                                //location.href = ("/pages/auth/login");
                                                $state.go("app.pages_auth_login");
                                            }, 3000);
                                        } else if (response.Codigo == "422") {
                                            StateMessage("Atención", response.mensaje, "info");
                                        }
                                    },function(response){
                                        console.log("Segunda Funcion");
                                        StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                        setTimeout(function () {
                                        location.href = ("pages/auth/login");
                                            //$state.go('app.pages_auth_login');
                                        }, 5000);//alert("EXITO");
                                    },function(jqXHR, exception){
                                        var msg = '';
                                        if (jqXHR.status === 0) {
                                            msg = 'ERROR EN LA CONEXIÓN.';
                                        } else if (jqXHR.status == 404) {
                                            msg = 'Requested page not found. [404]';
                                        } else if (jqXHR.status == 500) {
                                            msg = 'ERROR DE RESPUESTA EN SERVIDOR [500]';
                                        } else if (exception === 'parsererror') {
                                            msg = 'Requested JSON parse failed.';
                                        } else if (exception === 'timeout') {
                                            msg = 'Time out error.';
                                        } else if (exception === 'abort') {
                                            msg = 'Ajax request aborted.';
                                        } else {
                                            msg = 'Error desconocido.\n' + jqXHR.responseText;
                                        }
                                        //StateMessage("Error", msg, "error");
                                        console.log(msg + ":  " + jqXHR);
                                        StateMessage("Felicidades", "Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                        setTimeout(function () {
                                            location.href = ("pages/auth/login");
                                            //$state.go('app.pages_auth_login');
                                        }, 5000);//alert("EXITO");
                                    });
                            };
                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            };
                        },
                        templateUrl: 'app/main/solicitud/html/formularioExiste.html',
                        parent: angular.element('body'),
                        targetEvent: ev,
                        locals: {
                            formWizardData: data
                        },
                        clickOutsideToClose: true
                    });
                }
            });
        }

        $scope.llenarComboEstado = function () {
            AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.datos.residenceCountry, null, function (response) {
                $scope.$apply(function () {
                    $scope.estados.opciones = response.datos;
                });
            }, function () { });
        }

        $scope.llenarComboEstadoNacimiento = function () {
            AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.datos.birth_country, null, function (response) {
                $scope.$apply(function () {
                    $scope.estadosnacimiento.opciones = response.datos;
                });
            }, function () { });
        }


        $scope.universidad2 = {
            modelo: null,
            opciones: []
        };

        $scope.pais2 = {
            modelo: null,
            opciones: []
        };

        $scope.tipo2 = {
            modelo: null,
            opciones: []
        };

        $scope.modalidad2 = {
            modelo: null,
            opciones: []
        };

        $scope.clasificacion2 = {
            modelo: null,
            opciones: []
        };


        function buscaPrograma() {

            var objData = {
                "university_id": $scope.universidad2.modelo,
                "country_id": $scope.pais2.modelo,
                "type_id": $scope.tipo2.modelo,
                "modality_id": $scope.modalidad2.modelo
            };

            AjaxCall("POST", URL_SERVIDOR + "/Program/search", objData, function (response) {
                $scope.$apply(function () {
                    $scope.programaSegundaOpcion.opciones = response.datos;
                    $scope.universidad2.opciones = response.filtros.universities;
                    $scope.pais2.opciones = response.filtros.countries;
                    $scope.clasificacion2.opciones = response.filtros.Program_Classifications;
                    $scope.tipo2.opciones = response.filtros.Program_Types;
                    $scope.modalidad2.opciones = response.filtros.Program_Modalities; 
                });
            }, function () {
                
            });
        }

        $scope.segundoPrograma = function () {
            $scope.datos.Program2_Id = $scope.programaSegundaOpcion.modelo;
        }

        $scope.borrarFiltros = function(){
            
            AjaxCall("GET", URL_SERVIDOR + "/availableFilters", null, function (response) {
                $scope.universidad2.opciones = response.datos.universities;
                $scope.pais2.opciones = response.datos.countries;
                $scope.clasificacion2.opciones = response.datos.Program_Classifications;
                $scope.tipo2.opciones = response.datos.Program_Types;
                $scope.modalidad2.opciones = response.datos.Program_Modalities;
            }, function () {
                $scope.clasificacion2.modelo = $scope.programaSeleccionado.Classification_Id;
            });
        }

        // $scope.buscarProgramasSegundaOpcion = function(){
        //     AjaxCall("GET", URL_SERVIDOR + "/Program", null, function (response) {
        //        $scope.$apply(function(){
        //         $scope.programaSegundaOpcion.opciones = response.datos;
        //        });
        //     }, function(){});
        // }

        $scope.aplicar = function () {
            
            AjaxCall("POST", URL_SERVIDOR + "/Application", $scope.datos, function (response) {
                
                if (response.Codigo == "422") {
                    swal("Atención", response.mensaje, "error");
                }
            }, function () {

            });
        }

        function init() {

            vm.buscaPrograma();
            AjaxCall("GET", URL_SERVIDOR + "/availableFilters", null, function (response) {
                $scope.universidad2.opciones = response.datos.universities;
                $scope.pais2.opciones = response.datos.countries;
                $scope.clasificacion2.opciones = response.datos.Program_Classifications;
                $scope.tipo2.opciones = response.datos.Program_Types;
                $scope.modalidad2.opciones = response.datos.Program_Modalities;
            }, function () {
                $scope.clasificacion2.modelo = $scope.programaSeleccionado.Classification_Id;
            });

            AjaxCall("GET", URL_SERVIDOR + "/University", null, function (response) {
                $scope.$apply(function () {
                    $scope.universidad = response.datos;
                });
            }, function () {

            });

            AjaxCall("GET", URL_SERVIDOR + "/Country", null, function (response) {
                $scope.$apply(function () {
                    $scope.paises.opciones = response.datos;
                    $scope.paisesnacimiento.opciones = response.datos;
                });
            }, function () {

            });

            AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                $scope.$apply(function () {
                    $scope.programa.opciones = response.datos;
                });
            }, function () {
                $scope.programa.modelo = $scope.programaSeleccionado.Classification_Id;
            });

            /*if($scope.datosIniciales.lleno == 1){
                $scope.datos.email= $scope.datosIniciales.email;
                $scope.datos.name= $scope.datosIniciales.nombre;
                $scope.datos.lastName= $scope.datosIniciales.primerApellido;
                $scope.datos.mLastName= $scope.datosIniciales.segundoApellido;
                $scope.datos.cellphone = $scope.datosIniciales.telefono;
            }*/

            // $scope.buscarProgramasSegundaOpcion()
        }

        vm.init();

    }


})();
