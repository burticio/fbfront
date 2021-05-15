(function () {
    'use strict';

    angular
        .module('app.catalogos.programa')
        .controller('ProgramaController', ProgramaController);

    /** @ngInject */
    function ProgramaController($scope, $mdDialog, localStorageService, msNavigationService,$state) {
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
        }else if (localStorageService.get("session_typeId") == 9) {//OPERADOR VISTA
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador_universidad');
        }


        if (localStorageService.get("session_typeId") == 3) {
            msNavigationService.deleteItem('apps');
        }

        if (localStorageService.get("session_typeId") == 2) {

            msNavigationService.deleteItem('busquedaPrograma');
            msNavigationService.deleteItem("inicio_solicitante");
            msNavigationService.deleteItem("inicio_comite");
            msNavigationService.deleteItem("inicio_operador");
        }


        $scope.programas = [];
        $scope.uType = localStorageService.get("session_typeId");


        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: true,
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

        $scope.programas = {};

        $scope.universidad = {
            modelo: null,
            opciones: []
        };

        $scope.pais = {
            modelo: null,
            opciones: []
        };

        $scope.tipo = {
            modelo: null,
            opciones: []
        };

        $scope.modalidad = {
            modelo: null,
            opciones: []
        };

        $scope.clasificacion = {
            modelo: null,
            opciones: []
        };

        $scope.activo = 99;


        vm.init = init;

        vm.agregarPrograma = agregarPrograma;
        vm.editarPrograma = editarPrograma;
        vm.eliminarPrograma = eliminarPrograma;
        vm.modificacionMasiva = modificacionMasiva;

        vm.buscarPrograma = buscarPrograma;

        vm.borrarFiltros = borrarFiltros;

        function borrarFiltros(){
            $scope.clasificacion.modelo = 0;
                $scope.universidad.modelo = 0;
                $scope.pais.modelo = 0;                
                $scope.tipo.modelo = 0;
                $scope.modalidad.modelo = 0;
                $scope.activo = 99;
                $scope.programas ={};
                AjaxCall("GET", URL_SERVIDOR + "/availableFilters", null, function (response) {
                    $scope.universidad.opciones = response.datos.universities;
                    $scope.pais.opciones = response.datos.countries;
                    $scope.clasificacion.opciones = response.datos.Program_Classifications;
                    $scope.tipo.opciones = response.datos.Program_Types;
                    $scope.modalidad.opciones = response.datos.Program_Modalities;
                }, function () {
                    
                });
        }

        function buscarPrograma() {

            var filtrar = Number($scope.universidad.modelo)+Number($scope.pais.modelo)+Number($scope.tipo.modelo)+Number($scope.modalidad.modelo)+Number($scope.clasificacion.modelo);

            if(filtrar>0){

                vm.mostrarCargando();
                var objData = {
                    "university_id": $scope.universidad.modelo ? $scope.universidad.modelo : 0,
                    "country_id": $scope.pais.modelo ? $scope.pais.modelo : 0,
                    "type_id": $scope.tipo.modelo ? $scope.tipo.modelo : 0,
                    "modality_id": $scope.modalidad.modelo ? $scope.modalidad.modelo : 0,
                    "classification_id": $scope.clasificacion.modelo ? $scope.clasificacion.modelo : 0,
                    "active": $scope.activo
                }

                AjaxCall("POST", URL_SERVIDOR + "/Program/AdminFilter", objData, function (response) {
                    if (response.Codigo == "422") {
                        swal("Atención", response.mensaje, "info");
                    } else {
                        $scope.programas = response.datos;
                        $scope.universidad.opciones = response.filtros.universities;
                        $scope.pais.opciones = response.filtros.countries;
                        $scope.clasificacion.opciones = response.filtros.Program_Classifications;
                        $scope.tipo.opciones = response.filtros.Program_Types;
                        $scope.modalidad.opciones = response.filtros.Program_Modalities;
                    }
                }, function () {
                    $scope.$apply(function () {
                        for (var i = 0; i < $scope.programas.length; i++) {
                            $scope.programas[i].chkEdicion = false;
                        }
                        vm.cerrarCargando();

                    });

                });
            }

        }
 
        function modificacionMasiva(ev, data) {
            data = $scope.programas;
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;
                    //$scope.textoactivo = "Sin modificación"
                    $scope.btnModificacionMasiva = true;
                    $scope.programasSeleccionados = 0;

                    for (var i = 0; i < $scope.data.length; i++) {
                        if ($scope.data[i].chkEdicion) {
                            $scope.programasSeleccionados = $scope.programasSeleccionados + 1;
                        }
                    }
                    if ($scope.programasSeleccionados > 0) {
                        $scope.btnModificacionMasiva = false;
                    }

                    $scope.monedas = {
                        modelo: null,
                        opciones: []
                    };

                    AjaxCall("GET", URL_SERVIDOR + "/Coin", null, function (response) {
                        $scope.monedas.opciones = response.datos;
                    }, function () {
                        $scope.monedas.modelo = 0;
                    });

                    $scope.periodo_duracion = {
                        modelo: null,
                        opciones: [
                            {id: "H",name: "Horas"},
                            {id: "S",name: "Semanas"},
                            {id: "D",name: "Días"},
                            {id: "M",name: "Meses"}
                        ]
                    };

                    $scope.ocultar_meses = true;

                    $scope.meses_inicio = [
                        {id:1,mes:"Ene",meslargo:"Enero",selec:false},
                        {id:2,mes:"Feb",meslargo:"Febrero",selec:false},
                        {id:3,mes:"Mar",meslargo:"Marzo",selec:false},
                        {id:4,mes:"Abr",meslargo:"Abril",selec:false},
                        {id:5,mes:"May",meslargo:"Mayo",selec:false},
                        {id:6,mes:"Jun",meslargo:"Junio",selec:false},
                        {id:7,mes:"Jul",meslargo:"Julio",selec:false},
                        {id:8,mes:"Ago",meslargo:"Agosto",selec:false},
                        {id:9,mes:"Sep",meslargo:"Septiembre",selec:false},
                        {id:10,mes:"Oct",meslargo:"Octubre",selec:false},
                        {id:11,mes:"Nov",meslargo:"Noviembre",selec:false},
                        {id:12,mes:"Dic",meslargo:"Diciembre",selec:false},
                    ]

                    $scope.meses_selec = [];

                    $scope.datesString="";

                    $scope.enviarInformacion = function () {
                        
                        if ($scope.data.Start_Date !== undefined) {
                            //$scope.date = new Date($scope.data.Start_Date);
                            //$scope.date = $scope.date.toISOString().substring(0, 10);
                            //$scope.date = $scope.date.toString();
                            $scope.date = moment(new Date($scope.data.Start_Date)).format('YYYY-MM-DD');


                        }

                        if ($scope.data.End_Date !== undefined) {
                            //$scope.date2 = new Date($scope.data.End_Date);
                            //$scope.date2 = $scope.date2.toISOString().substring(0, 10);
                            //$scope.date2 = $scope.date2.toString();
                            $scope.date2 = moment(new Date($scope.data.End_Date)).format('YYYY-MM-DD');
                        }

                        var arrIds = new Array();



                        for (var i = 0; i < $scope.data.length; i++) {
                            if ($scope.data[i].chkEdicion) {
                                arrIds.push($scope.data[i].id);
                            }
                        }

                        var objData = {
                            "Program_Cost": $scope.data.Program_Cost,
                            "Scholarship_Percentage": $scope.data.Scholarship_Percentage,
                            "TicketSupport": $scope.data.TicketSupport,
                            "settlement": $scope.data.settlement,
                            "fee": $scope.data.fee,
                            "Medical_Expenses": $scope.data.Medical_Expenses,
                            "notes": $scope.data.notes,
                            "Scholarship_Number": $scope.data.Scholarship_Number,
                            "active": $scope.data.active,
                            "duration": $scope.data.duration,
                            "duration_period": $scope.periodo_duracion.modelo,
                            "all_months": $scope.data.all_months,
                            "dates":$scope.datesString,
                            "ids": arrIds
                        };
                        

                        AjaxCall("POST", URL_SERVIDOR + "/Program/BatchUpdate", objData, function (response) {
                            if (response.Codigo == "201") {
                                swal("Atención", response.mensaje, "success");
                                vm.buscarPrograma();
                            }
                        }, function () {
                            vm.init();
                            $scope.closeDialog();
                        });
                    };

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };

                    $scope.actualizaFechas = function(item) {
                        //document.getElementById('Dates').value="";
                        //var idx = $scope.meses_selec.indexOf(item);
                        var idx =-1;
                        for(i=0;i<$scope.meses_selec.length;i++){
                            if ($scope.meses_selec[i].id==item.id) {
                              //$scope.meses_selec.splice(i, 1);
                              idx=i;
                              break;
                            }
                        }
                        if (idx > -1) {
                          $scope.meses_selec.splice(idx, 1);
                        }
                        else {
                          $scope.meses_selec.push(item);
                        }
                        var dur = document.getElementById('Duration').value;
                        //var dur = $scope.data.Duration;
                        //console.log("Duracion: " + dur);
                        if($scope.periodo_duracion.modelo=="D"){
                            dur = Math.floor(dur/30)+1;
                        }else if($scope.periodo_duracion.modelo=="S"){
                            dur = Math.floor(dur/4)+1;
                        }else if($scope.periodo_duracion.modelo=="H"){
                            dur = document.getElementById('Duration_m').value;
                        }
                        //console.log(dur);
                        var fechas =[];
                        for(var i=0;i<$scope.meses_selec.length;i++){
                            //console.log($scope.meses_inicio[i].mes + " " + $scope.meses_inicio[i].selec);
                            fechas.push({start_n:$scope.meses_selec[i].id,start_t:$scope.meses_selec[i].meslargo,finish_n:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).numero,finish_t:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).texto});
                        }
                        //console.log(fechas);
                        $scope.datesString=JSON.stringify(fechas);
                    }

                    $scope.actualizaFechasGuardar = function(){
                        var dur = document.getElementById('Duration').value;
                        //var dur = $scope.data.Duration;
                        //console.log("Duracion: " + dur);
                        if($scope.periodo_duracion.modelo=="D"){
                            dur = Math.floor(dur/30)+1;
                        }else if($scope.periodo_duracion.modelo=="S"){
                            dur = Math.floor(dur/4)+1;
                        }else if($scope.periodo_duracion.modelo=="H"){
                            dur = document.getElementById('Duration_m').value;
                        }
                        //console.log(dur);
                        var fechas =[];
                        for(var i=0;i<$scope.meses_selec.length;i++){
                            //console.log($scope.meses_inicio[i].mes + " " + $scope.meses_inicio[i].selec);
                            fechas.push({start_n:$scope.meses_selec[i].id,start_t:$scope.meses_selec[i].meslargo,finish_n:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).numero,finish_t:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).texto});
                        }
                        //console.log(fechas);
                        $scope.datesString=JSON.stringify(fechas);
                    }

                    $scope.calculaFechaFin = function(inicio, duracion){
                        //console.log("inicio: " + inicio);
                        //console.log("duracion: " + duracion);
                        var fin = (inicio+duracion) % 12;

                        //console.log("fin: " + fin);
                        if(fin==0){ 
                            fin=12;
                        }

                        var fin_t ="";

                        switch(fin){
                            case 1: fin_t="Enero";break;
                            case 2: fin_t="Ferero";break;
                            case 3: fin_t="Marzo";break;
                            case 4: fin_t="Abril";break;
                            case 5: fin_t="Mayo";break;
                            case 6: fin_t="Junio";break;
                            case 7: fin_t="Julio";break;
                            case 8: fin_t="Agosto";break;
                            case 9: fin_t="Septiembre";break;
                            case 10: fin_t="Octubre";break;
                            case 11: fin_t="Noviembre";break;
                            case 12: fin_t="Diciembre";break;
                        }

                        //var fin_t = $scope.meses_inicio.find(x => x.id === fin).meslargo;
                        return {numero:fin,texto:fin_t};
                    }

                    $scope.mostrarMeses = function(){
                        if($scope.data.duration>0 && $scope.periodo_duracion.modelo!=null){
                            if($scope.periodo_duracion.modelo=="H"){
                                if(document.getElementById('Duration_m').value==0){
                                    $scope.ocultar_meses=true;
                                }else{
                                    $scope.ocultar_meses=false;
                                }
                            }else{
                                $scope.ocultar_meses=false;
                            }
                        }
                    };
                },
                templateUrl: 'app/main/catalogos/programa/html/formularioModificacionMasiva.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        $scope.chkTodos = false;

        $scope.seleccionarTodos = function () {

            for (var i = 0; i < $scope.programas.length; i++) {
                if ($scope.programas[i].chkEdicion) {
                    $scope.programas[i].chkEdicion = false;
                } else {
                    $scope.programas[i].chkEdicion = true;
                }
            }
        }

        function eliminarPrograma(moneda) {
            AjaxCall("POST", URL_SERVIDOR + "/Program/delete/" + moneda.id, null, function (response) {
                if (response.Codigo == "200") {
                    StateMessage("Atención", "Programa eliminado correctamente", "success");
                    vm.buscarPrograma();
                    vm.init();
                }
            });
        }

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

        function agregarPrograma(ev, data) {

            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.dataProgram = formWizardData;
                    $scope.active = false;
                    $scope.monedas = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.areas = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.subAreas = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.universidad = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.tipo = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.clasificacion = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.pais = {
                        modelo: null,
                        opciones: []
                    };

                    // $scope.estado = {
                    //     modelo: null,
                    //     opciones:[]
                    // };

                    $scope.universidad = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.modalidad = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.periodo_duracion = {
                        modelo: "M",
                        opciones: [
                            {id: "H",name: "Horas"},
                            {id: "S",name: "Semanas"},
                            {id: "D",name: "Días"},
                            {id: "M",name: "Meses"}
                        ]
                    };

                    $scope.ocultar_meses = true;

                    $scope.meses_inicio = [
                        {id:1,mes:"Ene",meslargo:"Enero",selec:false},
                        {id:2,mes:"Feb",meslargo:"Febrero",selec:false},
                        {id:3,mes:"Mar",meslargo:"Marzo",selec:false},
                        {id:4,mes:"Abr",meslargo:"Abril",selec:false},
                        {id:5,mes:"May",meslargo:"Mayo",selec:false},
                        {id:6,mes:"Jun",meslargo:"Junio",selec:false},
                        {id:7,mes:"Jul",meslargo:"Julio",selec:false},
                        {id:8,mes:"Ago",meslargo:"Agosto",selec:false},
                        {id:9,mes:"Sep",meslargo:"Septiembre",selec:false},
                        {id:10,mes:"Oct",meslargo:"Octubre",selec:false},
                        {id:11,mes:"Nov",meslargo:"Noviembre",selec:false},
                        {id:12,mes:"Dic",meslargo:"Diciembre",selec:false},
                    ]

                    $scope.meses_selec = [];

                    $scope.datesString="";

                    $scope.buscaEscuela = function () {
                        AjaxCall("GET", URL_SERVIDOR + "/University/getByCountry/" + $scope.pais.modelo, null, function (response) {
                            $scope.universidad.opciones = response.datos;
                        }, function () {
                            $scope.universidad.modelo = 0;
                        });
                    }

                    $scope.actualizaFechas = function(item) {
                        //document.getElementById('Dates').value="";
                        //var idx = $scope.meses_selec.indexOf(item);
                        var idx =-1;
                        for(i=0;i<$scope.meses_selec.length;i++){
                            if ($scope.meses_selec[i].id==item.id) {
                              //$scope.meses_selec.splice(i, 1);
                              idx=i;
                              break;
                            }
                        }
                        if (idx > -1) {
                          $scope.meses_selec.splice(idx, 1);
                        }
                        else {
                          $scope.meses_selec.push(item);
                        }
                        var dur = document.getElementById('Duration').value;
                        //var dur = $scope.data.Duration;
                        //console.log("Duracion: " + dur);
                        if($scope.periodo_duracion.modelo=="D"){
                            dur = Math.floor(dur/30)+1;
                        }else if($scope.periodo_duracion.modelo=="S"){
                            dur = Math.floor(dur/4)+1;
                        }else if($scope.periodo_duracion.modelo=="H"){
                            dur = document.getElementById('Duration_m').value;
                        }
                        //console.log(dur);
                        var fechas =[];
                        for(var i=0;i<$scope.meses_selec.length;i++){
                            //console.log($scope.meses_inicio[i].mes + " " + $scope.meses_inicio[i].selec);
                            fechas.push({start_n:$scope.meses_selec[i].id,start_t:$scope.meses_selec[i].meslargo,finish_n:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).numero,finish_t:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).texto});
                        }
                        //console.log(fechas);
                        $scope.datesString=JSON.stringify(fechas);
                    }

                    $scope.actualizaFechasGuardar = function(){
                        var dur = document.getElementById('Duration').value;
                        //var dur = $scope.data.Duration;
                        //console.log("Duracion: " + dur);
                        if($scope.periodo_duracion.modelo=="D"){
                            dur = Math.floor(dur/30)+1;
                        }else if($scope.periodo_duracion.modelo=="S"){
                            dur = Math.floor(dur/4)+1;
                        }else if($scope.periodo_duracion.modelo=="H"){
                            dur = document.getElementById('Duration_m').value;
                        }
                        //console.log(dur);
                        var fechas =[];
                        for(var i=0;i<$scope.meses_selec.length;i++){
                            //console.log($scope.meses_inicio[i].mes + " " + $scope.meses_inicio[i].selec);
                            fechas.push({start_n:$scope.meses_selec[i].id,start_t:$scope.meses_selec[i].meslargo,finish_n:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).numero,finish_t:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).texto});
                        }
                        //console.log(fechas);
                        $scope.datesString=JSON.stringify(fechas);
                    }

                    $scope.calculaFechaFin = function(inicio, duracion){
                        //console.log("inicio: " + inicio);
                        //console.log("duracion: " + duracion);
                        var fin = (inicio+duracion) % 12;

                        //console.log("fin: " + fin);
                        if(fin==0){ 
                            fin=12;
                        }

                        var fin_t ="";

                        switch(fin){
                            case 1: fin_t="Enero";break;
                            case 2: fin_t="Ferero";break;
                            case 3: fin_t="Marzo";break;
                            case 4: fin_t="Abril";break;
                            case 5: fin_t="Mayo";break;
                            case 6: fin_t="Junio";break;
                            case 7: fin_t="Julio";break;
                            case 8: fin_t="Agosto";break;
                            case 9: fin_t="Septiembre";break;
                            case 10: fin_t="Octubre";break;
                            case 11: fin_t="Noviembre";break;
                            case 12: fin_t="Diciembre";break;
                        }

                        //var fin_t = $scope.meses_inicio.find(x => x.id === fin).meslargo;
                        return {numero:fin,texto:fin_t};
                    }

                    $scope.mostrarMeses = function(){
                        if($scope.data.duration>0 && $scope.periodo_duracion.modelo!=null){
                            if($scope.periodo_duracion.modelo=="H"){
                                if(document.getElementById('Duration_m').value==0){
                                    $scope.ocultar_meses=true;
                                }else{
                                    $scope.ocultar_meses=false;
                                }
                            }else{
                                $scope.ocultar_meses=false;
                            }
                        }
                    }

                    $scope.buscaTipoPrograma = function () {
                        var objData = {
                            "Classification_Id": $scope.clasificacion.modelo
                        }
                        AjaxCall("POST", URL_SERVIDOR + "/ProgramType/getByClassification", objData, function (response) {
                            $scope.tipo.opciones = response.datos;
                        }, function () {
                            $scope.tipo.modelo = 0;
                        });
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.clasificacion.opciones = response.datos;
                    }, function () {
                        $scope.clasificacion.modelo = 0;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramModality", null, function (response) {
                        $scope.modalidad.opciones = response.datos;
                    }, function () {
                        $scope.modalidad.modelo = 0;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/Coin", null, function (response) {
                        $scope.monedas.opciones = response.datos;
                    }, function () {
                        $scope.monedas.modelo = 0;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramArea", null, function (response) {
                        $scope.areas.opciones = response.datos;
                    }, function () {
                        $scope.areas.modelo = 0;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramSubarea", null, function (response) {
                        $scope.subAreas.opciones = response.datos;
                    }, function () {
                        $scope.subAreas.modelo = 0;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/Country", null, function (response) {
                        $scope.pais.opciones = response.datos;
                    }, function () {
                        $scope.pais.modelo = 0;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/University", null, function (response) {
                        $scope.universidad.opciones = response.datos;
                    }, function () {
                        $scope.universidad.modelo = 0;
                    });

                    // $scope.buscaEstado = function(){
                    //     AjaxCall("GET", URL_SERVIDOR + "/State", null, function(response){
                    //         $scope.estado.opciones = response.datos;
                    //     }, function(){ 
                    //         $scope.estado.modelo = 0;  
                    //     });
                    // }

                    $scope.enviarInformacion = function () {

                        $scope.actualizaFechasGuardar();

                        if ($scope.data.Start_Date !== undefined) {
                            $scope.date = moment(new Date($scope.data.Start_Date)).format('YYYY-MM-DD');
                            /*$scope.date = new Date($scope.data.Start_Date);
                            $scope.date = $scope.date.toISOString().substring(0, 10);
                            $scope.date = $scope.date.toString();*/
                        }

                        if ($scope.data.End_Date !== undefined) {
                            $scope.date2 = moment(new Date($scope.data.End_Date)).format('YYYY-MM-DD');
                            /*$scope.date2 = new Date($scope.data.End_Date);
                            $scope.date2 = $scope.date2.toISOString().substring(0, 10);
                            $scope.date2 = $scope.date2.toString();*/
                        }

                        if ($scope.data === undefined) {
                            swal("Atención", "Falta datos", "info");
                            return false;
                        }

                        if ($scope.data.ProgramName === undefined) {
                            swal("Atención", "Falta datos: Nombre del Programa", "info");
                            return false;
                        }

                        if ($scope.data.Program_Cost === undefined) {
                            swal("Atención", "Falta datos: Costo del Programa", "info");
                            return false;
                        }

                        if ($scope.data.Scholarship_Percentage === undefined) {
                            swal("Atención", "Falta datos: Porcentaje de beca", "info");
                            return false;
                        }
                        if ($scope.data.fee === undefined) {
                            swal("Atención", "Falta datos: Comisión", "info");
                            return false;
                        }
                        $scope.templateBro = "";
                        $scope.templateBroForm = "";
                        //var file = document.getElementById('documentFile').files;
                        var inputid = 'documentFile';
                        var idProceso = 4000;
                        //var files = file;
                        //var nombreArchivo = "";
                        var archivos = new Array();

                        /*if (files.length > 0) {
                            for (var i = 0; i < files.length; i++) {
                                if (files[i].type === "application/msword" ||
                                    files[i].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                    files[i].type === "application/vnd.ms-excel" ||
                                    files[i].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                    files[i].type === "image/png" ||
                                    files[i].type === "image/jpeg" ||
                                    files[i].type === "image/jpg" ||
                                    files[i].type === "application/pdf") {
                                    nombreArchivo = "<b>" + files[i].name + "</b>";
                                } else {
                                    swal("Atención", "Solamente puedes seleccionar archivos pdf|doc|docx|xlsx|xls|png|jpeg|jpg|pdf", "error");
                                    $scope.disabledBoton = false;
                                    return false;
                                }
                            }

                            if (files[0].type === "application/msword" ||
                                files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                files[0].type === "application/vnd.ms-excel" ||
                                files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                files[0].type === "image/png" ||
                                files[0].type === "image/jpeg" ||
                                files[0].type === "image/jpg" ||
                                files[0].type === "application/pdf") {
                                for (var j = 0; j < files.length; j++) {
                                    var _file = files[j];
                                    var picReader = new FileReader();
                                    picReader.addEventListener("load", function (event) {
                                        var base64 = event.target.result;
                                        var formatoDoc = _file.type.split("/")[1];
                                        $scope.templateBroForm = formatoDoc;
                                        $scope.templateBro = base64.split(",")[1];
                                    }, false);
                                    picReader.readAsDataURL(_file);
                                }
                            }
                        }*/

                        var objData = {
                            "ProgramName": $scope.data.ProgramName,
                            "Program_Cost": $scope.data.Program_Cost,
                            "Coin": $scope.monedas.modelo,
                            "Scholarship_Percentage": $scope.data.Scholarship_Percentage,
                            "Start_Date": "2019-01-01",
                            "End_Date": "2019-01-01",
                            "TicketSupport": $scope.data.TicketSupport ?  $scope.data.TicketSupport : 0,
                            "settlement": $scope.data.settlement ?  $scope.data.settlement : 0,
                            "fee": $scope.data.fee ?  $scope.data.fee : 0,
                            "Medical_Expenses": $scope.data.Medical_Expenses ? $scope.data.Medical_Expenses : 0,
                            "Scholarship_Number": $scope.data.Scholarship_Number,
                            "University_Id": $scope.universidad.modelo,
                            "Country_Id": $scope.pais.modelo,
                            "Type_Id": $scope.tipo.modelo,
                            "Modality_Id": $scope.modalidad.modelo,
                            "Area_Id": $scope.areas.modelo,
                            "Subarea_Id": $scope.subAreas.modelo,
                            "state": 0,
                            "active": $scope.data.active,
                            "Brochure":$scope.data.Brochure,
                            "file_format": " ",
                            "notes":$scope.data.notes,
                            "duration":$scope.data.duration,
                            "duration_period":$scope.periodo_duracion.modelo,
                            "dates":$scope.datesString,
                            "all_months":$scope.data.all_months
                        };

                        AjaxCall("POST", URL_SERVIDOR + '/Program',
                            objData, function (response) {
                                if (response.Codigo == "201") {
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.buscarPrograma();

                                } else if (response.Codigo == "422") {
                                    StateMessage("Atención", response.mensaje, "info");

                                }
                            });
                    };

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/catalogos/programa/html/formularioPrograma.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function editarPrograma(ev, data) {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {

                    $scope.data = formWizardData;
                    
                    $scope.monedas = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.areas = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.subAreas = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.universidad = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.tipo = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.clasificacion = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.pais = {
                        modelo: null,
                        opciones: []
                    };

                    // $scope.estado = {
                    //     modelo: null,
                    //     opciones:[]
                    // };

                    $scope.universidad = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.modalidad = {
                        modelo: null,
                        opciones: []
                    };

                    $scope.periodo_duracion = {
                        modelo: "M",
                        opciones: [
                            {id: "H",name: "Horas"},
                            {id: "S",name: "Semanas"},
                            {id: "D",name: "Días"},
                            {id: "M",name: "Meses"}
                        ]
                    };

                    $scope.ocultar_meses = false;

                    $scope.meses_inicio = [
                        {id:1,mes:"Ene",meslargo:"Enero",selec:false},
                        {id:2,mes:"Feb",meslargo:"Febrero",selec:false},
                        {id:3,mes:"Mar",meslargo:"Marzo",selec:false},
                        {id:4,mes:"Abr",meslargo:"Abril",selec:false},
                        {id:5,mes:"May",meslargo:"Mayo",selec:false},
                        {id:6,mes:"Jun",meslargo:"Junio",selec:false},
                        {id:7,mes:"Jul",meslargo:"Julio",selec:false},
                        {id:8,mes:"Ago",meslargo:"Agosto",selec:false},
                        {id:9,mes:"Sep",meslargo:"Septiembre",selec:false},
                        {id:10,mes:"Oct",meslargo:"Octubre",selec:false},
                        {id:11,mes:"Nov",meslargo:"Noviembre",selec:false},
                        {id:12,mes:"Dic",meslargo:"Diciembre",selec:false},
                    ]

                    $scope.meses_selec = [];

                    $scope.fechas_guardadas = JSON.parse($scope.data.dates);

                    $scope.datesString=$scope.data.dates;

                    if (parseInt($scope.data.Medical_Expenses) == 1) {
                        $scope.data.Medical_Expenses = true;
                    }

                    if (parseInt($scope.data.active) == 1) {
                        $scope.data.active = true;
                    }
                    //console.log($scope.data.active);

                    //$scope.data.active = parseInt($scope.data.active);

                    if (parseInt($scope.data.all_months) == 1){
                        $scope.data.all_months= true;
                    }

                    $scope.data.duration = parseInt($scope.data.duration);
                    $scope.periodo_duracion.modelo=$scope.data.duration_period;

                    for(var i=0; i<$scope.fechas_guardadas.length;i++){
                        $scope.meses_selec.push({id:$scope.fechas_guardadas[i].start_n,mes:$scope.fechas_guardadas[i].start_t.substring(0,3),meslargo:$scope.fechas_guardadas[i].start_t,selec:true});
                        $scope.meses_inicio[$scope.fechas_guardadas[i].start_n-1].selec=true;
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.clasificacion.opciones = response.datos;
                    }, function () {
                        $scope.clasificacion.modelo = $scope.data.Classification_Id;
                        var objData = {
                            "Classification_Id": $scope.clasificacion.modelo
                        }
                        AjaxCall("POST", URL_SERVIDOR + "/ProgramType/getByClassification", objData, function (response) {
                            $scope.tipo.opciones = response.datos;
                        }, function () {
                            $scope.tipo.modelo = $scope.data.Type_Id;
                        });
                    });

                    $scope.actualizaFechas = function(item) {
                        //document.getElementById('Dates').value="";
                        //$scope.datesString="";

                        var idx =-1;
                        for(i=0;i<$scope.meses_selec.length;i++){
                            if ($scope.meses_selec[i].id==item.id) {
                              //$scope.meses_selec.splice(i, 1);
                              idx=i;
                              break;
                            }
                        }
                        //var idx = $scope.meses_selec.indexOf(i);
                        if (idx > -1) {
                          $scope.meses_selec.splice(idx, 1);
                        }
                        else {
                          $scope.meses_selec.push(item);
                        }
                        var dur = document.getElementById('Duration').value;
                        //var dur = $scope.data.Duration;
                        //console.log("Duracion: " + dur);
                        if($scope.periodo_duracion.modelo=="D"){
                            dur = Math.floor(dur/30)+1;
                        }else if($scope.periodo_duracion.modelo=="S"){
                            dur = Math.floor(dur/4)+1;
                        }else if($scope.periodo_duracion.modelo=="H"){
                            dur = document.getElementById('Duration_m').value;
                        }
                        //console.log(dur);
                        var fechas =[];
                        for(var i=0;i<$scope.meses_selec.length;i++){
                            //console.log($scope.meses_inicio[i].mes + " " + $scope.meses_inicio[i].selec);
                            fechas.push({start_n:$scope.meses_selec[i].id,start_t:$scope.meses_selec[i].meslargo,finish_n:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).numero,finish_t:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).texto});
                        }
                        //console.log(fechas);
                        $scope.datesString=JSON.stringify(fechas);
                    }

                    $scope.actualizaFechasGuardar = function(){
                        var dur = document.getElementById('Duration').value;
                        //var dur = $scope.data.Duration;
                        //console.log("Duracion: " + dur);
                        if($scope.periodo_duracion.modelo=="D"){
                            dur = Math.floor(dur/30)+1;
                        }else if($scope.periodo_duracion.modelo=="S"){
                            dur = Math.floor(dur/4)+1;
                        }else if($scope.periodo_duracion.modelo=="H"){
                            dur = document.getElementById('Duration_m').value;
                        }
                        //console.log(dur);
                        var fechas =[];
                        for(var i=0;i<$scope.meses_selec.length;i++){
                            //console.log($scope.meses_inicio[i].mes + " " + $scope.meses_inicio[i].selec);
                            fechas.push({start_n:$scope.meses_selec[i].id,start_t:$scope.meses_selec[i].meslargo,finish_n:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).numero,finish_t:$scope.calculaFechaFin(parseInt($scope.meses_selec[i].id),parseInt(dur)).texto});
                        }
                        //console.log(fechas);
                        $scope.datesString=JSON.stringify(fechas);
                    }

                    $scope.calculaFechaFin = function(inicio, duracion){
                        //console.log("inicio: " + inicio);
                        //console.log("duracion: " + duracion);
                        var fin = (inicio+duracion) % 12;

                        //console.log("fin: " + fin);
                        if(fin==0){ 
                            fin=12;
                        }

                        var fin_t ="";

                        switch(fin){
                            case 1: fin_t="Enero";break;
                            case 2: fin_t="Ferero";break;
                            case 3: fin_t="Marzo";break;
                            case 4: fin_t="Abril";break;
                            case 5: fin_t="Mayo";break;
                            case 6: fin_t="Junio";break;
                            case 7: fin_t="Julio";break;
                            case 8: fin_t="Agosto";break;
                            case 9: fin_t="Septiembre";break;
                            case 10: fin_t="Octubre";break;
                            case 11: fin_t="Noviembre";break;
                            case 12: fin_t="Diciembre";break;
                        }

                        //var fin_t = $scope.meses_inicio.find(x => x.id === fin).meslargo;
                        return {numero:fin,texto:fin_t};
                    }

                    $scope.mostrarMeses = function(){
                        if($scope.data.Duration>0 && $scope.periodo_duracion.modelo!=null){
                            if($scope.periodo_duracion.modelo=="H"){
                                if(document.getElementById('Duration_m').value==0){
                                    $scope.ocultar_meses=true;
                                }else{
                                    $scope.ocultar_meses=false;
                                }
                            }else{
                                $scope.ocultar_meses=false;
                            }
                        }
                    }

                    $scope.buscaTipoPrograma = function () {
                        var objData = {
                            "Classification_Id": $scope.clasificacion.modelo
                        }
                        AjaxCall("POST", URL_SERVIDOR + "/ProgramType/getByClassification", objData, function (response) {
                            $scope.tipo.opciones = response.datos;
                        }, function () {
                            $scope.tipo.modelo = $scope.data.Type_Id;
                        });
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramModality", null, function (response) {
                        $scope.modalidad.opciones = response.datos;
                    }, function () {
                        $scope.modalidad.modelo = $scope.data.Modality_Id;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/Coin", null, function (response) {
                        $scope.monedas.opciones = response.datos;
                    }, function () {
                        $scope.monedas.modelo = $scope.data.Coin;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramArea", null, function (response) {
                        $scope.areas.opciones = response.datos;
                    }, function () {
                        $scope.areas.modelo = $scope.data.Area_Id;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramSubarea", null, function (response) {
                        $scope.subAreas.opciones = response.datos;
                    }, function () {
                        $scope.subAreas.modelo = $scope.data.Subarea_Id;
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/Country", null, function (response) {
                        $scope.pais.opciones = response.datos;
                    }, function () {
                        $scope.$apply(function () { $scope.pais.modelo = $scope.data.Country_Id; });
                    });

                    AjaxCall("GET", URL_SERVIDOR + "/University", null, function (response) {
                        $scope.universidad.opciones = response.datos;
                    }, function () {
                        $scope.$apply(function () { $scope.universidad.modelo = $scope.data.University_Id; });
                    });

                    //console.log($scope.fechas_guardadas);

                    // $scope.buscaEstado = function(){   
                    //     AjaxCall("GET", URL_SERVIDOR + "/State", null, function(response){
                    //         $scope.estado.opciones = response.datos;
                    //     }, function(){ 
                    //         $scope.estado.modelo = 0;  
                    //     });
                    // }



                    $scope.enviarInformacion = function () {
                        $scope.actualizaFechasGuardar();

                        if ($scope.data.Start_Date !== undefined) {
                            $scope.date = moment(new Date($scope.data.Start_Date)).format('YYYY-MM-DD');
                            /*$scope.date = new Date($scope.data.Start_Date);
                            $scope.date = $scope.date.toISOString().substring(0, 10);
                            $scope.date = $scope.date.toString();*/
                        }

                        if ($scope.data.End_Date !== undefined) {
                            $scope.date2 = moment(new Date($scope.data.End_Date)).format('YYYY-MM-DD');
                            /*$scope.date2 = new Date($scope.data.End_Date);
                            $scope.date2 = $scope.date2.toISOString().substring(0, 10);
                            $scope.date2 = $scope.date2.toString();*/
                        }

                        var objData = {
                            "ProgramName": $scope.data.ProgramName,
                            "Program_Cost": $scope.data.Program_Cost,
                            "Coin": $scope.monedas.modelo,
                            "Scholarship_Percentage": $scope.data.Scholarship_Percentage,
                            "Start_Date": "2019-01-01",
                            "End_Date": "2019-01-01",
                            "TicketSupport": $scope.data.TicketSupport,
                            "settlement": $scope.data.settlement,
                            "fee": $scope.data.fee,
                            "Medical_Expenses": $scope.data.Medical_Expenses,
                            "Scholarship_Number": $scope.data.Scholarship_Number,
                            "University_Id": $scope.universidad.modelo,
                            "Country_Id": $scope.pais.modelo,
                            "Type_Id": $scope.tipo.modelo,
                            "Modality_Id": $scope.modalidad.modelo,
                            "Area_Id": $scope.areas.modelo,
                            "Subarea_Id": $scope.subAreas.modelo,
                            "state": 0,
                            "active": $scope.data.active,
                            "Brochure": $scope.data.Brochure,
                            "notes":$scope.data.notes,
                            "duration":$scope.data.duration,
                            "duration_period":$scope.periodo_duracion.modelo,
                            "dates":$scope.datesString,
                            "all_months":$scope.data.all_aonths
                        };

                        AjaxCall("POST", URL_SERVIDOR + '/Program/update/' + $scope.data.id,
                            objData, function (response) {
                                StateMessage("Atención", "Se actualizó el programa correctamente", "success");
                                $scope.closeDialog();
                                vm.buscarPrograma();
                            });
                    };

                    $scope.closeDialog = function () {
                        init();
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/catalogos/programa/html/formularioPrograma.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function init() {
            $scope.activo=99;

            AjaxCall("GET", URL_SERVIDOR + "/availableFilters", null, function (response) {
                $scope.universidad.opciones = response.datos.universities;
                $scope.pais.opciones = response.datos.countries;
                $scope.clasificacion.opciones = response.datos.Program_Classifications;
                $scope.tipo.opciones = response.datos.Program_Types;
                $scope.modalidad.opciones = response.datos.Program_Modalities;
            }, function () {

            });


        }

        vm.init();

    }


})();
