(function () {
    'use strict';

    angular
        .module('app.orientacionVocacional')
        .controller('OrientacionVocacionalController', OrientacionVocacionalController);

    /** @ngInject */
    function OrientacionVocacionalController($scope, localStorageService, msNavigationService, $state, $mdDialog) {
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
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_operador');
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
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_operador_vista');
        }

        msNavigationService.deleteItem("inicio_supervisor");
        msNavigationService.deleteItem("inicio_comite");
        msNavigationService.deleteItem("inicio_solicitante");
        msNavigationService.deleteItem('apps');
        msNavigationService.deleteItem('busquedaPrograma');
        vm.formWizard = localStorageService.get("objOV");
        
        vm.init = init;
        $scope.orientacionVocacional = {};
        vm.terminarOv = false;

        var f = new Date();
        vm.formWizard.date_study = f.getFullYear() + "-" + zeroPad((f.getMonth() + 1)) + "-" + zeroPad(f.getDate());
        vm.sendForm = sendForm;

        $scope.terminarOrientacion = function (ev, data) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;


                    $scope.estatus = {
                        modelo: null,
                        opciones: [{
                            id: 3,
                            name: 'Continuar con el proceso'
                        },
                        {
                            id: 5,
                            name: 'Canalizar a estudia más'
                        },
                        {
                            id: 13,
                            name: 'Canalizar a otro programa'
                        },
                        {
                            id: 14,
                            name: 'Rechazar'
                        }]
                    };


                    $scope.enviarInformacion = function () {

                        var objData = {
                            "id": vm.formWizard.application_Id,
                            "status": $scope.estatus.modelo
                        };

                        AjaxCall("POST", URL_SERVIDOR + "/Application/VOStatus", objData, function (response) {

                            if (response.Codigo == "201") {
                                swal("Atención", response.mensaje, "success");
                                $mdDialog.hide();
                                $state.go("app.ver_orientacionV");
                            }
                        }, function () {

                        });

                    };

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/orientacionVocacional/html/modalCambiarEstatus.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function zeroPad(num) {
            return num.toString().padStart(2, "0");
        }

        function sendForm() {
            var objData = {
                "application_Id": localStorageService.get("objOV").id,
                "date_study": vm.formWizard.date_study ? vm.formWizard.date_study : '',
                "results_personality": vm.formWizard.results_personality ? vm.formWizard.results_personality : '',
                "results_inteligence": vm.formWizard.results_inteligence ? vm.formWizard.results_inteligence : '',
                "results_style_learning": vm.formWizard.results_style_learning ? vm.formWizard.results_style_learning : '',
                "results_qualities": vm.formWizard.results_qualities ? vm.formWizard.results_qualities : '',
                "results_areas_oportunity": vm.formWizard.results_areas_oportunity ? vm.formWizard.results_areas_oportunity : '',
                "results_recommendations": vm.formWizard.results_recommendations ? vm.formWizard.results_recommendations : '',
                "results_conclusions": vm.formWizard.results_conclusions ? vm.formWizard.results_conclusions : '',
                "results_vocational_orientation": vm.formWizard.results_vocational_orientation ? vm.formWizard.results_vocational_orientation : ''
            };


            AjaxCall("POST", URL_SERVIDOR + "/VocationalOrientation", objData, function (response) {
                if (response.Codigo == "202") {
                    swal("Atención", response.mensaje, "success");
                    vm.formWizard.application_Id = response.datos.application_Id
                    $scope.$apply(function () {
                        vm.terminarOv = true;
                    });
                }
            }, function () {

            });
        }

        function init() {
            var Application_Id = localStorageService.get("objOV").Vocational_Orientation_Id;

            if (Application_Id != null) {
                AjaxCall("GET", URL_SERVIDOR + "/VocationalOrientation/" + Application_Id, null, function (response) {
                    vm.formWizard = response.datos;
                }, function () {
                    vm.formWizard.Person_Name = localStorageService.get("objOV").Person_Name;
                    vm.formWizard.Person_lastName = localStorageService.get("objOV").Person_lastName;
                    vm.formWizard.Person_mLastName = localStorageService.get("objOV").Person_mLastName;
                    vm.formWizard.lastSchool = localStorageService.get("objOV").lastSchool;
                    vm.formWizard.lastGrade = localStorageService.get("objOV").lastGrade;
                    $scope.$apply(function () {
                        vm.terminarOv = true;
                    });
                });
            } else {
                vm.terminarOv = false;
            }

        };

        vm.init();
    }
})();
