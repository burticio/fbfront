(function () {
    'use strict';

    angular
        .module('app.solicitudv2')
        .controller('solicitudv2Controller', solicitudv2Controller);

    /** @ngInject */
    function solicitudv2Controller($scope, $mdDialog, $cookies, localStorageService, $state) {
        var vm = this;
        $scope.programaSeleccionado = localStorageService.get("detallePrograma");
        if ($scope.programaSeleccionado == null) {
            //console.log("NINGUN LOGIN");
            location.replace("https://fundacionbeca.net");
        }
        $scope.disabledComoTeEnteraste = true;
        
        $scope.programaSegundaOpcion = {
            modelo: null,
            opciones: []
        }

        $scope.person_id = 0;
        //$scope.maxScore = 10;
        $scope.solicitudValidada = false;

        $scope.mensaje="";

        $scope.datosPersona = {
            person_id: 0,
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
            skype: "",
            linkedin:"",
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
            How_Did_You_Find: "",
            Other_How_Did_You_Find: "",
            status: 0,
            lead_id:$scope.programaSeleccionado.lead_id,
            leads:$scope.programaSeleccionado.leads
        };
        $scope.mensajeEmail ="";
        $scope.salaryUSD = false;

        $scope.datosDetalleSolicitud ={
            program1_contact:0,
            program1_status:0,
            program1_other_support:99,
            program1_other_support_text:"",
            program2_contact:0,
            program2_status:0,
            program2_other_support:99,
            program2_other_support_text:"",
            lastgrade:"",
            lastgrade_school:"",
            lastgrade_country:0,
            lastgrade_general_average:0,
            lastgrade_score_scale:10,
            lastgrade_subject_fails:0,
            languages:"",
            professional_practices:0,
            professional_practices_company:"",
            study_work_status:0,
            work_company_name:"",
            work_seniority:0,
            work_job_title:"",
            work_actual_salary:0,
            work_salary_coin:2,
            previous_job1_company_name:"",
            previous_job1_seniority:0,
            previous_job1_title:"",
            previous_job2_company_name:"",
            previous_job2_seniority:0,
            previous_job2_title:"",
            budget_savings:0,
            budget_family_support:0,
            budget_assets:0,
            budget_credit:0,
            complementary_credit:0,
            social_labor:0,
            social_labor_text:"",
            SR_FB_ackowledgement:0,
            SR_FB_agreement:0
        };
        $scope.idiomas = [];
        $scope.boleto=0;
        $scope.gastosManutencion=0;
        $scope.totalGastos =0;

        $scope.empleosAnteriores =0;

        $scope.conoceCp = false;
        $scope.txtCP = null;
        $scope.txtCiudad = null;
        $scope.txtColonia = null;
        $scope.txtCodigoPostal = null;

        $scope.phoneHomeCode = null;
        $scope.phoneOfficeCode = null;
        $scope.cellPhoneCode = null;

        $scope.language = "";
        $scope.accreditation ="";
        $scope.score = "";
        $scope.mostrarAgregarIdioma = false;

        $scope.myDate = new Date();

        $scope.minDate = new Date(
            $scope.myDate.getFullYear()-70,
            0,
            1
          );

          $scope.maxDate = new Date(
            $scope.myDate.getFullYear()-15,
            11,
            31
          );

        $scope.steps = [
            {
                name: "email",
                enabled: true
            },
            {
                name: "datosPersonales",
                enabled: false
            },
            {
                name: "programas",
                enabled: false
            },
            {
                name: "datosAcademicos",
                enabled: false
            },
            {
                name: "datosLaborales",
                enabled: false
            },
            {
                name: "datosPresupuesto",
                enabled: false
            },
            {
                name: "responsabilidadSocial",
                enabled: false
            },
            {
                name: "finalRechazo",
                enabled: false
            },
            {
                name: "finalAcepta",
                enabled: false
            }
        ]

        $scope.universidad = [];
        
        $scope.paises = {
            modelo: null,
            opciones: []
        };

        $scope.monedas = {
            modelo: null,
            opciones: []
        };

        $scope.periodo = "";

        $scope.paisesnacimiento = {
            modelo: null,
            opciones: []
        };

        $scope.codigosPostales = {
            selected: null,
            opciones: []
        };
        $scope.colonias = {
            selected: null,
            opciones:[]
        };

        $scope.opcionesIdiomas = {
            idiomaSeleccionado: "",
            acreditacionSeleccionada:"",
            mensajePuntaje:"Puntaje",
            idiomas:[
                "Inglés",
                "Francés",
                "Alemán",
                "Italiano",
                "Chino",
                "Otro"
            ],
            acreditaciones:[
                {idioma:"Inglés",nombre:"TOEFL"},
                {idioma:"Inglés",nombre:"TOEFL iBT"},
                {idioma:"Inglés",nombre:"IELTS"},
                {idioma:"Inglés",nombre:" - Otro"},
                {idioma:"Inglés",nombre:" - Ninguno"},
                {idioma:"Francés",nombre:" - Otro"},
                {idioma:"Francés",nombre:" - Ninguno"},
                {idioma:"Alemán",nombre:" - Otro"},
                {idioma:"Alemán",nombre:" - Ninguno"},
                {idioma:"Italiano",nombre:" - Otro"},
                {idioma:"Italiano",nombre:" - Ninguno"},
                {idioma:"Chino",nombre:" - Otro"},
                {idioma:"Chino",nombre:" - Ninguno"},
                {idioma:"Otro",nombre:" - Otro"},
                {idioma:"Otro",nombre:" - Ninguno"}
            ]
        };

        $scope.estatusEstudioTrabajo = {
            seleccionado:0,
            proximo:0,
            opciones:[
                {id:0,txt:"Solo estudio",proximo:0},
                {id:1,txt:"Solo trabajo",proximo:1},
                {id:2,txt:"Estudio y trabajo",proximo:1},
                {id:3,txt:"No estudio ni trabajo",proximo:0}
            ]
        };

        $scope.antiguedadTrabajo = {
            seleccionado:null,
            seleccionado1:null,
            seleccionado2:null,
            opciones:[
                {id:0,txt:"1 a 6 meses"},
                {id:1,txt:"7 a 12 meses"},
                {id:2,txt:"1 a 2 años"},
                {id:3,txt:"más de 2 años"}
            ]
        };

        $scope.otherSupportPrograms = [];

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

        $scope.ciudades = {
            selected: null,
            opciones: []
        }

        $scope.estadosnacimiento = {
            modelo: null,
            opciones: []
        }

        $scope.nuevoUsuario = false;
        $scope.checkedEmail = false;
        $scope.mostrarContrasena = false;
        $scope.mostrarCheckEmail = true;

        //vm.terminarsolicitudv2 = terminarsolicitudv2;
        vm.pasoSiguiente = pasoSiguiente;
        vm.pasoAnterior = pasoAnterior;
        vm.makePasswd = makePasswd;

        $scope.agregaIdioma = function(){
            var lang;
            var accre;

            if($scope.opcionesIdiomas.idiomaSeleccionado=="Otro"){
                lang=$scope.language;
            }else{
                lang=$scope.opcionesIdiomas.idiomaSeleccionado;
            }

            if($scope.opcionesIdiomas.acreditacionSeleccionada==" - Otro"){
                accre=$scope.accreditation;
            }else{
                accre=$scope.opcionesIdiomas.acreditacionSeleccionada;
            }

            var datos={
                language: lang,
                accreditation: accre,
                score: $scope.score
            }
            $scope.idiomas.push(datos);
            $scope.language="";
            $scope.accreditation="";
            $scope.score="";
            $scope.opcionesIdiomas.idiomaSeleccionado="";
            $scope.opcionesIdiomas.acreditacionSeleccionada="";

        };

        vm.makePasswd = makePasswd;
        function makePasswd(length) {
           var result           = '';
           var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
           var charactersLength = characters.length;
           for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
           }
           return result;
        }

        $scope.checkEmail = function(){
            var formData = {
                email: $scope.datosPersona.email
            };
            $scope.mostrarCheckEmail=false;
            vm.mostrarCargando();
            AjaxCall("POST", URL_SERVIDOR + '/Person/ShowByEmail', formData, 
                function (response) {
                    vm.cerrarCargando();
                    if(response.datos.length>0){
                        $scope.person_id = response.datos[0].id;
                        //StateMessage("Felicidades", "Ya existe el usuario", "success");
                        $scope.nuevoUsuario = false;
                    }else{
                        $scope.person_id = 0;
                        $scope.nuevoUsuario = true;
                        $scope.datosPersona.Password = vm.makePasswd(8);
                        //console.log($scope.datosPersona.Password);
                        //StateMessage("Felicidades", "NO existe el usuario", "success");
                    }
                    $scope.datosPersona.person_id = $scope.person_id;
                    if($scope.nuevoUsuario){
                        /*NO EXISTE EL USUARIO*/
                        //StateMessage("Felicidades", "VAMOS A CREAR EL USUARIO: NU " + $scope.nuevoUsuario, "success");
                        $scope.checkedEmail=true;
                        $scope.mensajeEmail="No está registrado este email en el sistema. Se creará un usuario nuevo.";
                    }else{
                        /*YA EXISTE EL USUARIO*/
                        var data = {
                            person_id: $scope.person_id
                        }
                        //vm.mostrarCargando();
                        AjaxCall("POST", URL_SERVIDOR + '/Application/checkPersonApplication', data, 
                            function (response) {
                                //vm.cerrarCargando();
                                if(response.Codigo==422){
                                    StateMessage("Alerta", "Ya existe una solicitud en proceso con ese email.\n \n Sólo es posible tener un proceso de beca a la vez.", "error");
                                    $scope.checkedEmail=false;
                                    $scope.mostrarCheckEmail=true;
                                    $scope.mensajeEmail="Ya existe una solicitud en proceso con ese email. Sólo es posible tener un proceso de beca a la vez.";
                                }else{
                                    if(response.datos.status==22){
                                        $scope.datosPersona.Password = 'Fund4B3C4';

                                        var login = {
                                            email: $scope.datosPersona.email,
                                            password: $scope.datosPersona.Password
                                        }
                                        //vm.mostrarCargando();
                                        AjaxCall("POST", URL_SERVIDOR + '/Logueo',
                                            login, function (response) {
                                                if (response.Codigo === "401" || response.Codigo === "404") {
                                                    swal("Atención", response.mensaje, "error");
                                                } else {
                                                    if (response.User !== undefined) {
                                                        
                                                        //vm.cerrarCargando();
                                                        //$scope.personaLogin = response.Person;


                                                        $scope.datosPersona.email= response.Person.email;
                                                        $scope.datosPersona.name= response.Person.name;
                                                        $scope.datosPersona.lastName= response.Person.lastName;
                                                        $scope.datosPersona.mLastName= response.Person.mLastName;
                                                        $scope.datosPersona.nationality= response.Person.nationality;
                                                        $scope.datosPersona.residenceCountry= response.Person.residenceCountry;
                                                        $scope.datosPersona.gender= response.Person.gender;
                                                        $scope.datosPersona.civilStatus= response.Person.civilStatus;
                                                        $scope.datosPersona.phoneHome= response.Person.phoneHome;
                                                        $scope.datosPersona.phoneOffice= response.Person.phoneOffice;
                                                        $scope.datosPersona.cellphone= response.Person.cellphone;
                                                        $scope.datosPersona.birthdate= response.Person.birthdate;
                                                        $scope.datosPersona.street= response.Person.street;
                                                        $scope.datosPersona.outdoorNumber= response.Person.outdoorNumber;
                                                        $scope.datosPersona.indoorNumber= response.Person.indoorNumber;
                                                        $scope.datosPersona.neighborhood= response.Person.neighborhood;
                                                        $scope.datosPersona.state= response.Person.state;
                                                        $scope.datosPersona.zipCode= response.Person.zipCode;
                                                        $scope.datosPersona.facebook= response.Person.facebook;
                                                        $scope.datosPersona.skype= response.Person.skype;
                                                        $scope.datosPersona.linkedin= response.Person.linkedin;
                                                        $scope.datosPersona.lastGrade= response.Person.lastGrade;
                                                        $scope.datosPersona.lastSchool= response.Person.lastSchool;
                                                        $scope.datosPersona.birth_country= response.Person.birth_country;
                                                        $scope.datosPersona.birth_state= response.Person.birth_state;
                                                        $scope.datosPersona.city= response.Person.city;

                                                        $scope.llenarComboEstado();
                                                        $scope.mensajeEmail="Has llenado una solicitud con anterioridad y fue rechazada. Se han cargado algunos datos del usuario.";
                                                        //StateMessage("SUCCESS", "INGRESO CORRECTO", "success");
                                                        $scope.checkedEmail=true;
                                                        //vm.cerrarCargando();

                                                    }
                                                }
                                               
                                            }, function () {
                                                //vm.cerrarCargando();
                                            }, function(error){
                                                
                                                if(error.status === 500){
                                                    //vm.cerrarCargando();
                                                    swal("Atención", "Ocurrió un error, intenta más tarde","error");
                                                }

                                                if(error.statusText =="timeout"){
                                                    //vm.cerrarCargando();
                                                    swal("Atención", "Revisar conexión a internet, vuelve a intentar por favor","error");
                                                }
                                            });


                                    }else{
                                        //vm.cerrarCargando();
                                        $scope.mostrarContrasena = true;
                                        $scope.mensajeEmail="Ya está registrado un Usuario con ese email. Por favor ingresa la contraseña.";
                                        //StateMessage("Felicidades", "Se creará una nueva MC " + $scope.mostrarContrasena, "success");                                    
                                    }
                                }
                            },
                            function(response){
                                //vm.cerrarCargando();
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
                                StateMessage("Error", "Se ha producido un error: \n msg  " + ":  " + jqXHR, "alert");
                                //setTimeout(function () {
                                    //location.href = ("pages/auth/login");
                                    //$state.go('app.pages_auth_login');
                                //}, 5000);//alert("EXITO");
                            }); 
                    }
                },
                function(response){
                    vm.cerrarCargando();
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
                    StateMessage("Error", "Se ha producido un error: \n msg  " + ":  " + jqXHR, "alert");
                    //setTimeout(function () {
                        //location.href = ("pages/auth/login");
                        //$state.go('app.pages_auth_login');
                    //}, 5000);//alert("EXITO");
                });
        }

        $scope.login = function(){
            //StateMessage("Error", "LOGIN", "error");
            var login = {
                email: $scope.datosPersona.email,
                password: $scope.datosPersona.Password
            }
            vm.mostrarCargando();
            AjaxCall("POST", URL_SERVIDOR + '/Logueo',
                login, function (response) {
                    if (response.Codigo === "401" || response.Codigo === "404") {
                        swal("Atención", response.mensaje, "error");
                    } else {
                        if (response.User !== undefined) {
                            
                            vm.cerrarCargando();
                            //$scope.personaLogin = response.Person;


                            $scope.datosPersona.email= response.Person.email;
                            $scope.datosPersona.name= response.Person.name;
                            $scope.datosPersona.lastName= response.Person.lastName;
                            $scope.datosPersona.mLastName= response.Person.mLastName;
                            $scope.datosPersona.nationality= response.Person.nationality;
                            $scope.datosPersona.residenceCountry= response.Person.residenceCountry;
                            $scope.datosPersona.gender= response.Person.gender;
                            $scope.datosPersona.civilStatus= response.Person.civilStatus;
                            $scope.datosPersona.phoneHome= response.Person.phoneHome;
                            $scope.datosPersona.phoneOffice= response.Person.phoneOffice;
                            $scope.datosPersona.cellphone= response.Person.cellphone;
                            $scope.datosPersona.birthdate= response.Person.birthdate;
                            $scope.datosPersona.street= response.Person.street;
                            $scope.datosPersona.outdoorNumber= response.Person.outdoorNumber;
                            $scope.datosPersona.indoorNumber= response.Person.indoorNumber;
                            $scope.datosPersona.neighborhood= response.Person.neighborhood;
                            $scope.datosPersona.state= response.Person.state;
                            $scope.datosPersona.zipCode= response.Person.zipCode;
                            $scope.datosPersona.facebook= response.Person.facebook;
                            $scope.datosPersona.skype= response.Person.skype;
                            $scope.datosPersona.linkedin= response.Person.linkedin;
                            $scope.datosPersona.lastGrade= response.Person.lastGrade;
                            $scope.datosPersona.lastSchool= response.Person.lastSchool;
                            $scope.datosPersona.birth_country= response.Person.birth_country;
                            $scope.datosPersona.birth_state= response.Person.birth_state;
                            $scope.datosPersona.city= response.Person.city;

                            $scope.llenarComboEstado();
                            $scope.mensajeEmail="Ingreso al Sistema Correcto. Se han cargado los datos del usuario.";
                            StateMessage("SUCCESS", "INGRESO CORRECTO", "success");
                            $scope.checkedEmail=true;

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
        }

        function pasoSiguiente(id){

            /*VALIDACIONES POR PANTALLA*/
            var valido=true;
            var campo="";
            switch(id){
                case 1://DATOS PERSONALES
                    if($scope.datosPersona.name==""){
                        valido=false;
                        campo="Nombre";
                    }else if($scope.datosPersona.lastName==""){
                        valido=false;
                        campo="Primer Apellido";
                    }else if($scope.datosPersona.mLastName==""){
                        valido=false;
                        campo="Segundo Apellido";
                    }else if($scope.datosPersona.birthdate==""){
                        valido=false;
                        campo="Fecha de Nacimiento";
                    }else if($scope.datosPersona.gender==""){
                        valido=false;
                        campo="Género";
                    }else if($scope.datosPersona.civilStatus==""){
                        valido=false;
                        campo="Estado Civil";
                    }else if($scope.datosPersona.birth_country==""){
                        valido=false;
                        campo="País de Nacimiento";
                    }else if($scope.datosPersona.birth_state==""){
                        valido=false;
                        campo="Estado de Nacimiento";
                    }else if($scope.datosPersona.residenceCountry==""){
                        valido=false;
                        campo="País de Residencia";
                    }else if($scope.estados.modelo==null){
                        valido=false;
                        campo="Estado de Residencia";
                    }else if($scope.datosPersona.street==""){
                        valido=false;
                        campo="Calle";
                    }else if($scope.datosPersona.outdoorNumber=="0"){
                        valido=false;
                        campo="Número Exterior";
                    }else if($scope.datosPersona.phoneHome==""){
                        valido=false;
                        campo="Teléfono de Casa";
                    }else if($scope.datosPersona.cellphone==""){
                        valido=false;
                        campo="WhatsApp";
                    }else if($scope.datosPersona.How_Did_You_Find==""){
                        valido=false;
                        campo="Cómo te enteraste";
                    }else if($scope.ciudades.selected==null && $scope.txtCiudad==null){                            
                        valido=false;
                        campo="Ciudad";                            
                    }else if($scope.colonias.selected==null && $scope.txtColonia==null){
                        valido=false;
                        campo="Colonia";
                    }else if($scope.codigosPostales.selected==null && $scope.txtCodigoPostal==null){
                        valido=false;
                        campo="Código Postal";
                    }
                    break;
                case 2:
                    break;
                case 3:
                    if($scope.datosDetalleSolicitud.lastgrade==""){
                        valido=false;
                        campo="Último grado de estudios";
                    }else if($scope.datosDetalleSolicitud.lastgrade_school==""){
                        valido=false;
                        campo="Escuela de último Grado";
                    }else if($scope.datosDetalleSolicitud.lastgrade_country==0){
                        valido=false;
                        campo="País de últimos Estudios";
                    }else if($scope.datosDetalleSolicitud.lastgrade_general_average==0){
                        valido=false;
                        campo="Promedio General";
                    }else if($scope.programaSeleccionado.Country_Id!=28 && $scope.programaSeleccionado.Country_Id!=42&& $scope.idiomas.length==0){
                        valido=false;
                        campo="Por el programa Seleccionado debes elegir al menos Inglés. Asegúrate de presionar el boton Agregar";
                    }
                    break;
                case 4:
                    if($scope.datosDetalleSolicitud.professional_practices==1){
                        if($scope.datosDetalleSolicitud.professional_practices_company==""){
                            valido=false;
                            campo="Empresa de Prácticas Profesionales";
                        }
                    }
                    if($scope.estatusEstudioTrabajo.seleccionado==1||$scope.estatusEstudioTrabajo.seleccionado==2){
                        if($scope.datosDetalleSolicitud.work_company_name==""){
                            valido=false;
                            campo="Nombre de la empresa de empleo actual";
                        }else if($scope.antiguedadTrabajo.seleccionado==null){
                            valido=false;
                            campo="Antigüedad empleo actual";
                        }else if($scope.datosDetalleSolicitud.work_job_title==""){
                            valido=false;
                            campo="Puesto empleo actual";
                        }else if($scope.datosDetalleSolicitud.work_actual_salary==0){
                            valido=false;
                            campo="Salario de empleo actual";
                        }
                    }
                    if($scope.empleosAnteriores==1){
                        if($scope.datosDetalleSolicitud.previous_job1_company_name==""){
                            valido=false;
                            campo="Empresa empleo anterior 1";
                        }else if($scope.antiguedadTrabajo.seleccionado1==null){
                            valido=false;
                            campo="Antigüedad empleo anterior 1";
                        }else if($scope.datosDetalleSolicitud.previous_job1_title==""){
                            valido=false;
                            campo="Puesto empleo anterior 1";
                        }
                    }
                    break;
                case 5:
                    if($scope.datosDetalleSolicitud.budget_savings+$scope.datosDetalleSolicitud.budget_family_support+$scope.datosDetalleSolicitud.budget_assets+$scope.datosDetalleSolicitud.budget_credit==0){
                        valido=false;
                            campo="Debes indicar alguna fuente de presupuesto disponible";
                    }
                    break;
                default:
            }

            if(valido){
                $scope.mensaje="";
                if(id<$scope.steps.length-1){
                    $scope.steps[id].enabled=false;
                    $scope.steps[id+1].enabled=true;
                }
            }else{
                $scope.mensaje="Error: Faltan datos o datos incorrectos. Campo: " + campo;
            }
        }

        function pasoAnterior(id){
            if(id>0){
                $scope.steps[id].enabled=false;
                $scope.steps[id-1].enabled=true;
            }
        }


        $scope.terminarsolicitudv2= function() {

            var data = {
                available: $scope.datosDetalleSolicitud.budget_savings + $scope.datosDetalleSolicitud.budget_family_support + $scope.datosDetalleSolicitud.budget_assets + $scope.datosDetalleSolicitud.budget_credit,
                total_expenses: $scope.totalGastos
            }

            $scope.datosDetalleSolicitud.languages = JSON.stringify($scope.idiomas);
            $scope.datosPersona.state = $scope.estados.modelo;
            $scope.datosPersona.city = $scope.txtCiudad!=null?$scope.txtCiudad:$scope.ciudades.selected.municipality_name;
            $scope.datosPersona.neighborhood = $scope.txtColonia!=null?$scope.txtColonia:$scope.colonias.selected.suburb_name;
            $scope.datosPersona.zipCode =  $scope.txtCodigoPostal!=null?$scope.txtCodigoPostal:$scope.codigosPostales.selected;

            $scope.datosPersona.phoneHome="+"+$scope.phoneHomeCode+" " + $scope.datosPersona.phoneHome;
            $scope.datosPersona.phoneOffice="+"+$scope.phoneOfficeCode+" " + $scope.datosPersona.phoneOffice;
            $scope.datosPersona.cellphone="+"+$scope.cellPhoneCode+" " + $scope.datosPersona.cellphone;

            $scope.datosDetalleSolicitud.work_seniority = $scope.antiguedadTrabajo.seleccionado;
            $scope.datosDetalleSolicitud.previous_job1_seniority = $scope.antiguedadTrabajo.seleccionado1!=null?$scope.antiguedadTrabajo.seleccionado1:0;
            $scope.datosDetalleSolicitud.previous_job2_seniority = $scope.antiguedadTrabajo.seleccionado2!=null?$scope.antiguedadTrabajo.seleccionado2:0;

            $scope.datosPersona.birthdate = moment(new Date($scope.datosPersona.birthdate)).format('YYYY-MM-DD');
            vm.mostrarCargando();


            AjaxCall("POST", URL_SERVIDOR + '/Application/validateApplication', data, 
                function (response) {
                    //vm.cerrarCargando();
                    if(response.Codigo>200){
                        if ($scope.programaSeleccionado.exception_budget==1){
                            $scope.solicitudValidada = true;
                        }else{
                            //StateMessage("Alerta", "No pasa el filtro", "error");
                            $scope.solicitudValidada = false;
                            $scope.datosPersona.status=22;
                            $scope.datosPersona.Password = 'Fund4B3C4';
                            //$scope.steps[6].enabled=false;
                            //$scope.steps[7].enabled=true;
                            //vm.cerrarCargando();
                        }                        
                    }else{
                        //StateMessage("Exito", "Si pasa el filtro", "success");
                        $scope.solicitudValidada = true;
                    }

                    if($scope.nuevoUsuario){

                        var datasolicitud={
                            datos: [
                                $scope.datosPersona,
                                $scope.datosDetalleSolicitud
                                ]
                        }

                        AjaxCall("POST", URL_SERVIDOR + '/Application/storenewV2',
                            datasolicitud, 
                            function (response) {
                                
                                if (response.Codigo == "201") {

                                    if($scope.solicitudValidada){

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
                                                        $scope.steps[6].enabled=false;
                                                        $scope.steps[7].enabled=false;
                                                        $scope.steps[8].enabled=true;
                                                        $scope.solicitudValidada = true;
                                                        vm.cerrarCargando();
                                                    },
                                                    function(response){
                                                        //$scope.steps[6].enabled=false;
                                                        //$scope.steps[7].enabled=true;
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
                                                        $scope.steps[6].enabled=false;
                                                        $scope.steps[7].enabled=false;
                                                        $scope.steps[8].enabled=true;
                                                        $scope.solicitudValidada = true;
                                                        vm.cerrarCargando();
                                                    });
                                            }//FIN DE CODIGO ENYD
                                        }else{
                                        /*FIN CODIGO PARA MANDAR LEADS A APLICACIONES DE UNIVERSIDADES*/
                                            $scope.steps[6].enabled=false;
                                            $scope.steps[7].enabled=false;
                                            $scope.steps[8].enabled=true;
                                            $scope.solicitudValidada = true;
                                            vm.cerrarCargando();
                                        }
                                    }else{
                                        $scope.steps[6].enabled=false;
                                        $scope.steps[7].enabled=true;
                                        vm.cerrarCargando();                                        
                                    }   
                                } else {
                                    StateMessage("Atención", response.mensaje, "info");
                                }
                            },function(response){
                                /*console.log("Segunda Funcion");
                                StateMessage("Felicidades", "5Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                setTimeout(function () {
                                //location.href = ("pages/auth/login");
                                    //$state.go('app.pages_auth_login');
                                }, 5000);//alert("EXITO");*/
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
                                if($scope.solicitudValidada){
                                    $scope.steps[6].enabled=false;
                                    $scope.steps[7].enabled=false;
                                    $scope.steps[8].enabled=true;
                                    $scope.solicitudValidada = true;
                                }else{
                                    $scope.steps[6].enabled=false;
                                    $scope.steps[7].enabled=true;
                                }
                                vm.cerrarCargando();
                            }
                        ); 
                    }else{

                        var datasolicitud={
                            datos: [
                                $scope.datosPersona,
                                $scope.datosDetalleSolicitud
                                ]
                        }

                        AjaxCall("POST", URL_SERVIDOR + '/Application/storeExistingV2',
                            datasolicitud, 
                            function (response) {
                                
                                if (response.Codigo == "201") {
                                    //$scope.ocultar = true;

                                    if($scope.solicitudValidada){


                                    
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
                                                        $scope.steps[6].enabled=false;
                                                        $scope.steps[7].enabled=true;
                                                        $scope.solicitudValidada = true;
                                                        vm.cerrarCargando();
                                                    },
                                                    function(response){
                                                        //$scope.steps[6].enabled=false;
                                                        //$scope.steps[7].enabled=true;
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
                                                        $scope.steps[6].enabled=false;
                                                        $scope.steps[7].enabled=false;
                                                        $scope.steps[8].enabled=true;
                                                        $scope.solicitudValidada = true;
                                                    });
                                            }//FIN DE CODIGO ENYD
                                        }else{
                                        /*FIN CODIGO PARA MANDAR LEADS A APLICACIONES DE UNIVERSIDADES*/

                                            $scope.steps[6].enabled=false;
                                            $scope.steps[7].enabled=false;
                                            $scope.steps[8].enabled=true;
                                            $scope.solicitudValidada = true;
                                            vm.cerrarCargando();
                                        }
                                    }else{
                                        $scope.steps[6].enabled=false;
                                        $scope.steps[7].enabled=true;
                                        vm.cerrarCargando();
                                    }   
                                } else {
                                    StateMessage("Atención", response.mensaje, "info");
                                }
                            },function(response){
                                /*console.log("Segunda Funcion");
                                StateMessage("Felicidades", "5Tu solicitud ha sido enviada, serás redireccionado al inicio de sesión", "success");
                                setTimeout(function () {
                                //location.href = ("pages/auth/login");
                                    //$state.go('app.pages_auth_login');
                                }, 5000);//alert("EXITO");*/
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
                                StateMessage("Error", "Se ha producido un error: \n msg  " + ":  " + jqXHR, "alert");
                                if($scope.solicitudValidada){
                                    $scope.steps[6].enabled=false;
                                    $scope.steps[7].enabled=false;
                                    $scope.steps[8].enabled=true;
                                    $scope.solicitudValidada = true;
                                }else{
                                    $scope.steps[6].enabled=false;
                                    $scope.steps[7].enabled=true;
                                }
                                vm.cerrarCargando();
                            }
                        );

                    }
                    //}
                },
                function(response){
                    //vm.cerrarCargando();
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
                    StateMessage("Error", "Se ha producido un error: \n msg  " + ":  " + jqXHR, "alert");
                    //setTimeout(function () {
                        //location.href = ("pages/auth/login");
                        //$state.go('app.pages_auth_login');
                    //}, 5000);//alert("EXITO");
                });               
        };

        $scope.llenarComboEstado = function () {
            vm.mostrarCargando();
            AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.datosPersona.residenceCountry, null, function (response) {
                $scope.$apply(function () {
                    $scope.estados.opciones = response.datos;
                    $scope.phoneHomeCode = response.pais.phone_code;
                    $scope.phoneOfficeCode = response.pais.phone_code;
                    $scope.cellPhoneCode = response.pais.phone_code;
                    vm.cerrarCargando();
                });
            }, function () { });
            vm.cerrarCargando();
        }

        $scope.llenarComboEstadoNacimiento = function () {
            vm.mostrarCargando();
            AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.datosPersona.birth_country, null, function (response) {
                $scope.$apply(function () {
                    $scope.estadosnacimiento.opciones = response.datos;
                    vm.cerrarCargando();
                });
            }, function () { });
            vm.cerrarCargando();
        }

        $scope.toHome = function(){
            location.href = ("http://fundacionbeca.net");
        }

        $scope.toLogin = function(){
            location.href = ("pages/auth/login");
        }

        $scope.llenarComboCiudad = function () {
            var datos = {
                state_id: $scope.estados.modelo
            }
            $scope.codigosPostales = {
            selected: null,
            opciones: []
            };
            $scope.colonias = {
                selected: null,
                opciones:[]
            };
            $scope.txtCiudad=null;
            $scope.txtColonia=null;
            $scope.txtCodigoPostal=null;
            vm.mostrarCargando();
            AjaxCall("POST", URL_SERVIDOR + "/PostalCode/findMunicipalitiesByStateId", datos, function (response) {
                $scope.$apply(function () {
                    $scope.ciudades.opciones = response.datos;
                    vm.cerrarCargando();
                });
            }, function () { });
            vm.cerrarCargando();
            //console.log($scope.ciudades);
        }

        $scope.llenarCombosCPCol = function () {
            var datos = {
                municipality_id: $scope.ciudades.selected.municipality_id
            }
            console.log($scope.ciudades);
            vm.mostrarCargando();
            //if($scope.colonias.selected != null){
                AjaxCall("POST", URL_SERVIDOR + "/PostalCode/findPostalCodesByMunicipalityId", datos, function (response) {
                    $scope.$apply(function () {
                        $scope.colonias.opciones = response.datos;
                        $scope.codigosPostales.opciones = response.postal_codes;
                        vm.cerrarCargando();
                    });
                }, function () { });
            //}
            vm.cerrarCargando();
        }

        $scope.llenardatosCP = function() {
            if($scope.txtCP.length==5){
                var datos = {
                    postal_code: $scope.txtCP
                }

                vm.mostrarCargando();

                AjaxCall("POST", URL_SERVIDOR + "/PostalCode/findByPostalCode", datos, function (response) {
                    $scope.$apply(function () {
                        $scope.colonias.opciones = response.datos;
                        $scope.codigosPostales.opciones = [{postal_code: $scope.txtCP}];
                        $scope.codigosPostales.selected = $scope.txtCP;

                        $scope.ciudades.opciones = [{
                            municipality_id: response.opciones.municipality_id,
                            municipality_name: response.opciones.municipality_name
                        }];
                        $scope.ciudades.selected = $scope.ciudades.opciones[0];
                        vm.cerrarCargando();
                    });
                }, function () { });
                console.log($scope.ciudades);
                vm.cerrarCargando();
            }
        }
        $scope.llenarComboCol = function () {
            var datos = {
                postal_code: $scope.codigosPostales.selected
            }
            console.log('colonias');
            console.log($scope.colonias);
            vm.mostrarCargando();
            if($scope.colonias.selected == null){
                AjaxCall("POST", URL_SERVIDOR + "/PostalCode/findSuburbsByPostalCode", datos, function (response) {
                    $scope.$apply(function () {
                        $scope.colonias.opciones = response.datos;
                        vm.cerrarCargando();
                    });
                }, function () { });
            }
            vm.cerrarCargando();
        }
        $scope.llenarComboCP = function () {
            var datos = [{
                postal_code: $scope.colonias.selected.postal_code
            }];
            console.log('CP');
            console.log($scope.codigosPostales);
            vm.mostrarCargando();
            if($scope.codigosPostales.selected == null){
                $scope.codigosPostales.opciones=datos;
                $scope.codigosPostales.selected=$scope.ciudades.selected.postal_code;
            }
            vm.cerrarCargando();
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
            $scope.datosPersona.Program2_Id = $scope.programaSegundaOpcion.modelo;
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
                    $scope.paisesnacimiento.opciones = $scope.paises.opciones.filter(function(o){
                        return o.latinamerica == 1;
                        });                    
                    //$scope.paisesnacimiento.opciones = response.datos;
                    //$scope.paisesnacimiento.opciones = response.datos.filter(function(pai){retrurn pai.latinamerica==1;});
                    //console.log($scope.paisesnacimiento);
                });
            }, function () {

            });

            AjaxCall("GET", URL_SERVIDOR + "/Coin", null, function (response) {
                $scope.$apply(function () {
                    $scope.monedas.opciones = response.datos;                 
                    //$scope.paisesnacimiento.opciones = response.datos;
                    //$scope.paisesnacimiento.opciones = response.datos.filter(function(pai){retrurn pai.latinamerica==1;});
                    //console.log($scope.paisesnacimiento);
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

            AjaxCall("GET", URL_SERVIDOR + "/OtherSupportProgram", null, function (response) {
                $scope.$apply(function () {
                    $scope.otherSupportPrograms = response.datos;
                });
            }, function () {
                $scope.programa.modelo = $scope.programaSeleccionado.Classification_Id;
            });

            switch($scope.programaSeleccionado.duration_period){
                case "H": $scope.periodo = "Horas";break;
                case "D": $scope.periodo = "Días";break;
                case "S": $scope.periodo = "Semanas";break;
                case "M": $scope.periodo = "Meses";break;
            }

            if($scope.programaSeleccionado.Modality_Id != 2){
                if($scope.programaSeleccionado.Country_Id==42){
                    if($scope.datosPersona.birth_country!=42){
                        $scope.gastosManutencion=1000;
                        $scope.boleto=0;   
                    }else{
                        $scope.gastosManutencion=0;
                        $scope.boleto=0;
                    }
                }else{
                    $scope.gastosManutencion=1000;
                    $scope.boleto=2500;
                }
            }else{
                $scope.gastosManutencion=0;
                $scope.boleto=0;
            }

            $scope.totalGastos = $scope.programaSeleccionado.Program_Cost + ($scope.programaSeleccionado.duration * $scope.gastosManutencion) + $scope.boleto;
            // $scope.buscarProgramasSegundaOpcion()
            //console.log($scope.minDate);
            //console.log($scope.maxDate);
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

        vm.init();

    }


})();
